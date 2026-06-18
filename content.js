(function () {
  const STYLE_ID = "ext-dark-mode-stylesheet";

  function injectStylesheetIfNeeded() {
    if (document.getElementById(STYLE_ID)) return;
    const link = document.createElement("link");
    link.id = STYLE_ID;
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL("dark-mode.css");
    (document.head || document.documentElement).appendChild(link);
  }

  function applyState(isOn) {
    injectStylesheetIfNeeded();
    if (isOn) {
      document.documentElement.setAttribute("data-ext-dark-mode", "on");
    } else {
      document.documentElement.removeAttribute("data-ext-dark-mode");
    }
  }

  chrome.storage.local.get(["darkModeEnabled"], (result) => {
    applyState(!!result.darkModeEnabled);
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message && message.type === "DARK_MODE_STATE") {
      applyState(!!message.enabled);
    }
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && "darkModeEnabled" in changes) {
      applyState(!!changes.darkModeEnabled.newValue);
    }
  });
})();
