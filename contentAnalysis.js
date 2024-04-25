document.addEventListener('DOMContentLoaded', () => {
    const analyzeButton = document.getElementById('analyze-content');
    analyzeButton.addEventListener('click', performContentAnalysis);
  });
  
  function performContentAnalysis() {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: fetchPageContent
      }, (results) => {
        const content = results[0].result;
        analyzeText(content);
      });
    });
  }
  
  function fetchPageContent() {
    return document.body.innerText;
  }
  
  function analyzeText(text) {
    console.log('Analyzing text:', text.length);
    // Placeholder for text analysis logic
    // Could involve sending the text to an external API or running local checks
  }