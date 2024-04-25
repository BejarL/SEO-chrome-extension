function updateFeedbackUI(analysisResults) {
    const feedbackContainer = document.getElementById('feedback');
    feedbackContainer.innerHTML = `<p>Readability Score: ${analysisResults.readability}</p>
                                   <p>Keyword Density: ${analysisResults.keywordDensity}%</p>`;
  }
  
  function simulateAnalysisResults() {
    const sampleResults = {
      readability: 75,
      keywordDensity: 2.5
    };
    updateFeedbackUI(sampleResults);
  }
  
  document.getElementById('simulate-analysis').addEventListener('click', simulateAnalysisResults);