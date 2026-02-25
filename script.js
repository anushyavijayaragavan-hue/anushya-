document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle hamburger animation state if desired
        hamburger.classList.toggle('is-active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('is-active');
        });
    });

    // Smooth Scrolling for Safari/Older Browsers (Optional enhancement, though CSS scroll-behavior handles most)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed header height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Form Submission Placeholder
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! This is a demo form.');
            contactForm.reset();
        });
    }


    // Document Viewer Modal Logic
    const docModal = document.getElementById('doc-viewer-modal');
    const iframeContainer = document.getElementById('iframe-container');
    const closeModal = document.querySelector('.close-modal');
    const viewDocBtns = document.querySelectorAll('.view-doc-btn');

    viewDocBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const docUrl = btn.getAttribute('data-doc');

            // Clear previous iframe
            iframeContainer.innerHTML = '';

            // Create new iframe
            const iframe = document.createElement('iframe');

            // Note: Office documents need a viewer or they will just download.
            // Locally, we'll try to set the src directly.
            iframe.src = docUrl;

            iframeContainer.appendChild(iframe);
            docModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            docModal.style.display = 'none';
            iframeContainer.innerHTML = ''; // Clear source to stop loading
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === docModal) {
            docModal.style.display = 'none';
            iframeContainer.innerHTML = '';
            document.body.style.overflow = 'auto';
        }
    });
});
