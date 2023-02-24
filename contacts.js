const fs = require("fs").promises;
const path = require("path");
require("colors");
const generateUniqueId = require("generate-unique-id");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contactsBuffer = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsBuffer.toString());
    return contacts;
  } catch (error) {
    return error.message;
  }
}

async function getContactById(contactId) {
  try {
    const contactsBuffer = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsBuffer.toString());

    const index = contacts.findIndex(
      (contact) => contact.id === contactId.toString()
    );

    if (index === -1) throw new Error("Such contact was not found".red);

    const searchContact = contacts[index];

    return searchContact;
  } catch (error) {
    return error.message;
  }
}

async function removeContact(contactId) {
  try {
    const contactsBuffer = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsBuffer.toString());

    const index = contacts.findIndex(
      (contact) => contact.id === contactId.toString()
    );

    if (index === -1) throw new Error("Such contact was not found".red);

    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId.toString()
    );

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    console.log(
      `Contact with the id ${contactId} was successfully deleted!`.green
    );
  } catch (error) {
    return error.message;
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsBuffer = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsBuffer.toString());

    const index = contacts.findIndex(
      (contact) => contact.name === name.toString()
    );

    if (index !== -1 || index === 0) {
      throw new Error(
        "Such contact is already present in your's contacts list!".red
      );
    }

    const newContacts = [
      ...contacts,
      { id: generateUniqueId(), name, email, phone },
    ];

    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(
      `${name} was successfully added to your's contacts list!`.green
    );
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
