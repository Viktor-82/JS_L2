'use strict'

/* Константы */
// по соглашению константы пишутся в caps lock
const CONSTANTA = 10;  

const arr = []
arr = 100 // error

arr [0] = 10 // ok
arr.push (100) // ok

/* Стрелочные функции */
function sum (arg1, arg2) {
return arg1 + arg2
}
// Будет равна стрелочной функции
let sum = (arg1, arg2) => arg1 + arg2 // return суммы



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
let arr = [...str]
arr.forEach = [e => console.log (e)] // форма записи стрелочной функции