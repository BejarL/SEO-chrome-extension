function fetchSEOAnalysis(content) {
    fetch('https://api.example.com/seo?content=' + encodeURIComponent(content), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(data => {
      console.log('SEO Analysis Data:', data);
      updateUIWithSEOData(data); // Function to handle the UI update
    })
    .catch(error => {
      console.error('Failed to fetch SEO data:', error);
    });
  }
  
  function updateUIWithSEOData(data) {
    console.log('Updating UI with SEO data:', data);
    // Additional functionality to update UI based on received data
  }