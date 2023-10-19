const readline = require('readline');
const validator = require('validator');
const {default: isEmail} = require('validator/lib/isEmail');
const {default: isMobilePhone} = require('validator/lib/isMobilePhone');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

    rl.question("what is your name? ", (nama) => {
        rl.question("your phone number is? ", (noTelp) => {
            rl.question("your email is? ", (email) => {
            
                // validasi email
            if(email, noTelp){
                if(!validator.isEmail(email)){
                    console.log('Email Tidak Valid');
                }
                if(!validator.isMobilePhone(noTelp, 'id-ID')){
                    console.log('No Telp Tidak Valid')
                    
                }else {
                    console.log('My name is',nama + ', Your phone number ',noTelp + ', Your email is ',email);
                    rl.close()
                }
                return false;
            }
                // console.log('Data Berhasil Ditambahkan');
                // rl.close()
            });
        });
    });

