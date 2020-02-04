function createGal() {

    var link = './build/img/1'
    var numberFotoOll = 20
    var numberFoto = 10
    let arrLink = []
    let arrOut = []
    let d = document
    let index = 3
 

  /*   let contDinPage = d.querySelector('.dinamikPage') */

    contDinPage.className = 'PageGall'

    for (let i = 0; i < numberFotoOll; i++) {
        arrOut.push(`${link}${i+1}.jpg`)
    }
    for (let i = 0; i < numberFoto; i++) {
        arrLink.push(`${link}${i+1}.jpg`)
    }

    function creatArr(workArr, iff) {
        if (iff === 0) {
            return workArr
        }

        if (iff === 2) {
            workArr.unshift(workArr.pop())
            return workArr
        }

        if (iff === 1) {
            workArr.push(workArr.shift())
            return workArr
        }
    }

    let mas = []
    mas = creatArr(arrOut, 0)
    for (let i = 0; i < numberFoto; i++) {
        arrLink[i] = mas[i]
    }

    // создаем страницу галереи
    contDinPage.innerHTML = ` 
    <h1 class="PageGall__h1"> Галерея </h1>
    <img src="${arrLink[index]}" alt="mainImg" class="PageGall__mainImg">
    <div class="PageGall__contImgmin" id="wrapper"></div>`

    function createSlide(count) { // функция создания ленты слайдера html
        d.querySelector('.PageGall__contImgmin').innerHTML = `<button class="PageGall__button"  id="1">0</button>`
        for (let i = 0; i < count; i++) {
            d.querySelector('.PageGall__contImgmin').innerHTML += `<img src="${arrLink[i]}" width="50px" alt="1" class="PageGall__Img">`
        }
        d.querySelector('.PageGall__contImgmin').innerHTML += `<button class="PageGall__button"  id="2">0</button>`
    }

    createSlide(numberFoto) //  вызов функции создания ленты слайдера

    function createWorkImg() {
        let colImg = d.querySelectorAll('.PageGall__Img') // массив изображений слайдера
        d.querySelectorAll('.PageGall__Img')[index].className = "PageGall__ImgH"
        colImg.forEach((el, i) => {
            colImg[i].setAttribute('id', `${i+1}`) // добавлем id изображениям слайдера
            colImg[i].addEventListener('mouseover', workClickG) // добавляем обработчки изображений слайдера  
            //   colImg[i].addEventListener('mouseout', workHoverOut) // добавляем обработчки изображений слайдера  
        })
    }

    createWorkImg()

    function workClickG() { // обработка наведений на изображение слайдера
        index = event.target.id - 1
        let obj = event.target
        d.querySelector('.PageGall__mainImg').src = arrLink[index]

        let hImg = d.querySelector('.PageGall__ImgH')


        hImg.className = 'PageGall__Img'


        obj.className = "PageGall__ImgH"
        console.log(index)

    }

    function createWorkButton() {

        let buttons = d.querySelectorAll('.PageGall__button')

        buttons.forEach((el, i) => {
            buttons[i].addEventListener('click', buttonsSlide)
        })
    }

    createWorkButton()

    function buttonsSlide() {
        let mass = []
        butt = +event.target.id
        mass = creatArr(arrOut, butt)
        for (let i = 0; i < numberFoto; i++) {
            arrLink[i] = mass[i]
        }
        contDinPage.innerHTML = ` 
                <h1 class="PageGall__h1"> Галерея </h1>
                <img src="${arrLink[index]}" alt="mainImg" class="PageGall__mainImg">
                <div class="PageGall__contImgmin"></div>`

        createSlide(numberFoto)
        createWorkImg()
        let hImg = d.querySelector('.PageGall__ImgH')
        hImg.className = 'PageGall__Img'
        d.querySelectorAll('.PageGall__Img')[index].className = "PageGall__ImgH"
        createWorkButton()
    }
}