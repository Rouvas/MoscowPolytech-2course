// Сортировка больших массивов

let arr = [];


function randomarr (num) {
    for (i = 0; i < num; i++){
        arr[i] = Math.floor(Math.random() * 1000);
    }
    return console.log('Рандомно введено ',num);
}


function sorting() {
    arr.sort(function(a, b){return a - b});
}


randomarr(2000);
sorting();

// Вывод массива

console.log(arr);