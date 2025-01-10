(() => {
  if (location.hostname !== 'zenn.dev') {
    return;
  }
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function runRed() {
    document.body.style.border = '5px solid red';
  }

  function runBlue() {
    document.body.style.border = '5px solid blue';
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === 'red') {
      runRed();
    } else {
      runBlue();
    }
  });
})();
