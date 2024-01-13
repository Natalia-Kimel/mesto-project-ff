import { deleteCardApi, putLikeCard, deleteLikeCard } from "./api";
import { userId } from "../index";
// Темплейт карточки
export const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(item, deleteCard, handleCardImage, handleLikeCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    const openCardImage = cardElement.querySelector('.card__image');
    openCardImage.addEventListener('click', handleCardImage);

    const likeCounter = cardElement.querySelector('.card__likes-counter');
    likeCounter.textContent = item.likes.length;
    
    const likeButton = cardElement.querySelector('.card__like-button');
    if (checkStatusLike(item, userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }
    likeButton.addEventListener('click', () => { handleLikeCard(item, cardElement) });

    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    if (item.owner._id === userId) {
        deleteCardButton.addEventListener('click', () => { deleteCard(item, cardElement) });
    } else {
        deleteCardButton.setAttribute('hidden', '');
    }
    
    return cardElement;
}

// Функция удаления карточки
export function deleteCard(item, cardElement) {
    deleteCardApi(item._id)
        .then(() => {
            cardElement.remove();
            })
        .catch((err) => {
            console.log(err);
        });
}

// проверяю, стоит ли лайк пользователя на карточке
function checkStatusLike(item, userId) {
    return item.likes.some((like) => like._id === userId);
  }

// функция лайка
export function handleLikeCard(item, cardElement) {
    if (cardElement.querySelector('.card__like-button').classList.contains('card__like-button_is-active')) {
        deleteLikeCard(item._id)
            .then((res) => {
                changeLike(res, cardElement);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        putLikeCard(item._id)
            .then((res) => {
                changeLike(res, cardElement);
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

function changeLike(item, cardElement) {
    cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
    cardElement.querySelector('.card__likes-counter').textContent = item.likes.length;
}