// Постфиксный калькулятор 

// Ввод элементов

arr = [1,2,'+'];
newarr = [];

for (i = 0; i < arr.length; i++){
    if (typeof arr[i] == 'number' || typeof arr[i+1] == 'number'){
        for (j = 0; j < arr.length; j++){
            if (arr[j] = '+'){
                console.log(arr[i]+arr[i+1]);
            }
        } 
    }

}