document.getElementById('analyze-page').addEventListener('click', function() {
    chrome.tabs.executeScript({
        code: 'document.body.innerText;'
    }, function(results) {
        document.getElementById('results').textContent = 'Page text analyzed. Length: ' + results[0].length;
    });
});