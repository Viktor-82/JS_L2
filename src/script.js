'use strict'

/* Урок 2 JS2 */
//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];

class Product {
    constructor (id, name, price, img = image) {
        this.id_product = id
        this.product_name = name
        this.price = price
        this.img = img
    }
    render () {
        return `<div class="product-item" data-id="${this.id_product}">
                        <img src="${this.img}" alt="Some img">
                        <div class="desc">
                            <h3>${this.product_name}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-id="${this.id_product}"
                            data-name="${this.product_name}"
                            data-image="${this.img}"
                            data-price="${this.price}">Купить</button>
                        </div>
                    </div>`
    }
}

class Catalog {
    constructor () {
        this.products = []
        /* 2 Прописываем запуск этого метода прямо из конструктора по умолчанию
        * метод выполняемый внутри конструктора (других методов по факту) называется инкапсулированный
        * и по соглашению и его название начинается с нижнего подчеркивания чтобы не перепутать.
        * Методы вызываемые снаружи называются общими (неинкапсулированные) */
        this._init()
    }
/* 1 Создаем метод */
    _init() {
        this._fetchProducts()
        this._render()
        this._totalCost()
    }
    _fetchProducts() {
        for (let i = 0; i < image.length; i++) {
            this.products.push(new Product(ids[i], items[i], prices[i]))
        }

    }
    _render() {
        const block = document.querySelector('.products')
/* Можно использовать forEach, но для разнообразия используем for of он полноценно заменяет forEach */
        let htmlString = ''
        for (let item of this.products) {
            htmlString += item.render()
        }
        block.innerHTML = htmlString
        console.dir(this.products) // временно 
    }
    
/* Метод определяет общую стоимость товаров в корзине */
    _totalCost () {
        let totalCost = null
        this.products.forEach((el) => {
            if (typeof(el.price) != "number") {
                el.price = 0;
            }
            totalCost += el.price
        })
        console.log(totalCost)        
    }
}

/* При создании нового объекта на основе конструктора с инкапсулированным методом
*  не нужно запускать метод извне */
let catalog = new Catalog() // render сработает сразу при создании нового экземпляра объекта
// catalog.totalCost()

class Basket {
/* При вызове класса ничего в него не передаем 
id, name, price, img = image */
    constructor () {
/* Объявление переменных существующих только внутри класса*/        
        this.id_product = null;
        this.product_name = null;
        this.price = null;
        this.img = null;      
        this.getElementByClick = '';
        this.basketEl = {};
        this.basket = {};
        this._listenClickBtn();        
    }
/* Метод по событию нажатия кнопки "купить" карточки товара получает
 ее data элементы и составляет из них новый объект */
    _listenClickBtn () {
        let buyBtn = document.querySelectorAll('.buy-btn');
            for (let el of buyBtn) {
/* Важно! Пока запись функции была function(event) {} строчка this.renderBasket 
не срабатывала. Т.к. this указывал на event а не на область ограниченную class Basket. 
Это преимущество стрелочных функций в классах не объясняли!!! Из преимуществ описывали только "меньше писать" */
                el.addEventListener('click', (event) => {
                this.getElementByClick = event.target; 
                    this.collectBasket(event);
                    this.renderBasket();
                    // this.reRenderBasket();                              
            })
            
        }
    }

/* Метод собирает элементы в корзину */
    collectBasket (event) {               
/* Проверка наличия экземпляра данного товара в корзине */
            if (!this.basket[event.target.dataset.name]){
                    this.basketEl = {}
                    this.basketEl.id = event.target.dataset.id
                    this.basketEl.product_name = event.target.dataset.name
/* Меняем строчку для записи изображения меньшего размера в разметку корзины */
                    // this.basketEl.img = event.target.dataset.image
                    this.basketEl.img = cartImage
                    this.basketEl.price = event.target.dataset.price
                    this.basketEl.quantity = 1;
                    this.basket[event.target.dataset.name] = this.basketEl
                // console.dir(this.basket)
                // console.log('В корзине нет похожих товаров')
            } else {
                this.checkQuantity(event)
            }
    }

    /* Метод считает общее количество и общую стоимость одного вида товаров */
    checkQuantity (event) {
            this.basket[event.target.dataset.name].price = Number(this.basket[event.target.dataset.name].price)
            this.basket[event.target.dataset.name].quantity = this.basket[event.target.dataset.name].quantity + 1
            this.basket[event.target.dataset.name].price += Number(event.target.dataset.price)
            // console.dir(this.basket)
    }

/* Метод создает разметку корзины используя данные из объекта basket */
    renderBasket() {
        let productsInBasket = '';
        for (let property in this.basket) {
        productsInBasket += `<div class="cart-item" data-id="${this.basket[property].id}" data-name="${this.basket[property].product_name}">
                            <div class="product-bio">
                                <img src="${this.basket[property].img}" alt="Some image">
                                <div class="product-desc">
                                    <p class="product-title">${this.basket[property].product_name}</p>
                                    <p class="product-quantity">Quantity: ${this.basket[property].quantity}</p>
                                    <p class="product-single-price"> ${this.basket[property].price} each</p>
                                </div>
                            </div>
                            <div class="right-block"> 
                                <p class="product-price">${this.basket[property].price} $</p>
                                <button class="del-btn" data-id="${this.basket[property].id}">&times;</button>
                            </div>
                        </div>`
/* Была заменена строчка <p class="product-price">${this.basket[property].quantity * this.basket[property].price}</p> */
/* Добавил data-name чтобы по ключу name можно было удалить элемент объекта basket. data-id пока не убираю */
                // console.dir(this.basket[property])
                // console.dir(productsInBasket)
                }
            document.querySelector('.cart-block').innerHTML = productsInBasket;
            this.reRenderBasket();
    }

/* Метод удаляет товары из корзины и объект товара по ключу name в basket  */
    reRenderBasket() {
      let delBtn = document.querySelectorAll('.del-btn');
      for (let el of delBtn) {
          el.addEventListener('click', (event) => {
            el.parentNode.parentNode.remove() // удаление разметки с товаром из корзины            
            let keyBasket = el.parentNode.parentNode.dataset.name
            delete this.basket[keyBasket] // удаление свойства объекта
            console.dir(this.basket)
          })
      }
    }
}
let basketBtn = document.querySelector('.btn-cart');
basketBtn.addEventListener('click', function() {
    document.querySelector('.cart-block').classList.toggle('invisible');
})
let basket = new Basket();