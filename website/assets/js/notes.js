document.addEventListener('DOMContentLoaded', () => {
  const LOCAL_STORAGE_KEY = 'ncp_aai_user_notes';

  // DOM Elements
  const btnNewNote = document.getElementById('btn-new-note');
  const btnSaveNote = document.getElementById('btn-save-note');
  const btnDeleteNote = document.getElementById('btn-delete-note');
  const notesListEl = document.getElementById('notes-list');
  const mainArea = document.getElementById('notes-main-area');
  const emptyState = document.getElementById('notes-empty-state');
  
  const titleInput = document.getElementById('note-title');
  const contentInput = document.getElementById('note-content');
  const previewBox = document.getElementById('note-preview');
  const saveStatus = document.getElementById('save-status');

  const searchInput = document.getElementById('notes-search-input');
  const btnExport = document.getElementById('btn-export-notes');
  const btnImportTrigger = document.getElementById('btn-import-trigger');
  const fileInput = document.getElementById('notes-file-input');
  const noteTopicSelect = document.getElementById('note-topic-select');
  const btnDownloadNote = document.getElementById('btn-download-note');
  const formatBtns = document.querySelectorAll('.format-btn');

  // State
  let notes = [];
  let currentNoteId = null;
  let saveTimeout = null;
  let searchQuery = '';

  // Initialization
  async function init() {
    loadNotes();
    await loadTopics();
    renderNotesList();
    
    if (notes.length > 0) {
      showEmptyState();
    } else {
      showEmptyState();
    }

    if (typeof marked !== 'undefined') {
      marked.setOptions({
        gfm: true,
        breaks: true,
        highlight: function(code, lang) {
          if (typeof hljs !== 'undefined') {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
          }
          return code;
        }
      });
    }
  }

  async function loadTopics() {
    try {
      const resp = await fetch('../assets/data/topics.json');
      if (resp.ok) {
        const topics = await resp.json();
        noteTopicSelect.innerHTML = '<option value="">No Domain / Topic</option>';
        topics.forEach(t => {
          const opt = document.createElement('option');
          opt.value = t.title;
          opt.textContent = `[${t.domain}] ${t.title}`;
          noteTopicSelect.appendChild(opt);
        });
      }
    } catch(e) {
      console.log('Failed to load topics', e);
    }
  }

  // --- Data Layer ---
  function loadNotes() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      try {
        notes = JSON.parse(data);
        let migrated = false;
        notes.forEach(n => {
          if (n.content && n.content.includes('\\n')) {
            n.content = n.content.replace(/\\n/g, '\n');
            migrated = true;
          }
        });
        if (migrated) {
          saveNotesToStorage();
        }
      } catch(e) {
        notes = [];
      }
    }
    // Sort by last updated descending
    notes.sort((a,b) => b.updatedAt - a.updatedAt);
  }

  function saveNotesToStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }

  function createNote() {
    const newNote = {
      id: 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      title: '',
      topic: '',
      content: '# New Write-up\n\nStart typing here...',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    notes.unshift(newNote); // add to top
    saveNotesToStorage();
    renderNotesList();
    openNote(newNote.id);
  }

  function deleteNote(id) {
    if (!confirm('Are you sure you want to delete this note?')) return;
    notes = notes.filter(n => n.id !== id);
    saveNotesToStorage();
    
    if (currentNoteId === id) {
      currentNoteId = null;
      showEmptyState();
    }
    renderNotesList();
  }

  function updateCurrentNote() {
    if (!currentNoteId) return;
    const note = notes.find(n => n.id === currentNoteId);
    if (note) {
      note.title = titleInput.value.trim();
      note.content = contentInput.value;
      note.topic = noteTopicSelect.value;
      note.updatedAt = Date.now();
      saveNotesToStorage();
      renderNotesList(); // update title in sidebar
      
      saveStatus.textContent = 'Saved just now';
      setTimeout(() => { if(saveStatus.textContent === 'Saved just now') saveStatus.textContent = ''; }, 3000);
    }
  }

  // --- UI Layer ---
  function renderNotesList() {
    notesListEl.innerHTML = '';
    const filtered = notes.filter(n => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (n.title || '').toLowerCase().includes(q) || 
             (n.content || '').toLowerCase().includes(q) ||
             (n.topic || '').toLowerCase().includes(q);
    });

    filtered.forEach(note => {
      const li = document.createElement('li');
      li.className = 'note-item';
      if (note.id === currentNoteId) li.classList.add('active');
      
      const date = new Date(note.updatedAt).toLocaleDateString(undefined, {
        month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'
      });
      
      li.innerHTML = `
        <div class="note-item-title">${escapeHTML(note.title || 'Untitled Note')}</div>
        <div class="note-item-date">${date}</div>
      `;
      li.onclick = () => openNote(note.id);
      notesListEl.appendChild(li);
    });
  }

  function openNote(id) {
    currentNoteId = id;
    const note = notes.find(n => n.id === id);
    if (!note) return;

    emptyState.style.display = 'none';
    mainArea.style.display = 'flex';
    
    titleInput.value = note.title || '';
    contentInput.value = note.content || '';
    noteTopicSelect.value = note.topic || '';
    renderPreview();
    renderNotesList(); // update active class
    saveStatus.textContent = '';
  }

  function showEmptyState() {
    mainArea.style.display = 'none';
    emptyState.style.display = 'flex';
  }

  function renderPreview() {
    const rawMarkdown = contentInput.value;
    if (typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
      const html = marked.parse(rawMarkdown, { breaks: true, gfm: true });
      const safeHTML = DOMPurify.sanitize(html);
      previewBox.innerHTML = safeHTML;
    } else {
      previewBox.innerHTML = `<pre>${escapeHTML(rawMarkdown)}</pre>`;
    }
  }

  // Auto-save debouncer
  function handleInput() {
    saveStatus.textContent = 'Saving...';
    renderPreview();
    
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      updateCurrentNote();
    }, 1000); // Autosave 1 second after last keystroke
  }

  // Helper
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
      }[tag] || tag)
    );
  }

  // --- Event Listeners ---
  btnNewNote.addEventListener('click', createNote);
  btnDeleteNote.addEventListener('click', () => deleteNote(currentNoteId));
  btnSaveNote.addEventListener('click', () => {
    clearTimeout(saveTimeout);
    updateCurrentNote();
  });
  
  titleInput.addEventListener('input', handleInput);
  contentInput.addEventListener('input', handleInput);
  noteTopicSelect.addEventListener('change', () => {
    handleInput();
  });

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderNotesList();
  });

  // Export / Import
  btnExport.addEventListener('click', () => {
    if (notes.length === 0) return alert('No notes to export.');
    const dataStr = JSON.stringify(notes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ncp-aai-study-notes-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  btnImportTrigger.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (Array.isArray(imported)) {
          let added = 0;
          imported.forEach(impNote => {
            const exists = notes.find(n => n.id === impNote.id);
            if (!exists) {
              notes.push(impNote);
              added++;
            } else if (impNote.updatedAt > exists.updatedAt) {
              Object.assign(exists, impNote);
              added++;
            }
          });
          notes.sort((a,b) => b.updatedAt - a.updatedAt);
          saveNotesToStorage();
          renderNotesList();
          alert(`Successfully imported/merged ${added} new or updated notes.`);
        }
      } catch(err) {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
    fileInput.value = ''; // reset
  });

  btnDownloadNote.addEventListener('click', () => {
    if (!currentNoteId) return;
    const note = notes.find(n => n.id === currentNoteId);
    if (!note) return;
    const mdContent = note.content;
    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(note.title || 'note').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Formatting Toolbar
  formatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const prefix = btn.getAttribute('data-prefix');
      const tag = btn.getAttribute('data-tag');
      const wrapStart = btn.dataset.wrap ? btn.dataset.wrap.split(',')[0] : null;
      const wrapEnd = btn.dataset.wrap ? btn.dataset.wrap.split(',')[1] : null;

      const start = contentInput.selectionStart;
      const end = contentInput.selectionEnd;
      const text = contentInput.value;
      const selected = text.substring(start, end);

      let replacement = selected;
      let newStart = start;
      let newEnd = end;

      if (prefix) {
        replacement = prefix + selected;
        newStart = start + prefix.length;
        newEnd = newStart + selected.length;
      } else if (tag) {
        replacement = tag + selected + tag;
        newStart = start + tag.length;
        newEnd = newStart + selected.length;
      } else if (wrapStart && wrapEnd) {
        replacement = wrapStart + selected + wrapEnd;
        newStart = start + wrapStart.length;
        newEnd = newStart + selected.length;
      }

      contentInput.value = text.substring(0, start) + replacement + text.substring(end);
      
      // Update state and focus back
      handleInput();
      contentInput.focus();
      contentInput.setSelectionRange(newStart, newEnd);
    });
  });

  // Sync state if changed in another tab
  window.addEventListener('storage', (e) => {
    if (e.key === LOCAL_STORAGE_KEY) {
      loadNotes();
      renderNotesList();
      if (currentNoteId) {
        // If current note was deleted elsewhere
        if (!notes.find(n => n.id === currentNoteId)) {
          currentNoteId = null;
          showEmptyState();
        } else {
          // If we want to strictly sync the active input state - optional.
        }
      }
    }
  });

  // Start app
  init();
});
