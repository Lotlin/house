/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */

const modalBtn = $('.present__btn');
const modalClose = $('.modal-order__close');
const modalOrder = $('.modal-order');
const modalOrderInput = $('.modal-order__input');
const modalOrderTitle = $('.modal-order__title');
const modalOrderForm = $('.modal-order__form');
const burderMenu = $('.header__burger');
const navigation = $('.navigation');
const navigationCloseButton = $('.navigation__close');
const navigationElem = document.querySelector('.navigation');

modalBtn.on('click', () => {
  modalOrder.show(500);
});

modalClose.on('click', () => {
  modalOrder.hide(500);
});

modalOrderInput.focus(function() {
  modalOrderTitle
      // eslint-disable-next-line no-invalid-this
      .text(`Введите ${$(this).attr('placeholder').toLowerCase()}`);
});

modalOrderInput.blur(function() {
  modalOrderTitle
      .text('Заполните форму');
});

modalOrderForm.submit(function(event) {
  event.preventDefault();
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/todos/',
    type: 'POST',
    // eslint-disable-next-line no-invalid-this
    data: $(this).serialize(),
    success(data) {
      modalOrderTitle.text(`Спасибо, ваш заказ № ${data.id} принят`),
      modalOrderForm.slideUp(300);
    },
    error() {
      modalOrderTitle.text('Что-то пошло не так, попробуйте снова');
    },
  });
});

burderMenu.on('click', function() {
  navigation.animate({
    left: 0,
  }, 500, function() {
    navigationCloseButton.animate({
      opacity: 1,
    }, 300, 'swing');

    $('body').on('click', function(event) {
      if (event.target !== navigationElem) {
        navigation.animate({
          left: -400,
        }, 500);
      }
    });
  });
});

navigationCloseButton.on('click', function() {
  navigation.animate({
    left: -400,
  }, 500);
});

