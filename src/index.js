import './pages/index.css';
import { placesList, createCard, deleteCard, handleLikeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, pushInfo, pushAvatar, postCardApi } from './components/api';

// находим попапы и кнопки их открытия/закрытия
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

const imgEditAvatar = document.querySelector('.edit-avatar__image');
const popupEditAvatar = document.querySelector('.popup_type_avatar');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');

const popupImage = document.querySelector('.popup_type_image');

const buttonClosePopupProfile = popupEditProfile.querySelector('.popup__close');
const buttonClosePopupAvatar = popupEditAvatar.querySelector('.popup__close');
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__close');
const buttonClosePopupImage = popupImage.querySelector('.popup__close');

// картинка и ее название в попапе
const popupImageImg = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption'); 

// Находим форму редактирования профиля
const profileFormElement = document.forms['edit-profile'];

// находим форму редактирования аватара
const avatarFormElement = document.forms['new-avatar'];
const avatarInput = avatarFormElement['link'];
const avatarSubmitButton = avatarFormElement.querySelector('.popup__button');

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
buttonEditProfile.addEventListener('click', handleEditClick);
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupEditProfile));

imgEditAvatar.addEventListener('click', () => openPopup(popupEditAvatar));
buttonClosePopupAvatar.addEventListener('click', () => closePopup(popupEditAvatar));

buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));
buttonClosePopupAddCard.addEventListener('click', () => closePopup(popupAddCard));


buttonClosePopupImage.addEventListener('click', () => closePopup(popupImage));


// колбэк клика по карточке
export function handleCardImage(evt) {
    popupImageCaption.textContent = evt.target.alt;
    popupImageImg.alt = evt.target.alt;
    popupImageImg.src = evt.target.src;

    openPopup(popupImage);
}

// заводим в попап данные профиля
function handleEditClick() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEditProfile);
    clearValidation(profileFormElement, validationConfig);
}

// отправка формы редактирования профиля
function handleEditFormSubmit(evt) {
    evt.preventDefault();
   
    editSubmitButton.textContent = 'Сохранение...';

    // Получаем значение полей jobInput и nameInput из свойства value
    const newInfo = {
        name: nameInput.value,
        about: jobInput.value
    };
    pushInfo(newInfo)
        .then((newInfo) => {
            profileTitle.textContent = newInfo.name;
            profileDescription.textContent = newInfo.about;

            closePopup(popupEditProfile);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            editSubmitButton.textContent = "Сохранить";
        });
}

// отправка формы редактирования аватара
function handleAvatarFormSubmit(evt) {
    evt.preventDefault();

    avatarSubmitButton.textContent = "Сохранение...";

    const avatar = avatarInput.value;
    pushAvatar(avatar)
        .then((newAvatar) => {
            profileImage.src = newAvatar.avatar;

            closePopup(popupEditAvatar);

            avatarFormElement.reset();
            clearValidation(cardFormElement, validationConfig);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            avatarSubmitButton.textContent = "Сохранить";
        });
  }

// Прикрепляем обработчик к форме
profileFormElement.addEventListener('submit', handleEditFormSubmit);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

// создание карточки из данных в форме
function handleCardSubmit(evt) {
    evt.preventDefault();

    cardSubmitButton.textContent = 'Сохранение...';

    postCardApi()
        .then((res) => {
            const newCard = createCard(res, deleteCard, handleCardImage, handleLikeCard);
            
            placesList.prepend(newCard);

            closePopup(popupAddCard);

            cardFormElement.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            cardSubmitButton.textContent = "Сохранить";
        });
}

// Прикрепляем обработчик к форме
cardFormElement.addEventListener('submit', handleCardSubmit);

// Вывести карточки на страницу
function addCard(arr) {
    arr.forEach((item) => {
        placesList.append(createCard(item, deleteCard, handleCardImage, handleLikeCard));
    });
}

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
    });

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