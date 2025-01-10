browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    if (tab.url === 'https://zenn.dev/' ||
        tab.url.startsWith('https://zenn.dev/search') ||
        tab.url.startsWith('https://zenn.dev/topics')) {
      browser.tabs.sendMessage(tabId, {
        command: 'red',
      });
    } else {
      browser.tabs.sendMessage(tabId, {
        command: 'blue',
      });
    }
  }
});
