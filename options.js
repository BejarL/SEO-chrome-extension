document.getElementById('saveButton').addEventListener('click', () => {
    const isFeatureEnabled = document.getElementById('featureToggle').checked;
    chrome.storage.sync.set({ featureEnabled: isFeatureEnabled }, () => {
        console.log('Settings saved.');
    });
});