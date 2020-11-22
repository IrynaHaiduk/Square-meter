//Импортируем класс Filter для создание обьекта из filterModel.js
import Filter from "./filterModel.js";

//Импортируем все функции из filterView.js как обьект view
import * as view from "./filterView.js";

import listing from "./../listing/listingController.js";


//Функция для експорта в HomePage (отвечает за работу фильтра)
export default async function (state) {

    //Создаем обьект на основе класса Filter (если поле filter не существует в обьекте state, то мы его создаем )
    if (!state.filter) state.filter = new Filter();

    //Получаем данные с сервера (параметры для фильтра)
    await state.filter.getParams();

    //Запускаем на выполнение функцию отображения фильтра
    view.render(state.filter.params);

    //Запрос на сервер
    await state.filter.getResults();

    //Записываем полученный результат с сервера при запуске страницы
    state.results = state.filter.result;

    //Обновляем счетчик на кнопке "Показать обьекты" (передаем длину массива полученных данных о квартирах)
    view.changeButtonText(state.filter.result.length);


    //Прослушка событий изменений параметров поиска в форме
    const form = document.querySelector("#filter-form");

    form.addEventListener("change", async function (e) {
        e.preventDefault();

        //Получаем все данные из формы
        state.filter.query = view.getInput();

        //Делаем запрос на сервер, ждем пока их получим, чтобы отобразить корректные данные по количеству квартир на кнопке
        await state.filter.getResults();

        //Записываем результаты поиска данных с сервера
        state.results = state.filter.result;

        //Обновляем счетчик на кнопке "Показать обьекты" (передаем длину массива полученных данных о квартирах)
        view.changeButtonText(state.filter.result.length);

    });


    //Прослушиваем событие нажатия на кнопку "Сбросить фильтр"
    form.addEventListener("reset", async function () {
        //Записывам пустую строку в строку с параметрами запроса, чтобы сбросить выделенные значения и получить все обьекты
        state.filter.query = "";

        //Делаем запрос на сервер, чтобы получить все обьекты
        await state.filter.getResults();

        //Обновляем счетчик на кнопке "Показать обьекты" (передаем длину массива полученных данных о квартирах)
        view.changeButtonText(state.filter.result.length);

        //Запрос на сервер
        await state.filter.getResults();

        //Записываем полученный результат с сервера 
        state.results = state.filter.result;
    });

    //Прослушиваем событие отправки формы
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Submit");
        //Генерируем событие рендера карточек
        state.emitter.emit("event:render-listening", {});

    });

}