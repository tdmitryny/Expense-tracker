const balance = document.getElementById('balace');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 },
// ];
//let transactions = dummyTransactions;
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];



function addTransaction(e) {
    e.preventDefault();
    //Checking if field is not empty

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add text and amount')
    } else {   //If field is not empty create new a field
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: Number(amount.value)
        }

        //We are going to add to  our array
        transactions.push(transaction);
        // Adding to DOM
        addTransactionDOM(transaction);
        //Update values
        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';

    }

}


function generateID() {
    return Math.floor(Math.random() * 100000000)
}

//Add transaction to DOM list
function addTransactionDOM(transaction) {
    //Get sign plus or minus
    const sign = transaction.amount < 0 ? '-' : '+';
    //Create a list item
    const item = document.createElement('li');
    //Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

    item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn"onclick="removeTransaction(${transaction.id})">x</button>`
    list.appendChild(item)
}

//Update balance income expence 

function updateValues() {
    //Take object
    const amounts = transactions.map(transaction => transaction.amount);
    //Calculate object
    const total = amounts.reduce((acc, items) => (acc += items), 0).toFixed(2);
    //Filter income larger than zero
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, items) => (acc += items), 0)
        .toFixed(2);

    //Filter expense less than zero
    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, items) => (acc += items), 0) * -1
    ).toFixed(2)
    //Put inner text into DOM
    balance.innerText = `$${total}`
    money_plus.innerText = `$${income}`
    money_minus.innerText = `$${expense}`


}


//Remove transaction for ID

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}

// Update local storage transaction


function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues()

}

init();



form.addEventListener('submit', addTransaction);

