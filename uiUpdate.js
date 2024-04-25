async function updateContentAnalysis() {
    try {
      const response = await fetch('https://api.mycontentanalysis.com/data');
      const data = await response.json();
      document.getElementById('analysis-result').textContent = `Analysis Score: ${data.score}`;
    } catch (error) {
      console.error('Failed to fetch content analysis:', error);
      document.getElementById('analysis-result').textContent = 'Failed to load data.';
    }
  }
  
  document.getElementById('refresh-analysis').addEventListener('click', () => {
    document.getElementById('analysis-result').textContent = 'Loading...';
    updateContentAnalysis();
  });