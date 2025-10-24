(function(){
  function isEditMode(){
    try {
      const params = new URLSearchParams(window.location.search || '');

      // Query param checks (common editor flags)
      if (params.has('edit') || params.get('edit') === '1') return true;
      const editorFlags = ['builder', 'builder.edit', 'builder.preview', 'builder.mode', 'editor', 'editMode', '_edit', 'preview'];
      for (const f of editorFlags) if (params.has(f)) return true;

      // Check hash and pathname for editor hints
      if (window.location.hash && /builder|editor|preview|visual/i.test(window.location.hash)) return true;
      if (window.location.pathname && /builder|editor/i.test(window.location.pathname)) return true;

      // Session storage toggle (manual/legacy)
      if (sessionStorage.getItem('edit-mode') === '1') return true;

      // Global flags that some editors/platforms expose
      try {
        if (window.__BUILDER__ || window.builder || window.Builder) return true;
      } catch (e) {}

      // Treat any iframe context as edit/preview to ensure the toolbar is available
      if (window.self !== window.top) return true;

      // Additional weak signals
      try {
        if (document.referrer && /builder\.io|builder|editor|preview/i.test(document.referrer)) return true;
        if (window.name && /builder|editor|preview/i.test(window.name)) return true;
        const frame = window.frameElement;
        if (frame && frame.getAttribute) {
          const attrs = ((frame.getAttribute('id') || '') + ' ' + (frame.getAttribute('class') || '') + ' ' + (frame.getAttribute('data-testid') || '') + ' ' + (frame.getAttribute('data-builder') || '')).toLowerCase();
          if (/builder|editor|preview/.test(attrs)) return true;
        }
      } catch (e) {}

      return false;
    } catch (_) { return false; }
  }

  function getHostDocument(){
    // Always use the current document to avoid injecting into editor/parent frames
    // Injecting into parent can place the toolbar outside the preview area or behind the editor UI
    return document;
  }

  function injectStyles(){
    const style = document.createElement('style');
    style.textContent = `
      #visual-change-toolbar {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 10000;
        background: #fff;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 12px 16px;
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      }
      #visual-change-toolbar button {
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.2s;
      }
      #visual-change-toolbar button:hover {
        background: #2563eb;
      }
      #visual-change-toolbar .toolbar-label {
        display: block;
        font-size: 12px;
        color: #6b7280;
        margin-bottom: 8px;
        font-weight: 500;
      }
    `;
    getHostDocument().head.appendChild(style);
  }

  function createToolbar(){
    const doc = getHostDocument();
    if (doc.getElementById('visual-change-toolbar')) return;

    const toolbar = document.createElement('div');
    toolbar.id = 'visual-change-toolbar';
    toolbar.innerHTML = `
      <span class="toolbar-label">Edit Mode</span>
      <button type="button" id="visual-change-btn">Visual Changes</button>
    `;
    doc.body.appendChild(toolbar);

    const btn = doc.getElementById('visual-change-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Visual editing mode enabled. Use this interface to make visual changes to your website.');
      });
    }
  }

  function initToolbar(){
    if (!isEditMode()) return;
    injectStyles();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createToolbar);
    } else {
      createToolbar();
    }
  }

  // Keyboard shortcut to toggle toolbar visibility
  document.addEventListener('keydown', (e) => {
    if (isEditMode() && e.ctrlKey && e.shiftKey && e.key === 'E') {
      e.preventDefault();
      const toolbar = document.getElementById('visual-change-toolbar');
      if (toolbar) {
        toolbar.style.display = toolbar.style.display === 'none' ? 'block' : 'none';
      }
    }
  });

  // Initialize toolbar on load
  initToolbar();

  // Continue with remaining helpers below
  // Contact form helpers
  function initContactForm(){
    try{
      const form = document.getElementById('contact-form');
      const textarea = document.getElementById('projectInfo');
      const counter = document.getElementById('projectInfo-count');
      if(textarea && counter){
        const update = () => {
          const max = Number(textarea.getAttribute('maxlength')) || 1000;
          const len = textarea.value.length || 0;
          counter.textContent = `${len}/${max}`;
        };
        textarea.addEventListener('input', update);
        update();
      }
      if(form){
        form.addEventListener('submit', (e)=>{
          const fullName = document.getElementById('fullName');
          const phone = document.getElementById('phone');
          const email = document.getElementById('email');
          let ok = true;
          if(fullName && !fullName.value.trim()) ok = false;
          if(phone && !/^\+?[0-9\s-]{10,}$/.test(phone.value.trim())) ok = false;
          if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) ok = false;
          if(!ok){
            e.preventDefault();
            try{ alert('Please complete the required fields with valid details.'); }catch(_){ }
          }
        });
      }
    }catch(_){ }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})();
