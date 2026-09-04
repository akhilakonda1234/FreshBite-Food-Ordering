// ===============================
// CART
// ===============================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// ===============================
// ADD TO CART
// ===============================

function addToCart(id) {

    let food;

    if (id === 1) {

        food = {
            id: 1,
            name: "Margherita Pizza",
            price: 299
        };

    }

    else if (id === 2) {

        food = {
            id: 2,
            name: "Chicken Burger",
            price: 199
        };

    }

    else if (id === 3) {

        food = {
            id: 3,
            name: "Chicken Biryani",
            price: 249
        };

    }

    else if (id === 4) {

        food = {
            id: 4,
            name: "White Sauce Pasta",
            price: 229
        };

    }


    // Check whether item already exists

    const existingItem =
        cart.find(item => item.id === id);


    if (existingItem) {

        existingItem.quantity++;

    }

    else {

        cart.push({
            ...food,
            quantity: 1
        });

    }


    // Save cart

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(
        `${food.name} added to cart!`
    );
}



// ===============================
// UPDATE CART COUNT
// ===============================

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");


    if (!cartCount) return;


    let totalItems = 0;


    cart.forEach(item => {

        totalItems += item.quantity;

    });


    cartCount.textContent =
        totalItems;
}



// ===============================
// MOBILE MENU
// ===============================

const menuToggle =
    document.getElementById("menu-toggle");


const navLinks =
    document.querySelector(".nav-links");


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "mobile-active"
            );

        }
    );

}


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

    }
);