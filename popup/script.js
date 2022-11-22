browser.tabs.query({active:true,currentWindow:true}).then(function(tabs){
  const { url, title } = tabs[0];
  browser.runtime.sendMessage({
    url,
    title
  });
});
