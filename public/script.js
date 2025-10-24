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
    // Visual change styles removed — toolbar disabled per user request
    return;
  }

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
