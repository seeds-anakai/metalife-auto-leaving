(() => {
  // Google Meet 開始時
  window.addEventListener('pageshow', () => {
    if (window.location.pathname === '/') {
      return;
    }

    if (window.location.pathname === '/landing') {
      return;
    }

    chrome.runtime.sendMessage({
      type: 'MEET_STARTED',
    });
  });

  // Google Meet 終了時
  window.addEventListener('pagehide', () => {
    if (window.location.pathname === '/') {
      return;
    }

    chrome.runtime.sendMessage({
      type: 'MEET_ENDED',
    });
  });
})();
