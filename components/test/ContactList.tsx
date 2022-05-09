import React from "react";
import { IContact } from "./IContact";

export function ContactList() {
  const [contacts, setContacts] = React.useState<IContact[]>([]);

  const getContacts = () => {
    fetch("http://exercice-tpa/rest-api/contact/read.php")
      .then((response) => response.json())
      .then((data) => setContacts(data));
  };

  return (
    <>
      <button onClick={() => getContacts()}>Load Contacts</button>
      <ul>
        {contacts.map((contact: IContact) => (
          <li key={contact.id}>{contact.firstname}</li>
        ))}
      </ul>
    </>
  );
}
