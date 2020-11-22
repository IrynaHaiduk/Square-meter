export default class Favourites {
    constructor() {
        //Массив для избранных обьектов
        this.favs = [];

        //Get elements from Local Storage
        this.readStorage();
    }

    addFav(id) {
        this.favs.push(id);
        //Save to Local Storage
        this.saveData();
    }

    removeFav(id) {
        const index = this.favs.indexOf(id);
        this.favs.splice(index, 1);
        //Save to Local Storage
        this.saveData();
    }

    isFav(id) {
        return this.favs.indexOf(id) !== -1 ? true : false;
    }

    toggleFav(id) {
        this.isFav(id) ? this.removeFav(id) : this.addFav(id);

    }

    //Save to Local Storage
    saveData() {
        localStorage.setItem("favs", JSON.stringify(this.favs));
    }

    //Get elements from Local Storage
    readStorage() {
        const storage = JSON.parse(localStorage.getItem("favs"));

        if (storage) {
            this.favs = storage;
        }
    }
}