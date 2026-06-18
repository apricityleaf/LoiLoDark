const ICONS = {
  on: {
    16: "icons/icon16-on.png",
    48: "icons/icon48-on.png",
    128: "icons/icon128-on.png",
  },
  off: {
    16: "icons/icon16.png",
    48: "icons/icon48.png",
    128: "icons/icon128.png",
  },
};

async function getEnabled() {
  const { darkModeEnabled } = await chrome.storage.local.get(["darkModeEnabled"]);
  return !!darkModeEnabled;
}

async function setEnabled(enabled, tabId) {
  await chrome.storage.local.set({ darkModeEnabled: enabled });
  await updateIconAndBadge(enabled);
  if (tabId) {
    chrome.tabs
      .sendMessage(tabId, { type: "DARK_MODE_STATE", enabled })
      .catch(() => {
        /* ignore */
      });
  }
}

async function updateIconAndBadge(enabled) {
  try {
    await chrome.action.setIcon({ path: enabled ? ICONS.on : ICONS.off });
  } catch (e) {
    // only badge
  }
  await chrome.action.setBadgeText({ text: enabled ? "ON" : "" });
  await chrome.action.setBadgeBackgroundColor({ color: "#3d9bff" });
  await chrome.action.setTitle({
    title: enabled ? "ダークモード: ON（クリックでOFF）" : "ダークモード: OFF（クリックでON）",
  });
}

chrome.action.onClicked.addListener(async (tab) => {
  const current = await getEnabled();
  const next = !current;
  await setEnabled(next, tab.id);
});

chrome.runtime.onInstalled.addListener(async () => {
  const enabled = await getEnabled();
  await updateIconAndBadge(enabled);
});

chrome.runtime.onStartup.addListener(async () => {
  const enabled = await getEnabled();
  await updateIconAndBadge(enabled);
});
