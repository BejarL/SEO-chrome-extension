document.getElementById('submit-feedback').addEventListener('click', () => {
    const feedbackText = document.getElementById('user-feedback').value;
    chrome.storage.local.set({ userFeedback: feedbackText }, () => {
      console.log('User feedback submitted:', feedbackText);
    });
  });