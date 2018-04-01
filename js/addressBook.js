const addressBook = [{
  name: 'Recurse Random',
  email: ['random.r@gamail.com'],
  phone: ['08034328849'],
  image: 'img/random.jpg'
},
{
  name: 'Bayes Brown',
  email: ['brownian.b@gamail.com'],
  phone: ['08034328849'],
  image: 'img/random.jpg'
},
{
  name: 'Chaos Chance',
  email: ['chance.c@gamail.com'],
  phone: ['08034328849'],
  image: 'img/random.jpg'
},
{
  name: 'Destroy Distribution',
  email: ['distribution.d@gamail.com'],
  phone: ['08034328849'],
  image: 'img/random.jpg'
},
{
  name: 'Evolution Entropy',
  email: ['entropy.e@gamail.com'],
  phone: ['08034328849'],
  image: 'img/random.jpg'
},
{
  name: 'Fractal Fibonacci',
  email: ['fibonacci.f@gamail.com'],
  phone: ['08034328849'],
  image: 'img/random.jpg'
},
];

// non DOM variables
let url = '';
let index = null;

// DOM Element variable names
const form = document.forms[0];
const addEmailButton = document.getElementById('addEmail');
const addPhoneButton = document.getElementById('addPhone');
const table = document.querySelector('table');
const singleView = document.querySelectorAll('.singleView');
const allView = document.querySelectorAll('.allView');
const profilePic = document.getElementById('profilePic');

// table section main view
// show all contacts
function listContacts() {
  index = null;
  let result = '';
  addressBook.forEach((contact) => {
    const row = `<tr>
<td><button>${contact.name}</button></td>
<td><button class="btn-floating btn-large cyan"><i class="material-icons">delete</i></button></td>
</tr>`;
    result += row;
  });
  table.innerHTML = result;
  const closeButtons = table.querySelectorAll('td:last-child>button');
  closeButtons.forEach((button) => {
    button.onclick = deleteContact;
  });
  const editButtons = table.querySelectorAll('td:first-child>button');
  editButtons.forEach((button) => {
    button.onclick = viewContact;
  });
}


function deleteContact() {
  const row = this.closest('tr').cells[0].innerHTML;
  addressBook.splice(row, 1);
  listContacts();
}

// form section

// view contact no editing
function viewContact() {
  toggleView();

  index = index || this.closest('tr').rowIndex;
  const contact = addressBook[index];

  form.contactName.value = contact.name;
  form.contactEmail.value = contact.email[0];
  form.contactPhone.value = contact.phone[0];
  profilePic.src = contact.image;
  for (let n = 1; n < contact.email.length; n += 1) {
    addEmailButton.insertAdjacentHTML('beforebegin', `<div class="row input-field"><input class="col s11" type="email" required name="contactEmail" value="${contact.email[n]}">${removeFieldButton}</div>`);
  }
  for (let n = 1; n < contact.phone.length; n += 1) {
    addPhoneButton.insertAdjacentHTML('beforebegin', `<div class="row input-field"><input class="col s11" type="tel" required name="contactPhone"  value="${contact.phone[n]}">${removeFieldButton}</div>`);
  }
}

// form buttons
// remove field handler

const removeFieldButton = '<button onclick="removeField(event)" class="waves-effect waves-light btn col s1" type="button"><i class="material-icons">close</i></button>';

function removeField(event) {
  event.target.closest('div').remove();
}

// add field handlers

function addEmail(event) {
  this.insertAdjacentHTML('beforebegin', `<div class="row input-field"><input class="col s11" type="email" name="contactEmail" required placeholder="email">${removeFieldButton}</div>`);
  event.preventDefault();
}

function addPhone(event) {
  this.insertAdjacentHTML('beforebegin', `<div class="row input-field"><input class="col s11" type="tel" name="contactPhone" required placeholder="phone">${removeFieldButton}</div>`);
  event.preventDefault();
}


addEmailButton.onclick = addEmail;
addPhoneButton.onclick = addPhone;

// end add field handler

// form submit handler
function submitForm(event) {
  event.preventDefault();

  const contact = addressBook[index] || {
    email: [],
    phone: [],
    image: ''
  };
  contact.name = form.contactName.value;

  function pageToStore(source, dest) {
    if (form[source] instanceof Array) {
      form[source].forEach((entry, pos) => {
        contact[dest][pos] = entry.value;
      });
      contact[dest].splice(form[source].length - 1);
    } else {
      contact[dest][0] = form[source].value;
    }
  }
  pageToStore('contactEmail', 'email');
  pageToStore('contactPhone', 'phone');

  contact.image = url || contact.image;
  if (!index) {
    addressBook.push(contact);
    index = addressBook.length - 1;
  }
  url = '';
  toggleEdit();
}
// end form submit handler

// create reference to image in local filesystem
function loadFile(event) {
  url = URL.createObjectURL(event.target.files[0]);
  profilePic.src = url;
}


// end of form


// navigation controls


function newContact() {
  toggleView();
  toggleEdit();
}

function resetForm() {
  const elems = document.querySelectorAll('fieldset>input:not(:first-of-type)');
  elems.forEach(elem => elem.remove());
  form.reset();
  profilePic.setAttribute('src', 'img/profile-pic.svg');
}

function backToMain() {
  index = null;
  toggleView();
  listContacts();
  resetForm();
}

function backToMain2() {
  toggleEdit();
  backToMain();
}

// view helpers

// toggle view between all contacts and single contact
function toggleView() {
  allView.forEach(elem => elem.classList.toggle('hide'));
  singleView.forEach(elem => elem.classList.toggle('hide'));
}
// toggle view between view and edit
function toggleEdit() {
  document.querySelectorAll('fieldset').forEach((entry) => {
    if (entry.disabled) {
      entry.removeAttribute('disabled');
    } else {
      entry.setAttribute('disabled', 'disabled');
    }
  });
  document.querySelectorAll('.view').forEach(entry => entry.classList.toggle('hide'));
  document.querySelectorAll('.edit').forEach(entry => entry.classList.toggle('hide'));
}

document.addEventListener('DOMContentLoaded', listContacts);