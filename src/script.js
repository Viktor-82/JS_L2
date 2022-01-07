'use strict'

/* Объект XMLHttpRequest - объект встроенный в браузер для работы с запросами по технологии AJAX 
(Asynchronous Javascript and XML). В Internet Explorer имеет аналог ActiveXObject
XMLHttpRequest дает возможность JS делать запросы к серверу без перезагрузки страницы
применение Promise{} является только оберткой для XMLHttpRequest. Его использования при 
запросах в любом случае необходимо.
Применение метода fetch() в большинстве случаев заменяет XMLHttpRequest, кроме тех 
где необходимо отслеживать прогресс отправки на сервер */

/* Порядок работы с XMLHttpRequest */

// присваиваем новый экземпляр объекта в переменную 
let xhr = new XMLHttpRequest();

// инициализируем объект методом open()
xhr.open("GET", "http://localhost/hello.txt", true);

/* Подробно про метод open() */
/* Принимает три основных параметра - 
1) тип запроса GET, POST, HEAD, PUT (самые частые GET, POST) 
2) URL запроса
3) логическое true (асинхронность включена) или false (выключена) 
+ два дополнительных параметра - "login" и "password" */

// после инициализации отправляем запрос методом send()
xhr.send()

/* Свойства XMLHttpRequest применяемые для контроля выполнения запроса 
status: код ответа HTTP по которому можно посмотреть состояние или ошибки
например - 200 (успешно), 403 (необходима авторизация), 404 (ресурс не найден)

statusText: текст статуса ответа напр. "200 OK" 

responseType: тип ответа (можно указать тип ожидаемого ответа xhr.responseType = 'json')
"" - (по умолчанию) строка,
"arraybuffer" - (для бинарных данных, массив),
"blob" - для бинарных данных, 
"document" XML-документ (может использовать XPath и другие XML-методы),
"json" - JSON (парсится автоматически), 
"text" - строка

response: ответ сервера

responseText: текст ответа сервера

responseXML: возвращает XML
*/



/* Свойство readystatechange объекта XMLHttpRequest содержит обработчик
события которое возникает каждый раз при изменении свойства readyState
Изменения появляются при каждом изменении статуса запроса. 
Внимание: Не должно использоваться при синхронных запросах  и из исходного кода (native code).
Событие readystatechange не произойдёт если запрос XMLHttpRequest отменён методом abort(). */
xhr.onreadystatechange = function () {
  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.responseText);
  };
};

/* свойство readyState - хранит статус запроса 
0: объект XMLHttpRequest создан, но метод open() еще не был вызван для инициализации объекта
1: метод open() был вызван, но запрос еще не был отправлен методом send()
2: запрос был отправлен, заголовки и статус ответа получены и готовы к использованию
3: ответ получен от сервера
4: выполнение запроса полностью завершено (даже если получен код ошибки, например, 404) */
xhr.onreadystatechange = function () {
  if(xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
  };
};

/* Событие load также можно использовать для обработки ответа сервера вместо onreadystatechange */
xhr.onload = function() {
  alert(`Загружено: ${xhr.status} ${xhr.response}`);
};

// то же в другой записи
let request = new XMLHttpRequest(); 
function responceLoad() {
    if (request.readyState == 4) {
        var status = request.status;
        if (status == 200) {
            document.write(request.responseText);
        } else {
            document.write("Ответ сервера " + request.statusText);
        }
    }
} 
request.open("GET", "http://localhost:8080/hello.txt");
request.onload = responceLoad; // запись в свойство заранее объявленной функции
request.send();

/* Событие error - запрос не может быть выполнен, например, нет соединения или невалидный URL */

/* Событие progress - происходит периодически во время загрузки ответа, сообщает о прогрессе */

/* Полный пример обработки событий */

// 1. Создаём новый XMLHttpRequest-объект
let xhr = new XMLHttpRequest();
// 2. Настраиваем его: GET-запрос по URL /article/.../load
xhr.open('GET', '/article/xmlhttprequest/example/load');
// 3. Отсылаем запрос
xhr.send();
// 4. Этот код сработает после того, как мы получим ответ сервера
xhr.onload = function() {
  if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
  } else { // если всё прошло гладко, выводим результат
    alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
  }
};
xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`Получено ${event.loaded} из ${event.total} байт`);
  } else {
    alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
  }
};
xhr.onerror = function() {
  alert("Запрос не удался");
};



/* Определить таймаут в течение которого ожидаем ответ */
xhr.timeout = 10000; // таймаут указывается в миллисекундах, т.е. 10 секунд



/* Объект URL - использование кодировки URL (URL с параметрами ?name=value) */
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!');
// параметр 'q' закодирован
xhr.open('GET', url); // https://google.com/search?q=test+me%21

/* Метод encodeURIComponent() кодировка отправляемых параметров */
let body = "name=" + encodeURIComponent(user.name) + "&age="+encodeURIComponent(user.age);

/* Метод decodeURIComponent() обратное декодирование  */
let encodeName = encodeURIComponent(user.name); // Tom%26Tim
let decodeName = decodeURIComponent(encodeName); // Tom&Tim


/* HTTP заголовки 
XMLHttpRequest может указывать заголовки в запросе и читать присланные в ответ 
для этого есть три метода. Некоторые заголовки могут управлятся только браузером. Их изменение 
невозможно. (Referer, Host и др.) Также поставленные заголовки нельзя снять. Повторные вызовы 
будут их дописывать, а не переписывать */

/* 1) setRequestHeader(name, value) устанавливает заголовок запроса с именем name и значением value*/
xhr.setRequestHeader('Content-Type', 'application/json');

// пример того что заголовки не переписываются
xhr.setRequestHeader('X-Auth', '123');// заголовок получится такой:
xhr.setRequestHeader('X-Auth', '456');// X-Auth: 123, 456

/* 2) getResponseHeader(name) возвращает значение заголовка ответа name 
(кроме Set-Cookie и Set-Cookie2).*/
xhr.getResponseHeader('Content-Type')

/* 3) getAllResponseHeaders() возвращает все заголовки ответа в виде одной строки, 
кроме Set-Cookie и Set-Cookie2 */
Cache-Control: max-age=31536000
Content-Length: 4260
Content-Type: image/png
Date: Sat, 08 Sep 2012 16:53:16 GMT

/* Перевод строки между заголовками - "\r\n" в любой OC. Значение - ключ отделено : с пробелом */
let headers = xhr
  .getAllResponseHeaders()
  .split('\r\n')
  .reduce((result, current) => {
    let [name, value] = current.split(': ');
    result[name] = value;
    return result;
  }, {});

// headers['Content-Type'] = 'image/png'

/* Типовая форма Post запроса */
let user = { // объект для отправки
  name: "Tom",
  age: 23
};
let request = new XMLHttpRequest();
function reqReadyStateChange() {
  if (request.readyState == 4 && request.status == 200)
      document.getElementById("output").innerHTML=request.responseText;
}
let body = "name=" + user.name + "&age="+user.age;
request.open("POST", "http://localhost:8080/postdata.php");
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // заголовок и тип данных
request.onreadystatechange = reqReadyStateChange;
request.send(body);

/* Post запрос при помощи объекта FormData 
создаем новый экземпляр объекта, можем указать из какой form брать данные, */
let formData = new FormData([form]); // создаём объект, по желанию берём данные формы <form>
formData.append(name, value); // добавляем поле
xhr.open('POST', ...) // создаём POST-запрос.
xhr.send(formData) // отсылаем форму серверу.
/* Пример */
// <form name="person">
// <input name="name" value="Петя">
// <input name="surname" value="Васечкин">
// </form> 
  // заполним FormData данными из формы
  let formData = new FormData(document.forms.person);
  // добавим ещё одно поле
  formData.append("middle", "Иванович");
  // отправим данные
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(formData);
  xhr.onload = () => alert(xhr.response);

 /* Пример с JSON */
  let xhr = new XMLHttpRequest();
    let json = JSON.stringify({
      name: "Вася",
      surname: "Петров"
    });
  xhr.open("POST", '/submit')
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.send(json);

  /* Обработчик процесса отправки */
  xhr.upload.onprogress = function(event) {
    alert(`Отправлено ${event.loaded} из ${event.total} байт`);
  };  
  xhr.upload.onload = function() {
    alert(`Данные успешно отправлены.`);
  };  
  xhr.upload.onerror = function() {
    alert(`Произошла ошибка во время отправки: ${xhr.status}`);
  };

  /* Обработчик процесса отправки с индикацией прогресса */

  // <input type="file" onchange="upload(this.files[0])">
  function upload(file) {
  let xhr = new XMLHttpRequest();
  // отслеживаем процесс отправки
  xhr.upload.onprogress = function(event) {
    console.log(`Отправлено ${event.loaded} из ${event.total}`);
  };
  // Ждём завершения: неважно, успешного или нет
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      console.log("Успех");
    } else {
      console.log("Ошибка " + this.status);
    }
  };
  xhr.open("POST", "/article/xmlhttprequest/post/upload");
  xhr.send(file);
}


/* Типовая форма Get запроса XMLHttpRequest */
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { // HTTP ошибка?
    // обработаем ошибку
    alert( 'Ошибка: ' + xhr.status);
    return;
  }

  // получим ответ из xhr.response
};

xhr.onprogress = function(event) {
  // выведем прогресс
  alert(`Загружено ${event.loaded} из ${event.total}`);
};

xhr.onerror = function() {
  // обработаем ошибку, не связанную с HTTP (например, нет соединения)
};