const addressBook = [{
  name: 'Randall Random',
  email: ['random.a@gamail.com'],
  phone: ['08034328849'],
  image: 'img/random.jpg'
},
{
  name: 'Bertha Brownian',
  email: ['brownian.b@gamail.com'],
  phone: ['08034328849'],
  image: 'img/random.jpg'
},
{
  name: 'Chris Chance',
  email: ['chaos.c@gamail.com'],
  phone: ['08034328849'],
  image: 'img/random.jpg'
},
{
  name: 'Dorothy Disorder',
  email: ['choas.c@gamail.com'],
  phone: ['08034328849'],
  image: 'img/random.jpg'
},
{
  name: 'Edwin Entropy',
  email: ['choas.c@gamail.com'],
  phone: ['08034328849'],
  image: 'img/random.jpg'
},

];

function addEmail(event) {
  event.preventDefault();
  if (this === event.target) {
    this.insertAdjacentHTML('beforebegin', '<input type="email" name="contactEmail" placeholder="email address">');
  }
}

function addPhone(event) {
  event.preventDefault();
  if (this !== event.target) {
    return;
  }
  this.insertAdjacentHTML('beforebegin', '<input type="tel" name="contactPhone" placeholder="phone">');
}
const emailButton = document.getElementById('addEmail');
const phoneButton = document.getElementById('addPhone');
const table = document.querySelector('table');

if (emailButton) {
  emailButton.onclick = addEmail;
  phoneButton.onclick = addPhone;
}


function showContacts() {
  let result = '';
  addressBook.forEach((contact, index) => {
    const row = `<tr>
<td class="hide">${index + 1}</td>
<td><button onclick="">${contact.name}</button></td>
<td><button>X</button></td>
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
    button.onclick = editContact;
  });
}

function editContact() {
  table.classList.add('hide');
  document.querySelector('#edit').classList.remove('hide');
  const index = this.closest('tr').cells[0].innerHTML;
  const contact = addressBook[index - 1];
  const form = document.forms[0];

  form.contactName.value = contact.name;
  form.contactEmail.value = contact.email[0];
  form.contactPhone.value = contact.phone[0];

  for (let n = 1; n < contact.email.length; n += 1) {
    emailButton.insertAdjacentHTML('beforebegin', `<input type="email" name="contactEmail" value="${contact.email[n]}">`);
  }
  for (let n = 1; n < contact.phone.length; n += 1) {
    phoneButton.insertAdjacentHTML('beforebegin', `<input type="tel" name="contactPhone" value="${contact.phone[n]}">`);
  }
}

function deleteContact() {
  const index = this.closest('tr').cells[0].innerHTML;
  addressBook.splice(index - 1, 1);
  showContacts();
}
document.addEventListener('DOMContentLoaded', showContacts);