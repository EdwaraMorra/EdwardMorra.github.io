// app.js
document.getElementById('loadContacts').addEventListener('click', async () => {
const supported = ('contacts' in navigator && 'ContactsManager' in window)

interface ContactsManager {
  getProperties: () => Promise<ContactProperty[]>;
}

enum ContactProperty {
  "address" = "address",
  "email" = "email",
  "icon" = "icon",
  "name" = "name",
  "tel" = "tel",
}

async function checkPropertiesSupport(): Promise<void> {
  try {
    const supportedProperties = await navigator.contacts.getProperties();
    setContactProperties(supportedProperties);
  } catch {
    console.warn(
      "This browser doesn't support the Contact Picker API"
    );
  }
}
});



// Обработка данных контактов (пример для vCard)
function parseContacts(data) {
    const contacts = [];
    const lines = data.split('\n');
    let currentContact = {};
    
    lines.forEach(line => {
        if (line.startsWith('FN:')) {
            currentContact.name = line.replace('FN:', '').trim();
        } else if (line.startsWith('TEL;')) {
            currentContact.phone = line.split(':')[1].trim();
        } else if (line === 'END:VCARD') {
            contacts.push(currentContact);
            currentContact = {};
        }
    });
    return contacts;
}
