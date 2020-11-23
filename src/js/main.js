'use strict';

//Подключаем все страници в main.js
import homePage from "./pages/homePage.js";
import singleItemPage from "./pages/singleItemPage.js";
import favouritesPage from "./pages/favouritesPage.js";
import bidsPage from "./pages/bidsPage.js";
import errorPage from "./pages/errorPage.js";
import EventEmitter from "./utils/EventEmiter.js";
import Favourites from "./favourites/favouritesModel.js";

// Ждем, когда загрузится DOM-дерево, а потом выполняем js-код
document.addEventListener('DOMContentLoaded', () => {
    //Обьект состояния приложения (содержит информацию, которая передается в Filter)
    const state = {
        results: [],
        emitter: new EventEmitter(),
        favourites: new Favourites()
    };

    //For testing. Then delete
    window.state = state;

    //Routes
    const routes = [{
            path: "/",
            component: homePage
        },
        {
            path: "item",
            component: singleItemPage
        },
        {
            path: "favourites",
            component: favouritesPage
        },
        {
            path: "bids",
            component: bidsPage
        },

    ];

    //Функция принимает выбранный маршрут и массив доступных маршрутов и показывает компонент, который нужно запустить
    function findComponentByPath(path, routes) {
        return routes.find(function (route) {
            return route.path === path;
        });
    }



    // В зависимости от маршрута, куда мы заходим, будет вызывать нужный компонент, который рендерит нужный контент (работает когда страница загружается и когда происходит нажатие на ссылки страниц и при обновлении)
    function router() {

        //location.hash возвращает все, что написано после первого слэша / (#/item),, разбиваем то, что получили на массив по разделителю слэш /: ["#", "item"] 
        const pathArray = location.hash.split("/");

        //Проверяем первый элемент массива pathArray, если он равен пустой строке, нет символа #, то есть это главная страница, то мы присваиваем "/", иначе берем второй элемент массива ["#", "item"]: item 
        let currentPath = pathArray[0] === "" ? "/" : pathArray[1];

        //Проверяем currentPath, если вернулась пустаю строка при таком адрессе /#/, то мы присваиваем "/", иначе оставляем то, что получили
        currentPath = currentPath === "" ? "/" : currentPath;

        //Ищем id каждой карточки (в адресной строке после item/, в массиве pathArray это третий элемент) index.html#/item/3
        state.routeParams = pathArray[2] || "";


        //В обьекте  {path: "bids", component: {…}}, который возвращает функция findComponentByPath сделаем деструктуризацию, возьмем из него только component, учитываем ситуацию, когда будет неверно введен адрес страницы (возвращаем пустой обьект || {} и рендерим компонент страницы для ошибок ErrorComponent)
        const {
            component = errorPage
        } = findComponentByPath(currentPath, routes) || {};

        component(state);
    }

    //Вызываем функцию router при загрузке (перезагрузке страницы) и клика по ссылкам страницы (измениние адресса страницы после символа #)

    //Измениние адресса страницы после символа # : http: //localhost:3000/index.html/#/object
    window.addEventListener("hashchange", router);
    window.addEventListener("load", router);
});