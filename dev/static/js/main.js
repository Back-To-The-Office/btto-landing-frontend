document.addEventListener('DOMContentLoaded', () => {
    new WOW({
        mobile: false
    }).init();
    svg4everybody({});
    let scrollItems = [
        document.querySelector('.product-info__more'),
        document.querySelector('.header-logo'),
        ...document.querySelectorAll('.header-nav__link')
    ],
        functionsTabs = document.querySelectorAll('.functions-tab'),
        inputForms = document.querySelectorAll('.form__input'),
        textArea = document.querySelector('.contacts-form__textarea'),
        popUp = document.querySelector('.formPopUp'),
        popUpClose = document.querySelector('.pop-up-close'),
        popUpButtons = document.querySelectorAll('.open-popup'),
        wrapper = document.querySelector('.wrapper'),
        forms = document.querySelectorAll('.form'),
        statusMessages = document.querySelectorAll('.message-status')
        reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    const MAIN_URL = 'http://localhost:8081';

    popUpButtons.forEach(item => item.addEventListener('click', () => {
        togglePopUp();
    }));

    popUpClose.addEventListener('click', () => {
        togglePopUp();
    });

    window.addEventListener('click', event => {
        if (popUp.classList.contains('pop-up-active') && event.target == wrapper) {
            togglePopUp();
        }
    });

    scrollItems.forEach(item => item.addEventListener('click', (event) => {
        event.preventDefault;
        animation(1000)(item.dataset.toElem);
    }));

    functionsTabs.forEach(tab => tab.addEventListener('click', () => {
        let tabName = tab.dataset.showTab;
        document.querySelector(`.${tabName}-tab`).classList.toggle('active');
    }));

    inputForms.forEach(input => {
        input.addEventListener('focusin', () => {
            focusInput(input);
        });
        input.addEventListener('focusout', () => {
            if (input.value == false) {
                unfocusInput(input);
            }
        })
    });

    textArea.addEventListener('focusin', () => {
        focusInput(textArea, true);
    });

    textArea.addEventListener('focusout', () => {
        if (textArea.value == false) {
            unfocusInput(textArea, true);
        }
    });

    forms.forEach(item => item.addEventListener('submit', function (e) {
        e.preventDefault();
        let inputs = item.querySelectorAll('.form__input'),
            textarea = item.querySelector('.contacts-form__textarea'),
            formValue = item.querySelector('.email').value;
        if (reg.test(formValue) == false) {
            callMessage(false, true);
            return false;
        } else {
            inputs.forEach(input => {
                unfocusInput(input);
            });
            if (textarea) {
                unfocusInput(textarea, true)
            }
            togglePopUp();

            let formData = new FormData(this);
            formData = Object.fromEntries(formData);
            ajaxSend(formData);
            this.reset();
        }
    }));

    function focusInput (input, textarea = false) {
        input.classList.add('active');
        if (!textarea) {
            input.previousElementSibling.classList.add('active');
        }
    }

    function unfocusInput(input, textarea = false) {
        input.classList.remove('active');
        if (!textarea) {
            input.previousElementSibling.classList.remove('active');
        }
    }

    function togglePopUp() {
        popUp.classList.toggle('pop-up-active');
        wrapper.classList.toggle('pop-up-active');
    }

    function callMessage(succsessStatus, valid = false) {
        let message;
        if (valid) {
            message = Array.from(statusMessages).filter(message => message.classList.contains('message-status--unvalid'))[0];
            showMessage(message);
        } else if (succsessStatus){
            message = Array.from(statusMessages).filter(message => message.classList.contains('message-status--succsess'))[0];
            showMessage(message);
        } else {
            message = Array.from(statusMessages).filter(message => message.classList.contains('message-status--error'))[0];
            showMessage(message);
        }
    };
    
    function delay(ms) {
        return new Promise(r => setTimeout(() => r(), ms));
    };
    
    async function showMessage(message) {
        message.classList.add('active');
        await delay(4000);
        message.classList.remove('active');
    };
    
    function ajaxSend(formData) {
        fetch(`${MAIN_URL}/api/v1/landing/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })
          .then(response => callMessage(true))
          .catch(error => callMessage(false));
    };
    
    function animation(duration) {
        let temp;
        return sel => {
            cancelAnimationFrame(temp);
            let start = performance.now();
            let from = window.pageYOffset || document.documentElement.scrollTop,
                to = document.querySelector(sel).getBoundingClientRect().top - 69;
            requestAnimationFrame(function step(timestamp) {
                let progress = (timestamp - start) / duration;
                1 <= progress && (progress = 1);
                window.scrollTo(0, from + to * progress | 0);
                1 > progress && (temp = requestAnimationFrame(step))
            })
        }
    };
    
})

