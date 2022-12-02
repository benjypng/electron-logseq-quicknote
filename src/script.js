const { shell } = require('electron');

window.addEventListener('DOMContentLoaded', function () {
  const quickNote = document.getElementById('quickNote');
  const page = document.getElementById('page');
  quickNote.focus();

  quickNote.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      if (quickNote.value === '') {
        alert('Please key in something');
        return;
      } else {
        shell.openExternal(
          `logseq://x-callback-url/quickCapture?url=&title=&append=true&page=${encodeURIComponent(
            page.value === '' ? 'TODAY' : page.value
          )}&content=${encodeURIComponent(quickNote.value)}`
        );
        quickNote.value = '';
      }
    }
  });
});
