document.addEventListener('DOMContentLoaded', () => {
    new WOW().init();
    svg4everybody({});
    let scrollItems = [
        document.querySelector('.product-info__more'),
        document.querySelector('.header-logo'),
        ...document.querySelectorAll('.header-nav__link')
    ],
        functionsTabs = document.querySelectorAll('.functions-tab'),
        priceTabs = document.querySelectorAll('.price-tab'),
        inputForms = document.querySelectorAll('.form__input'),
        textArea = document.querySelector('.contacts-form__textarea'),
        popUp = document.querySelector('.product-form'),
        popUpClose = document.querySelector('.pop-up-close'),
        popUpButtons = document.querySelectorAll('.open-popup'),
        wrapper = document.querySelector('.wrapper'),
        forms = document.querySelectorAll('.form');

    popUpButtons.forEach(item => item.addEventListener('click', () => {
        popUp.classList.toggle('pop-up-active');
        wrapper.classList.toggle('pop-up-active');
    }));

    popUpClose.addEventListener('click', () => {
        popUp.classList.remove('pop-up-active');
        wrapper.classList.remove('pop-up-active');
    });

    window.addEventListener('click', event => {
        if (popUp.classList.contains('pop-up-active') && event.target == wrapper) {
            popUp.classList.remove('pop-up-active');
            wrapper.classList.remove('pop-up-active');
        }
    });

    scrollItems.forEach(item => item.addEventListener('click', (event) => {
        event.preventDefault;
        animation(1000)(item.dataset.toElem);
    }));

    functionsTabs.forEach(tab => tab.addEventListener('click', () => {
        tab.classList.toggle('active');
        let tabName = tab.dataset.showTab;
        document.querySelector(`.${tabName}-tab`).classList.toggle('active');
    }));

    priceTabs.forEach(tab => tab.addEventListener('click', () => {
        const childNodes = Array.from(tab.parentNode.children)
        childNodes.forEach(elem => elem.classList.remove('active'));
        tab.classList.add('active');
    }));

    inputForms.forEach(input => {
        input.addEventListener('focusin', () => {
            input.classList.add('active');
            input.previousElementSibling.classList.add('active');
        });
        input.addEventListener('focusout', () => {
            if (input.value == false) {
                input.classList.remove('active');
                input.previousElementSibling.classList.remove('active');
            }
        })
    });

    textArea.addEventListener('focusin', () => {
        textArea.classList.add('active');
    });

    textArea.addEventListener('focusout', () => {
        if (textArea.value == false) {
            textArea.classList.remove('active');
        }
    });

    forms.forEach(item => item.addEventListener('submit', function (e) {
        e.preventDefault();
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var formValue = item.querySelector('.email').value;
        if (reg.test(formValue) == false) {
            alert('Введите корректный e-mail');
            return false;
        } else {
            let formData = new FormData(this);
            formData = Object.fromEntries(formData);
            console.log(formData)
            ajaxSend(formData);
            this.reset();
        }
    }));

    
})

const ajaxSend = (formData) => {
    fetch("http://localhost:8081/api/v1/landing/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => alert("Сообщение отправлено"))
      .catch(error => console.error(error));
};

function animation(duration) {
    var temp;
    return function (sel) {
        cancelAnimationFrame(temp);
        var start = performance.now();
        var from = window.pageYOffset || document.documentElement.scrollTop,
            to = document.querySelector(sel).getBoundingClientRect().top - 69;
        requestAnimationFrame(function step(timestamp) {
            var progress = (timestamp - start) / duration;
            1 <= progress && (progress = 1);
            window.scrollTo(0, from + to * progress | 0);
            1 > progress && (temp = requestAnimationFrame(step))
        })
    }
}