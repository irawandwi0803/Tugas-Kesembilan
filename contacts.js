const fs = require(`fs`);
const readline = require(`readline`);

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

rl.question(`Masukkan Nama Kamu: ` ,(nama) => {
    rl.question(`Masukkan Nomor HP Kamu: ` ,(noTelp) => {
        rl.question('Masukkan Email Kamu: ' ,(email) => {
            //menyimpan data yang telah dimasukkan
            const contact = {nama, noTelp, email};
            const file = fs.readFileSync(`data/contacts.json`, `utf-8`);
            const contacts = JSON.parse(file);
            
            contacts.push(contact);
            fs.writeFileSync(`data/contacts.json`, JSON.stringify(contacts));

            console.log(`Terimakasih sudah memasukkan data!!`);
            rl.close()
        })
    })
})