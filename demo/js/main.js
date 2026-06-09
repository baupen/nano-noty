const form = document.querySelector('#notyForm');
const closeAllButton = document.querySelector('#closeAll');

Noty.setMaxVisible(5);

form.addEventListener('submit', event => {
  event.preventDefault();

  const text = document.querySelector('#text').value.trim() || 'Hello from Noty!';
  const timeoutValue = Number(document.querySelector('#timeout').value);
  const timeout = timeoutValue > 0 ? timeoutValue : false;

  new Noty({
    text,
    timeout,
    type: document.querySelector('#type').value,
    layout: 'topRight',
    theme: 'mint',
    progressBar: Boolean(timeout)
  }).show();
});

closeAllButton.addEventListener('click', () => {
  Noty.closeAll();
});
