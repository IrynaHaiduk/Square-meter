//Создаем для експорта в filterController.js конструктор для создания обьекта класса Filter
export default class Filter {
    constructor() {
        //Адресная строка с определенными параметрами запроса
        this.query = "";

    }

    //Функция будет отправлять запрос на сервер (по адресу http://jsproject.webcademy.ru/itemsinfo) и получать из него значения параметров 
    async getParams() {
        try {
            //Адрес строки, по которой будет происходить запрос
            const queryString = "http://jsproject.webcademy.ru/itemsinfo";

            //fetch возвращает промис с ответом, необходимо преобразовать json-формат полученных данных. await возвращает результат данного промиса, который тоже является промисом
            const response = await fetch(queryString);

            //Возвращаем промис, внутри которого js-обьект с данными
            const data = await response.json();

            //js-обьект с данными (this.params - свойство обьекта Filter)
            this.params = await data;
        } catch (error) {
            alert(error);
        }

    }

    //Получаем данные с сервера, принимает запрос с фильтра
    async getResults() {
        try {
            //Адрес строки, по которой будет происходить запрос + сформированная строка по определенным параметрам запроса
            const queryString = `http://jsproject.webcademy.ru/items${this.query}`;

            const response = await fetch(queryString);

            const data = await response.json();

            //В обьект Filter запишем поле result c найденными данными с сервера по указанным фильтрам поиска
            this.result = await data;
            console.log("Filter -> geеResults -> this.result", this.result);
        } catch (error) {
            alert(error);
        }


    }

}