import FavouritesCards from "./favouritesCarsModel.js";
import * as view from "./favouritesCardsView.js";

export default async function (state) {
    //Получаем список обьектов, которые находятся  избранном
    const favsList = state.favourites.favs;

    //Получаем данные по избранным обьектам
    const favouritesCards = new FavouritesCards(favsList);
    await favouritesCards.getFavs();

    //Отображаем контейнер и карточки
    view.renderPage(favouritesCards.cards);

    addToFavsListener();

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