
var names = document.querySelector('#names');
var phone = document.querySelector('#phone');

var inputValues = {'names': 'Имя', 'phone': 'Телефон'};

var el = {names: names, phone: phone};

var inputNumber = 0;
var num = [1, 4, 7, 9];
var numC = false;

phone.addEventListener('keypress', function(event) {
    if (isNaN(Number(phone.value[phone.value.length - 1])) && !numC) {
		alert('Номер должен состоять из цифр');
		numC = true;
	}
    if (phone.value.length == 0) {
		inputNumber = 0;
	}
    if (event.keyCode == 8 && phone.value[phone.value.length - 1] != ' ') {
		inputNumber--;
	}
    if (event.keyCode == 8 && phone.value[phone.value.length - 2] == ' ') {
		phone.value = phone.value.slice(0, phone.value.length - 1);
	}
    if (event.keyCode != 8) {
        if (inputNumber == 11) {
            alert('Номер больше 10 цифр');
        }
        num.forEach(function (a) {
            if (a == inputNumber) {
                phone.value = phone.value + ' ';
            }
        });
        inputNumber++;
    }
});

function elementsId() {
    return Date.now();
}

function addFromInput(element, idE) {
    var elem = createEl(idE);
    elem.childNodes[0].textContent = element['names'];
    elem.childNodes[1].textContent = element['phone'];

    var allC = document.querySelector('.allContacts');
    allC.appendChild(elem);
}

function focus(elem) {
    elem.addEventListener('focus', function (event) {
        var now = event.currentTarget;
        if (event && now.value == inputValues[now.id]) {
            elem.value = '';
            elem.style.color = 'black';
            elem.style.fontSize = '16px';
        }
    });
}

function blur(elem) {
    elem.addEventListener('blur', function (event) {
        var now = event.currentTarget;
        if (event && event.currentTarget.value.length == 0) {
            elem.value = inputValues[now.id];
            elem.style.color = 'grey';
            elem.style.fontSize = '12px';
        }
    });
}

for (key in el) {
    focus(el[key]);
    blur(el[key]);
}

var button = document.querySelector('#addButton');

button.addEventListener('click', function() {
    var currentData = {names: names.value, phone: phone.value, id: elementsId()};
    addFromInput(currentData);
    saveToStorage(currentData);
    
    inputNumber = 0;
	for (key in el) {
		el[key].value = inputValues[key];
		el[key].style.color = 'grey';
        el[key].style.fontSize = '12px';
	}
});

function createEl(idE) {
    var div = document.createElement('div');
    div.style.borderBottom = '1px solid lightgrey';

    if (idE) {
        div.id = 'a' + idE;
    } else {
        div.id = 'a' + elementsId();
    }

    div.appendChild(document.createElement('p'));
    div.appendChild(document.createElement('p'));

    var b = document.createElement('button');
    b.id = 'remove';
    b.textContent = 'X';
    b.addEventListener('click', function () {
        var idEl = b.parentNode.id.slice(1);
        localStorage.removeItem(idEl);
        var allC = document.querySelector('.allContacts');
        allC.removeChild(b.parentNode);
    });

    div.appendChild(b);
    div.childNodes[1].id = 'number';
    return div;
}

function saveToStorage(elem, elementsId) {
    var person = {id: elem.id, data: JSON.stringify(elem)};
    localStorage.setItem(person.id, person.data);
}



function showFromStorage() {
    var objAll = {};
    var keys = [];

    for (key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            var data = JSON.parse(localStorage.getItem(key));
            objAll[key] = data;
            keys.push(key);
        }
    }

    var sorted = keys.sort();
    sorted.forEach(function (a) {
        if (!isNaN(Number(a))) {
            addFromInput(objAll[a], objAll[a].id);
        }
    });
}

showFromStorage();


