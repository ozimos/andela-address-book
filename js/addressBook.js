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

let url = '';
let index = null;
const form = document.forms[0];
const emailButton = document.getElementById('addEmail');
const phoneButton = document.getElementById('addPhone');
const table = document.querySelector('table');
const edit = document.getElementById('edit');
const list = document.getElementById('list');
const profilePic = document.getElementById('profilePic');

const removeButton = '<button onclick="removeField(event)" class="waves-effect waves-light btn col s1" type="button"><i class="material-icons">close</i></button>';

function removeField(event) {
  event.target.closest('div').remove();
}

function addEmail(event) {
  this.insertAdjacentHTML('beforebegin', `<div class="row input-field"><input class="col s11" type="email" name="contactEmail" required placeholder="email">${removeButton}</div>`);
  event.preventDefault();
}

function addPhone(event) {
  this.insertAdjacentHTML('beforebegin', `<div class="row input-field"><input class="col s11" type="tel" name="contactPhone" required placeholder="phone">${removeButton}</div>`);
  event.preventDefault();
}


emailButton.onclick = addEmail;
phoneButton.onclick = addPhone;


function listContacts() {
  index = null;
  list.classList.remove('hide');
  edit.classList.add('hide');
  let result = '';
  addressBook.forEach((contact, pos) => {
    const row = `<tr>
<td class="hide">${pos}</td>
<td><button>${contact.name}</button></td>
<td><button class="btn-floating btn-large cyan pulse"><i class="material-icons">delete</i></button></td>
</tr>`;
    result += row;
  });
  table.innerHTML = result;
  const closeButtons = table.querySelectorAll('td:last-child>button');
  closeButtons.forEach((button) => {
    button.onclick = deleteContact;
  });
  const editButtons = table.querySelectorAll('td:nth-child(2)>button');
  editButtons.forEach((button) => {
    button.onclick = viewContact;
  });
}

function loadFile(event) {
  url = URL.createObjectURL(event.target.files[0]);
  profilePic.src = url;
}

function submitForm(event) {
  event.preventDefault();

  const contact = addressBook[index] || {
    email: [],
    phone: [],
    url: ''
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
  viewContact();
  toggleEdit();
}

function toggleEdit() {
  document.querySelectorAll('fieldset').forEach((entry) => {
    if (entry.disabled) {
      entry.removeAttribute('disabled');
    } else {
      entry.setAttribute('disabled', 'disabled');
    }
  });
  document.querySelectorAll('.view').forEach(entry => entry.classList.toggle('hide'));
  document.getElementById('save').classList.toggle('hide');
}

function newContact() {
  list.classList.add('hide');
  edit.classList.remove('hide');
  toggleEdit();
}

function viewContact() {
  list.classList.add('hide');
  edit.classList.remove('hide');
  index = index || this.closest('tr').cells[0].innerHTML;
  const contact = addressBook[index];

  form.contactName.value = contact.name;
  form.contactEmail.value = contact.email[0];
  form.contactPhone.value = contact.phone[0];
  profilePic.src = contact.image;
  for (let n = 1; n < contact.email.length; n += 1) {
    emailButton.insertAdjacentHTML('beforebegin', `<div class="row input-field"><input class="col s11" type="email" required name="contactEmail" value="${contact.email[n]}">${removeButton}</div>`);
  }
  for (let n = 1; n < contact.phone.length; n += 1) {
    phoneButton.insertAdjacentHTML('beforebegin', `<div class="row input-field"><input class="col s11" type="tel" required name="contactPhone"  value="${contact.phone[n]}">${removeButton}</div>`);
  }
}

function deleteContact() {
  const row = this.closest('tr').cells[0].innerHTML;
  addressBook.splice(row, 1);
  listContacts();
}
document.addEventListener('DOMContentLoaded', listContacts);