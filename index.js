const contactsFunctions = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsFunctions
        .listContacts()
        .then((contacts) => console.table(contacts))
        .catch((error) => console.log(error));

      break;

    case "get":
      contactsFunctions
        .getContactById(id)
        .then((contact) => console.log(contact))
        .catch((error) => console.log(error));
      break;

    case "add":
      contactsFunctions
        .addContact(name, email, phone)
        .catch((error) => console.log(error));
      break;

    case "remove":
      contactsFunctions.removeContact(id).catch((error) => console.log(error));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
