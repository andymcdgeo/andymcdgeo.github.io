if (typeof document !== 'undefined') {
  const THEME_KEY = 'site-theme';
  const root = document.documentElement;

  function getButton() {
    return document.getElementById('theme-toggle');
  }

  function updateButton(theme) {
    const btn = getButton();
    if (!btn) return;
    const isDark = theme === 'dark';
    btn.setAttribute('aria-pressed', String(isDark));
    btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    btn.innerHTML = isDark
      ? '<span class="inline-block w-5 h-5 bg-yellow-400 rounded-full"></span>'
      : '<span class="inline-block w-5 h-5 bg-[#c9a24d] rounded-full"></span>';
  }

  function applyTheme(theme) {
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    updateButton(theme);
  }

  function getInitialTheme() {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored) return stored;
    } catch (e) {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setup() {
    // Initialize theme from stored preference or system preference
    applyTheme(getInitialTheme());

    // Toggle on click
    const btn = getButton();
    if (btn) {
      btn.addEventListener('click', () => {
        const current = root.classList.contains('dark') ? 'dark' : 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    }

    // Listen to system preference changes if user hasn't explicitly set a preference
    try {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener?.('change', (e) => {
        try {
          if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches ? 'dark' : 'light');
        } catch (e) {}
      });
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
}
