(function(){
  function isEditMode(){
    try {
      const params = new URLSearchParams(window.location.search || '');
      return params.has('edit') || sessionStorage.getItem('edit-mode') === '1';
    } catch (_) { return false; }
  }

  function injectStyles(){
    if (document.getElementById('visual-change-styles')) return;
    const css = `
      .visual-change-toolbar{position:fixed;top:96px;right:16px;z-index:1000;pointer-events:auto}
      .visual-change-button{display:inline-flex;align-items:center;justify-content:center;padding:9px 16px;background:var(--button-bg);color:var(--button-text);border-radius:9999px;border:1px solid rgba(0,0,0,0.08);font-family:'Inter',sans-serif;font-size:14px;font-weight:500;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.06);transition:transform .2s ease, box-shadow .2s ease}
      .visual-change-button:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(0,0,0,0.08)}
      body.visual-change-on :where(h1,h2,h3,h4,h5,h6,p,a,section,div,article,figure,img,button){outline:1px dashed rgba(7,24,57,.6);outline-offset:2px;cursor:crosshair}
    `;
    const style = document.createElement('style');
    style.id = 'visual-change-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function createToolbar(){
    const toolbar = document.createElement('div');
    toolbar.className = 'visual-change-toolbar';

    const btn = document.createElement('button');
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
    document.body.appendChild(toolbar);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const wasActive = sessionStorage.getItem('visual-change-active') === '1';
    if (!isEditMode() && !wasActive) return;

    injectStyles();
    createToolbar();

    if (wasActive) document.body.classList.add('visual-change-on');

    window.addEventListener('keydown', (e) => {
      if ((e.key === 'e' || e.key === 'E') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        document.body.classList.toggle('visual-change-on');
        const on = document.body.classList.contains('visual-change-on');
        sessionStorage.setItem('visual-change-active', on ? '1' : '0');
      }
    });
  });
})();
