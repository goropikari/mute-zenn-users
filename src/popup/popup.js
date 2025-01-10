const storageKey = "muteZennUserIds";

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("addUserIdButton")
    .addEventListener("click", addUserId);
  document
    .getElementById("backupButton")
    .addEventListener("click", backupUserIds);
  document.getElementById("bulkImportButton").addEventListener("click", () => {
    document.getElementById("bulkImportTextarea").style.display = "block";
    document.getElementById("saveBulkImportButton").style.display = "block";
  });
  document
    .getElementById("saveBulkImportButton")
    .addEventListener("click", bulkImport);

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

function backupUserIds() {
  browser.storage.local.get(storageKey, (result) => {
    const muteUserIds = result[storageKey] || [];
    const blob = new Blob([muteUserIds.join("\n")], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mute_user_ids_backup.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}

function bulkImport() {
  const textarea = document.getElementById("bulkImportTextarea");
  const userIds = textarea.value
    .split("\n")
    .map((id) => id.trim())
    .filter((id) => id);
  if (userIds.length > 0) {
    browser.storage.local.get(storageKey, (result) => {
      const muteUserIds = result[storageKey] || [];
      browser.storage.local.set(
        { [storageKey]: Array.from(new Set(muteUserIds.concat(userIds))) },
        () => {
          updateUserIdList();
          textarea.style.display = "none";
          document.getElementById("saveBulkImportButton").style.display =
            "none";
          textarea.value = "";
        },
      );
    });
  } else {
    alert("No user IDs entered.");
  }
}
