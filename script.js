document.addEventListener('DOMContentLoaded', () => {
    const navCards = document.querySelectorAll('.nav-card');
    const sections = document.querySelectorAll('.content-section');

    function setActiveSection(targetId) {
        // Update Nav Cards
        navCards.forEach(card => {
            if (card.dataset.target === targetId) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Update Sections
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    // Event Listeners
    navCards.forEach(card => {
        card.addEventListener('click', () => {
            const target = card.dataset.target;
            setActiveSection(target);
        });
    });

    // Optional: Handle hash in URL for direct linking (if reloading)
    // const hash = window.location.hash.substring(1);
    // if (hash) setActiveSection(hash);
});
