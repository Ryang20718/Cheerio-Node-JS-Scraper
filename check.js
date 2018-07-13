let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

axios.get('https://www.zacks.com/stock/quote/SGH?q=SGH')
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            let devtoList = [];

            devtoList[0] = {
                Stock:$('#quote_ribbon_v2 .quote_rank_summary .zr_rankbox .rank_view').find('span').text().trim()
                
            }


            const devtoListTrimmed = devtoList.filter(n => n != undefined)
            fs.writeFile('output.json',
                JSON.stringify(devtoListTrimmed, null, 4),
                (err) => console.log('File successfully written!'))
        }
    }, (error) => console.log(err));




axios.get('https://www.zacks.com/stock/quote/PRGS?q=PRGS')
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            let devtoList = [];

            devtoList[0] = {
                Stock:$('#quote_ribbon_v2 .quote_rank_summary .zr_rankbox .rank_view').find('span').text().trim()
                
            }


            const devtoListTrimmed = devtoList.filter(n => n != undefined)
            
            fs.appendFile('output.json', JSON.stringify(devtoListTrimmed, null, 4), function (err) {
            if (err) throw err;
            console.log('Saved!');
            });
            
            
            
            
        }
    }, (error) => console.log(err));



//reading in from json
var msg = "";
    var obj = JSON.parse(fs.readFileSync('output.json', 'utf8'));
    for (var i = 0; i < obj.length; i++) { // Looping Through all the stocks
        if(obj[i].Stock <= 2){
            msg = "Buy Sgh";
        }
        else if (obj[i].Stock == 3){
            msg = "Hold";
        }
        else{
            msg = "sell sgh";
        }
    }
/*
// Email Notifications for stocks
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
  to: 'zejudi@mailtrix.net',
  subject: 'Stocks',
  text: msg
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
*/