// Background service worker

const SPAWN_HAMSTER_MENU_ID = 'spawn-hamster';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: SPAWN_HAMSTER_MENU_ID,
    title: 'Spawn a hamster',
    contexts: ['page'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== SPAWN_HAMSTER_MENU_ID || !tab?.id) {
    return;
  }

  chrome.tabs.sendMessage(tab.id, { type: 'spawn-hamster' }, () => {
    if (chrome.runtime.lastError) {
      // No content script in this tab (e.g. chrome://, Web Store, PDF viewer,
      // or the tab was open before the extension was last loaded/reloaded).
    }
  });
});
