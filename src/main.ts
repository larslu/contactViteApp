import { Contact } from "./Contact";
import { ContactManager } from "./ContactManager";  //importerar ContactManager klassen

const contactManager = new ContactManager(); //Skapar en instans av ContactManager

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form')! as HTMLFormElement;
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Förhindrar att formuläret skickas traditionellt
        addContact();
    });
});


function addContact(): void {
    const nameInput = document.getElementById('name') as HTMLInputElement; //Det här är själva elementen
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;

    const name = nameInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;

    if (name && phone && email) {
        const newContact = new Contact(name, phone, email)
        contactManager.addContact(newContact); //Skickar in newContact till addContact metoden i ContactManager
        nameInput.value = ''; //rensar input fälten
        phoneInput.value = '';
        emailInput.value = '';
        renderContacts();

    }


}

function renderContacts(): void {
    console.log(contactManager); // Ska visa ContactManager-instansen
    const contacts = contactManager.getContacts(); //Hämtar arrayen med kontakter från ContactManager
    console.log("Dett är så här många kontakter i " + contacts.length);
    const contactList = document.getElementById('contact-list') as HTMLUListElement;//Hämtar listan från html

    if (contactList) {
        contactList.innerHTML = ''; // Rensar listan
        contacts.forEach((contact) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${contact.name}</strong><br>
            phone: ${contact.phone}<br>
            email: ${contact.email}<br>`;

            const deleteSpan = document.createElement('span');
            deleteSpan.textContent = 'Delete';
            deleteSpan.className = 'delete-button';
            

            //Här tar vi bort med email istället. 
            deleteSpan.addEventListener('click', () => deleteContact(contact.email));
            li.appendChild(deleteSpan);

            contactList.appendChild(li);
        });
    }
}


function deleteContact(email: string): void {
   console.log("Tar bort kontakt med email:", email); // 🔍 Testlogg
    contactManager.deleteContact(email);
    renderContacts();
}

renderContacts();
