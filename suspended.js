(function () {
    'use strict';

    function parseHash() {
        const raw = location.hash.startsWith('#') ? location.hash.slice(1) : location.hash;
        const params = new URLSearchParams(raw);

        return {
            url: params.get('url') || '',
            title: params.get('title') || 'Suspended',
            favicon: params.get('favicon') || '',
            image: params.get('image') || ''
        };
    }

    function restore(url) {
        if (!url) return;
        location.replace(url);
    }

    const data = parseHash();

    const pageTitle = document.getElementById('pageTitle');
    const restoreLink = document.getElementById('restoreLink');
    const favicon = document.getElementById('favicon');
    const preview = document.getElementById('screenshotPreview');

    document.title = data.title || 'Suspended';

    if (pageTitle) {
        pageTitle.textContent = data.title || 'Untitled';
    }

    if (restoreLink) {
        restoreLink.href = data.url || '#';
        restoreLink.addEventListener('click', function (e) {
            e.preventDefault();
            restore(data.url);
        });
    }

    if (favicon && data.favicon) {
        favicon.href = data.favicon;
    }

    if (preview && data.image) {
        preview.style.backgroundImage = `url("${data.image}")`;
    } else if (preview) {
        preview.style.display = 'none';
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            restore(data.url);
        }
    });
})();