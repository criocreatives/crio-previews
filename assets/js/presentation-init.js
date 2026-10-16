/* Crio Creatives / standardized editorial presentation chrome.
   Preserves existing project-specific galleries, image viewers, copy and media. */
(() => {
  function initialize() {
    const body = document.body;
    if (!body || body.classList.contains('crio-ed')) return;
    const slug = location.pathname.split('/').filter(Boolean)[0] || 'index';
    body.classList.add('crio-ed', 'crio-ed--' + slug);
    const originalHeader = [...document.querySelectorAll('header')].find(h => h.closest('body') === body) || document.querySelector('.page > .top');
    const anchors = originalHeader ? [...originalHeader.querySelectorAll('a[href^="#"]')] : [];
    const seen = new Set();
    const menu = anchors.map(a => {
      const href = a.getAttribute('href') || '';
      const label = (a.textContent || '').replace(/\s+/g, ' ').trim();
      if (!/^#[a-z0-9-]+$/i.test(href) || !label || label.length > 20 || ['#top','#main'].includes(href) || seen.has(href)) return null;
      if (!document.getElementById(href.slice(1))) return null;
      seen.add(href);
      return {href,label};
    }).filter(Boolean).slice(0,4);
    const bar = document.createElement('div');
    bar.className = 'crio-ed-bar';
    bar.setAttribute('role','banner');
    const inner = document.createElement('div');
    inner.className = 'crio-ed-bar-inner';
    const logo = document.createElement('a');
    logo.className = 'crio-ed-wordmark';
    logo.href = 'https://criocreatives.com/';
    logo.setAttribute('aria-label','Crio Creatives main website');
    const img = document.createElement('img');
    img.src = 'https://criocreatives.com/assets/logos/Crio%20Creatives%20Logo%20wide%20white.svg';
    img.alt = 'Crio Creatives';
    const label = document.createElement('span');
    label.className = 'crio-ed-label';
    label.textContent = 'Project presentation';
    logo.append(img,label);
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label','Presentation navigation');
    for (const item of menu) {
      const a = document.createElement('a');
      a.className = 'crio-ed-detail';
      a.href = item.href;
      a.textContent = item.label;
      nav.append(a);
    }
    const services = document.createElement('a');
    services.href = 'https://criocreatives.com/services/';
    services.textContent = 'Services';
    services.className = 'crio-ed-hide-mobile';
    const home = document.createElement('a');
    home.className = 'crio-ed-return';
    home.href = 'https://criocreatives.com/';
    home.textContent = 'Crio Creatives ↗';
    nav.append(services,home);
    inner.append(logo,nav);
    bar.append(inner);
    const rule = document.createElement('div');
    rule.className = 'crio-ed-rule';
    const left = document.createElement('span');
    left.innerHTML = '<strong>Crio /</strong> Selected project presentation';
    const right = document.createElement('span');
    right.textContent = (document.title || 'Project preview').replace(/\s*\|.*$/, '').replace(/\s+—\s+Crio Creatives.*$/,'');
    rule.append(left,right);
    body.prepend(bar,rule);
    const foot = document.createElement('footer');
    foot.className='crio-ed-footer';
    const fin = document.createElement('div');
    fin.className='crio-ed-footer-inner';
    const one = document.createElement('span');
    one.innerHTML='<b>Crio Creatives</b> / Visualization &amp; Design Studio';
    const two = document.createElement('span');
    two.textContent='Architecture · Brands · Experiences';
    const three = document.createElement('span');
    const website = document.createElement('a');
    website.href='https://criocreatives.com/';
    website.textContent='Studio ↗';
    const contact = document.createElement('a');
    contact.href='https://criocreatives.com/#contact';
    contact.textContent='Enquiries ↗';
    three.append(website,document.createTextNode('   ·   '),contact);
    fin.append(one,two,three);
    foot.append(fin);
    body.append(foot);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',initialize,{once:true});
  else initialize();
})();