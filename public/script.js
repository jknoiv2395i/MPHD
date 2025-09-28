(function(){
  function isEditMode(){
    try {
      const params = new URLSearchParams(window.location.search || '');

      // Query param checks (common editor flags)
      if (params.has('edit') || params.get('edit') === '1') return true;
      const editorFlags = ['builder', 'builder.edit', 'editor', 'editMode', '_edit'];
      for (const f of editorFlags) if (params.has(f)) return true;

      // Check hash and pathname for editor hints
      if (window.location.hash && /builder|editor/.test(window.location.hash)) return true;
      if (window.location.pathname && /builder|editor/.test(window.location.pathname)) return true;

      // Session storage toggle (manual/legacy)
      if (sessionStorage.getItem('edit-mode') === '1') return true;

      // Global flags that some editors/platforms expose
      try {
        if (window.__BUILDER__ || window.builder || window.Builder) return true;
      } catch (e) {}

      // If loaded inside an editor iframe, try to infer from referrer or parent location
      if (window.self !== window.top) {
        // Prefer attempting to read parent location when same-origin
        try {
          const parentHref = window.parent.location && window.parent.location.href;
          if (parentHref && /builder|editor|localhos?t|localhost:\d+/.test(parentHref)) return true;
        } catch (e) {
          // cross-origin access to parent may fail; fall back to other heuristics
        }
        if (document.referrer && /builder\.io|builder|editor/.test(document.referrer)) return true;

        // Sometimes editor sets window.name or frame attributes
        try {
          if (window.name && /builder|editor/.test(window.name)) return true;
          const frame = window.frameElement;
          if (frame && frame.getAttribute) {
            const attrs = (frame.getAttribute('id') || '') + ' ' + (frame.getAttribute('class') || '') + ' ' + (frame.getAttribute('data-testid') || '') + ' ' + (frame.getAttribute('data-builder') || '');
            if (/builder|editor/.test(attrs)) return true;
          }
        } catch (e) {}
      }

      return false;
    } catch (_) { return false; }
  }

  function getHostDocument(){
    try {
      if (window.parent && window.parent !== window && window.parent.document) {
        // same-origin only; will throw if not
        void window.parent.document.body; // access to trigger potential security error
        return window.parent.document;
      }
    } catch (_) {}
    return document;
  }

  function injectStyles(){
    const hostDoc = getHostDocument();
    if (hostDoc.getElementById('visual-change-styles')) return;
    const css = `
      .visual-change-toolbar{position:fixed !important;top:96px !important;right:16px !important;z-index:2147483647 !important;pointer-events:auto !important;display:block !important;visibility:visible !important;opacity:1 !important}
      .visual-change-button{display:inline-flex !important;align-items:center !important;justify-content:center !important;padding:9px 16px !important;background:#fff !important;color:#111827 !important;border-radius:9999px !important;border:1px solid rgba(0,0,0,0.08) !important;font-family:'Inter',sans-serif !important;font-size:14px !important;font-weight:500 !important;cursor:pointer !important;box-shadow:0 4px 12px rgba(0,0,0,0.06) !important;transition:transform .2s ease, box-shadow .2s ease !important;min-width:120px !important;white-space:nowrap !important}
      .visual-change-button:hover{transform:translateY(-1px) !important;box-shadow:0 6px 16px rgba(0,0,0,0.08) !important}
      body.visual-change-on :where(h1,h2,h3,h4,h5,h6,p,a,section,div,article,figure,img,button){outline:1px dashed rgba(7,24,57,.6) !important;outline-offset:2px !important;cursor:crosshair !important}
    `;
    const style = hostDoc.createElement('style');
    style.id = 'visual-change-styles';
    style.textContent = css;
    hostDoc.head.appendChild(style);
  }

  function createToolbar(){
    const hostDoc = getHostDocument();

    // Remove existing toolbar if present
    const existing = hostDoc.getElementById('visual-change-toolbar');
    if (existing) {
      existing.remove();
    }

    const toolbar = hostDoc.createElement('div');
    toolbar.className = 'visual-change-toolbar';
    toolbar.id = 'visual-change-toolbar';

    // Force visibility with inline styles as backup
    toolbar.style.cssText = 'position: fixed !important; top: 96px !important; right: 16px !important; z-index: 2147483647 !important; pointer-events: auto !important; display: block !important; visibility: visible !important; opacity: 1 !important;';

    const btn = hostDoc.createElement('button');
    btn.type = 'button';
    btn.className = 'visual-change-button';
    btn.setAttribute('aria-label', 'Visual changes');
    btn.textContent = 'Visual changes';

    // Force button visibility with inline styles as backup
    btn.style.cssText = 'display: inline-flex !important; align-items: center !important; justify-content: center !important; padding: 9px 16px !important; background: #fff !important; color: #111827 !important; border-radius: 9999px !important; border: 1px solid rgba(0,0,0,0.08) !important; font-family: Inter, sans-serif !important; font-size: 14px !important; font-weight: 500 !important; cursor: pointer !important; box-shadow: 0 4px 12px rgba(0,0,0,0.06) !important; min-width: 120px !important; white-space: nowrap !important;';

    btn.addEventListener('click', () => {
      document.body.classList.toggle('visual-change-on');
      const on = document.body.classList.contains('visual-change-on');
      sessionStorage.setItem('visual-change-active', on ? '1' : '0');
    });

    toolbar.appendChild(btn);

    try {
      hostDoc.body.appendChild(toolbar);
      console.log('Visual changes toolbar created successfully');
    } catch (e) {
      try {
        document.body.appendChild(toolbar);
        console.log('Visual changes toolbar created successfully (fallback)');
      } catch (e2) {
        console.error('Failed to create visual changes toolbar:', e2);
      }
    }
  }

  function ensureToolbarVisible(){
    try { createToolbar(); } catch (_) {}
    try {
      const hostDoc = getHostDocument();
      const el = hostDoc.getElementById('visual-change-toolbar');
      if (el) {
        el.style.display = 'block';
        el.style.pointerEvents = 'auto';
      }
    } catch (_) {}
  }

  // Create toolbar immediately if DOM is ready
  function initializeToolbar() {
    const wasActive = sessionStorage.getItem('visual-change-active') === '1';

    injectStyles();
    createToolbar();

    if (wasActive || isEditMode()) {
      document.body.classList.add('visual-change-on');
      sessionStorage.setItem('visual-change-active', '1');
    }

    window.addEventListener('keydown', (e) => {
      if ((e.key === 'e' || e.key === 'E') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        document.body.classList.toggle('visual-change-on');
        const on = document.body.classList.contains('visual-change-on');
        sessionStorage.setItem('visual-change-active', on ? '1' : '0');
      }
    });

    // Guard against environments that remove dynamically inserted nodes
    let checks = 0;
    const interval = setInterval(() => {
      checks++;
      ensureToolbarVisible();
      if (getHostDocument().getElementById('visual-change-toolbar') || checks > 20) {
        clearInterval(interval);
      }
    }, 500);

    // Persistent watcher to re-add toolbar if removed or hidden
    try {
      const hostDoc = getHostDocument();
      const observer = new MutationObserver(() => {
        const el = hostDoc.getElementById('visual-change-toolbar');
        if (!el) {
          createToolbar();
        } else if (getComputedStyle(el).display === 'none') {
          el.style.display = 'block';
        }
      });
      observer.observe(hostDoc.body || document.body, { childList: true, subtree: true });
    } catch (_) {}
  }

  // Initialize immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeToolbar);
  } else {
    initializeToolbar();
  }

  // Also try to initialize after a short delay as backup
  setTimeout(initializeToolbar, 100);
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
