const cacheData = async (key, data) => {
    const dataToStore = JSON.stringify(data);
    chrome.storage.local.set({[key]: dataToStore}, () => {
      console.log('Data cached:', key);
    });
  };
  
  const retrieveCachedData = async (key) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key, (result) => {
        if (result[key]) {
          resolve(JSON.parse(result[key]));
        } else {
          reject('No data found');
        }
      });
    });
  };
  
  document.getElementById('save-data').addEventListener('click', async () => {
    const data = { content: 'Example data' };
    await cacheData('contentKey', data);
  });
  
  document.getElementById('load-data').addEventListener('click', async () => {
    try {
      const cachedData = await retrieveCachedData('contentKey');
      console.log('Retrieved cached data:', cachedData);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  });