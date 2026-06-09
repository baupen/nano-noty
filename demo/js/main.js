const form = document.querySelector('#notyForm');
const createFirstCheckbox = document.querySelector('#createFirst');
const closeAllButton = document.querySelector('#closeAll');

Noty.setMaxVisible(5);

const createNoty = (first = false) => {
  const text = document.querySelector('#text').value.trim() || 'Hello from Noty!';
  const timeoutValue = Number(document.querySelector('#timeout').value);
  const timeout = timeoutValue > 0 ? timeoutValue : false;

  new Noty({
    text,
    timeout,
    first,
    type: document.querySelector('#type').value,
    layout: 'topRight',
    theme: document.querySelector('#theme').value,
    progressBar: Boolean(timeout)
  }).show();
};

form.addEventListener('submit', event => {
  event.preventDefault();
  createNoty(createFirstCheckbox.checked);
});

closeAllButton.addEventListener('click', () => {
  Noty.closeAll();
});
