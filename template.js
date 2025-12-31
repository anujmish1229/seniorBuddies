window.addEventListener('DOMContentLoaded', () => {
    fetch('nav.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load nav.html');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('nav-placeholder').innerHTML = html;

            const activeLink = document.querySelector(`[data-page="${window.activePage}"]`);
            if (activeLink) {
                activeLink.classList.add('active'); 
            }
        })
        .catch(error => {
            console.error('Error loading nav.html:', error);
        });

    if (window.pageTitle) {
        document.title = window.pageTitle;
    }
});
