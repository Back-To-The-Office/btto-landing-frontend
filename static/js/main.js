document.addEventListener('DOMContentLoaded', () => {
    new WOW().init();
    svg4everybody({});
    const scrollItems = [
        document.querySelector('.product-info__more'),
        document.querySelector('.header-logo'),
        ...document.querySelectorAll('.header-nav__link')
    ],
        functionsTabs = document.querySelectorAll('.functions-tab'),
        priceTabs = document.querySelectorAll('.price-tab'),
        inputForms = document.querySelectorAll('.contacts-form__input'),
        textArea = document.querySelector('.contacts-form__textarea');


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
    
})

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

/* document.addEventListener('scroll', function() {
    if (window.pageYOffset >= 1650) {
        
        var elemsTab = Array.from(document.querySelector(".tab-list").querySelectorAll("li"))
        var ddd = elemsTab.filter(item => item.classList.contains('card-item'));
        for (var i = 0; i <= elemsTab.length; i++) {
            if (elemsTab[i].classList.contains('active') && elemsTab[i].classList.contains('card-item')) {
                event.preventDefault()
                document.querySelector(".functions").scrollIntoView(true)
                elemsTab[i].classList.remove('active');
                ddd.forEach(item => item.classList.remove("hover"));
                elemsTab[i].nextElementSibling.classList.add('active');
                break;
            } else if (elemsTab[i].classList.contains('active') && elemsTab[i].classList.contains('functions-content')) {
                if (elemsTab[i].nextElementSibling != null) {
                    document.querySelector(".functions").scrollIntoView(true)
                    elemsTab[i].classList.remove('active');
                    elemsTab[i].nextElementSibling.classList.add('active');
                    ddd.forEach(item => item.classList.add("hover"));
                    break;
                } else {
                    break;
                }
            }
        }
    }
}) */