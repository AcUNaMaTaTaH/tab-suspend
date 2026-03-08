(function () {
    'use strict';

    function parseHash() {
        const raw = location.hash.startsWith('#') ? location.hash.slice(1) : location.hash;
        const params = new URLSearchParams(raw);

        return {
            id: params.get('id') || '',
            url: params.get('url') || '',
            title: params.get('title') || 'Suspended',
            favicon: params.get('favicon') || '',
            image: params.get('image') || ''
        };
    }

    async function loadSuspendData(id) {
        if (!id || typeof GM_getValue !== 'function') return null;
        return await GM_getValue(`suspend:${id}`, null);
    }

    async function clearSuspendData(id) {
        if (!id || typeof GM_deleteValue !== 'function') return;
        await GM_deleteValue(`suspend:${id}`);
    }

    async function restore(url, id) {
        if (!url) return;
        await clearSuspendData(id);
        location.replace(url);
    }

    async function init() {
        const data = parseHash();
        const stored = await loadSuspendData(data.id);

        const finalUrl = (stored && stored.url) || data.url || '';
        const finalTitle = (stored && stored.title) || data.title || 'Suspended';
        const finalFavicon = (stored && stored.favicon) || data.favicon || '';
        const finalImage = (stored && stored.image) || data.image || '';

        const pageTitle = document.getElementById('pageTitle');
        const restoreLink = document.getElementById('restoreLink');
        const favicon = document.getElementById('favicon');
        const preview = document.getElementById('screenshotPreview');
        const suspendShortcut = document.getElementById('suspendShortcut');

        document.title = `💤 ${finalTitle}`;

        if (pageTitle) {
            pageTitle.textContent = finalTitle || 'Untitled';
        }

        if (restoreLink) {
            restoreLink.href = finalUrl || '#';
            restoreLink.addEventListener('click', function (e) {
                e.preventDefault();
                restore(finalUrl, data.id);
            });
        }

        if (favicon && finalFavicon) {
            favicon.href = finalFavicon;
        }

        if (preview && finalImage) {
            preview.style.backgroundImage = `url("${finalImage}")`;
        } else if (preview) {
            preview.style.display = 'none';
        }

        if (suspendShortcut) {
            suspendShortcut.innerHTML = 'Or press <kbd2>ENTER</kbd2> or <kbd2>CTRL + ALT + S</kbd2>';
        }

        document.addEventListener('keydown', function (e) {
            const key = (e.key || '').toLowerCase();

            if (e.key === 'Enter') {
                e.preventDefault();
                restore(finalUrl, data.id);
                return;
            }

            if (e.ctrlKey && e.altKey && key === 's') {
                e.preventDefault();
                restore(finalUrl, data.id);
            }
        });
    }

    init();
})();
