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
// Create list item
        const li = document.createElement('li');
        li.textContent = item;
        li.dataset.index = index;
        if (item.bought) {
            li.classList.add('bought');
        }
        li.addEventListener('click', markbought);
        li.addEventListener('dblclick', editItem);
        // Add li to the DOM
        shoppingListContainer.appendChild(li);
    });
}

// Function to add item to shopping list
function addItem() {
     // trim the input value to remove whitespace - disallowing duplicate items due to white space in the process
    const item = inputText.value.trim();
    if (item) {
        shoppingList.push({ text: item, bought: false });
        inputText.value = '';
        saveToLocalStorage();
        renderShoppingList();
    }
}

// Function to mark item as bought
function markbought(event) {
    const index = parseInt(event.target.dataset.index);
    shoppingList[index].bought = !shoppingList[index].bought;
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
    // Convert to JSON string and set to local storage
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Event listeners
addItemBtn.addEventListener('click', addItem);
clearBtn.addEventListener('click', clearList);

// Render shopping list on page load
renderShoppingList();