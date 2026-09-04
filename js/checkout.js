const CART_KEY = "cart";
const ORDERS_KEY = "freshbite_orders";


// ===============================
// GET CART
// ===============================

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem(CART_KEY) || "[]"
        );

    } catch (error) {

        return [];
    }
}


// ===============================
// GET CURRENT USER
// ===============================

function getCurrentUser() {

    try {

        return JSON.parse(
            localStorage.getItem("freshbite_user") || "null"
        );

    } catch (error) {

        return null;
    }
}


// ===============================
// GET ORDERS
// ===============================

function getOrders() {

    try {

        return JSON.parse(
            localStorage.getItem(ORDERS_KEY) || "[]"
        );

    } catch (error) {

        return [];
    }
}


// ===============================
// SAVE ORDERS
// ===============================

function saveOrders(orders) {

    localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify(orders)
    );
}


// ===============================
// CALCULATE TOTALS
// ===============================

function calculateTotals(cart) {

    let subtotal = 0;

    cart.forEach(item => {

        subtotal +=
            Number(item.price || 0) *
            Number(item.quantity || 1);

    });


    const delivery =
        subtotal === 0
            ? 0
            : subtotal >= 500
                ? 0
                : 40;


    const discount =
        subtotal >= 1000
            ? subtotal * 0.10
            : 0;


    const total =
        subtotal +
        delivery -
        discount;


    return {
        subtotal,
        delivery,
        discount,
        total
    };
}


// ===============================
// FOOD IMAGE MAP
// ===============================

const imageMap = {

    "Margherita Pizza":
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80",

    "Farmhouse Pizza":
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80",

    "Paneer Tikka Pizza":
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=300&q=80",

    "Classic Chicken Burger":
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80",

    "Cheese Burger":
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=300&q=80",

    "Paneer Butter Masala":
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80",

    "Veg Biryani":
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=300&q=80",

    "Chocolate Brownie":
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=300&q=80",

    "Chocolate Cake":
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80",

    "Fresh Lime Soda":
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80",

    "Veg Noodles":
        "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80"

};


// ===============================
// GET FOOD IMAGE
// ===============================

function getFoodImage(item) {

    return (
        item.image ||
        item.img ||
        item.imageUrl ||
        item.photo ||
        imageMap[item.name] ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80"
    );
}


// ===============================
// DISPLAY CHECKOUT SUMMARY
// ===============================

function displayCheckoutSummary() {

    const cart = getCart();

    const orderSummary =
        document.getElementById("order-summary");


    if (!orderSummary) {
        return;
    }


    if (cart.length === 0) {

        orderSummary.innerHTML = `

            <div style="
                text-align:center;
                padding:40px 10px;
                color:#777;
            ">

                <div style="font-size:45px;">
                    🛒
                </div>

                <p>
                    Your cart is empty.
                </p>

                <a
                    href="menu.html"
                    style="
                        display:inline-block;
                        background:#ff6b35;
                        color:white;
                        padding:10px 18px;
                        border-radius:7px;
                        text-decoration:none;
                        font-weight:bold;
                    "
                >
                    Go to Menu
                </a>

            </div>

        `;

        return;
    }


    orderSummary.innerHTML = "";


    cart.forEach(item => {

        const quantity =
            Number(item.quantity || 1);

        const itemTotal =
            Number(item.price || 0) *
            quantity;

        const image =
            getFoodImage(item);


        const itemElement =
            document.createElement("div");

        itemElement.className =
            "order-item";


        itemElement.innerHTML = `

            <img
                src="${image}"
                alt="${item.name || "Food Item"}"
                class="order-item-image"
                onerror="
                    this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80';
                "
            >

            <div class="order-item-details">

                <div class="order-item-name">
                    ${item.name || "Food Item"}
                </div>

                <div class="order-item-quantity">
                    ₹${Number(item.price || 0)} × ${quantity}
                </div>

            </div>

            <div class="order-item-price">
                ₹${itemTotal.toFixed(2)}
            </div>

        `;


        orderSummary.appendChild(
            itemElement
        );

    });


    // ===============================
    // UPDATE PRICE
    // ===============================

    const totals =
        calculateTotals(cart);


    const subtotal =
        document.getElementById("subtotal");

    const delivery =
        document.getElementById("delivery");

    const discount =
        document.getElementById("discount");

    const total =
        document.getElementById("total");


    if (subtotal) {

        subtotal.textContent =
            `₹${totals.subtotal.toFixed(2)}`;
    }


    if (delivery) {

        delivery.innerHTML =
            totals.delivery === 0

                ? `<span style="
                    color:#28a745;
                    font-weight:bold;
                  ">
                    FREE
                  </span>`

                : `₹${totals.delivery.toFixed(2)}`;
    }


    if (discount) {

        discount.textContent =
            `₹${totals.discount.toFixed(2)}`;
    }


    if (total) {

        total.textContent =
            `₹${totals.total.toFixed(2)}`;
    }
}


// ===============================
// SHOW CHECKOUT MESSAGE
// ===============================

function showCheckoutMessage(
    message,
    type = "error"
) {

    const messageElement =
        document.getElementById(
            "checkout-message"
        );


    if (!messageElement) {
        return;
    }


    messageElement.textContent =
        message;


    messageElement.style.color =
        type === "success"
            ? "#28a745"
            : "#dc3545";
}


// ===============================
// AUTO FILL USER
// ===============================

function autoFillUser() {

    const user =
        getCurrentUser();


    if (!user) {
        return;
    }


    const name =
        document.getElementById("name");

    const email =
        document.getElementById("email");

    const phone =
        document.getElementById("phone");

    const address =
        document.getElementById("address");

    const city =
        document.getElementById("city");


    if (name && user.name) {
        name.value = user.name;
    }


    if (email && user.email) {
        email.value = user.email;
    }


    if (phone && user.phone) {
        phone.value = user.phone;
    }


    if (address && user.address) {
        address.value = user.address;
    }


    if (city && user.city) {
        city.value = user.city;
    }
}


// ===============================
// PLACE ORDER
// ===============================

function placeOrder() {

    const cart =
        getCart();


    if (cart.length === 0) {

        showCheckoutMessage(
            "Your cart is empty."
        );

        return;
    }


    const user =
        getCurrentUser();


    if (!user) {

        showCheckoutMessage(
            "Please login before placing your order."
        );


        setTimeout(() => {

            window.location.href =
                "login.html";

        }, 1200);


        return;
    }


    // ===============================
    // CUSTOMER DETAILS
    // ===============================

    const nameElement =
        document.getElementById("name");

    const emailElement =
        document.getElementById("email");

    const phoneElement =
        document.getElementById("phone");

    const addressElement =
        document.getElementById("address");

    const cityElement =
        document.getElementById("city");

    const pincodeElement =
        document.getElementById("pincode");


    const name =
        nameElement
            ? nameElement.value.trim()
            : "";

    const email =
        emailElement
            ? emailElement.value.trim()
            : "";

    const phone =
        phoneElement
            ? phoneElement.value.trim()
            : "";

    const address =
        addressElement
            ? addressElement.value.trim()
            : "";

    const city =
        cityElement
            ? cityElement.value.trim()
            : "";

    const pincode =
        pincodeElement
            ? pincodeElement.value.trim()
            : "";


    // ===============================
    // PAYMENT
    // ===============================

    const paymentElement =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    // ===============================
    // VALIDATION
    // ===============================

    if (
        !name ||
        !email ||
        !phone ||
        !address ||
        !city ||
        !pincode
    ) {

        showCheckoutMessage(
            "Please fill all customer details."
        );

        return;
    }


    if (!paymentElement) {

        showCheckoutMessage(
            "Please select a payment method."
        );

        return;
    }


    // ===============================
    // TOTALS
    // ===============================

    const totals =
        calculateTotals(cart);


    // ===============================
    // CREATE ORDER ID
    // ===============================

    const orderId =
        "FB" +
        Date.now()
            .toString()
            .slice(-8);


    // ===============================
    // CREATE ORDER
    // ===============================

    const order = {

        /*
         * Main order identifiers
         */

        id:
            orderId,

        orderId:
            orderId,


        /*
         * CUSTOMER IDENTIFICATION
         *
         * We save BOTH ID and email.
         * This allows My Orders to find
         * the order reliably.
         */

        userId:
            user.id ||
            user.userId ||
            user.uid ||
            "",

        customerId:
            user.id ||
            user.userId ||
            user.uid ||
            "",

        userEmail:
            email,

        customerEmail:
            email,

        email:
            email,


        /*
         * CUSTOMER DETAILS
         */

        customerName:
            name,

        name:
            name,

        phone:
            phone,

        address:
            address,

        deliveryAddress:
            address,

        city:
            city,

        pincode:
            pincode,


        /*
         * PAYMENT
         */

        paymentMethod:
            paymentElement.value,


        /*
         * ORDER ITEMS
         */

        items:
            cart.map(item => {

                return {

                    id:
                        item.id,

                    name:
                        item.name,

                    price:
                        Number(item.price || 0),

                    quantity:
                        Number(
                            item.quantity || 1
                        ),

                    image:
                        getFoodImage(item)

                };

            }),


        /*
         * PRICE DETAILS
         */

        subtotal:
            totals.subtotal,

        delivery:
            totals.delivery,

        discount:
            totals.discount,

        total:
            totals.total,


        /*
         * STATUS
         */

        status:
            "Order Placed",


        /*
         * DATE
         */

        createdAt:
            new Date().toISOString(),

        orderDate:
            new Date().toISOString(),


        /*
         * ADMIN MESSAGE
         */

        adminMessage:
            "",

        lastUpdated:
            null

    };


    // ===============================
    // SAVE ORDER
    // ===============================

    const orders =
        getOrders();


    orders.push(order);


    saveOrders(orders);


    // ===============================
    // CLEAR CART
    // ===============================

    localStorage.removeItem(
        "cart"
    );

    localStorage.removeItem(
        "freshbite_cart"
    );


    // ===============================
    // SAVE LAST ORDER
    // ===============================

    localStorage.setItem(
        "freshbite_last_order",
        JSON.stringify(order)
    );


    // ===============================
    // REDIRECT
    // ===============================

    window.location.href =
        "order-success.html?orderId=" +
        encodeURIComponent(orderId);
}


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCheckoutSummary();

        autoFillUser();


        const form =
            document.getElementById(
                "checkout-form"
            );


        const button =
            document.getElementById(
                "place-order-btn"
            );


        if (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    placeOrder();

                }
            );

        }


        if (button) {

            button.addEventListener(
                "click",
                function (event) {

                    /*
                     * Prevent double submission
                     * when button is inside form.
                     */

                    event.preventDefault();

                    placeOrder();

                }
            );

        }

    }
);


// ===============================
// GLOBAL FUNCTION
// ===============================

window.placeOrder =
    placeOrder;