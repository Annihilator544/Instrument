console.log(
    'This script populates some test instruments to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  const userArgs = process.argv.slice(2);
    if (!userArgs[0].startsWith("mongodb")) {
        console.log("ERROR: You need to specify a valid mongodb URL as the first argument");
        return;
    }
    const Instrument = require("./models/Instrument");
    const Classification = require("./models/Classification");
    const Company = require("./models/Company");

    const Instruments= [];
    const instruments = [];
    const Classifications = [];
    const Companies = [];

    const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCompanies();
    await createClassifications();
    await createInstruments();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }

  async function instrumentCreate(name, classification, company, price, stock) {
    const instrumentDetail = { name, classification, company, price, stock };
    const instrument = new Instrument(instrumentDetail);
    await instrument.save();
    instruments.push(instrument);
    return instrument;
  }

    async function classificationCreate(name) {
        const classificationDetail = { name };
        const classification = new Classification(classificationDetail);
        await classification.save();
        Classifications.push(classification);
        console.log("Debug: Classification created: " + classificationDetail.name);
        return classification;
    }

    async function companyCreate(name, address, phone, email) {
        const companyDetail = { name, address, phone, email };
        const company = new Company(companyDetail);
        await company.save();
        Companies.push(company);
        console.log("Debug: Company created: " + companyDetail.name);
        return company;
    }

   async function createCompanies() {
        await companyCreate("Gibson", "309 Plus Park Blvd, Nashville, TN 37217", 6158714500, "ppp@gmail.com");
        await companyCreate("Harman Professional Solutions", "400 Atlantic St, Stamford, CT 06901", 2033283500, "lbfibwr@gmail.com");
        await companyCreate("Kawai", "200 Piano Ln, Buford, GA 30518", 7707178047, "kbfi@gmail.com");
        await companyCreate("Korg", "316 S Service Rd, Melville, NY 11747", 6313906500, "iubifwbwiru@gmail.com");
        await companyCreate("Martin", "510 Sycamore St, Nazareth, PA 18064", 6107592837, "wuebfiuwbig@gmail.com");
        await companyCreate("Numark", "200 Scenic View Dr, Cumberland, RI 02864", 4016583131, "khwbeifbwuyb@gmail.com");
        await companyCreate("Pioneer", "2050 W 190th St, Torrance, CA 90504", 3109522000, "vweufyvweuu@gmail.com");
        await companyCreate("Roland", "5100 S Eastern Ave, Los Angeles, CA 90040", 3238903700, "khebvfuywbveuy@gmail.com");
        await companyCreate("Shure", "5800 W Touhy Ave, Niles, IL 60714", 8476002000, "khevudyfevwuyfvuwv@gmail.com");
        await companyCreate("Steinway", "1 Steinway Pl, Astoria, NY 11105", 7187212600, "kieqbnfowrnoguiugnbv@gmail.com");
        await companyCreate("Yamaha", "6600 Orangethorpe Ave, Buena Park, CA 90620", 7145229011, "kyvfiyevwifvwie@gmail.com");
        await companyCreate("Zildjian", "22 Longwater Dr, Norwell, MA 02061", 7818712200, "vqebiogworbgjebr@gmail.com");
    }

    async function createClassifications() {
        await classificationCreate("idiophones");
        await classificationCreate("membranophones");
        await classificationCreate("aerophones");
        await classificationCreate("chordophones");
        await classificationCreate("electrophones");
    }

    async function createInstruments() {
        await Scraper();
    for(let i = 0; i < Instruments.length; i++) {
        await instrumentCreate(Instruments[i].instrument, Instruments[i].classification, Instruments[i].company, Instruments[i].price, Instruments[i].stock);
    }
    console.log("Debug: Done");
    }

    async function Scraper (){
        const req = await fetch("https://en.wikipedia.org/wiki/List_of_musical_instruments");
        const data = await req.text();
        console.log("Debug: Fetching");
        //req.then(response => response.text()).then(data =>{
            console.log("Debug: Got data");
            let initial = data.indexOf("<tbody>");
            let end = data.indexOf("</tbody>");
            let table = data.substring(initial, end);
            let rows = table.split("<tr>");
            let MusicCompanies = ['Gibson', 'Harman Professional Solutions', 'Kawai', 'Korg', 'Martin', 'Numark', 'Pioneer', 'Roland', 'Shure', 'Steinway', 'Yamaha', 'Zildjian'];
            let Price = [10000, 200000, 30000, 400000, 50000, 600000, 70000, 800000, 90000, 100000, 110000, 120];
            let Stock = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            rows.shift();
            rows.shift();
            rows.pop();
            rows.pop();
            rows.pop();
            rows.pop();
            rows.pop();
            rows.pop();
            rows.pop();
            rows.pop();
            rows.pop();
            rows.pop();
            rows.pop();
            rows.pop();
            rows.forEach(row => {
                let cells = row.split("<td>");
                let instrument = cells[1].substring(cells[1].indexOf(">")+1, cells[1].indexOf("</a>"));
                let classification = cells[3].substring(0, cells[3].indexOf("</td>"));
                let company = MusicCompanies[Math.floor(Math.random() * MusicCompanies.length)];
                let price = Price[Math.floor(Math.random() * Price.length)];
                let stock = Stock[Math.floor(Math.random() * Stock.length)];
                Instruments.push({
                    instrument,
                    classification,
                    company,
                    price,
                    stock
                });
            });
            let initial2 = data.indexOf("<tbody>", initial+1);
            let end2 = data.indexOf("</tbody>", end+1);
            let table2 = data.substring(initial2, end2);
            let rows2 = table2.split("<tr>");
            rows2.shift();
            rows2.shift();
            rows2.forEach(row => {
                let cells = row.split("<td>");
                let instrument = cells[1].substring(cells[1].indexOf(">")+1, cells[1].indexOf("</a>"));
                let classification = cells[3].substring(0, cells[3].indexOf("</td>"));
                let company = MusicCompanies[Math.floor(Math.random() * MusicCompanies.length)];
                let price = Price[Math.floor(Math.random() * Price.length)];
                let stock = Stock[Math.floor(Math.random() * Stock.length)];
                Instruments.push({
                    instrument,
                    classification,
                    company,
                    price,
                    stock
                });
            });
            let initial3 = data.indexOf("<tbody>", initial2+1);
            let end3 = data.indexOf("</tbody>", end2+1);
            let table3 = data.substring(initial3, end3);
            let rows3 = table3.split("<tr>");
            rows3.shift();
            rows3.shift();
            rows3.forEach(row => {
                let cells = row.split("<td>");
                let instrument = cells[1].substring(cells[1].indexOf(">")+1, cells[1].indexOf("</a>"));
                let classification = cells[2].substring(0, cells[2].indexOf("</td>"));
                let company = MusicCompanies[Math.floor(Math.random() * MusicCompanies.length)];
                let price = Price[Math.floor(Math.random() * Price.length)];
                let stock = Stock[Math.floor(Math.random() * Stock.length)];
                Instruments.push({
                    instrument,
                    classification,
                    company,
                    price,
                    stock
                });
            });
            let initial4 = data.indexOf(`<div class="div-col" style="column-width: 15em;"`, initial3+1);
            let end4 = data.indexOf("</div>", initial4+1);
            let table4 = data.substring(initial4, end4);
            let rows4 = table4.split("<li>");
            rows4.shift();
            rows4.forEach(row => {
                let cells = row.split("<td>");
                let instrument = cells[0].substring(cells[0].indexOf(">")+1, cells[0].indexOf("</a>"));
                let classification = 'electrophones';
                let company = MusicCompanies[Math.floor(Math.random() * MusicCompanies.length)];
                let price = Price[Math.floor(Math.random() * Price.length)];
                let stock = Stock[Math.floor(Math.random() * Stock.length)];
                Instruments.push({
                    instrument,
                    classification,
                    company,
                    price,
                    stock
                });
        
            });
        //});
        for(let i = 0; i < Instruments.length; i++) {
           switch(Instruments[i].classification) {
                case 'idiophones':
                     Instruments[i].classification = Classifications[0];
                     break;
                case 'Idiophones':
                        Instruments[i].classification = Classifications[0];
                        break;
                 case 'membranophones':
                      Instruments[i].classification = Classifications[1];
                      break;
                 case 'aerophones':
                      Instruments[i].classification = Classifications[2];
                      break;
                 case 'chordophones':
                      Instruments[i].classification = Classifications[3];
                      break;
                 case 'electrophones':
                      Instruments[i].classification = Classifications[4];
                      break;
                default: 
                    Instruments[i].classification = Classifications[0];
                    break;
              }
                switch(Instruments[i].company) {
                    case 'Gibson':
                         Instruments[i].company = Companies[0];
                         break;
                     case 'Harman Professional Solutions':
                        Instruments[i].company = Companies[1];
                        break;
                     case 'Kawai':
                        Instruments[i].company = Companies[2];
                        break;
                     case 'Korg':
                        Instruments[i].company = Companies[3];
                        break;
                     case 'Martin':
                        Instruments[i].company = Companies[4];
                        break;
                     case 'Numark':
                        Instruments[i].company = Companies[5];
                        break;
                     case 'Pioneer':
                        Instruments[i].company = Companies[6];
                        break;
                     case 'Roland':
                        Instruments[i].company = Companies[7];
                        break;
                     case 'Shure':
                        Instruments[i].company = Companies[8];
                        break;
                     case 'Steinway':
                        Instruments[i].company = Companies[9];
                        break;
                     case 'Yamaha':
                        Instruments[i].company = Companies[10];
                        break;
                     case 'Zildjian':
                        Instruments[i].company = Companies[11];
                        break;
                }

        }
    }