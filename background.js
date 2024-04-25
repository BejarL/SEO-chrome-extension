chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension successfully installed.');
  chrome.alarms.create('refreshData', { periodInMinutes: 60 });
});

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'refreshData') {
    console.log('Refreshing data...');
    // Refresh data logic here
  }
});