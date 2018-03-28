let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

axios.get('https://www.bloomberg.com/quote/SGH:US')
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            let devtoList = [];

            devtoList[0] = {
                Stock:$('#root .contentWell__b0c648c9 .quotePageSnapshot .pseudoMainContent .snapshot__0569338b .snapshotOverview__d5769afc .snapshotSummary__16511a01 .company__c1979f17').find('h1').text().trim(),
                
                Price: $('#root .contentWell__b0c648c9 .quotePageSnapshot .pseudoMainContent .snapshot__0569338b .snapshotOverview__d5769afc .snapshotSummary__16511a01 .price__c3a38e1d .overviewRow__0956421f').find('span').first().text().trim(),

                amtChanged: $('#root .contentWell__b0c648c9 .quotePageSnapshot .pseudoMainContent .snapshot__0569338b .snapshotOverview__d5769afc .snapshotSummary__16511a01 .price__c3a38e1d .overviewRow__0956421f').find('span').eq(2).text().trim(),

                pctChanged: $('#root .contentWell__b0c648c9 .quotePageSnapshot .pseudoMainContent .snapshot__0569338b .snapshotOverview__d5769afc .snapshotSummary__16511a01 .price__c3a38e1d .overviewRow__0956421f').find('span').eq(3).text().trim()
            }


            const devtoListTrimmed = devtoList.filter(n => n != undefined)
            fs.writeFile('output.json',
                JSON.stringify(devtoListTrimmed, null, 4),
                (err) => console.log('File successfully written!'))
        }
    }, (error) => console.log(err));



//reading in from json
    var obj = JSON.parse(fs.readFileSync('output.json', 'utf8'));
    for (var i = 0; i < obj.length; i++) { // Looping Through all the stocks
        
    }

// Email Notifications
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ryang20718@likelion.org',
    pass: 'Pass'
  }
});

var mailOptions = {
  from: 'ryang20718@likelion.org',
  to: 'siru@2ether.net',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});