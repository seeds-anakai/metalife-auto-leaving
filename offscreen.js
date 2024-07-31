setInterval(() => {
  chrome.runtime.sendMessage({
    type: 'KEEP_ALIVE',
  });
}, 25000);
