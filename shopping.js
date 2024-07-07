// Array to store shopping list items
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// DOM elements
const inputText = document.getElementById('input-text');
const addItemBtn = document.getElementById('add-item-btn');
const clearBtn = document.getElementById('clear-btn');
const shoppingListContainer = document.getElementById('shopping-list');

// Function to render shopping list
function renderShoppingList() {
    shoppingListContainer.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        li.dataset.index = index;
        if (item.purchased) {
            li.classList.add('purchased');
        }
        li.addEventListener('click', markPurchased);
        li.addEventListener('dblclick', editItem);
        shoppingListContainer.appendChild(li);
    });
}

// Function to add item to shopping list
function addItem() {
    const item = inputText.value.trim();
    if (item) {
        shoppingList.push({ text: item, purchased: false });
        inputText.value = '';
        saveToLocalStorage();
        renderShoppingList();
    }
}

// Function to mark item as purchased
function markPurchased(event) {
    const index = parseInt(event.target.dataset.index);
    shoppingList[index].purchased = !shoppingList[index].purchased;
    saveToLocalStorage();
    renderShoppingList();
}

// Function to edit item
function editItem(event) {
    const index = parseInt(event.target.dataset.index);
    const newText = prompt('Edit item:', shoppingList[index].text);
    if (newText) {
        shoppingList[index].text = newText;
        saveToLocalStorage();
        renderShoppingList();
    }
}

// Function to clear shopping list
function clearList() {
    shoppingList = [];
    saveToLocalStorage();
    renderShoppingList();
}

// Function to save shopping list to local storage
function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Event listeners
addItemBtn.addEventListener('click', addItem);
clearBtn.addEventListener('click', clearList);

// Render shopping list on page load
renderShoppingList();