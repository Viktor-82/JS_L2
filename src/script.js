'use strict'

/* Класс - функция возвращающая объекты (return там по умолчанию) */
// в отличие от функций, чтобы использовать класс, его надо сначала оределить.
// 1 Определение класса
class Person{}
// 2 Определение класса
const Person = class{}
// 3 Определение класса	
const User = class Person{}

class Human {
    constructor (name, age, gender = 'm') {
        this.name = name
        this.age = age
        this.gender = gender
    }
    // methods (будет в prototype)
    getOlder () {
        this.age++
    }
    becomeMother () {
        if (this.gender === 'f') {
            console.log(this.name + ' becomes mother')
        } else {
            console.log(this.name + ' can not become mother')
        }
    }
}

/* Создание нового объекта на основе класса и присваивание значения в переменную 
с передачей значений */
let vasia = new Human ('Vasily', 32)
let sofa = new Human ('Sophia', 24, 'f')

class Planet {
    constructor () {
        this.people = []
    }
    createHuman (name, age, gender = 'm') {
        this.people.push (new Human (name, age, gender))
    }
}

let earth = new Planet()
earth.createHuman('John', 31)
earth.createHuman('Elisabeth', 26, 'f')
/* Вариант вызова 1 */
// earth.people.forEach (el => {
//     if (el.gender === 'f') {
//         el.becomeMother()
//     }
// })

/* Вариант вызова 2 */
    earth.people.forEach (el => {
        el.becomeMother()
})