const readline = require('readline');
const validator = require('validator');
const fs = require(`fs`);
const { resolve } = require('path');
const { rejects } = require('assert');
const nodemon = require('nodemon');

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

const inputNama = () => {
    return new Promise((resolve, reject) => {
        rl.question(`Masukkan nama anda: `, (nama) => {
            resolve(nama);
            inputNoTelp(nama);
        });
    });
};

const inputNoTelp = (nama) => {
    return new Promise((resolve, reject) => {
        rl.question(`Masukkan nomor telp anda: `, (noTelp) => {
            resolve(noTelp);
            // cek no telp
            if (validator.isMobilePhone(noTelp, `id-ID`)) {
            console.log('Nomor telepon valid: ' + noTelp);
            inputEmail(nama, noTelp)
            }else {
                console.log('Nomor telepon tidak valid. Silakan coba lagi.');
                inputNoTelp(nama);
            };
        });
    });
};

const inputEmail = (nama, noTelp) => {
    return new Promise((resolve, reject) => {
        rl.question(`Masukkan email anda: `, (email) => {
            resolve(email);
            // cek email
            if (validator.isEmail(email)) {
                console.log('Alamat email valid: ' + email);
                console.log(`Nama kamu adalah ${nama}, Nomor handphone kamu adalah ${noTelp}, Dan email kamu adalah ${email}`);
                saveContact(nama, noTelp, email);
                rl.close();
            }else {
                console.log('Alamat email tidak valid. Silakan coba lagi.');
                inputEmail(nama, noTelp);
            };
        });
    });
};

// const main = async() => {
//     const nama = await inputNama();
//     const noTelp = await inputNoTelp();
//     const email = await inputEmail();

const saveContact = (nama, noTelp, email) => {
    const contact = {nama, noTelp, email};
    const file = fs.readFileSync(`data/contacts.json`, `utf-8`);
    const contacts = JSON.parse(file);
            
    contacts.push(contact);
    fs.writeFileSync(`data/contacts.json`, JSON.stringify(contacts));

}

inputNama();