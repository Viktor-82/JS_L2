'use strict'

/* Методы не требующие внешнего вызова (инкапсулированные)
запускаемые при обращении к классу (созданию нового экземпляра 
объекта на основе конструктора класса). Пример */
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
        }
    }
    
    /* При создании нового объекта на основе конструктора с инкапсулированным методом
    *  не нужно запускать метод извне */
    let catalog = new Catalog() // render сработает сразу при создании нового экземпляра объекта