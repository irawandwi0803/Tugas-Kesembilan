const readline = require('readline');
const validator = require('validator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
    console.log(`Nama kamu adalah ${nama}, Email kamu adalah ${email}, Dan nomor handphone kamu adalah ${noTelp}`)
    rl.close();
    } else {
            console.log('Nomor telepon tidak valid. Silakan coba lagi.');
            getNoTelp(nama, email);
        }
    });
}

getNama()

}
// Memulai app
main();