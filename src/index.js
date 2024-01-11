import './pages/index.css';
import initialCards from './scripts/cards.js';
import { placesList, createCard, deleteCard, addCard, toggleLike } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, pushInfo, pushAvatar, postCardApi } from './components/api';

// находим попапы и кнопки их открытия/закрытия
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');

const editAvatar = document.querySelector('.edit-avatar__image');
const popupEditAvatar = document.querySelector('.popup_type_avatar');

const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');

const popupImage = document.querySelector('.popup_type_image');

const editPopupCloser = popupEdit.querySelector('.popup__close');
const editAvatarCloser = popupEditAvatar.querySelector('.popup__close');
const addPopupCloser = popupAddCard.querySelector('.popup__close');
const imagePopupCloser = popupImage.querySelector('.popup__close');

// картинка и ее название в попапе
const popupImageImg = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption'); 

// Находим форму редактирования профиля
const profileFormElement = document.forms['edit-profile'];

// находим форму для редактирования аватара
const avatarFormElement = document.forms['new-avatar'];
const avatarInput = avatarFormElement['link'];

// Находим поля формы редактирования
const nameInput = profileFormElement['name'];
const jobInput = profileFormElement['description'];
export const editSubmitButton = profileFormElement.querySelector('.popup__button');

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const profileImage = document.querySelector('.profile__image');

// находим форму для создания новой карточки
const cardFormElement = document.forms['new-place'];
export const cardNameInput = cardFormElement['place-name'];
export const cardImageInput = cardFormElement['link'];
export const cardSubmitButton = cardFormElement.querySelector('.popup__button');

export let userId = '';



// обработчики открытия/закрытия попапов
editButton.addEventListener('click', handleEditClick);
editPopupCloser.addEventListener('click', () => closePopup(popupEdit));

editAvatar.addEventListener('click', () => openPopup(popupEditAvatar));
editAvatarCloser.addEventListener('click', () => closePopup(popupEditAvatar));

addButton.addEventListener('click', () => openPopup(popupAddCard));
addPopupCloser.addEventListener('click', () => closePopup(popupAddCard));

imagePopupCloser.addEventListener('click', () => closePopup(popupImage));


// колбэк клика по карточке
export function handleCardImage(evt) {
    popupImageCaption.textContent = popupImageImg.alt = evt.target.alt;
    popupImageImg.src = evt.target.src;
    openPopup(popupImage);
}

// заводим в попап данные профиля
function handleEditClick() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEdit);
}

// отправка формы редактирования профиля
function handleEditFormSubmit(evt) {
    evt.preventDefault();
   
    // Получаем значение полей jobInput и nameInput из свойства value
    const newInfo = {
        name: nameInput.value,
        about: jobInput.value
    };
    pushInfo(newInfo)
    .then((newInfo) => {
        profileTitle.textContent = newInfo.name;
        profileDescription.textContent = newInfo.about;
    });
    closePopup(popupEdit);
}

// отправка формы редактирования аватара
function handleAvatarFormSubmit(evt) {
    evt.preventDefault();

    const avatar = avatarInput.value;
    pushAvatar(avatar)
    .then((newAvatar) => {
        profileImage.src = newAvatar.avatar;
    })
    .catch((err) => {
        console.log(err);
    });
    closePopup(popupEditAvatar);
  }

// Прикрепляем обработчик к форме
profileFormElement.addEventListener('submit', handleEditFormSubmit);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

// создание карточки из данных в форме
function handleCardSubmit(evt) {
    evt.preventDefault();

    postCardApi()
    .then(() => {
        const card = {
            name: cardNameInput.value,
            link: cardImageInput.value,
            likes: [],
            _id: userId,
            owner: {
                _id: userId
            }
        }

        const newCard = createCard(card, deleteCard, handleCardImage, toggleLike);

        placesList.prepend(newCard);

        closePopup(popupAddCard);

        cardFormElement.reset();
    });
    
}

// Прикрепляем обработчик к форме
cardFormElement.addEventListener('submit', handleCardSubmit);

// Валидация
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, cards]) => {
        profileTitle.textContent = userInfo.name;
        profileDescription.textContent = userInfo.about;
        profileImage.src = userInfo.avatar;
        userId = userInfo._id;
        addCard(cards);
    })
    .catch((err) => {
        console.log(err);
})