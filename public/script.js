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
      .visual-change-toolbar{position:fixed !important;top:96px !important;right:16px !important;z-index:2147483647 !important;pointer-events:auto !important;display:block !important}
      .visual-change-button{display:inline-flex !important;align-items:center;justify-content:center;padding:9px 16px;background:var(--button-bg);color:var(--button-text);border-radius:9999px;border:1px solid rgba(0,0,0,0.08);font-family:'Inter',sans-serif;font-size:14px;font-weight:500;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.06);transition:transform .2s ease, box-shadow .2s ease}
      .visual-change-button:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(0,0,0,0.08)}
      body.visual-change-on :where(h1,h2,h3,h4,h5,h6,p,a,section,div,article,figure,img,button){outline:1px dashed rgba(7,24,57,.6);outline-offset:2px;cursor:crosshair}
    `;
    const style = hostDoc.createElement('style');
    style.id = 'visual-change-styles';
    style.textContent = css;
    hostDoc.head.appendChild(style);
  }

  function createToolbar(){
    const hostDoc = getHostDocument();
    if (hostDoc.getElementById('visual-change-toolbar')) return;
    const toolbar = hostDoc.createElement('div');
    toolbar.className = 'visual-change-toolbar';
    toolbar.id = 'visual-change-toolbar';

    const btn = hostDoc.createElement('button');
    btn.type = 'button';
    btn.className = 'visual-change-button';
    btn.setAttribute('aria-label', 'Visual changes');
    btn.textContent = 'Visual changes';

    btn.addEventListener('click', () => {
      document.body.classList.toggle('visual-change-on');
      const on = document.body.classList.contains('visual-change-on');
      sessionStorage.setItem('visual-change-active', on ? '1' : '0');
    });

    toolbar.appendChild(btn);
    try {
      hostDoc.body.appendChild(toolbar);
    } catch (_) {
      document.body.appendChild(toolbar);
    }
  }

  function ensureToolbarVisible(){
    // Re-create if removed by host environment
    try { createToolbar(); } catch (_) {}
  }

  document.addEventListener('DOMContentLoaded', () => {
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
    }, 1500);
  });
})();
