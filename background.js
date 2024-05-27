chrome.runtime.onMessage.addListener(({ type }) => {
  // Google Meet 開始時
  if (type === 'MEET_STARTED') {
    chrome.tabs.query({ url: 'https://app.metalife.co.jp/*' }, function (tabs) {
      for (const { id: tabId } of tabs) {
        chrome.scripting.executeScript({
          target: {
            tabId,
          },
          func: function () {
            window.dispatchEvent(new KeyboardEvent('keydown', {
              metaKey: true,
              key: 'j',
            }));
          },
        });
      }
    });
  }

  // Google Meet 終了時
  if (type === 'MEET_ENDED') {
    chrome.tabs.query({ url: 'https://app.metalife.co.jp/*' }, function (tabs) {
      for (const { id: tabId } of tabs) {
        chrome.scripting.executeScript({
          target: {
            tabId,
          },
          func: function () {
            window.dispatchEvent(new KeyboardEvent('keydown', {
              metaKey: true,
              key: 'i',
            }));
          },
        });
      }
    });
  }
});
