//Подключаеи полифил для корректного отображения в старых браузерах
import "url-search-params-polyfill";

//Описываем элементы, которые нам пригодятся в работе
const elements = {

    //getElementsByClassNameвозвращает динамическую коллекцию с актуальными данными (выбираем потом первый элемент [0])
    //Выбор ЖК
    filterSelect: document.getElementsByClassName("filter__dropdown"),

    //Выбор количества комнат
    filterRooms: document.getElementsByClassName("rooms__checkbox"),

    //Площадь и цена
    filterFields: document.getElementsByClassName("range__input"),

    //Кнопка "Показать обьекты"
    filterSubmit: document.getElementsByClassName("filter__show")
};

//Отображаем разметку фильтра на странице main.js
export function render(params) {

    //Создаем строку (разметку), в которой будут хранится все option, названия для которых мы получим с сервера
    let complexNames = "";

    //Получаем данные о названии ЖК с сервера (с массива complexNames: ["Генеральский", "Квантум", "Лесной", "Речной"]) и создаем option с нужными именами (постоянно дописываем новый option в строку)
    params.complexNames.forEach((name) => {
        complexNames += `<option value="${name}"
>ЖК ${name}</option>`;
    });

    //Создаем разметку для отображения количества комнат
    let rooms = "";


    //Получаем данные о количестве комнат  с сервера (с массива roomValues: ["1", "2", "3", "4", "5"])  и создаем разметку для каждого значения  (постоянно дописываем новый input и label  с нужными значениями в строку)
    params.roomValues.forEach((value) => {
        rooms += `<input
        name="rooms"
        type="checkbox"
        id="rooms_${value}"
        class="rooms__checkbox"
        value=${value}>
    <label for="rooms_${value}" class="rooms__btn">${value}</label>`;
    });


    const markup = ` <form id ="filter-form" method="GET" class="container p-0">
    <div class="heading-1">Выбор квартир:</div>
    <div class="filter">
        <div class="filter__col">
            <div class="filter__label">Выбор проекта:</div>
            <select name="complex" id="" class="filter__dropdown">
                <option value="all">Все проекты</option>
               ${complexNames}
            </select>
        </div>
        <div class="filter__col rooms">
            <div class="filter__label">Комнат:</div>
            <div class="rooms__wrapper">
               ${rooms}
            </div>
        </div>
        <div class="filter__col">
            <div class="filter__label">Площадь:</div>
            <div class="range__wrapper">
                <label class="range">
                    <div for="" class="range__label">от</div>
                    <input
                        name="sqmin"
                        min="0"
                        type="number"
                        class="range__input"
                        placeholder="${params.squareMin}"
                        value="${params.squareMin}"
                    />
                    <div class="range__value">м2</div>
                </label>
                <label class="range">
                    <div for="" class="range__label">до</div>
                    <input
                        name="sqmax"
                        min="0"
                        type="number"
                        class="range__input"
                        placeholder="${params.squareMax}"
                        value="${params.squareMax}"
                    />
                    <div class="range__value">м2</div>
                </label>
            </div>
        </div>
        <div class="filter__col">
            <div class="filter__label">Стоимость:</div>
            <div class="range__wrapper">
                <div class="range">
                    <label for="" class="range__label">от</label>
                    <input
                        type="number"
                        name="pricemin"
                        min="0"
                        class="range__input range__input--price"
                        placeholder="${params.priceMin}"
                        value="${params.priceMin}"
                    />
                    <div class="range__value">₽</div>
                </div>
                <div class="range">
                    <label for="" class="range__label">до</label>
                    <input
                        type="number"
                        name="pricemax"
                        min="0"
                        class="range__input range__input--price"
                        placeholder="${params.priceMax}"
                        value="${params.priceMax}"
                    />
                    <div class="range__value">₽</div>
                </div>
            </div>
        </div>
    </div>
    <div class="filter__buttons">
        <button class="filter__show">Показать обьекты</button>
        <button class="filter__reset" type="reset">Сбросить фильтр</button>
    </div>
</form>`;

    document.querySelector("#app").insertAdjacentHTML("afterbegin", markup);
}

//Изменяет содержимое кнопки для отображения количества найденных обьектов
export function changeButtonText(number) {
    const btn = elements.filterSubmit[0];

    btn.textContent = number > 0 ? `Показать ${number} объектов` : "Обьекты не найдены. Измените условия поиска";

    //Если элементов по указанных параматрах не найдено, делаем кнопку неактивной, чтобы по ней нельзя было кликать
    /* if (number === 0) {
        btn.disabled = true;
    } else {
        btn.disabled = false;
    } */

    btn.disabled = number === 0 ? true : false;
}

//Получаем все данные из формы
//Подключили вверху страницы полифил для корректной работы во всех браузерах класса URLSearchParams
export function getInput() {
    const searchParams = new URLSearchParams();

    //Получение значение с select (варианты ЖК)

    //Проверяем, что мы выбрали конкретный ЖК, а не верхнюю опцию "Все проекты"
    if (elements.filterSelect[0].value !== "all") {
        //Добавляем параметры в строку с запросом, который мы формируем
        searchParams.append(elements.filterSelect[0].name, elements.filterSelect[0].value);
    }



    //Параметры комнат - чекбоксы (можно выбрать несколько rooms=2,3)
    const roomsValues = [];

    //Обходим все чекбоксы и записываем значение value в массив roomsValues 
    Array.from(elements.filterRooms).forEach((checkbox) => {
        if (checkbox.value !== "" && checkbox.checked) {
            roomsValues.push(checkbox.value);
        }
    });


    //Превращаем массив roomsValues в строку с разделителем "," 1,4,5,3
    const roomsValuesString = roomsValues.join(",");

    if (roomsValuesString !== "") {
        searchParams.append("rooms", roomsValuesString);
    }

    //Площадь и цена
    Array.from(elements.filterFields).forEach((input) => {
        if (input.value !== "") {
            searchParams.append(input.name, input.value);
        }
    });

    //Адресная строка со всеми параметрами по поиску
    const queryString = searchParams.toString();

    if (queryString) {
        return "?" + queryString;
    } else {
        return "";
    }

}