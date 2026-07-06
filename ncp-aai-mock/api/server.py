#!/usr/bin/env python3
"""
NCP-AAI Progress Tracker API
Simple HTTP server with SQLite — no external dependencies.
Run: python3 api/server.py
Port: 8787
"""

import json
import sqlite3
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from datetime import datetime, date

DB_PATH = os.path.join(os.path.dirname(__file__), 'progress.db')

# ---------------------------------------------------------------------------
# DB setup
# ---------------------------------------------------------------------------

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS test_results (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            session_type TEXT NOT NULL,        -- 'ncp' | 'certiq'
            score       INTEGER NOT NULL,
            correct     INTEGER NOT NULL,
            incorrect   INTEGER NOT NULL,
            unanswered  INTEGER NOT NULL,
            total       INTEGER NOT NULL,
            passed      INTEGER NOT NULL,
            time_taken  INTEGER NOT NULL,
            taken_at    TEXT NOT NULL,         -- ISO date string YYYY-MM-DD
            taken_ts    TEXT NOT NULL          -- full ISO datetime
        );

        CREATE TABLE IF NOT EXISTS domain_scores (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            result_id   INTEGER NOT NULL REFERENCES test_results(id),
            domain      INTEGER NOT NULL,
            correct     INTEGER NOT NULL,
            total       INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS daily_summary (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            day         TEXT NOT NULL,         -- YYYY-MM-DD
            session_type TEXT NOT NULL,
            tests_taken INTEGER NOT NULL DEFAULT 0,
            best_score  INTEGER NOT NULL DEFAULT 0,
            avg_score   REAL NOT NULL DEFAULT 0,
            total_qs    INTEGER NOT NULL DEFAULT 0,
            UNIQUE(day, session_type)
        );
    """)
    conn.commit()
    conn.close()

# ---------------------------------------------------------------------------
# Business logic
# ---------------------------------------------------------------------------

def save_result(session_type: str, payload: dict) -> int:
    today = date.today().isoformat()
    now = datetime.now().isoformat()
    conn = get_db()
    cur = conn.execute(
        """INSERT INTO test_results
           (session_type, score, correct, incorrect, unanswered, total, passed, time_taken, taken_at, taken_ts)
           VALUES (?,?,?,?,?,?,?,?,?,?)""",
        (session_type,
         payload.get('score', 0),
         payload.get('correct', 0),
         payload.get('incorrect', 0),
         payload.get('unanswered', 0),
         payload.get('totalQuestions', 0),
         1 if payload.get('passed') else 0,
         payload.get('timeTaken', 0),
         today, now)
    )
    result_id = cur.lastrowid

    for domain_str, ds in (payload.get('domainScores') or {}).items():
        conn.execute(
            "INSERT INTO domain_scores (result_id, domain, correct, total) VALUES (?,?,?,?)",
            (result_id, int(domain_str), ds.get('correct', 0), ds.get('total', 0))
        )

    # upsert daily summary
    conn.execute("""
        INSERT INTO daily_summary (day, session_type, tests_taken, best_score, avg_score, total_qs)
        VALUES (?, ?, 1, ?, ?, ?)
        ON CONFLICT(day, session_type) DO UPDATE SET
            tests_taken = tests_taken + 1,
            best_score  = MAX(best_score, excluded.best_score),
            avg_score   = (avg_score * (tests_taken - 1) + excluded.avg_score) / tests_taken,
            total_qs    = total_qs + excluded.total_qs
    """, (today, session_type, payload.get('score', 0), payload.get('score', 0), payload.get('totalQuestions', 0)))

    conn.commit()
    conn.close()
    return result_id

def get_history(session_type=None, limit=30):
    conn = get_db()
    if session_type:
        rows = conn.execute(
            "SELECT * FROM test_results WHERE session_type=? ORDER BY taken_ts DESC LIMIT ?",
            (session_type, limit)
        ).fetchall()
    else:
        rows = conn.execute(
            "SELECT * FROM test_results ORDER BY taken_ts DESC LIMIT ?",
            (limit,)
        ).fetchall()
    results = []
    for r in rows:
        r = dict(r)
        domain_rows = conn.execute(
            "SELECT domain, correct, total FROM domain_scores WHERE result_id=?", (r['id'],)
        ).fetchall()
        r['domainScores'] = {str(d['domain']): {'correct': d['correct'], 'total': d['total']} for d in domain_rows}
        results.append(r)
    conn.close()
    return results

def get_daily_progress(session_type=None, days=30):
    conn = get_db()
    if session_type:
        rows = conn.execute(
            "SELECT * FROM daily_summary WHERE session_type=? ORDER BY day DESC LIMIT ?",
            (session_type, days)
        ).fetchall()
    else:
        rows = conn.execute(
            "SELECT * FROM daily_summary ORDER BY day DESC LIMIT ?", (days,)
        ).fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_stats(session_type=None):
    conn = get_db()
    where = "WHERE session_type=?" if session_type else ""
    params = (session_type,) if session_type else ()
    row = conn.execute(f"""
        SELECT COUNT(*) as total_tests,
               MAX(score) as best_score,
               ROUND(AVG(score),1) as avg_score,
               SUM(correct) as total_correct,
               SUM(total) as total_qs,
               SUM(passed) as total_passed
        FROM test_results {where}
    """, params).fetchone()
    conn.close()
    return dict(row) if row else {}

def get_domain_stats(session_type=None):
    conn = get_db()
    where = "WHERE tr.session_type=?" if session_type else ""
    params = (session_type,) if session_type else ()
    rows = conn.execute(f"""
        SELECT ds.domain,
               SUM(ds.correct) as correct,
               SUM(ds.total) as total,
               ROUND(100.0*SUM(ds.correct)/MAX(SUM(ds.total),1),1) as accuracy
        FROM domain_scores ds
        JOIN test_results tr ON tr.id = ds.result_id
        {where}
        GROUP BY ds.domain
        ORDER BY ds.domain
    """, params).fetchall()
    conn.close()
    return [dict(r) for r in rows]

# ---------------------------------------------------------------------------
# HTTP Handler
# ---------------------------------------------------------------------------

class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        print(f"[{datetime.now().strftime('%H:%M:%S')}] {fmt % args}")

    def send_json(self, data, status=200):
        body = json.dumps(data).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', len(body))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(body)

    def send_error_json(self, msg, status=400):
        self.send_json({'error': msg}, status)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        qs = parse_qs(parsed.query)
        session_type = qs.get('type', [None])[0]
        limit = int(qs.get('limit', [30])[0])

        if parsed.path == '/api/history':
            self.send_json(get_history(session_type, limit))

        elif parsed.path == '/api/daily':
            self.send_json(get_daily_progress(session_type, limit))

        elif parsed.path == '/api/stats':
            data = {
                'overall': get_stats(session_type),
                'byDomain': get_domain_stats(session_type),
            }
            if not session_type:
                data['ncp'] = get_stats('ncp')
                data['certiq'] = get_stats('certiq')
            self.send_json(data)

        elif parsed.path == '/api/health':
            self.send_json({'status': 'ok', 'db': DB_PATH})

        else:
            self.send_error_json('Not found', 404)

    def do_POST(self):
        parsed = urlparse(self.path)
        length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(length)

        try:
            payload = json.loads(body)
        except Exception:
            self.send_error_json('Invalid JSON')
            return

        # POST /api/results?type=ncp  or  ?type=certiq
        if parsed.path == '/api/results':
            qs = parse_qs(parsed.query)
            session_type = qs.get('type', ['ncp'])[0]
            result_id = save_result(session_type, payload)
            self.send_json({'ok': True, 'id': result_id}, 201)
        else:
            self.send_error_json('Not found', 404)

# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == '__main__':
    init_db()
    port = int(os.environ.get('PORT', 9147))
    print(f"NCP-AAI Progress Tracker API running on http://localhost:{port}")
    print(f"Database: {DB_PATH}")
    print("Endpoints:")
    print("  POST /api/results?type=ncp|certiq  — save a test result")
    print("  GET  /api/history?type=ncp|certiq  — list past results")
    print("  GET  /api/daily?type=ncp|certiq    — daily progress")
    print("  GET  /api/stats?type=ncp|certiq    — aggregate stats")
    print("  GET  /api/health")
    HTTPServer(('0.0.0.0', port), Handler).serve_forever()
