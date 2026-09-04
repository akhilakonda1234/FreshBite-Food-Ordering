const CART_KEY = "cart";

// ================================
// FOOD ITEMS
// ================================

const foodItems = [
    {
        id: 1,
        name: "Margherita Pizza",
        price: 199,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Farmhouse Pizza",
        price: 299,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Paneer Tikka Pizza",
        price: 329,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Classic Chicken Burger",
        price: 179,
        category: "burger",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Cheese Burger",
        price: 149,
        category: "burger",
        image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Paneer Butter Masala",
        price: 249,
        category: "indian",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Veg Biryani",
        price: 199,
        category: "indian",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Chocolate Brownie",
        price: 99,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        name: "Chocolate Cake",
        price: 129,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        name: "Fresh Lime Soda",
        price: 69,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 11,
        name: "Veg Noodles",
        price: 159,
        category: "chinese",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
    }
];


// ================================
// RENDER FOOD ITEMS
// ================================

function renderFoodItems(category = "all") {

    const container =
        document.getElementById("food-container");

    if (!container) return;

    const filteredItems =
        category === "all"
            ? foodItems
            : foodItems.filter(
                item => item.category === category
            );

    container.innerHTML = "";

    filteredItems.forEach(food => {

        container.innerHTML += `
            <div class="food-card" data-category="${food.category}">

                <img
                    src="${food.image}"
                    alt="${food.name}"
                >

                <div class="food-info">

                    <h3 class="food-name">
                        ${food.name}
                    </h3>

                    <p>
                        Delicious ${food.category} item
                    </p>

                    <div class="food-bottom">

                        <span class="food-price">
                            ₹${food.price}
                        </span>

                        <button
                            class="add-to-cart-btn"
                            onclick="addToCart(${food.id})"
                            style="
                                background: #ff6b35;
                                color: white;
                                font-size: 30px;
                                font-weight: bold;
                                border-radius: 50%;
                                width: 45px;
                                height: 45px;
                                padding: 0;
                            "
                        >
                            +
                        </button>

                    </div>

                </div>

            </div>
        `;
    });
}


// ================================
// CART
// ================================

function getCart() {

    return JSON.parse(
        localStorage.getItem(CART_KEY)
    ) || [];

}


function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


// ================================
// UPDATE CART COUNT
// ================================

function updateCartCount() {

    const cart = getCart();

    const count =
        cart.reduce(
            (total, item) =>
                total + (item.quantity || 1),
            0
        );

    const cartCount =
        document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = count;
    }

}


// ================================
// ADD TO CART
// ================================

function addToCart(foodId) {

    const food =
        foodItems.find(
            item => item.id === foodId
        );

    if (!food) return;

    const cart = getCart();

    const existingItem =
        cart.find(
            item => item.id === foodId
        );


    if (existingItem) {

        existingItem.quantity =
            (existingItem.quantity || 1) + 1;

    }

    else {

        cart.push({
            id: food.id,
            name: food.name,
            price: food.price,
            image: food.image,
            quantity: 1
        });

    }


    saveCart(cart);

    updateCartCount();

    showToast(
        `${food.name} added to cart 🛒`
    );

}


// ================================
// TOAST MESSAGE
// ================================

function showToast(message) {

    let toast =
        document.getElementById(
            "freshbite-toast"
        );


    if (!toast) {

        toast =
            document.createElement("div");

        toast.id =
            "freshbite-toast";


        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff6b35;
            color: white;
            padding: 18px 30px;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 600;
            z-index: 99999;
            box-shadow: 0 8px 30px rgba(0,0,0,0.25);
            transition: opacity 0.3s ease;
        `;


        document.body.appendChild(toast);

    }


    toast.textContent = message;

    toast.style.opacity = "1";


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(() => {

            toast.style.opacity = "0";

        }, 1800);

}


// ================================
// CATEGORY FILTER
// ================================

function filterCategory(category) {

    renderFoodItems(category);


    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.classList.remove(
                "active"
            );


            if (
                button.dataset.category === category
            ) {

                button.classList.add(
                    "active"
                );

            }

        });

}


// ================================
// PAGE LOAD
// ================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // ================================
        // RENDER FOOD
        // ================================

        renderFoodItems();


        // ================================
        // UPDATE CART COUNT
        // ================================

        updateCartCount();


        // ================================
        // MOBILE MENU
        // ================================

        const menuButton =
            document.getElementById("menu-btn");


        const navigation =
            document.querySelector(".nav-links");


        if (menuButton && navigation) {

            menuButton.addEventListener(
                "click",
                function () {

                    navigation.classList.toggle(
                        "mobile-active"
                    );

                }
            );

        }


        // ================================
        // CATEGORY BUTTONS
        // ================================

        document
            .querySelectorAll(".filter-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        filterCategory(
                            this.dataset.category
                        );

                    }
                );

            });

    }
);