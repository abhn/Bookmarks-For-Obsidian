// SO
function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];

    return x.localeCompare(y, undefined, {sensitivity: 'base'});
  });
}

window.addEventListener('DOMContentLoaded', function() {

  function addBookmarkToObsidian() {
    const category = document.querySelector('#topic-selector').value;
    const tags = document.querySelector('#tags').value;
  
    browser.tabs.query({ active:true,currentWindow:true }).then(function(tabs){
      const { url, title } = tabs[0];
      browser.runtime.sendMessage({
        category,
        url,
        title,
        tags
      });
    });  
  }

  document
  .querySelector('#submit-bookmark')
  .addEventListener('click', addBookmarkToObsidian);
  
  document.querySelector('#tags').addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
      addBookmarkToObsidian();
    }
})

  browser.runtime.onMessage.addListener(message => {
    if(message.message === 'dropdown_data') {
      const categorySelect = document.querySelector('#topic-selector');
      const files = message.data;
      sortByKey(files, 'fileName')
      for (file of files) {
        const opt = document.createElement('option');
        opt.text = file.fileName;
        opt.value = file.filePath;
        categorySelect.add(opt);
      }
    }
  })  

  browser.runtime.sendMessage({message: 'ready'});
});
