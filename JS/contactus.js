document.addEventListener('DOMContentLoaded', function() {
    const menuTrigger = document.getElementById('menuTrigger');
    const mobileMenu = document.getElementById('mobileMenu');

    menuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
        menuTrigger.classList.toggle('active');
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !menuTrigger.contains(e.target)) {
            mobileMenu.classList.remove('active');
            menuTrigger.classList.remove('active');
        }
    });

    document.querySelectorAll('.mobile-menu ul li a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuTrigger.classList.remove('active');
        });
    });
});