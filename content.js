/*
 * LoiLoDark - Unofficial dark mode extension for LoiLoNote School
 * Copyright (C) 2026 ApricityLeaf
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */
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
