"use strict";

// toggles the dark mode
function darkMode() {
  let body = document.body;
  body.classList.toggle("dark");
}

let addToCartButtons = document.getElementsByClassName("add-to-cart");

for (let i=0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener("click", addToCart);
}

//this function adds the item to cart when the "Add to cart" button is clicked
function addToCart(event) {
  let button = event.target;
  let item = button.parentElement.parentElement; // targets the <article> tag that houses the item and its contents.
  let itemName = item.getElementsByClassName("item-name")[0].innerText;
  let itemPrice = item.getElementsByClassName("price")[0].innerText;
  updateCart(itemName, itemPrice);
  addToCartButtonClicks++;
}

let total = 0; // total for cart
let addToCartButtonClicks = 0;

function updateCart(itemName, itemPrice) {
  let newCartItem = document.createElement("tr"); //makes a new row in the table/cart...
  newCartItem.classList.add("cart-item"); // ...with this class name
  let cartContainer = document.getElementsByClassName("added-items")[0];
  let itemNameList = cartContainer.getElementsByClassName("cart-item");//for targeting the new node
  for (let i=0; i< itemNameList.length; i++) { //loop to compare if the item is already in the cart, if it is an error will pop up
    if (itemNameList[i].innerText == itemName) {
      document.getElementById("already-in-cart").innerText = "\nItem already in cart.";
      return;
    } else document.getElementById("already-in-cart").innerText = ""; // otherwise no error will pop up
  }
  let cartUnit = `
    <td class="cart-item"><p><b>${itemName}</b></p></td>
    <td class="cart-price"><p>${itemPrice}</p></td>
    `;
  newCartItem.innerHTML = cartUnit;
  cartContainer.append(newCartItem);
  let price = itemPrice.substr(0,5);
  price = parseInt(price);
  
  total+= price;
  document.getElementById("cart-total").innerText = total + ".00 USD";
}

// this function thanks the user or prompts them to place an order depending on the contents of the cart. It also clears the cart and tells the total
function placeOrder(){
  if (addToCartButtonClicks > 0) {
    document.getElementById("order-message").innerText = `\nThank you for your purchase!\nYour total was ${total}.00 USD!`;
    let cartContainer = document.getElementById("added-items");
    cartContainer.remove(); // removes the added items node (tbody)
    document.getElementById("already-in-cart").innerText = ""; // takes out the error when the order is placed
    return;
  }
    else if (addToCartButtonClicks < 0){
    document.getElementById("order-message").innerText = "\nPlease order an item.";
    }
  }

// form js validation
function findErrorInForm() {
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let errorMessage = document.getElementsByClassName("error-message");

  if (!/^\d{10}$/.test(phone.value) || !phone.value) {
    errorMessage[0].innerHTML = "Please enter a valid phone number.";
  } else errorMessage[0].innerHTML = "";

  if (!/^\S+@\S+\.\S+$/.test(email.value) || !email.value) {
    errorMessage[1].innerHTML = "Please enter a valid email address.";
  } else errorMessage[1].innerHTML = "";
}

let submit = document.querySelector("#submit");
submit.addEventListener("click", function(event) {
  findErrorInForm();
  event.preventDefault; // prevents the errors from popping up when the page loads
}) 

// had to research how to extract data out of a form using js. I couldn't find out how to extract form data from an html data on ZyBooks so I ended up learning about formData from MDN web docs
let customer = {};
let form = document.getElementById("form");
// I had a hard time remembering how to add items to an empty object so this was messy, but I managed to figure it out.

let radioBtn = document.getElementsByName("contact");
let inputs = document.getElementsByTagName("input"); // for clearing inputs after submission

form.addEventListener("submit", function(event){
  event.preventDefault();
  let formData = new FormData(form); //said formData that I had to read about
  console.log(formData); 

  for (let item of formData) {
    let key = item[0];
    let value = item[1];
    customer[key] = value;
  }
  console.log(customer); //test to see if customer has the items
  let messageArea = document.getElementById("submit-message");
  for (let input of inputs) {
    if (input.innerText !== "Submit") input.value = ""; // this wouldn't work :( the "submit" disappears after clicking it.
    document.getElementById("message").value = "";
  }
  for(let i = 0;i<radioBtn.length;i++) {
    radioBtn[i].checked = false;
  }
  messageArea.innerText = `Thank you for your submission, ${customer.name}. We will contact you by ${customer.contact} soon!`; 
})