(() => {
  if (location.hostname !== "zenn.dev") {
    return;
  }
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function muteUser() {
    document.body.style.border = "5px solid red";
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "mute-user") {
      muteUser();
    }
  });
})();
