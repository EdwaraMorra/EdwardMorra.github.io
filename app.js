// app.js
document.getElementById('loadContacts').addEventListener('click', async () => {
  interface ContactsManager {
  select: (
    properties: ContactProperty[],
    options?: ContactSelectOptions
  ) => Promise<ContactInfo[]>;
}

interface ContactInfo {
  address: Array<ContactAddress>;
  email: Array<string>;
  icon: Blob;
  name: Array<string>;
  tel: Array<string>;
};

async function selectContacts () {
  const contacts = await navigator.contacts.select(['name', 'tel'], { multiple: true });

  if (!contacts.length) {
    // нет выбранных контактов
    return;
  }

  return contacts;
}

selectContacts();
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
