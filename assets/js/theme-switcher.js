(function() {
  var themes = [
    { name: 'default', label: 'Original' },
    { name: 'ocean',   label: 'Ocean' },
    { name: 'sunset',  label: 'Sunset' },
    { name: 'forest',  label: 'Forest' },
    { name: 'aurora',  label: 'Aurora' },
    { name: 'dark',    label: 'Dark' }
  ];

  var classMap = {
    'default': 'bg-default',
    'ocean':   'bg-gradient-ocean',
    'sunset':  'bg-gradient-sunset',
    'forest':  'bg-gradient-forest',
    'aurora':  'bg-gradient-aurora',
    'dark':    'bg-dark'
  };

  function applyTheme(name) {
    var body = document.body;
    Object.values(classMap).forEach(function(c) { body.classList.remove(c); });
    body.classList.add(classMap[name] || classMap['default']);
    // remove inline background from main.css
    body.style.background = '';
    localStorage.setItem('blog-theme', name);
    // update active dot
    document.querySelectorAll('.theme-dot').forEach(function(dot) {
      dot.classList.toggle('active', dot.dataset.theme === name);
    });
  }

  function init() {
    // Build switcher HTML
    var switcher = document.createElement('div');
    switcher.className = 'theme-switcher';

    var btn = document.createElement('button');
    btn.className = 'theme-switcher-btn';
    btn.innerHTML = '🎨';
    btn.title = 'Switch Background';

    var panel = document.createElement('div');
    panel.className = 'theme-panel';
    panel.innerHTML = '<div class="theme-panel-label">Background</div>';

    themes.forEach(function(t) {
      var dot = document.createElement('div');
      dot.className = 'theme-dot theme-dot-' + t.name;
      dot.dataset.theme = t.name;
      dot.title = t.label;
      dot.addEventListener('click', function() {
        applyTheme(t.name);
      });
      panel.appendChild(dot);
    });

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      panel.classList.toggle('active');
    });

    document.addEventListener('click', function() {
      panel.classList.remove('active');
    });
    panel.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    switcher.appendChild(panel);
    switcher.appendChild(btn);
    document.body.appendChild(switcher);

    // Apply saved theme
    var saved = localStorage.getItem('blog-theme') || 'aurora';
    applyTheme(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
