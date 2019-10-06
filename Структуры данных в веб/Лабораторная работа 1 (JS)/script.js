// Делается примерно как задача 2 в лекции 2
// Ищем количество элементов в массиве
// Чтобы мы могли искать значение, допустим, заполним массив

let arr = [1,2,3,4,5,6,7,8];



function find (search) {
   for (i=0; i < arr.length; i++){
       if (search == arr[i]){
           return console.log('Элемент найден'); 
       }
   }
   return console.log('Элемент не найден');
}


find(8);

// Вывод массива

console.log(arr);