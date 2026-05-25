(function () {
    'use strict';

    const SUSPEND_KEY = 's';

    const params = new URLSearchParams(location.hash.slice(1));

    const data = {
        url: params.get('url') || '',
        title: params.get('title') || 'Suspended',
        favicon: params.get('favicon') || ''
    };

    const pageTitle = document.getElementById('pageTitle');
    const restoreLink = document.getElementById('restoreLink');
    const favicon = document.getElementById('favicon');

    document.title = `💤 ${data.title}`;

    if (pageTitle) {
        pageTitle.textContent = data.title || 'Untitled';
    }

    if (favicon && data.favicon) {
        favicon.href = data.favicon;
    }

    function restore() {
        if (!data.url) return;
        location.replace(data.url);
    }

    if (restoreLink) {
        restoreLink.href = data.url || '#';

        restoreLink.addEventListener('click', function (e) {
            e.preventDefault();
            restore();
        });
    }

    document.addEventListener('keydown', function (e) {
        const key = (e.key || '').toLowerCase();

        if (
            e.key === 'Enter' ||
            e.key === ' ' ||
            (e.ctrlKey && e.altKey && key === SUSPEND_KEY)
        ) {
            e.preventDefault();
            restore();
        }
    });
})();
