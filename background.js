// KeepAlive用のOffscreenを作成する
const setUpOffscreen = async () => {
  await chrome.offscreen.createDocument({
    url: chrome.runtime.getURL('offscreen.html'),
    reasons: [
      'BLOBS',
    ],
    justification: 'To keep service worker',
  });
};

// 拡張機能インストール時
chrome.runtime.onInstalled.addListener(() => {
  setUpOffscreen();
});

// ブラウザ起動時
chrome.runtime.onStartup.addListener(() => {
  setUpOffscreen();
});

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
