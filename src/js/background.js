chrome.runtime.onMessage.addListener((request) => {
  const { action, content } = request;
  ({
    setBadgeText: chrome.browserAction.setBadgeText,
  })[action](content);
  console.log({ request });
});
