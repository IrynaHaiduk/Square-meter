export default class FavouritesCards {
    constructor(favsList) {
        this.favsList = favsList;

    }

    //Получаем данные с сервера
    async getFavs() {
        const ids = this.favsList.toString() || 0; //1,3,5 (0 если нет элемента в Избранном, то нечего не получим с сервера)
        const queryString = `http://jsproject.webcademy.ru/items?ids=${ids}`;
        const result = await fetch(queryString);
        const data = await result.json();
        this.cards = await data;

    }

}