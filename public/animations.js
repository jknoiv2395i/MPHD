document.addEventListener('DOMContentLoaded', function(){
  try{
    function addAnimate(el, delay){
      if(!el) return;
      el.classList.add('animate-in');
      if(typeof delay === 'number'){
        el.style.transitionDelay = delay + 's';
        el.style.animationDelay = delay + 's';
      }
      // trigger slightly after delay so CSS transitions apply
      setTimeout(()=> el.classList.add('in-view'), (delay || 0) * 1000 + 80);
    }

    // Hero intro
    const hero = document.querySelector('.hero-section');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const cta = document.querySelector('.get-started-button');
    if(hero){
      hero.classList.add('hero-animate');
      setTimeout(()=> hero.classList.add('hero-loaded'), 300);
    }
    addAnimate(heroTitle, 0);
    addAnimate(heroSubtitle, 0.12);
    addAnimate(cta, 0.24);

    // Floating logo
    const logo = document.querySelector('.brand-logo');
    if(logo) logo.classList.add('floaty');

    // Elements to animate on scroll
    const selectors = ['.property-card', '.blog-card', '.project-item', '.testimonial-card', '.service-area-card', '.feature-card', '.team-member', '.about-title'];
    const elems = Array.from(document.querySelectorAll(selectors.join(',')));
    elems.forEach((el, i) => {
      el.classList.add('animate-in');
      el.style.transitionDelay = (i * 0.06) + 's';
    });

    if(elems.length){
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      elems.forEach(el => io.observe(el));
    }

    // CTA hover polish
    if(cta){
      cta.addEventListener('mouseenter', ()=> cta.classList.add('cta-hover'));
      cta.addEventListener('mouseleave', ()=> cta.classList.remove('cta-hover'));
    }

    // Subtle parallax on hero background
    try{
      window.addEventListener('scroll', function(){
        if(!hero) return;
        const y = window.scrollY || 0;
        const offset = Math.min(60, Math.max(0, y * 0.06));
        hero.style.backgroundPosition = 'center calc(50% + ' + offset + 'px)';
      }, { passive: true });
    }catch(_){ }

  }catch(e){ console.error('animations init error', e); }
});
