import Menu from './Menu.js';
import Order from './Order.js';
import Router from './Router.js';

navigator.serviceWorker.register("/serviceworker.js");

// Request persistance storage
// Hacky way to get a top level function to allow await/async by calling it immediately
(async function() {
    if (navigator.storage && navigator.storage.persist){
        if (!await navigator.storage.persisted() || !navigator.storage.persist) {
            const result = await navigator.storage.persist();
            console.log('the persistance request returned: ', result);
        }
    }
})();

(async function() {
    if (navigator.storage && navigator.storage.estimate){
        const q = await navigator.storage.estimate();
        console.log('Quota available: ', q.quota/1024/1024, 'MiB');
        console.log('Usage: ', q.usage/1024, 'KiB');
    }
})();

window.addEventListener("DOMContentLoaded", () => {
    Router.init();
    Menu.load();
    Order.render();
});
