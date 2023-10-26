const fs = require(`fs`);
const validator = require(`validator`);

// cek dan membuat folder jika tidak ada
const dirPath = `./data`;
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
};

// cek dan membuat file data kontak jika tidak ada
const dataPath = `data/contacts.json`;
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, `[]`, `utf-8`)
};

// load kontak
const loadContact = (nama, noTelp, email) => {
    const file = fs.readFileSync(dataPath, `utf-8`);
    const contacts = JSON.parse(file);
    return contacts;
}

// save kontak
const saveContact = (nama, noTelp, email) => {
    const contact = {nama, noTelp, email};
    const contacts = loadContact();

    // cek duplikat nama
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(`Nama sudah terdaftar, silahkan masukan nama lain!!!`)
        return false;
    }
    
    // cek nomor handphone
    if(noTelp) {
        if(!validator.isMobilePhone(noTelp, `id-ID`)) {
            console.log(`Nomor handphone tidak valid!!!`)
            return false;
        }
    }
    // cek email
    if(email) {
        if(!validator.isEmail(email)) {
            console.log(`Alamat email tidak valid!!!`)
            return false;
        }
    }

    contacts.push(contact);
    fs.writeFileSync(dataPath, JSON.stringify(contacts));

    console.log(`Data berhasil disimpan`)
};

// function list kontak
const listContact = () => {
    const contacts = loadContact();
    console.log(`Daftar Kontak :`)
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noTelp}`);
    });
}

// function detail kontak
const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama === nama);
    if(!contact) {
        console.log(`nama ${nama} tidak terdaftar!!!`)
        return false;
    }

    console.log(`Nama:`, contact.nama);
    console.log(`No Telp:`, contact.noTelp);
    if(contact.email){
        console.log(`Email:`, contact.email);
    }
    
}

// function delete kontak
const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(
        (contact) => contact.nama !== nama
    );

    if(contacts.length === newContacts.length) {
        console.log(`nama ${nama} tidak ditemukan!!!`)
        return false;
    }

    fs.writeFileSync(dataPath, JSON.stringify(newContacts));

    console.log(`Data kontak ${nama} berhasil dihapus`)
}

module.exports = { saveContact, listContact, detailContact, deleteContact }