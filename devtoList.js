let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

axios.get('http://menu.dining.ucla.edu/Menus')
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            let devtoList = [];
            $('.full-page #page-wrap #container #main-content .menu-block').each(function (i, elem) {
                devtoList[i] = {
                    Dining: $(this).find('h3').text().trim(),
                    tags: $(this).find('p').text().split('#')
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
