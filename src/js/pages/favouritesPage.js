import favouritesCards from "./../favouritesCards/favouritesCardsController.js";

export default function () {

    document.querySelector("#app").innerHTML = "";
    favouritesCards(state);
}