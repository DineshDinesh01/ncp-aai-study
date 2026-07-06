#!/bin/bash
# Start both the Next.js app and the progress tracker API.
# Safe to re-run: if either is already up (e.g. from a prior session), skip it
# instead of crashing with "Address already in use".

API_PORT=9147
APP_PORT=3000

port_in_use() { lsof -i ":$1" -sTCP:LISTEN -t >/dev/null 2>&1; }

if port_in_use "$API_PORT"; then
  echo "Progress API already running on port $API_PORT — skipping."
else
  echo "Starting NCP-AAI Progress API on port $API_PORT..."
  python3 api/server.py &
  API_PID=$!
fi

if port_in_use "$APP_PORT"; then
  echo "Next.js already running on port $APP_PORT — skipping."
else
  echo "Starting Next.js on port $APP_PORT..."
  npm run dev &
  NEXT_PID=$!
fi

echo ""
echo "  App:       http://localhost:$APP_PORT"
echo "  API:       http://localhost:$API_PORT"
echo "  Dashboard: http://localhost:$APP_PORT/dashboard"
echo ""
echo "Press Ctrl+C to stop what this run started."

trap "kill $API_PID $NEXT_PID 2>/dev/null; exit" INT TERM
wait
