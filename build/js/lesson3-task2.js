function cart() {

   
    let linkPref = "./build/img/phon"
    const NAMES = ['5.9" Смартфон Samsung Galaxy A40 64 ГБ белый', '5.9" Смартфон Samsung Galaxy A40 64 ГБ красный', '5.9" Смартфон Samsung Galaxy A40 64 ГБ синий', '5.9" Смартфон Samsung Galaxy A40 64 ГБ черный', '6.4" Смартфон Samsung Galaxy A50 128 ГБ белый', '6.4" Смартфон Samsung Galaxy A50 128 ГБ синий', '6.4" Смартфон Samsung Galaxy A50 128 ГБ черный', '6.7" Смартфон Samsung Galaxy A70 128 ГБ белый', '6.7" Смартфон Samsung Galaxy A70 128 ГБ синий', '6.7" Смартфон Samsung Galaxy A80 128 ГБ золотистый', '6.7" Смартфон Samsung Galaxy A80 128 ГБ серебристый']
    const PRISE = [10000, 12000, 13000, 18000, 25000, 25000, 30000, 30000, 35000, 60000, 61000]
    const ID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const LINK = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const DATABASE = [NAMES, PRISE, ID, LINK]
    let arrId = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // массив для подсчета кликнутых id
    let classProduct = 'product' // css class карточки товара
    let classProductCart = 'contCorz__product' // css class карточки товара
    let classImg = 'product__img' // css class img
    let classImgCart = 'contCorz__product__imgCart' // css class img
    let varClassName = 'product__name' // css class nane
    let varClassNameCart = 'contCorz__product__nameCart' // css class nane
    let classPrise = 'product__prise' // css class img
    let classPriseCart = 'contCorz__product__priseCart' // css class PriseCart
    let classQuentlyCart = 'contCorz__product__quentlyCart' // css class PriseCart
    let classButton = 'product__button' // css class button
    let classButtonActiv = " product__button-activ" //css class activ
    let f = 1

    LINK.forEach((e, i) => LINK[i] = linkPref + (i + 1) + '.jpg')

   

    let shop = { //   создаем обЪект магазина 
        cotalog: [],
        cart: [],
        buildAarr: function () { // загружаем данные в обект из масивов бд
            let objProduct = {
                link: 0,
                name: 0,
                prise: 0,
                id: 0,
                quentlyInCart: 0
            }
            for (let i = 0; i < DATABASE[1].length; i++) {
                objProduct = {
                    link: LINK[i],
                    name: NAMES[i],
                    prise: PRISE[i],
                    id: ID[i],
                    quentlyInCart: 0
                }
                this.cotalog.push(objProduct)
            }
        },
        addObgToCard: function (idd) { // добавляем выбраные товары в корзину объекта
            let fl = 0
            for (let i = 0; i < this.cotalog.length; i++) {
                if (this.cotalog[i].id == idd) {
                    if (this.cart.length === 0) {
                        this.cart.push(this.cotalog[i])
                        this.cart[0].quentlyInCart = 1
                    } else {
                        this.cart.forEach((el, j) => {
                            if (this.cotalog[i].id === el.id) {
                                this.cart[j].quentlyInCart += 1
                                fl = 1
                            }
                        })
                        if (fl === 0) {
                            this.cotalog[i].quentlyInCart = 1
                            this.cart.push(this.cotalog[i])
                        }
                    }
                }
            }
        },
        summCart: function (flag) { // считаем сумму стоимости всех товаров в корзине
            let sum = 0;
            if (flag === 1) {
                this.cart.forEach((el, i) => {
                    sum += this.cart[i].prise * this.cart[i].quentlyInCart
                })
                return sum
            }
            if (flag === 0) {
                this.cart = []
                sum = 0
                return sum
            }
        },
        quently: function () { // число всех товаров в корзине
            let summ = 0;
            this.cart.forEach((el, i) => {
                summ += el.quentlyInCart
            })
            return summ
        }

    }

    contDinPage.className = 'dinamikPage_Cart'
    contDinPage.innerHTML = `
       <div class="headerCart">
        <h1 class="headerCart__h1">Задание: Работа над корзиной! </h1>
        <div class="contCorz">
            <input type="checkbox" id="cart" class="contCorz__input">
                <label for="cart" class="contCorz__label" onclick="cartOpen()">
                    <div class="contCorz__img"></div>
                </label>
                <div class="contCorz__contProduct" id="Cartt">
                    <div class="productCart"></div>
                    <div class="contCorz__summAndQuently">
                        <span class="contCorz__text">Итого</span>
                        <span class="contCorz__summ" id="sum">0</span>
                        <span class="contCorz__quently" id="quently">0</span></div>
                    <button class="contCorz__button" onclick="clean()" id="buttonCart">Корзина пуста</button>
                </div>
                <div class="contCorz__count" id="idcount">0</div>
                <div class="contCorz__ollSum" id="idSum">0</div>
            </div>
        </div>
        <div class="contProduct"></div>`






    shop.buildAarr() // создаем  массив магазина

    function addElltoProduct(nameParent, typeEl, classEl, valueEl, linkEl, idEl) { //функция создания тега в теге nameParent
        let nameEl = d.createElement(typeEl) // синтаксис addElltoProduct(arg,'arg',arg,arg,arg,arg)
        if (classEl != 'none') {
            nameEl.className = classEl
        }
        if (valueEl != 'none') {
            nameEl.innerHTML = valueEl
        }
        if (linkEl != 'none') {
            nameEl.src = linkEl
        }
        if (idEl != 'none') {
            nameEl.id = idEl
        }
        nameParent.appendChild(nameEl)
    }

    function createProduct(i) { //  функция создания карточки товара на странице html

        let contShop = d.getElementsByClassName('contProduct')[0]
        let div = document.createElement('div');
        div.className = "product"
        contShop.appendChild(div)

        addElltoProduct(div, 'img', classImg, 'none', shop.cotalog[i].link, 'none')
        addElltoProduct(div, 'h4', varClassName, shop.cotalog[i].name, 'none', 'none')
        addElltoProduct(div, 'span', classPrise, shop.cotalog[i].prise + ' руб', 'none', 'none')
        addElltoProduct(div, 'button', classButton, 'в корзину', 'none', shop.cotalog[i].id)
    }


    function inputProduct(arr) { // функция вывода карточек товара на страницу
        for (let i = 0; i < arr.length; i++) {
            createProduct(i)
        }
    }

 inputProduct(DATABASE[1]) // выводим карточки товара в HTML

    let buttons = d.getElementsByClassName(classButton) // достаем массив объектов кнопок
    for (let i = 0; i < buttons.length; i++) { // вешаем на кнопки обработчик
        buttons[i].addEventListener('click', workClike)
    }


    function workClike() { // обработчик кликов

        let per = this.parentNode // получаем родительский элемент
        shop.addObgToCard(per.childNodes[3].id) // добавляем товар в корзину  по id
        let valieId = per.childNodes[3].id - 1 // создаем перменную кликнутого id
        arrId[valieId] == 0 ? arrId[valieId] = 1 : arrId[valieId]++ // считаем клики id
        per.childNodes[3].className = classButtonActiv // добавляем класс для нажатой кнопки 
        per.childNodes[3].innerHTML = " в корзине (" + arrId[valieId] + " шт)" //меняем надпись на кнопке
        let countCat = d.getElementById('idcount') // элемент для вывода счетчика корзины
        let sCart = d.getElementById('idSum') // элемент для вывода сумы корзины
        countCat.innerHTML = shop.quently() //выводим счетчик корзины в html
        console.log(shop.quently)
        sCart.innerHTML = shop.summCart(1) + 'руб' //выводим суму корзины в html 
        inputProductInCart()
        let valueTegButtonCart = d.getElementById('buttonCart')
        valueTegButtonCart.innerHTML = "Очистить корзину"
        let SumCart = d.getElementById('sum')
        SumCart.innerHTML = shop.summCart(1) + " руб"
        let QuentlyCart = d.getElementById('quently')
        QuentlyCart.innerHTML = shop.quently() + " шт."
    }


    function createCartProduct(i) { //  функция создания карточки товара в корзине
        let contShop = d.getElementsByClassName('productCart')[0]
        let div = document.createElement('div');
        div.className = "contCorz__product"
        contShop.appendChild(div)
        let contImg = document.createElement('div');
        contImg.className = "contCorz__contImg"
        div.appendChild(contImg)
        addElltoProduct(contImg, 'img', classImgCart, 'none', shop.cart[i].link, 'none')
        addElltoProduct(div, 'h4', varClassNameCart, shop.cart[i].name, 'none', 'none')
        addElltoProduct(div, 'span', classPriseCart, shop.cart[i].prise + ' руб', 'none', 'none')
        addElltoProduct(div, 'span', classQuentlyCart, shop.cart[i].quentlyInCart + ' шт.', 'none', 'none')
    }

    function inputProductInCart() { // функция вывода карточек товара в корзину
        dellElCartHTML()
        let lengthCart = shop.cart.length
        for (let i = 0; i < lengthCart; i++) {
            createCartProduct(i)
        }
    }


    function dellElCartHTML() { //  функция удаления элементов  HTML из корзины
        let elemsCart = d.getElementsByClassName('contCorz__product');
        while (elemsCart[0]) {
            elemsCart[0].parentNode.removeChild(elemsCart[0]);
        }
    }

    function clean() { // функция полной очитски корзыны
        let buttun = d.getElementsByClassName(classButtonActiv) // получаем родительский элемент
        arrId = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let sCart = d.getElementById('idSum') // элемент для вывода сумы корзины
        let countCat = d.getElementById('idcount') // элемент для вывода счетчика корзины
        countCat.innerHTML = 0;
        sCart.innerHTML = shop.summCart(0)
        while (buttun.length != 0) {
            for (let i = 0; i < buttun.length; i++) {
                buttun[i].innerHTML = " в корзине " //меняем надпись на кнопке
                buttun[i].className = classButton
            }
        }
        let valueTegButtonCart = d.getElementById('buttonCart')
        valueTegButtonCart.innerHTML = "Корзина пуста"
        let SumCart = d.getElementById('sum')
        SumCart.innerHTML = 0 + " руб"
        let QuentlyCart = d.getElementById('quently')
        QuentlyCart.innerHTML = 0 + " шт."
        dellElCartHTML()
    }


    function cartOpen() { //обработка клика нажатия корзины
        if (f === 1) {
            $('#Cartt').slideToggle(400);
            f = 0
        } else {
            $('#Cartt').slideUp(400);
            f = 1
        }
    }  
}