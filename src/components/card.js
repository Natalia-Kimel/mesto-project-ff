import { deleteCardApi, putLikeCard, deleteLikeCard } from "./api";
import { handleCardImage, userId } from "../index";
// Темплейт карточки
export const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(item, deleteCard, handleCardImage, toggleLike) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    if (item.owner._id !== userId) {
        deleteCardButton.setAttribute('hidden', 'true');
    };
    deleteCard(deleteCardButton, item._id);

    const openCardImage = cardElement.querySelector('.card__image');
    openCardImage.addEventListener('click', handleCardImage);

    const likeCounter = cardElement.querySelector('.card__likes-counter');
    likeCounter.textContent = item.likes.length;

    const likeButton = cardElement.querySelector('.card__like-button');
    if (isCardLiked(item, userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }
    toggleLike(likeButton, item._id, likeCounter, item);
    
    return cardElement;
}

// Функция удаления карточки
export function deleteCard(btn, cardId) {
    const deletedCard = btn.closest('.places__item');
    btn.addEventListener('click', () => {
        deleteCardApi(cardId)
        .then(() => {
        deletedCard.remove()
        });
    })
}

// Вывести карточки на страницу
export function addCard(arr) {
    arr.forEach((item) => {
        placesList.append(createCard(item, deleteCard, handleCardImage, toggleLike));
    });
}

export function toggleLike(btn, cardId, likeCounter) {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('card__like-button_is-active')) {
            deleteLikeCard(cardId)
            .then((data) => {
                btn.classList.toggle('card__like-button_is-active');
                likeCounter.textContent = data;
            });
        } else {
            putLikeCard(cardId)
            .then((data) => {
                btn.classList.toggle('card__like-button_is-active');
                likeCounter.textContent = data;
            });
        };
    });
}

// проверяю, стоит ли лайк пользователя на карточке
function isCardLiked(item, userId) {
    return item.likes.some((like) => like._id === userId);
  }