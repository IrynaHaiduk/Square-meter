//Рендерим контейнер для всех карточек с квартирами
export function render() {

    const markup = `
    <div class="cards-wrapper">
    <div class="container p-0 pt-5">
        <div id = "listingContainer" class="row">
        <!-- cards will be here-->
        </div>
    </div>
    </div>`;

    document.querySelector("#app").insertAdjacentHTML("beforeend", markup);
}

//Отображаем разметку картки с информацией о квартире
export function renderCards(object, isFaved) {
    /*   building: "1"
      complex_name: "Генеральский"
      flat_number: "32"
      floor: "8"
      floors_total: "12"
      id: "1"
      image: "http://jsproject.webcademy.ru/images/data/01.png"
      price_sq_m: "48000"
      price_total: "1872000"
      rooms: "1"
      scu: "ГЕН-112"
      square: "39"
      title: "Студия" */

    const listingContainer = document.querySelector("#listingContainer");
    const markup = `
    <article class="col-md-4">
                        <!-- card -->
                        <a href="#/item/${object.id}" class="card" data-id="${object.id}">
                            <div class="card__header">
                                <div class="card__title">
                                    ЖК ${object.complex_name}
                                </div>
                                <div class="card__like ${isFaved ? "card__like--active" : ""}">
                                    <i class="fas fa-heart"></i>
                                </div>
                            </div>
                            <div class="card__img">
                                <img src="${object.image}" alt="План квартиры" />
                            </div>
                            <div class="card__desc">
                                <div class="card__price">
                                    <div class="card__price-total">
                                        ${object.price_total} ₽
                                    </div>
                                    <div class="card__price-per-meter">
                                        ${object.price_sq_m} ₽/м2
                                    </div>
                                </div>

                                <!-- card__params params -->
                                <div class="card__params params">
                                    <div class="params__item">
                                        <div class="params__definition">
                                            Комнат
                                        </div>
                                        <div class="params__value">${object.rooms}</div>
                                    </div>
                                    <div class="params__item">
                                        <div class="params__definition">
                                            Площадь
                                        </div>
                                        <div class="params__value">${object.square}</div>
                                    </div>
                                </div>
                                <!-- //card__params params -->
                            </div>
                            <div class="card__footer">
                                <div class="card__art">${object.scu}</div>
                                <div class="card__floor">Этаж ${object.floor} из ${object.floors_total}</div>
                            </div>
                        </a>
                        <!-- // card -->
                    </article>`;

    listingContainer.insertAdjacentHTML("beforeend", markup);
}


//Функция очистки содержимого контейнера с карточками
export function clearListingContainer() {
    const listingContainer = document.querySelector("#listingContainer");
    listingContainer.innerHTML = "";
}

export function toggleFavouriteIcon(elementIcon, isFaved) {
    if (isFaved) {
        elementIcon.classList.add("card__like--active");
    } else {
        elementIcon.classList.remove("card__like--active");
    }
}