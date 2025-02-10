// app.js
document.getElementById('loadContacts').addEventListener('click', async () => {
    try {
        if (navigator.share) {
            // Запрос контактов через Web Share API
            await navigator.share({
                title: 'Доступ к контактам',
                text: 'Разрешите доступ к вашим контактам',
            });
        } else {
            Telegram.WebApp.showAlert('Web Share API не поддерживается в этом браузере');
        }
    } catch (error) {
        console.error('Ошибка:', error);
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
