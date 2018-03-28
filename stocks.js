let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

axios.get('https://finance.yahoo.com/quote/SGH?p=SGH')
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            let devtoList = [];
           
            $('#app .render-target-active #YDC-Lead #quote-header-info .My(6px) ').each(function (i, elem) {
                devtoList[i] = {
                    Dining: $(this).find('span').text().trim(),
                    tags: $(this).find('span').text().split('#')
                        .map(tag => tag.trim())
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
