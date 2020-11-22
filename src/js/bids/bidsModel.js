export default class Bids {
    constructor() {

    }


    //Получаем данные по заявкам с серверв
    async getBids() {

        try {
            const queryString = `http://jsproject.webcademy.ru/bids`;

            const result = await fetch(queryString);
            const data = result.json();
            this.bids = await data;
        } catch (error) {
            console.log(error);
            alert("Error with getting Bids");
        }

    }
}