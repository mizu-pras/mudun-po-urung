
const beautify_html = require('js-beautify').html;
const cheerio = require('cheerio');

exports.getTitleAndPrice = (response) => {
    const result = beautify_html(response.data).replace(/(\r\n|\n|\r|)/gm, "");
    let $ = cheerio.load(result);
    
    var title = $('title').text();
    var pos_lazada = title.indexOf("Lazada");
    title = title.substring(0, pos_lazada-3);
    
    var first_pos_price = result.indexOf(`"salePrice"`);
    var str_price = result.substring(first_pos_price, first_pos_price+1000).replace(/\s/g,'');
    var value = str_price.indexOf("}},");

    const price = str_price.substring(12, value+1);
    const obj = JSON.parse(price);

    return {
        title,
        price: obj.text,
        value: obj.value,
    }
}