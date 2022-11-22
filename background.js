let port = browser.runtime.connectNative("obsidianbookmarks");

browser.runtime.onMessage.addListener(tab => {
  console.log(port);
  
  port.postMessage(tab);
})

port.onMessage.addListener((response) => {
  if (browser.runtime.lastError) {
    console.log(browser.runtime.lastError.message)
  }
  console.log(response);
});

port.onDisconnect.addListener(() => {
  if (browser.runtime.lastError) {
    console.log(browser.runtime.lastError.message)
  }
  console.log('Disconnected');
  
})
