function tabs(elem) {
    const tabs = document.querySelectorAll(`.tab__link`);
    const contents = document.querySelectorAll(`.${elem}__item`);

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', (e) => {
            e.preventDefault();
            let tabsParent = e.target.parentElement;

            // Удаление класса 'tab__item--active' у всех элементов-родителей
            for (let j = 0; j < tabs.length; j++) {
                tabs[j].parentNode.classList.remove(`tab__item--active`);
            }

            // Добавление класса 'tab__item--active' к текущему элементу
            tabsParent.classList.add(`tab__item--active`);

            // Удаление класса '${elem}__item_active' у всех дочерних элементов содержимого
            for (let k = 0; k <  contents.length; k++) {
              contents[k].classList.remove(`${elem}__item_active`);
            }

            // Добавление класса '${elem}__item_active' к соответствующему элементу содержимого
            contents[i].classList.add(`${elem}__item_active`);
        });
    }
}

tabs('tabs');
