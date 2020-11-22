import bids from "./../bids/bidsController.js";


export default function (state) {
    //Очищаем контейнер
    document.querySelector("#app").innerHTML = "";
    bids(state);

    // document.querySelector("#app").innerHTML = markup;
}