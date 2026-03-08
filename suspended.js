(function () {
    'use strict';

    function parseHash() {
        const raw = location.hash.startsWith('#') ? location.hash.slice(1) : location.hash;
        const params = new URLSearchParams(raw);

        return {
            url: params.get('url') || '',
            title: params.get('title') || 'Suspended',
            favicon: params.get('favicon') || ''
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
    const suspendShortcut = document.getElementById('suspendShortcut');

    document.title = `💤 ${data.title || 'Suspended'}`;

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

    if (suspendShortcut) {
        suspendShortcut.innerHTML = 'Press <kbd2>ENTER</kbd2> or <kbd2>CTRL + ALT + S</kbd2> to restore';
    }

    document.addEventListener('keydown', function (e) {
        const key = (e.key || '').toLowerCase();

        if (e.key === 'Enter') {
            e.preventDefault();
            restore(data.url);
            return;
        }

        if (e.ctrlKey && e.altKey && key === 's') {
            e.preventDefault();
            restore(data.url);
        }
    });
})();
