let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

axios.get('https://www.bloomberg.com/quote/SGH:US')
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            let devtoList = [];

            $('#root .contentWell__b0c648c9 .quotePageSnapshot .pseudoMainContent .snapshot__0569338b .snapshotOverview__d5769afc .snapshotSummary__16511a01 .price__c3a38e1d .overviewRow__0956421f').each(function (i, elem) {
                devtoList[i] = {
                    Price: $(this).find('span').text().trim(),
                    Flux: $(this).find('span').text().split('#')
                        .map(tag => tag.trim())
                        .filter(function (n) {
                            return n != ""
                        })
                }
            });

            devtoList[2] = {
                Price: $('#root .contentWell__b0c648c9 .quotePageSnapshot .pseudoMainContent .snapshot__0569338b .snapshotOverview__d5769afc .snapshotSummary__16511a01 .price__c3a38e1d .overviewRow__0956421f').find('span').text().trim(),
                Flux: $(this).find('span').text().split('#')
                    .map(tag => tag.trim())
                    .filter(function (n) {
                        return n != ""
                    })
            }


            const devtoListTrimmed = devtoList.filter(n => n != undefined)
            fs.writeFile('output.json',
                JSON.stringify(devtoListTrimmed, null, 4),
                (err) => console.log('File successfully written!'))
        }
    }, (error) => console.log(err));
