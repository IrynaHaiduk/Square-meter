import * as view from "./listingView.js";


export default function (state) {
    console.log("Listing started");

    //Рендер контейнера для карточек
    view.render();

    //Рендер карточек
    state.results.forEach(function (item) {
        view.renderCards(item, state.favourites.isFav(item.id));
    });

    //Запускаем прослушку клика по иконке "Добавить в избранное"
    //Запускаем прослушку клика по иконке "Добавить в избранное"
    addToFavsListener();

    //Подписывамся на прослушку события рендера карточки
    state.emitter.subscribe("event:render-listening", () => {
        //Очищаем контейнер с карточками
        view.clearListingContainer();

        //Рендерим карточки согласно запросу фильтра
        state.results.forEach(function (item) {
            view.renderCards(item, state.favourites.isFav(item.id));
        });

        //Запускаем прослушку клика по иконке "Добавить в избранное"
        //Запускаем прослушку клика по иконке "Добавить в избранное"
        addToFavsListener();
    });

    //Функция для работы иконок "Добавить в избранное"
    function addToFavsListener() {
        Array.from(document.getElementsByClassName('card__like')).forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();

                //Находим id обьекта, по которому кликнули 
                const currentId = e.target.closest(".card").dataset.id;

                //Добавляем/Убираем элемент из избранного
                state.favourites.toggleFav(currentId);

                //Включаем/Выключаем кнопку из избранным
                view.toggleFavouriteIcon(e.target.closest(".card__like"), state.favourites.isFav(currentId));
            });
        });
    }
}