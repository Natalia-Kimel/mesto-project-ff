import './pages/index.css';
import initialCards from './scripts/cards.js';
import { placesList, createCard, deleteCard, addCard, toggleLike } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation } from './components/validation.js';

// находим попапы и кнопки их открытия/закрытия
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');

const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');

const popupImage = document.querySelector('.popup_type_image');

const editPopupCloser = popupEdit.querySelector('.popup__close');
const addPopupCloser = popupAddCard.querySelector('.popup__close');
const imagePopupCloser = popupImage.querySelector('.popup__close');

// картинка и ее название в попапе
const popupImageImg = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption'); 

// Находим форму редактирования профиля
const profileformElement = document.forms['edit-profile'];

// Находим поля формы редактирования
const nameInput = profileformElement['name'];
const jobInput = profileformElement['description'];
export const editSubmitButton = profileformElement.querySelector('.popup__button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// находим форму для создания новой карточки
const cardFormElement = document.forms['new-place'];
export const cardNameInput = cardFormElement['place-name'];
export const cardImageInput = cardFormElement['link'];

initialCards.forEach((item) => {
    const newCard = createCard(item, deleteCard, handleCardImage, toggleLike);
    addCard(newCard);
});

// обработчики открытия/закрытия попапов
editButton.addEventListener('click', handleEditClick);
editPopupCloser.addEventListener('click', () => closePopup(popupEdit));

addButton.addEventListener('click', () => openPopup(popupAddCard));
addPopupCloser.addEventListener('click', () => closePopup(popupAddCard));

imagePopupCloser.addEventListener('click', () => closePopup(popupImage));


// колбэк клика по карточке
function handleCardImage(evt) {
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

// Обработчик «отправки» формы редактирования профиля
function handleEditFormSubmit(evt) {
    evt.preventDefault();
   
    // Получаем значение полей jobInput и nameInput из свойства value
    const newName = nameInput.value;
    const newJob = jobInput.value;
    
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = newName;
    profileDescription.textContent = newJob;

    closePopup(popupEdit);
}

// Прикрепляем обработчик к форме
profileformElement.addEventListener('submit', handleEditFormSubmit);

// создание карточки из данных в форме
function handleCardSubmit(evt) {
    evt.preventDefault();

    const card = {
    name: cardNameInput.value,
    link: cardImageInput.value,
    };

    const newCard = createCard(card, deleteCard, handleCardImage, toggleLike);

    placesList.prepend(newCard);

    closePopup(popupAddCard);

    cardFormElement.reset();
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

