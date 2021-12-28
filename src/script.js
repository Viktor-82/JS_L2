'use strict'

/* Стрелочные функции 
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Arrow_functions 
https://metanit.com/web/javascript/3.8.php */
/* Стрелочные функции образуются с помощью знака стрелки (=>), 
перед которым в скобках идут параметры функции, а после - собственно тело функции. */
function sum (arg1, arg2) {
return arg1 + arg2
}
// Будет равна стрелочной функции
let sum = (arg1, arg2) => arg1 + arg2 // return в стрелочной функции есть по умолчанию


function mathOperation (arg1, arg2, op) {
    if (op === 's') {
        return sum (arg1, arg2)
    }
}
// Будет равна стрелочной функции
    let mathOperation = (arg1, arg2, op) => {
    if (op === 's') {
        return sum (arg1, arg2)
    }
}

window.addEventListener ('load', function() {

})
// Будет равна стрелочной функции
window.addEventListener ('load', () => {
})

console.log(mathOperation (10, 55, 's'))

let str = 'I like JS'
let arr = [...str] // получили массив из строчных символов
// форма записи стрелочной функции (вывод каждого элемента в консоль)
arr.forEach = [e => console.log (e)] 

/* Синтаксис возвращения объекта стрелочной функцией */
let user = (userName, userAge) => ({name: userName, age: userAge}); 
let tom = user("Tom", 34);
let bob = user("Bob", 25); 
console.log(tom.name, tom.age); // "Tom", 34
console.log(bob.name, bob.age); // "Bob", 25