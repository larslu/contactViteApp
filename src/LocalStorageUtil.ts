import { Contact } from './Contact';
export class LocalStorageUtil {

    static saveContacts(contacts: Contact[]) {
        localStorage.setItem('contacts', JSON.stringify(contacts)); // Sparar hela contact-arrayen till localStorage
    }

    static loadContacts(): Contact[] {
        const contactsStr = localStorage.getItem('contacts');
        if (contactsStr) {
            //return JSON.parse(contactsStr);//När denna returneras kan Typescript inte veta
                                           //vad som kommer ut ur localStorage. 
            //============
            //Bättre att skriva
            const rawData = JSON.parse(contactsStr);
            return rawData.map((c: { name: string; email: string; phone: string }) =>
                new Contact(c.name, c.email, c.phone));

        } else {
            return []; // Om inga kontakter finns lagrade, returnera en tom array
        }
    }
}