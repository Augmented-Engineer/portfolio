// Переключение темы (Dark / Light)
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.theme-toggle') || document.querySelector('.header-actions button') || document.querySelector('[data-theme-toggle]');
    const root = document.documentElement;

    // Считываем сохраненную тему или системную
    const savedTheme = localStorage.getItem('app-theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme') || 'dark';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

            root.setAttribute('data-theme', nextTheme);
            localStorage.setItem('app-theme', nextTheme);
            updateToggleIcon(nextTheme);
        });
    }

    function updateToggleIcon(theme) {
        if (!toggleBtn) return;
        if (theme === 'light') {
            toggleBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>`;
        } else {
            toggleBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>`;
        }
    }
});

// Скрытие прелоадера
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader') || document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 350);
    }
});
