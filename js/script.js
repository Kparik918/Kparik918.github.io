/* =========================================================
   Krish Parik — portfolio interactions
   Modules: typewriter, mobile nav, scroll-spy, reveal, skills
   ========================================================= */

(function typewriter(){
  const el = document.getElementById('typedPrompt');
  if(!el) return;
  const full = 'krish@portfolio:~$ whoami';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion){ el.textContent = full; return; }
  let i = 0;
  (function tick(){
    el.textContent = full.slice(0, i);
    i++;
    if(i <= full.length){ setTimeout(tick, 45); }
  })();
})();

(function mobileNav(){
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

(function scrollSpy(){
  const links = Array.from(document.querySelectorAll('.statusbar__nav a'));
  const sections = links
    .map(l => document.getElementById(l.dataset.target))
    .filter(Boolean);
  if(!sections.length) return;

  const setActive = (id) => {
    links.forEach(l => l.classList.toggle('active', l.dataset.target === id));
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){ setActive(entry.target.id); }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
})();

(function revealOnScroll(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(i => observer.observe(i));
})();

(function renderSkills(){
  const grid = document.getElementById('skillgrid');
  if(!grid) return;

  const data = [
    { label: 'languages & scripting', items: ['Bash', 'Python (beginner)'] },
    { label: 'operating systems', items: ['RHEL', 'Fedora', 'Ubuntu', 'Windows'] },
    { label: 'linux administration', items: ['User/Group Mgmt', 'File Permissions', 'LVM', 'SELinux', 'AutoFS', 'Systemd', 'Cron', 'Shell Scripting'] },
    { label: 'containerization', items: ['Podman', 'Container Networking', 'Bare-Metal vs Containerized'] },
    { label: 'cloud (aws)', items: ['EC2', 'S3', 'IAM', 'VPC', 'RDS', 'DynamoDB', 'EBS', 'EFS', 'Shared Responsibility Model', 'Pricing & Billing'] },
    { label: 'networking fundamentals', items: ['TCP/IP', 'DNS', 'Subnetting', 'Troubleshooting'] },
    { label: 'tools & version control', items: ['Git', 'GitHub', 'VS Code'] },
    { label: 'domains', items: ['Linux SysAdmin', 'Cloud Security Fundamentals', 'IT Security Fundamentals'] },
  ];

  const frag = document.createDocumentFragment();
  data.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'skillcat';

    const h4 = document.createElement('h4');
    h4.textContent = cat.label;
    card.appendChild(h4);

    const list = document.createElement('div');
    list.className = 'taglist';
    cat.items.forEach(item => {
      const span = document.createElement('span');
      span.textContent = item;
      list.appendChild(span);
    });
    card.appendChild(list);

    frag.appendChild(card);
  });
  grid.appendChild(frag);
})();
