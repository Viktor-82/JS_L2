'use strict'

/* 
Асинхронные запросы на сервер
 */
/* При асинхронном запросе важно знать когда он завершится
простейший асинхронный запрос создается с помощью setTimeout */
const async = (a) => { 
    setTimeout(() => {
    const b = a + 1;
    return b;
    }, 200);
  }
async(5) // undefined
/* Чтобы ошибок не было используются способы описанные ниже (всего их 3) */




/*
 1) Запрос при помощи callback ( cb() )
 */
// недостаток callback - перегруз запросами когда их много - "callback hell"
/* Общий принцип - в очередь задач попадает функция с задачей 
которая должна исполниться по истечении таймаута а не прямая задача */
const async = (a, cb) => {
  setTimeout(() => {
  const b = a + 1;
  cb(b);
  }, 200);
  }
/* по истечении таймаута cb() - (т.е. callback) будет вызвана */
async(5, (b) => {
  console.log(b); // 6
  });

/* Как это реализовывается на практике запросов */
/* Функции для отправки запроса и обработки полученного результата
должны быть разные */
/* Для отправки запроса */
let urlAPI = ''// url ссылка на JSON с данными
function request (url, callback) {
    // форма отправки запроса!!!   
    function makeGETRequest(url, callback) {
        let xhr     
/* XMLHttpRequest - объект запроса */
        if (window.XMLHttpRequest) {//проверка на эксплорер (браузер)
          xhr = new XMLHttpRequest() 
        } else if (window.ActiveXObject) {//объект запроса эксплорера
          xhr = new ActiveXObject("Microsoft.XMLHTTP")
        }
/* При выводе объекта в консоль нужны будут поля: 
onreadystatechange,  readyState, responseText, status */
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            callback(xhr.responseText) // функция вызываемая после выполнения запроса
          }
        }
      
        xhr.open('GET', url, true)
        xhr.send()
      }       
}
/* Для получения и обработки запроса */
function handler (data) {
    // получаем ответ // JSON
    // обрабатываем ответ // JSON -> data JS
    console.log(data)
}
// вызываем функцию, передаем два параметра
request(urlAPI, handler) 




/* 
2) Запрос при помощи объекта Promise
 */
/* Объект Promise находится в одном из трех состояний: pending - ожидание,
fulfilled - успешное выполнение, rejected - выполнено с ошибкой  */

/* Принцип работы с объектом Promise 
пишем функцию возвращающую Promise, после вызова функции у ее результата 
вызываем метод .then() у метода .then() в зависимости от результата срабатывают
колбеки resolve если вернулся аргумент или reject если нет и выведется ошибка */
// упрощенное представление
const promise = new Promise((resolve, reject) => {
  // Здесь пишем асинхронный код
  // В случае успешного выполнения вызываем колбэк resolve()
  // В случае ошибки вызываем reject()
  });
  promise.then(() => {
    // Колбэк для resolve()
  },
  () => {
  // Колбэк для reject()
  });

// как делается на практике
const async = (a) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (a) {
        const b = a + 1;
        resolve(b);
        } else {
        reject('Error');
        }
      }, 200);
    });
  }
  // вызываем
  async(5).then((b) => {
    console.log(b); // Сработает первый колбэк и выведет в консоль 6
    }, (error) => {
    console.log(error)
    });
    async().then((b) => {
    console.log(b);
    }, (error) => {
    console.log(error) // Сработает второй колбэк и выведет в консоль 'Error'
    });

// промисы можно объединять в цепочки вызовов, callback's будут выполняться по очереди
// ситуация "callback hell" не произойдет
promise
.then(() => { })  // Сначала выполнится этот обработчик 
.then(() => { })  // Потом этот 
.then(() => { }); // А потом вот этот 

/* Пример цепочки вызовов с использованием Promise */
const giveMeNumber = (number) => {
  return new Promise((resolve) => {
  setTimeout(() => {
  resolve(number);
  }, 200)
  });
  }
  giveMeNumber(5)
  .then((number) => { return number + 1; })
  .then((number) => { return number + 10; })
  .then((number) => { console.log(number) }); // В консоль выведется 16

/* Создаем функцию на основе объекта Promise взамен примера с callback */
function promiseAjax(url) {
/* Функция res - в случае выполнения, функция rej - в случае невыполнения  */
    return new Promise ( (res, rej) => {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText) //data // Эта запись 
                } else {                         // нужна вместо
                    reject('some error')            // callback
                }
            }
          }
// тип запроса, адрес ресурса, указатель асинхронности        
          xhr.open('GET', url, true) // вызов метода объекта XMLHttpRequest
          xhr.send()                 // вызов метода объекта XMLHttpRequest
    })
}
/* Второй пример */
function getPromise() {
/* Метод .then() - если ответ без ошибок, метод .catch() - если были ошибки */
/* По факту запись в одну строку - promiseAjax(urlAPI).then().catch()  
но принято писать так */
    promiseAjax(urlAPI)
    .then((data) => { // данные в формате JSON
        console.log(JSON.parse(data)) // преобразовываем в объект
    })
    .catch((err) => {
        console.log(err)
    })  
} 
/* При вызове getPromise получим данные */
getPromise()




/* 
Запрос при помощи метода fetch() 
*/
/* Если вставлять ссылку вместо urlAPI она должна быть в кавычках 'https://...' */
let data = fetch(urlAPI)
/* Первый then переводит объект в json либо json в объект в зависимости от того что есть 
второй выводит в консоль, дальше пишем обработчик ошибок */
    .then((data) => data.json()).then(dataParsed => {console.log(dataParsed)})
    .catch((err) => {
        console.log(err)
    })