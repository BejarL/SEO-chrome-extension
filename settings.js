document.getElementById('save-settings').addEventListener('click', () => {
    const frequency = document.getElementById('update-frequency').value;
    chrome.storage.local.set({ updateFrequency: frequency }, () => {
        console.log('Settings saved:', frequency);
    });
});