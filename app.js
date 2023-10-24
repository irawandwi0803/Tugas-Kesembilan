const Argv = require("yargs");
const yargs = require(`yargs`);
const contact = require(`./contact`);

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

yargs.parse();