// Перевод в арабские числа из римских

var font_ar = [1,4,5,9,10,40,50,90,100,400,500,900,1000,4000,5000,9000,10000];
var font_rom = ["I","IV","V","IX","X","XL","L","XC","C","CD","D","CM","M","M&#8577;","&#8577;","&#8577;&#8578;","&#8578;"];


function to_arab(text) {
    var text = text.toUpperCase();
    var rezult = 0;
    var posit = 0;
    var n = font_ar.length - 1;
    while (n >= 0 && posit < text.length) {
       if (text.substr(posit, font_rom[n].length) == font_rom[n]) {
           rezult += font_ar[n];
           posit += font_rom[n].length;
       }
       else n--;
    }

    if (rezult == 0) {
        return rezult = ('ОШИБКА ВВОДА')
    }

    return rezult;
   }


console.log(to_arab('aL'));