export function openPopup(popup) {
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
        popup.classList.add('popup_is-opened');
    }, 10);
    document.addEventListener('keydown', closePopupEsc);
    document.addEventListener('click', closePopupOverlay);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
    document.removeEventListener('click', closePopupOverlay);
}

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popupIsOpened = document.querySelector('.popup_is-opened');
        closePopup(popupIsOpened);
    }
}

function closePopupOverlay(evt) {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    if (evt.target.contains(popupIsOpened)) {
        closePopup(popupIsOpened);
    }
}