'use strict'

/* Урок 2 JS2 */
/* Класс расчитывает стоимость и калорийность гамбургера */
class CreateBurger {
    constructor (input, /* price, calories, */button, cost, calories) {
        this.input = input;        
        this.button = button;
        this.cost = cost;
        this.calories = calories;
/* Объявляем переменные со значениями null */
        this.price = null;
        this.calories = null;
        this.checkButton(input);
    }
/* Метод добавляет слушатель событий на кнопку и запускает функции */
    checkButton(input) {
                    button.addEventListener('click', (event) => {
                    input.forEach((el)=>{
                    if (el.checked) {
                    // this.clearData(el);
                    this.sumData(el);
                    this.addMarkup(el);
                }

            })
        })
    }
/* Метод проверяет есть ли данные отличные от null в переменных 
price и calories если проверка выявит что данные есть то переменные 
приводятся к null */
    clearData() {
        if (this.price != null && this.calories != null) {
            this.price = null;
            this.calories = null;
            this.addMarkup();
        }
    }
/* Метод берет данные из массивов приводит из к типу данных number
и записывает сумму данных в переменные price и calories */
    sumData(el) {
        this.price += Number(el.dataset.price);
        this.calories += Number(el.dataset.calories);
    }
/* Метод добавляет разметку HTML с данными из переменных 
price и calories */
    addMarkup() {
    // для отладки
        // console.dir(totalCost);
        if (this.price != null && this.calories != null) {
        totalCost.innerText = `Итоговая стоимость: ${this.price}`;
        totalCalories.innerText = `Количество калорий: ${this.calories} `;
        } else {
        document.location.reload();
        // totalCost.innerText = 'Свободная касса';
        // totalCalories.innerText = '';
        }
    }
}

/* Внешние переменные */
let inputEl = document.querySelectorAll('input');
// let priceEl = [];
// let caloriesEl = [];
// let priceEl = null;
// let caloriesEl = null;
let button = document.querySelector('.submitInfo');
let totalCost = document.querySelector('.totalCost');
let totalCalories = document.querySelector('.totalCalories');

let myBurger = new CreateBurger(inputEl, button, totalCost, totalCalories);

/* Отдельный вызов метода с кнопки .newOrder */
let newOrder = document.querySelector('.newOrder');
newOrder.addEventListener('click', () =>  {
    myBurger.clearData();
})
