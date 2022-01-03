'use strict'

/* Способы передачи данных
1) JSON (JavaScript Object Notation) похож на объект JS
2) XML расширенный язык разметки, похож на HTML 
3) HTML/text - разметка или текст
4) Бинарные данные (0. 1) */

/* Синтаксис JSON
Название полей в двойных кавычках 
Строковые данные в двойных кавычках 
Число и boolean без кавычек */
jsonData = [
    {
      "id_product": 123,  
      "product_name": "Ноутбук",
      "price": 45600,
      "avaliable": true
    },
    {
      "id_product": 456,
      "product_name": "Мышка",
      "price": 1000,
      "avaliable": false
    }
  ]
  /* В таком формате данные можно записывать в отдельный репозиторий на github.com
  Для получения ссылки доступа на отправку кода JSON нужно нажать на кнопку Raw */
let jsonObj = '{"id_product": 123, "product_name": "Ноутбук", "price": 45600}' // правильный формат

/* Метод JSON.parse() преобразовывает JSON в объект */
let obj = JSON.parse(jsonObj)

/* Метод JSON.stringify() преобразовывает объект в JSON */
let againJSON = JSON.stringify(obj)
// пример 2
let arr = [{a: 1}, {a: 100, b: [1, 2, 'qwert']}]
let jsonArrObj = JSON.stringify(arr) 