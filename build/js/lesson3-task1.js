/* 
Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, мы 
должны получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки
и сотни. Например, для числа 245 мы должны получить следующий объект: 
{‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать
соответствующее сообщение с помощью console.log и вернуть пустой объект. */

let d = document
let div = d.getElementById('out')

let createrObj = (numb) => {
    typeof (numb) === "number" ? arg = String(numb): arg = numb
    let arr = [...arg]
    let numbObj = { //создаем объект
        'сотни': 0,
        'десятки': 0,
        'единицы': 0,
    }

    while (arr.length < 3) { // добавляем в обект 0-ли если введенное чсило не трехзначное
        arr.unshift('0')
    }

    let j = 0;
    for (const i in numbObj) { //заполняем объект
        numbObj[i] = arr[j]
        j++
    }
    return numbObj
}


let myScript5 = () => { // получаем число из HTML
    let number = document.getElementById('top').value;
    if (!isNaN(number) && number >= 0 && number <= 999) {
        document.getElementById('top').value = '';
        let obj = createrObj(number)
        div.innerHTML = '{сотни: ' + obj.сотни + ', десятки: ' + obj.десятки + ', единици: ' + obj.единицы + '}'
        console.log(obj)
    } else {
        div.innerHTML = 'Вы ввели неверное значение'
        document.getElementById('top').value = '';
    }
}