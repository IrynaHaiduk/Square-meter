import SingleItem from "./singleItemModel.js";
import * as view from "./singleItemView.js";

export default async function (state) {
    state.singleItem = new SingleItem(state.routeParams);

    //Делаем запрос на сервер с учетом id конкретной открытой карточки и получаем данные по ней
    await state.singleItem.getItem();

    //Рендерим разметку для отдельной карточки
    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id));

    //Запустить прослушку событий
    //Открытие модального окна, которое появляется  при клике на кнопку  "Забронировать"
    document.querySelector(".button-order").addEventListener("click", () => {
        view.showModal();
    });

    //Скрываем модальное окно  при клике на кнопку "Закрыть"
    document.querySelector(".modal__close").addEventListener("click", () => {
        view.hideModal();
    });

    //Скрываем модальное окно  при клике по overlay (пространство вне модального окна)
    document.querySelector(".modal-wrapper").addEventListener("click", (e) => {
        //ПРоверяем, нет ли в элемента, по которому мы кликнули родителя с классом modal
        if (!e.target.closest(".modal")) {
            view.hideModal();
        }

    });

    //Отправка формы заявки
    document.querySelector(".modal__form").addEventListener("submit", async function (e) {
        e.preventDefault();
        //Собыраем введенные данные в форму заявки
        const formData = view.getInput();
        await state.singleItem.submitForm(formData);


        const response = state.singleItem.response;

        if (response.message === "Bid Created") {
            alert("Ваша заявка успешно добавлена");
            view.hideModal();
            view.clearInput();
        } else if (response.message === "Bid Not Created") {
            response.errors.forEach((item) => {
                alert(item);
            });
        }
    });

    //Клик по кнопке "Добавить в избранное" (серднчко)
    document.querySelector("#addToFavouriteBtn").addEventListener("click", () => {
        state.favourites.toggleFav(state.singleItem.id);

        view.toggleFavouriteButton(state.favourites.isFav(state.singleItem.id));
    });
}