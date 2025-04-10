import { IContact } from './IContact';

export class Contact implements IContact {
    name: string;
    phone: string;
    email: string;

    constructor(name: string,  phone: string, email: string,) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        
    }


}