// Навигация, Scrollspy и мобильное бургер-меню
document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('burger-toggle');
    const navMenu = document.getElementById('main-navigation');
    const menuBackdrop = document.getElementById('menu-backdrop');
    const navLinks = document.querySelectorAll('.nav a');

    // 1. Управление мобильной шторкой
    function toggleMobileMenu(forceState) {
        if (!navMenu || !burgerBtn) return;

        const isOpening = forceState !== undefined 
            ? forceState 
            : !navMenu.classList.contains('open');

        if (isOpening) {
            navMenu.classList.add('open');
            burgerBtn.classList.add('open');
            burgerBtn.setAttribute('aria-expanded', 'true');
            if (menuBackdrop) menuBackdrop.classList.add('active');
            
        } else {
            navMenu.classList.remove('open');
            burgerBtn.classList.remove('open');
            burgerBtn.setAttribute('aria-expanded', 'false');
            if (menuBackdrop) menuBackdrop.classList.remove('active');
            
        }
    }

    if (burgerBtn) {
        // Делаем поддержку и тапа, и клика
        burgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', () => {
            toggleMobileMenu(false);
        });
    }

    // Закрытие при клике по ссылке
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu(false);
        });
    });

    // 2. Scrollspy (отслеживание текущей секции)
    const sectionIds = ['top', 'about', 'advantages', 'projects', 'workflow', 'contacts'];
    const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(el => el !== null);

    const onScroll = () => {
        const scrollPos = window.scrollY + 180;

        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 60) {
            navLinks.forEach(l => l.classList.remove('active'));
            const contactLink = document.querySelector('.nav a[href="#contacts"]');
            if (contactLink) contactLink.classList.add('active');
            return;
        }

        let currentId = 'top';
        for (let i = 0; i < sections.length; i++) {
            const sec = sections[i];
            if (sec.offsetTop <= scrollPos) {
                currentId = sec.id;
            }
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
});
