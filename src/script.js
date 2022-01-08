'use strict'

/* 
Асинхронные запросы на сервер
 */
/* Простейшая асинхронная функция setTimeout */
const async = (a) => { 
  setTimeout(() => {
  const b = a + 1;
  return b;
  }, 200);
}
async(5) // undefined

/*
1) Запрос при помощи callback ( cb() )
*/
// недостаток callback - перегруз запросами когда их много - "callback hell"
/* Общий принцип - в API браузера попадает функция с задачей которая ставится в очередь 
и будет отправлена в стек выполнения по истечении таймаута */
const async = (a, cb) => {
  setTimeout(() => {
  const b = a + 1;
  cb(b);
  }, 200);
}
/* по истечении таймаута cb() будет вызвана */
async(5, (b) => {
console.log(b); // 6
});

/* Как это реализовывается на практике запросов */
let urlAPI = ''// url ссылка на JSON с данными
function request (url, callback) {
  function makeGETRequest(url, callback) {
      let xhr     
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest() 
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP")
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText) 
        }
      }    
      xhr.open('GET', url, true)
      xhr.send()
    }       
}
/* Для получения и обработки запроса */
function handler (data) {
  // получаем ответ // JSON
  // обрабатываем ответ JSON -> data JS
  console.log(data)
}
// вызываем функцию, передаем два параметра
request(urlAPI, handler) 

/* Пример 2 с callback */
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));
// если callback будет много то непонятно в каком порядке они загрузятся и выполнятся (callback hell)
  document.head.append(script);
}

/* Пример с вложенными callback's */
setTimeout(() => {
  console.log('Prepfring data...')

  const backendData = {
    server: 'aws',
    port: 2000, 
    status: 'working'
  }
  setTimeout(() => {
    backendData.modified = true
    console.log('Data reseived', backendData)
  }, 2000)
}, 2000)


/* 
2) Запрос при помощи объекта Promise
*/
/* Объект Promise находится в одном из трех состояний:
pending - ожидание,
fulfilled - успешное выполнение, 
rejected - выполнено с ошибкой.

У объекта Promise есть методы 


метод then() - выполнится в состоянии fulfilled 
в then() могут передаваться два аргумента (функции) 
1 для успешного выполнения
2 для выполнения с ошибкой

const promise = new Promise((resolve, reject) => {
});
promise.then(() => { // Колбэк для resolve()  
},
            () => { // Колбэк для reject()
});

метод then() также возвращает Promise поэтому из него можно строить цепочки
и передавать в следующий then данные для обработки из предыдущего

promise
.then(() => { })  
.then(() => { })  
.then(() => { });  





метод catch() - существует только для обработки ошибок
вызов .catch(f) – это сокращённый, «укороченный» вариант .then(null, f)

let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Ошибка!")), 1000);
});
promise.catch(alert); // выведет "Error: Ошибка!" спустя одну секунду





метод finally() - выполнится в любом случае (с ошибкой или без) может служить
индикатором окончания загрузки, после него можно запускать then() 

new Promise((resolve, reject) => {
// сделать что-то, что займёт время, и после вызвать resolve/reject
})
// выполнится, когда промис завершится, независимо от того, успешно или нет
  .finally(() => остановить индикатор загрузки)
  .then(result => показать результат, err => показать ошибку)

*/


/* Пример вызова метода then() с двумя аргументами */
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});
// resolve запустит первую функцию, переданную в .then
promise.then(
  result => alert(result), 
  error => alert(error) 
);


/* Пример цепочки вызовов с использованием Promise 
где каждый последующий then принимает результать предыдущего и может совершать
с ним какие то действия */
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

/* Пример 2 цепочки вызовов с модификацией данных */
// 1
p.then(data => {
  const p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
          data.modified = true
          resolve(data)
      }, 2000)
  })
// 2
  p2.then(clientData => {
      console.log('Data received', clientData)
  })
})

/* Можно заменить блоки кода 1 и 2 следующим не объявлять const p2 не писать лишний код */
p.then(data => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          data.modified = true
          resolve(data)
      }, 2000)
  })
}).then(clientData => {
  console.log('Data received', clientData)
})
/* Далее из этого кода можно продолжить цепочку для модификации данных в каждом then() */
  .then(clientData => {
      console.log('Data received', clientData)
      clientData.fromPromise = true // изменяем параметры
      return clientData // возвращаем данные для использования в следующем then()
  }).then(data => {
  console.log('Modified', data)
})




/* Создаем функцию на основе объекта Promise с обработкой выполнения методом then() 
взамен примера с callback */
function promiseAjax(url) {
  return new Promise ( (resolve, reject) => {
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
// вызываем и передаем адрес запроса обработка выполнения и ошибки методом then()
// и его аргументами resolve (успешкно) и reject (выведет ошибку)
let url = 'какой то url.json'
promiseAjax(url)
promiseAjax.then(
  result => alert(result), 
  error => alert(error) 
);


/* Второй пример использования Promise с обработкой успешного выполнения методом then()
и ошибки методом catch() */
function getPromise() {
/* По факту запись в одну строку - promiseAjax(urlAPI).then().catch() но принято писать так */
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
.then()
.catch()

/* В Promise нельзя перезаписать его функцию callback */
let promise = new Promise(function(resolve, reject) {
  resolve(1);
  setTimeout(() => resolve(2), 1000);
});
promise.then(alert); // 1 второй resolve(2) будет проигнорирован


/* В Promise можно поставить задержку на его callback */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
delay(3000).then(() => alert('выполниться через 3 секунды'));
delay(5000).then(() => alert('выполниться через 5 секунд'));

/* Метод объекта Promise.all() можно передавать несколько промисов в массиве
метод then() сработает после выполнения самого долгого */
Promise.all([sleep(2000), sleep(5000)]) 
  .then(() => { // будет выполнен тогда когда завершатся все промисы в массиве
    console.log('All promises')
  })

/* Метод race() принимает массив промисов и срабатывает на первый выполнившийся промис */
Promise.race([sleep(2000), sleep(5000)]) 
  .then(() => { // будет выполнен тогда когда завершатся все промисы в массиве
    console.log('Race promises')
  })


/* 
Fetch API - современный аналог стандартного XMLHttpRequest
Запрос при помощи метода fetch() 
*/
 /* options-доп.параметры, необязательные (метод, заголовки и т.д.) без options fetch() отправит Get запрос 
 и вернет Promise
 Статус ответа в свойствах:
 status - код ответа (например 200)
 ok - логическое значение (true если статус в диапазоне 200-299) */
 let data = fetch(urlAPI, [options]) // пример синтаксиса

 /* Пример получения ответа по логическому свойству ok с ключом await*/
 /* await сработает только внутри async функций и представляет собой синтаксический сахар заменяющий then()
 т.е. ключ await заставит дождаться пока промис справа выполнится и после этого запишет результать в переменную слева */
 let response = await fetch(url);
if (response.ok) { // если HTTP-статус в диапазоне 200-299 получаем тело ответа
  let json = await response.json();
} else {
  alert("Ошибка HTTP: " + response.status);
}

/* Чтобы декодировать тело объекта в различных форматах есть методы аналогичные методам XMLHttpRequest 
text() – читает ответ и возвращает как обычный текст,
json() – декодирует ответ в формате JSON,
formData() – возвращает ответ как объект FormData (разберём его в следующей главе),
blob() – возвращает объект как Blob (бинарные данные с типом),
arrayBuffer() – возвращает ответ как ArrayBuffer (низкоуровневое представление бинарных данных),
помимо этого, response.body – это объект ReadableStream, с помощью которого можно считывать тело запроса по частям. */
// Пример получения данных в нужном формате
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);
let commits = await response.json(); // читаем ответ в формате JSON
alert(commits[0].author.login);
// То же с методом then() 
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));


 let data = fetch(urlAPI, [options])
/* Первый then переводит объект в json либо json в объект в зависимости от того что есть 
второй выводит в консоль, дальше пишем обработчик ошибок */
  .then((data) => data.json()).then(dataParsed => {console.log(dataParsed)})
  .catch((err) => {
      console.log(err)
  })

/* Post запрос методом fetch() */
let user = {
  name: 'John',
  surname: 'Smith'
};
let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user) // body здесь это тело запроса
});
let result = await response.json();
alert(result.message);

/* Типовой запрос fetch() с ключом await */
let response = await fetch(url, options); // завершается с заголовками ответа
let result = await response.json(); // читать тело ответа в формате JSON

/* То же самое с методом then() */
fetch(url, options)
  .then(response => response.json())
  .then(result =>  ) // обрабатываем результат

/* Еще рабочий пример */
let data = fetch(urlAPI)
          .then((data) => data.json()).then(dataParsed => {console.log(dataParsed)})
          .catch((err) => {
            console.log(err)
          })