// app.js
document.getElementById('loadContacts').addEventListener('click', async () => {
  async function fetchContacts() {
    if ('contacts' in navigator && 'ContactsManager' in window) {
        try {
            const contacts = await navigator.contacts.select(['name', 'tel'], { multiple: true });
            contacts.forEach(contact => {
                const name = contact.name ? contact.name.join(' ') : 'Неизвестно';
                const phone = contact.tel ? contact.tel[0] : 'Нет номера';
                console.log(`Имя: ${name}, Телефон: ${phone}`);
            });
        } catch (error) {
            console.error('Ошибка при получении контактов:', error);
        }
    } else {
        console.error('API контактов не поддерживается в этом браузере');
    }
}});



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
