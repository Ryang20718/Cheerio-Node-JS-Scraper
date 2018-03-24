let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

axios.get('http://menu.dining.ucla.edu/Menus/Yesterday')
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            let devtoList = [];
            $('.full-page #page-wrap #container #main-content .menu-block').each(function (i, elem) {
                devtoList[i] = {
                    Dining: $(this).find('h3').text().trim(),
                    Food: $(this).find('.tooltip-target-wrapper').text().split('\n')
                        .map(food => food.trim())
                        .filter(function (n) {
                            return n != ""
                        })
                }
            });
            const devtoListTrimmed = devtoList.filter(n => n != undefined)
            fs.writeFile('output.json',
                JSON.stringify(devtoListTrimmed, null, 4),
                (err) => console.log('File successfully written!'))
        }
    }, (error) => console.log(err));




//Getting Input from user
const delay = require('delay'); // needed for delay
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var foodResult = "";
var Bplato = 0;
var Covel = 0;
var Denevo = 0;
var Feasto = 0;
var greatestDiningHall = 0;
var finalEmail = "";
var DiningHallWithMostFood = "";

rl.question('What food would you like to eat today', (answer) => {
    // TODO: Log the answer in a database

    var obj = JSON.parse(fs.readFileSync('output.json', 'utf8'));
    for (var i = 0; i < obj.length; i++) { // Looping Through all the menu items
        for (var foodItems = 0; foodItems < obj[i].Food.length; foodItems++) {
            if (obj[i].Food[foodItems].includes(answer)) {
                foodResult += 'There is ' + obj[i].Food[foodItems] + ' at ' + obj[i].Dining;
                //foodResult += '\n';
                if (obj[i].Dining.includes('FEAST')) { //feast counter
                    Feasto++;
                } else if (obj[i].Dining.includes('Covel')) { //covel counter
                    Covel++;
                } else if (obj[i].Dining.includes('De')) {
                    Denevo++;
                } else { //BPLATE
                    Bplato++;
                }
            }
        }
    }
    greatestDiningHall = Math.max(Bplato, Covel, Denevo, Feasto); //getting the dining hall with the most food desired
    if (Feasto == greatestDiningHall) { //feast counter
        DiningHallWithMostFood = "Feast"
    } else if (Covel == greatestDiningHall) {
        DiningHallWithMostFood = "Covel"
    } else if (Denevo == greatestDiningHall) {
        DiningHallWithMostFood = "Deneve"
    } else { //BPLATE
        DiningHallWithMostFood = "Bplate"
    }

    finalEmail += foodResult + '\n';
    if (greatestDiningHall != 0) {
        finalEmail += 'The dining hall with the most ' + answer + ' is ' + DiningHallWithMostFood;
    }

    // Emailer

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ryang20718@likelion.org',
            pass: 'pass'
        }
    });

    var mailOptions = {
        from: 'ryang20718@likelion.org',
        to: 'siru@2ether.net',
        subject: 'Dining Hall Food',
        text: finalEmail
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    rl.close();
});
