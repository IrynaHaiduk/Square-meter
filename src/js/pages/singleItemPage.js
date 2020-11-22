import singleItem from "./../singleItem/singleItemController.js";

export default function (state) {

    //Очищаем контейнер приложения от предыдущих данных, чтобы отобразить данные по конкретной квартире
    document.querySelector("#app").innerHTML = "";

    // Запускаем компонент singleItem, который будет отображать данные по конкретной квартире
    singleItem(state);
}