chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ notificationPreference: 'enabled', theme: 'dark' });
});

document.getElementById('save-settings').addEventListener('click', () => {
    const notificationPref = document.getElementById('notifications').checked;
    const selectedTheme = document.querySelector('input[name="theme"]:checked').value;
    chrome.storage.sync.set({ notificationPreference: notificationPref ? 'enabled' : 'disabled', theme: selectedTheme }, () => {
        console.log('Settings saved:', { notificationPreference: notificationPref, theme: selectedTheme });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['notificationPreference', 'theme'], settings => {
        document.getElementById('notifications').checked = settings.notificationPreference === 'enabled';
        document.querySelector(`input[name="theme"][value="${settings.theme}"]`).checked = true;
    });
});