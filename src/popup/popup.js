const storageKey = "muteZennUserIds";

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("addUserIdButton")
    .addEventListener("click", addUserId);
  updateUserIdList();
});

function addUserId() {
  const userIdInput = document.getElementById("userIdInput");
  const userId = userIdInput.value.trim();
  if (userId) {
    browser.storage.local.get(storageKey, (result) => {
      const muteUserIds = result[storageKey] || [];
      muteUserIds.sort();
      if (!muteUserIds.includes(userId)) {
        muteUserIds.push(userId);
        browser.storage.local.set({ [storageKey]: muteUserIds }, () => {
          updateUserIdList();
          userIdInput.value = "";
        });
      }
    });
  }
}

function removeUserId(userId) {
  browser.storage.local.get(storageKey, (result) => {
    let muteUserIds = result[storageKey] || [];
    muteUserIds = muteUserIds.filter((id) => id !== userId);
    browser.storage.local.set({ [storageKey]: muteUserIds }, () => {
      updateUserIdList();
    });
  });
}

function updateUserIdList() {
  browser.storage.local.get(storageKey, (result) => {
    const muteUserIds = result[storageKey] || [];
    muteUserIds.sort();
    const userIdList = document.getElementById("userIdList");
    userIdList.innerHTML = "";
    for (const userId of muteUserIds) {
      const li = document.createElement("li");
      li.className = "user-item";

      const span = document.createElement("span");
      span.className = "user-id";
      span.textContent = userId;

      const removeButton = document.createElement("button");
      removeButton.className = "remove-button";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        removeUserId(userId);
      });

      li.appendChild(span);
      li.appendChild(removeButton);
      userIdList.appendChild(li);
    }
  });
}
