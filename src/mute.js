const storageKey = "muteZennUserIds";
const debug = true;

(() => {
  if (location.hostname !== "zenn.dev") {
    return;
  }
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function getArticles(callback) {
    const timeout = 2000; // milliseconds
    const startTime = Date.now();
    const interval = setInterval(() => {
      const articles = document.querySelectorAll("article");
      if (articles.length > 0 || Date.now() - startTime > timeout) {
        clearInterval(interval);
        if (articles.length === 0) {
          console.log("Articles not found within 2 seconds.");
          return;
        }
        callback(articles);
      }
    }, 100); // 100msごとにチェック
  }

  function muteUser(articles) {
    // URL が書き換わるタイミング、DOM の更新タイミングの兼ね合いで mute 実行したくないときでも mute が走ってしまうことがある。実際に mute する段階で URL を再度チェックする。
    if (
      !(
        location.pathname === "/" ||
        location.pathname.startsWith("/search") ||
        location.pathname.startsWith("/topics")
      )
    ) {
      return;
    }

    if (debug) {
      document.body.style.border = "5px solid red";
    }

    browser.storage.local.get(storageKey, (result) => {
      const muteUsers = result[storageKey] || [];

      if (articles && muteUsers) {
        for (const article of articles) {
          for (const muteUser of muteUsers) {
            // Articles
            // 企業名義だと /{user_id}/articles ではなく /{company_id}/articles になるので、/articles/ と user_id をそれぞれ別で検索する
            if (
              article.innerHTML.includes("/articles/") &&
              article.innerHTML.includes(`${muteUser}`)
            ) {
              article.parentNode.remove();
              console.log(`Remove ${muteUser}'s article`);
            }

            // Books
            if (article.innerHTML.includes(`/${muteUser}/books/`)) {
              article.remove();
              console.log(`Remove ${muteUser}'s book`);
            }
          }
        }
      }
    });
  }

  if (
    location.pathname === "/" ||
    location.pathname.startsWith("/search") ||
    location.pathname.startsWith("/topics")
  ) {
    getArticles(muteUser);
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "mute-user") {
      getArticles(muteUser);
    } else {
      if (debug) {
        document.body.style.border = "5px solid blue";
      }
    }
  });
})();
