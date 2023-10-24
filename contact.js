const fs = require(`fs`);
const validator = require(`validator`);

// cek folder
const dirPath = `./data`;
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
};

// cek file data kontak
const dataPath = `data/contacts.json`;
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, `[]`, `utf-8`)
};

// save kontak
const saveContact = (nama, noTelp, email) => {
    const contact = {nama, noTelp, email};
    const file = fs.readFileSync(dataPath, `utf-8`);
    const contacts = JSON.parse(file);
    
    // cek nomor handphone
    if(noTelp) {
        if(!validator.isMobilePhone(noTelp, `id-ID`)) {
            console.log(`Nomor handphone tidak valid`)
            return false;
        }
    }
    // cek email
    if(email) {
        if(!validator.isEmail(email)) {
            console.log(`Alamat email tidak valid`)
            return false;
        }
    }

    contacts.push(contact);
    fs.writeFileSync(dataPath, JSON.stringify(contacts));

    console.log(`Data berhasil disimpan`)
};

module.exports = { saveContact }
