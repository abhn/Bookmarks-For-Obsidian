let port = browser.runtime.connectNative("obsidianbookmarks");
let markdownFilesInVault = [];

port.postMessage('query_categories');

browser.runtime.onMessage.addListener(message => {  
  if(message && message.message === 'ready') {
    browser.runtime.sendMessage({
      message: 'dropdown_data', 
      data: markdownFilesInVault
    })
  } else {
    port.postMessage(message);
  }
})

port.onMessage.addListener((response) => {
  if (browser.runtime.lastError) {
    console.log(browser.runtime.lastError.message)
  }

  if(response.message === 'all_files') {
    const allFilePaths = response.files;
    for (filePath of allFilePaths) {
      const fileName = filePath.split('/').reverse()[0].slice(0, -3)
      markdownFilesInVault.push({
        fileName,
        filePath
      })
    }


  }
});

port.onDisconnect.addListener(() => {
  if (browser.runtime.lastError) {
    console.log(browser.runtime.lastError.message)
  }
  console.log('Disconnected');
  
})
