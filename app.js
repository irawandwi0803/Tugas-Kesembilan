const readline = require('readline');
const validator = require('validator');
const fs = require(`fs`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

function main() {
    function getNama() {
    rl.question("Masukkan nama: ", (nama) => {
        getEmail(nama);
    });
}

function getEmail(nama) {
    rl.question('Masukkan alamat email: ', (email) => {
    if (validator.isEmail(email)) {
        console.log('Alamat email valid: ' + email);
        getNoTelp(nama, email);
    }else {
            console.log('Alamat email tidak valid. Silakan coba lagi.');
            getEmail(nama);
        }
    });
}

function getNoTelp(nama, email) {
    rl.question('Masukkan nomor telepon: ', (noTelp) => {
    if (validator.isMobilePhone(noTelp, 'id-ID')) {
    console.log('Nomor telepon valid: ' + noTelp);
    console.log(`Nama kamu adalah ${nama}, Email kamu adalah ${email}, Dan nomor handphone kamu adalah ${noTelp}`);
    simpanContact(nama,email,noTelp);
    rl.close();
    } else {
            console.log('Nomor telepon tidak valid. Silakan coba lagi.');
            getNoTelp(nama, email);
        }
    });
}

getNama()

// Menyimpan data kontak
const simpanContact = (nama, email, noTelp) =>{
    const contact = {nama, noTelp, email};
    const file = fs.readFileSync(`data/contacts.json`, `utf-8`);
    const contacts = JSON.parse(file);
            
    contacts.push(contact);
    fs.writeFileSync(`data/contacts.json`, JSON.stringify(contacts));
}
}

// Memulai app
main();