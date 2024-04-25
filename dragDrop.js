document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('drop-area');
  
    dropArea.addEventListener('dragover', (event) => {
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    });
  
    dropArea.addEventListener('drop', (event) => {
      event.stopPropagation();
      event.preventDefault();
      const fileList = event.dataTransfer.files;
      processFiles(fileList);
    });
  });
  
  function processFiles(files) {
    for (let i = 0; i < files.length; i++) {
      console.log('Processing file:', files[i].name);
      // Implement file processing logic here
    }
  }