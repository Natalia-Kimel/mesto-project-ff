import './pages/index.css';
import initialCards from './scripts/cards.js';
import { placesList, createCard, deleteCard, addCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

// находим попапы и кнопки их открытия/закрытия
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');

const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');

const popupImage = document.querySelector('.popup_type_image');

const popupClosers = document.querySelectorAll('.popup__close');

// картинка и ее название в попапе
const image = popupImage.querySelector('.popup__image');
const caption = popupImage.querySelector('.popup__caption');

// Находим форму в DOM
const formElement = document.querySelector('.popup__form');

// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// находим форму для создания новой карточки и
const cardFormElement = document.forms['new-place'];
const cardNameInput = cardFormElement['place-name'];
const cardImageInput = cardFormElement['link'];


initialCards.forEach((item) => {
    const newCard = createCard(item, deleteCard, handleCardImage);
    addCard(newCard);
});

// обработчики открытия/закрытия попапов
editButton.addEventListener('click', handleEditClick);
popupClosers[0].addEventListener('click', () => closePopup(popupEdit));

addButton.addEventListener('click', () => openPopup(popupAddCard));
popupClosers[1].addEventListener('click', () => closePopup(popupAddCard));


// функционирование попапа с картинкой
function handleCardImage() {
    const openCardImage = document.querySelectorAll('.card__image');
    openCardImage.forEach(function(el) {
        el.addEventListener('click', function generatePopupImage(evt) {
            caption.textContent = evt.target.closest('.card').textContent;
            image.src = evt.target.src;
            openPopup(popupImage);
        });
    });
    popupClosers[2].addEventListener('click', () => closePopup(popupImage));
}
handleCardImage();

// заводим в попап данные профиля
function handleEditClick() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEdit);
}

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault();
   
    // Получите значение полей jobInput и nameInput из свойства value
    const newName = nameInput.value;
    const newJob = jobInput.value;
    
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = newName;
    profileDescription.textContent = newJob;

    closePopup(popupEdit);
}

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', handleFormSubmit);

// создание карточки из данных в форме
function handleCardSubmit(evt) {
    evt.preventDefault();

    const card = {
    name: cardNameInput.value,
    link: cardImageInput.value,
    };

    const newCard = createCard(card, deleteCard, handleCardImage);

    placesList.prepend(newCard);

    closePopup(popupAddCard);
}

// Прикрепляем обработчик к форме
cardFormElement.addEventListener('submit', handleCardSubmit);



