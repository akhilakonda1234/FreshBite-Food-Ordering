// ============================================================
// FRESHBITE CHECKOUT - FRONTEND ONLY
// Cart + Offers + Order Placement + PINCODE CITY LOOKUP
// ============================================================

const CART_KEY = "cart";
const ORDERS_KEY = "freshbite_orders";


// ============================================================
// GET CART
// ============================================================

function getCart() {

    try {

        const cart =
            JSON.parse(
                localStorage.getItem(CART_KEY) || "[]"
            );

        return Array.isArray(cart)
            ? cart
            : [];

    } catch (error) {

        return [];

    }

}


// ============================================================
// SAVE CART
// ============================================================

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "freshbite_cart",
        JSON.stringify(cart)
    );

}


// ============================================================
// GET LOGGED-IN USER
// ============================================================

function getCurrentUser() {

    try {

        return JSON.parse(
            localStorage.getItem("freshbite_user") || "null"
        );

    } catch (error) {

        return null;

    }

}


// ============================================================
// OFFER CALCULATION
// ============================================================

function calculateOffer(item) {

    const quantity =
        Number(item.quantity || 0);

    const price =
        Number(item.price || 0);

    const offer =
        String(item.offer || "")
            .toUpperCase();

    let payableQuantity = quantity;
    let freeQuantity = 0;
    let discount = 0;

    // BUY 1 GET 1
    if (offer.includes("BUY 1 GET 1")) {

        payableQuantity =
            Math.ceil(quantity / 2);

        freeQuantity =
            quantity - payableQuantity;

        discount =
            freeQuantity * price;

    }

    // BUY 2 GET 1
    else if (offer.includes("BUY 2 GET 1")) {

        const freeGroups =
            Math.floor(quantity / 3);

        freeQuantity =
            freeGroups;

        payableQuantity =
            quantity - freeQuantity;

        discount =
            freeQuantity * price;

    }

    // 20% OFF
    else if (offer.includes("20% OFF")) {

        discount =
            quantity * price * 0.20;

    }

    // 15% OFF
    else if (offer.includes("15% OFF")) {

        discount =
            quantity * price * 0.15;

    }

    // FLAT ₹50 OFF
    else if (
        offer.includes("FLAT ₹50 OFF") ||
        offer.includes("FLAT 50 OFF")
    ) {

        discount =
            Math.min(50, quantity * price);

    }

    return {

        quantity,
        payableQuantity,
        freeQuantity,
        discount

    };

}


// ============================================================
// GET ORDER TOTALS
// ============================================================

function calculateTotals(cart) {

    let subtotal = 0;
    let discount = 0;

    cart.forEach(item => {

        const quantity =
            Number(item.quantity || 0);

        const price =
            Number(item.price || 0);

        subtotal +=
            quantity * price;

        const offer =
            calculateOffer(item);

        discount +=
            offer.discount;

    });


    // Delivery
    const delivery =
        subtotal >= 500
            ? 0
            : 40;


    // Extra 10% discount for large orders
    let extraDiscount = 0;

    if (subtotal >= 1000) {

        extraDiscount =
            (subtotal - discount) * 0.10;

    }


    discount +=
        extraDiscount;


    const total =
        Math.max(
            0,
            subtotal - discount + delivery
        );


    return {

        subtotal,
        delivery,
        discount,
        total

    };

}


// ============================================================
// RENDER ORDER SUMMARY
// ============================================================

function renderOrderSummary() {

    const summary =
        document.getElementById(
            "order-summary"
        );


    if (!summary) {
        return;
    }


    const cart =
        getCart();


    if (cart.length === 0) {

        summary.innerHTML = `

            <div style="
                text-align:center;
                padding:30px 10px;
                color:#777;
            ">

                <h3 style="
                    margin-bottom:8px;
                    color:#333;
                ">
                    Your cart is empty
                </h3>

                <p>
                    Please add some delicious food before checkout.
                </p>

                <a
                    href="menu.html"
                    style="
                        display:inline-block;
                        margin-top:12px;
                        padding:10px 18px;
                        background:#ff6b35;
                        color:white;
                        text-decoration:none;
                        border-radius:7px;
                        font-weight:bold;
                    "
                >
                    Browse Menu
                </a>

            </div>

        `;

        updatePriceSummary([]);

        return;

    }


    summary.innerHTML =
        cart.map(item => {

            const offer =
                calculateOffer(item);

            const itemTotal =
                Number(item.price || 0) *
                offer.payableQuantity;


            return `

                <div class="order-item">

                    <img
                        src="${item.image || ""}"
                        alt="${item.name || "Food"}"
                        class="order-item-image"
                        onerror="
                            this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80';
                        "
                    >


                    <div class="order-item-details">

                        <div class="order-item-name">
                            ${item.name}
                        </div>


                        <div class="order-item-quantity">

                            Quantity:
                            ${offer.quantity}

                            ${
                                offer.freeQuantity > 0
                                    ? `
                                        <br>
                                        <span style="
                                            color:#198754;
                                            font-weight:bold;
                                        ">
                                            🎁 ${offer.freeQuantity} FREE
                                        </span>
                                      `
                                    : ""
                            }

                            ${
                                item.offer
                                    ? `
                                        <br>
                                        <span style="
                                            color:#ff6b35;
                                            font-weight:bold;
                                        ">
                                            ${item.offer}
                                        </span>
                                      `
                                    : ""
                            }

                        </div>

                    </div>


                    <div class="order-item-price">

                        ₹${itemTotal.toFixed(0)}

                        ${
                            offer.discount > 0
                                ? `
                                    <div style="
                                        font-size:11px;
                                        color:#198754;
                                        font-weight:normal;
                                        margin-top:3px;
                                    ">
                                        Saved ₹${offer.discount.toFixed(0)}
                                    </div>
                                  `
                                : ""
                        }

                    </div>

                </div>

            `;

        }).join("");


    updatePriceSummary(cart);

}


// ============================================================
// UPDATE PRICE SUMMARY
// ============================================================

function updatePriceSummary(cart) {

    const totals =
        calculateTotals(cart);


    const subtotal =
        document.getElementById(
            "subtotal"
        );

    const delivery =
        document.getElementById(
            "delivery"
        );

    const discount =
        document.getElementById(
            "discount"
        );

    const total =
        document.getElementById(
            "total"
        );


    if (subtotal) {

        subtotal.textContent =
            `₹${totals.subtotal.toFixed(0)}`;

    }


    if (delivery) {

        delivery.textContent =
            totals.delivery === 0
                ? "FREE"
                : `₹${totals.delivery}`;

    }


    if (discount) {

        discount.textContent =
            `-₹${totals.discount.toFixed(0)}`;

    }


    if (total) {

        total.textContent =
            `₹${totals.total.toFixed(0)}`;

    }

}


// ============================================================
// AUTO-FILL USER DETAILS
// ============================================================

function autofillUserDetails() {

    const user =
        getCurrentUser();


    if (!user) {
        return;
    }


    const name =
        document.getElementById(
            "name"
        );

    const email =
        document.getElementById(
            "email"
        );

    const phone =
        document.getElementById(
            "phone"
        );

    const address =
        document.getElementById(
            "address"
        );

    const city =
        document.getElementById(
            "city"
        );

    const pincode =
        document.getElementById(
            "pincode"
        );


    if (
        name &&
        user.name
    ) {

        name.value =
            user.name;

    }


    if (
        email &&
        user.email
    ) {

        email.value =
            user.email;

    }


    if (
        phone &&
        user.phone
    ) {

        phone.value =
            user.phone;

    }


    if (
        address &&
        user.address
    ) {

        address.value =
            user.address;

    }


    if (
        city &&
        user.city
    ) {

        city.value =
            user.city;

    }


    if (
        pincode &&
        user.pincode
    ) {

        pincode.value =
            user.pincode;

    }

}


// ============================================================
// PINCODE LOOKUP
// ============================================================

function setupPincodeLookup() {

    const pincodeInput =
        document.getElementById(
            "pincode"
        );

    const cityInput =
        document.getElementById(
            "city"
        );


    if (
        !pincodeInput ||
        !cityInput
    ) {

        return;

    }


    // Small status message
    let pinStatus =
        document.getElementById(
            "pin-status"
        );


    if (!pinStatus) {

        pinStatus =
            document.createElement(
                "small"
            );

        pinStatus.id =
            "pin-status";

        pinStatus.style.display =
            "block";

        pinStatus.style.marginTop =
            "5px";

        pinStatus.style.fontSize =
            "11px";

        pincodeInput.parentElement.appendChild(
            pinStatus
        );

    }


    pincodeInput.addEventListener(
        "input",
        function () {

            // Allow only numbers
            this.value =
                this.value.replace(
                    /\D/g,
                    ""
                );


            // Clear previous message
            pinStatus.textContent =
                "";

            pinStatus.style.color =
                "#777";


            // Clear city until valid PIN
            if (
                this.value.length !== 6
            ) {

                return;

            }


            pinStatus.textContent =
                "Checking pincode...";

            pinStatus.style.color =
                "#777";


            fetch(
                `https://api.postalpincode.in/pincode/${this.value}`
            )

                .then(
                    response =>
                        response.json()
                )

                .then(
                    data => {

                        if (
                            !data ||
                            !data[0] ||
                            data[0].Status !== "Success" ||
                            !data[0].PostOffice ||
                            data[0].PostOffice.length === 0
                        ) {

                            cityInput.value =
                                "";

                            pinStatus.textContent =
                                "❌ Invalid pincode.";

                            pinStatus.style.color =
                                "#dc3545";

                            return;

                        }


                        const location =
                            data[0].PostOffice[0];


                        cityInput.value =
                            location.District ||
                            location.Block ||
                            location.Name ||
                            "";


                        pinStatus.textContent =
                            "✓ City found automatically.";

                        pinStatus.style.color =
                            "#198754";

                    }
                )

                .catch(
                    error => {

                        console.error(
                            "Pincode lookup error:",
                            error
                        );


                        pinStatus.textContent =
                            "Unable to check pincode. Please enter city manually.";

                        pinStatus.style.color =
                            "#dc3545";

                    }
                );

        }
    );

}


// ============================================================
// SAVE ORDER
// ============================================================

function placeOrder() {

    const message =
        document.getElementById(
            "checkout-message"
        );


    const cart =
        getCart();


    // Empty cart
    if (cart.length === 0) {

        if (message) {

            message.textContent =
                "Your cart is empty.";

            message.style.color =
                "#dc3545";

        }

        return;

    }


    const name =
        document.getElementById(
            "name"
        ).value.trim();


    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const phone =
        document.getElementById(
            "phone"
        ).value.trim();


    const address =
        document.getElementById(
            "address"
        ).value.trim();


    const city =
        document.getElementById(
            "city"
        ).value.trim();


    const pincode =
        document.getElementById(
            "pincode"
        ).value.trim();


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    // ========================================================
    // VALIDATION
    // ========================================================

    if (
        !name ||
        !email ||
        !phone ||
        !address ||
        !city ||
        !pincode
    ) {

        if (message) {

            message.textContent =
                "Please fill in all delivery details.";

            message.style.color =
                "#dc3545";

        }

        return;

    }


    if (
        !/^\d{6}$/.test(
            pincode
        )
    ) {

        if (message) {

            message.textContent =
                "Please enter a valid 6-digit pincode.";

            message.style.color =
                "#dc3545";

        }

        return;

    }


    if (!payment) {

        if (message) {

            message.textContent =
                "Please select a payment method.";

            message.style.color =
                "#dc3545";

        }

        return;

    }


    // ========================================================
    // CALCULATE TOTAL
    // ========================================================

    const totals =
        calculateTotals(cart);


    // ========================================================
    // CREATE ORDER
    // ========================================================

    let orders = [];

    try {

        orders =
            JSON.parse(
                localStorage.getItem(
                    ORDERS_KEY
                ) || "[]"
            );

    } catch (error) {

        orders = [];

    }


    if (!Array.isArray(orders)) {

        orders = [];

    }


    const orderId =
        "FB" +
        Date.now();


    const order = {

        orderId,

        date:
            new Date().toLocaleString(),

        customer: {

            name,

            email,

            phone,

            address,

            city,

            pincode

        },

        paymentMethod:
            payment.value,

        items:
            cart,

        subtotal:
            totals.subtotal,

        delivery:
            totals.delivery,

        discount:
            totals.discount,

        total:
            totals.total,

        status:
            "Order Placed"

    };


    orders.push(
        order
    );


    localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify(orders)
    );


    // Also save latest order
    localStorage.setItem(
        "freshbite_last_order",
        JSON.stringify(order)
    );


    // ========================================================
    // CLEAR CART
    // ========================================================

    saveCart([]);


    // ========================================================
    // SHOW SUCCESS MESSAGE
    // ========================================================

    if (message) {

        message.textContent =
            "✓ Order placed successfully!";

        message.style.color =
            "#198754";

    }


    // ========================================================
    // REDIRECT
    // ========================================================

    setTimeout(
        function () {

            window.location.href =
                `order-success.html?orderId=${encodeURIComponent(orderId)}`;

        },
        500
    );

}


// ============================================================
// PLACE ORDER BUTTON
// ============================================================

function setupPlaceOrderButton() {

    const button =
        document.getElementById(
            "place-order-btn"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function () {

            placeOrder();

        }
    );

}


// ============================================================
// MOBILE NAVIGATION
// ============================================================

function setupMobileMenu() {

    const menuButton =
        document.getElementById(
            "menu-btn"
        );


    const navigation =
        document.querySelector(
            ".nav-links"
        );


    if (
        menuButton &&
        navigation
    ) {

        menuButton.addEventListener(
            "click",
            function () {

                navigation.classList.toggle(
                    "mobile-active"
                );

            }
        );

    }

}


// ============================================================
// INITIALIZE CHECKOUT
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderOrderSummary();

        autofillUserDetails();

        setupPincodeLookup();

        setupPlaceOrderButton();

        setupMobileMenu();

    }
);


// ============================================================
// GLOBAL FUNCTIONS
// ============================================================

window.placeOrder =
    placeOrder;

window.renderOrderSummary =
    renderOrderSummary;