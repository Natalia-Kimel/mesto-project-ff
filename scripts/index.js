// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', deleteCard);

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    const deletedCard = evt.target.closest('.places__item');
    deletedCard.remove();
}

// @todo: Вывести карточки на страницу
function addCard(item) {
    placesList.append(item);
}

initialCards.forEach((item) => {
    const newCard = createCard(item, deleteCard);
    addCard(newCard);
});