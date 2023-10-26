const Argv = require("yargs");
const yargs = require(`yargs`);
const contact = require(`./contact`);


// menambahkan data kontak
yargs.command({
    command: `add`,
    describe: `Menambahkan kontak baru`,
    builder: {
        nama: {
            describe: `Nama Lengkap`,
            demandOption: true,
            type: `string`
        },
        noTelp: {
            describe: `Nomor Handphone`,
            demandOption: true,
            type: `string`
        },
        email: {
            describe: `Email`,
            demandOption: false,
            type: `string`
        }
    },
    handler(Argv){
            contact.saveContact(Argv.nama, Argv.noTelp, Argv.email);
        }
});

// menampilkan list kontak
yargs.command({
    command: `list`,
    describe: `menampilkan list kontak`,
    handler(){
        contact.listContact();
    }
});

// menampilkan detail kontak berdasarkan nama
yargs.command({
    command: `detail`,
    describe: `menampilkan detail kontak`,
    builder: {
        nama: {
            describe: `Nama Lengkap`,
            demandOption: true,
            type: `string`,
        },
    },
    handler(Argv){
        contact.detailContact(Argv.nama);
    }
});

// menghapus daftar kontak berdasarkan nama
yargs.command({
    command: `delete`,
    describe: `menghapus daftar kontak`,
    builder: {
        nama: {
            describe: `Nama Lengkap`,
            demandOption: true,
            type: `string`,
        },
    },
    handler(Argv){
        contact.deleteContact(Argv.nama);
    }
});


yargs.parse();