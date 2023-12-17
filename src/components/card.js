// @todo: Темплейт карточки
export const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(item, deleteCard, handleCardImage, toggleLike) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', deleteCard);

    cardElement.addEventListener('click', handleCardImage);

    function toggleLike(evt) {
        if (evt.target.classList.contains('card__like-button')) {
            evt.target.classList.toggle('card__like-button_is-active');
        }
    }

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', toggleLike);

    return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(evt) {
    const deletedCard = evt.target.closest('.places__item');
    deletedCard.remove();
}

// @todo: Вывести карточки на страницу
export function addCard(item) {
    placesList.append(item);
}
