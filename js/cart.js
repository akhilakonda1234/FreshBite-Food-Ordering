// ============================================================
// FRESHBITE CART - FRONTEND ONLY
// SMART OFFERS + CART MANAGEMENT
// ============================================================

const CART_KEY = "cart";


// ============================================================
// GET CART
// ============================================================

function getCart() {

    try {

        const cart = JSON.parse(
            localStorage.getItem(CART_KEY)
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
// GET OFFER BUNDLE SIZE
//
// BUY 1 GET 1  -> 2 items
// BUY 2 GET 1  -> 3 items
// Other offers -> 1 item
// ============================================================

function getOfferBundleSize(item) {

    const offer = String(
        item.offer || ""
    ).toUpperCase();


    if (offer.includes("BUY 1 GET 1")) {

        return 2;

    }


    if (offer.includes("BUY 2 GET 1")) {

        return 3;

    }


    return 1;

}


// ============================================================
// CALCULATE ITEM OFFER
// ============================================================

function calculateItemOffer(item) {

    const price =
        Number(item.price) || 0;

    const quantity =
        Number(item.quantity) || 1;

    const offer =
        String(item.offer || "")
            .toUpperCase();


    let payableQuantity = quantity;

    let offerDiscount = 0;

    let offerText = "";

    let freeQuantity = 0;


    // ========================================================
    // BUY 1 GET 1
    // ========================================================

    if (
        offer.includes("BUY 1 GET 1")
    ) {

        payableQuantity =
            Math.ceil(quantity / 2);

        freeQuantity =
            quantity - payableQuantity;

        offerDiscount =
            freeQuantity * price;

        offerText =
            `BUY 1 GET 1 • ${freeQuantity} free`;

    }


    // ========================================================
    // BUY 2 GET 1
    // ========================================================

    else if (
        offer.includes("BUY 2 GET 1")
    ) {

        const freeGroups =
            Math.floor(quantity / 3);

        freeQuantity =
            freeGroups;

        payableQuantity =
            quantity - freeQuantity;

        offerDiscount =
            freeQuantity * price;

        offerText =
            `BUY 2 GET 1 • ${freeQuantity} free`;

    }


    // ========================================================
    // 20% OFF
    // ========================================================

    else if (
        offer.includes("20% OFF")
    ) {

        offerDiscount =
            price * quantity * 0.20;

        offerText =
            "20% OFF";

    }


    // ========================================================
    // 15% OFF
    // ========================================================

    else if (
        offer.includes("15% OFF")
    ) {

        offerDiscount =
            price * quantity * 0.15;

        offerText =
            "15% OFF";

    }


    // ========================================================
    // FLAT ₹50 OFF
    // ========================================================

    else if (
        offer.includes("FLAT ₹50 OFF") ||
        offer.includes("FLAT 50 OFF")
    ) {

        offerDiscount =
            Math.min(
                50,
                price * quantity
            );

        offerText =
            "FLAT ₹50 OFF";

    }


    // ========================================================
    // NO OFFER
    // ========================================================

    else {

        offerDiscount = 0;

        offerText = "";

    }


    const originalTotal =
        price * quantity;


    const finalTotal =
        Math.max(
            0,
            originalTotal - offerDiscount
        );


    return {

        originalTotal,

        offerDiscount,

        finalTotal,

        payableQuantity,

        freeQuantity,

        offerText

    };

}


// ============================================================
// NORMALIZE OFFER QUANTITY
//
// This fixes old cart items too.
//
// Example:
//
// BUY 1 GET 1
// quantity 1 -> automatically becomes 2
//
// BUY 2 GET 1
// quantity 1 or 2 -> automatically becomes 3
// ============================================================

function normalizeOfferQuantity(cart) {

    let changed = false;


    cart.forEach(item => {

        const bundleSize =
            getOfferBundleSize(item);


        if (bundleSize === 1) {
            return;
        }


        let quantity =
            Number(item.quantity) || 1;


        // ----------------------------------------------------
        // BUY 1 GET 1
        // Minimum valid offer quantity = 2
        // ----------------------------------------------------

        if (
            bundleSize === 2 &&
            quantity === 1
        ) {

            item.quantity = 2;

            changed = true;

        }


        // ----------------------------------------------------
        // BUY 2 GET 1
        // Minimum valid offer quantity = 3
        // ----------------------------------------------------

        if (
            bundleSize === 3 &&
            quantity < 3
        ) {

            item.quantity = 3;

            changed = true;

        }

    });


    if (changed) {

        saveCart(cart);

    }


    return cart;

}


// ============================================================
// RENDER CART
// ============================================================

function renderCart() {

    const container =
        document.getElementById(
            "cart-items"
        );


    if (!container) {
        return;
    }


    let cart = getCart();


    // Automatically apply minimum offer bundle
    cart = normalizeOfferQuantity(cart);


    const itemsCount =
        document.getElementById(
            "items-count"
        );


    const cartCount =
        document.getElementById(
            "cart-count"
        );


    const subtotalElement =
        document.getElementById(
            "subtotal"
        );


    const deliveryElement =
        document.getElementById(
            "delivery"
        );


    const discountElement =
        document.getElementById(
            "discount"
        );


    const totalElement =
        document.getElementById(
            "total"
        );


    // ========================================================
    // EMPTY CART
    // ========================================================

    if (cart.length === 0) {

        container.innerHTML = `

            <div style="
                text-align:center;
                padding:60px 20px;
            ">

                <div style="
                    font-size:60px;
                    margin-bottom:20px;
                ">
                    🛒
                </div>

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add some delicious food first!
                </p>

                <a
                    href="menu.html"
                    style="
                        display:inline-block;
                        margin-top:20px;
                        padding:12px 25px;
                        background:#ff5722;
                        color:white;
                        text-decoration:none;
                        border-radius:8px;
                    "
                >
                    Browse Menu
                </a>

            </div>

        `;


        if (itemsCount) {
            itemsCount.textContent =
                "0 items";
        }


        if (cartCount) {
            cartCount.textContent =
                "0";
        }


        if (subtotalElement) {
            subtotalElement.textContent =
                "₹0.00";
        }


        if (deliveryElement) {
            deliveryElement.textContent =
                "₹0.00";
        }


        if (discountElement) {
            discountElement.textContent =
                "-₹0.00";
        }


        if (totalElement) {
            totalElement.textContent =
                "₹0.00";
        }


        updateSavingsMessage(0);

        return;

    }


    // ========================================================
    // CALCULATE CART
    // ========================================================

    let subtotal = 0;

    let totalDiscount = 0;

    let totalQuantity = 0;


    cart.forEach(item => {

        const quantity =
            Number(item.quantity) || 1;


        const offerResult =
            calculateItemOffer(item);


        subtotal +=
            offerResult.originalTotal;


        totalDiscount +=
            offerResult.offerDiscount;


        totalQuantity +=
            quantity;

    });


    // ========================================================
    // DELIVERY CHARGE
    // ========================================================

    let delivery = 0;


    if (
        subtotal > 0 &&
        subtotal < 500
    ) {

        delivery = 40;

    }


    // ========================================================
    // ADDITIONAL 10% DISCOUNT ABOVE ₹1000
    // ========================================================

    const subtotalAfterOffers =
        Math.max(
            0,
            subtotal - totalDiscount
        );


    let bulkDiscount = 0;


    if (
        subtotalAfterOffers >= 1000
    ) {

        bulkDiscount =
            subtotalAfterOffers * 0.10;

    }


    const totalDiscountAll =
        totalDiscount +
        bulkDiscount;


    const total =
        subtotal +
        delivery -
        totalDiscountAll;


    // ========================================================
    // DISPLAY FOOD ITEMS
    // ========================================================

    container.innerHTML = "";


    cart.forEach((item, index) => {

        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 1;


        const offerResult =
            calculateItemOffer(item);


        const itemTotal =
            offerResult.finalTotal;


        const originalItemTotal =
            offerResult.originalTotal;


        const itemDiscount =
            offerResult.offerDiscount;


        const hasOffer =
            itemDiscount > 0;


        // ====================================================
        // OFFER DISPLAY
        // ====================================================

        const offerHTML =
            item.offer
                ? `

                    <div style="
                        margin-top:10px;
                        padding:9px 11px;
                        background:#fff4ed;
                        color:#e85d22;
                        border-radius:8px;
                        font-size:12px;
                        font-weight:bold;
                    ">

                        🎁 ${item.offer}

                    </div>

                `
                : "";


        // ====================================================
        // FREE ITEM DISPLAY
        // ====================================================

        const freeHTML =
            offerResult.freeQuantity > 0
                ? `

                    <div style="
                        margin-top:8px;
                        padding:9px 11px;
                        background:#eaf8ee;
                        color:#218838;
                        border-radius:8px;
                        font-size:12px;
                        font-weight:bold;
                    ">

                        🎉
                        ${offerResult.freeQuantity}
                        item${offerResult.freeQuantity > 1 ? "s" : ""}
                        FREE

                    </div>

                `
                : "";


        // ====================================================
        // SAVINGS
        // ====================================================

        const savingsHTML =
            itemDiscount > 0
                ? `

                    <div style="
                        margin-top:8px;
                        color:#218838;
                        font-size:12px;
                        font-weight:bold;
                    ">

                        You save ₹${itemDiscount.toFixed(2)}

                    </div>

                `
                : "";


        // ====================================================
        // AUTO OFFER MESSAGE
        // ====================================================

        const autoOfferHTML =
            (
                item.offer &&
                (
                    String(item.offer)
                        .toUpperCase()
                        .includes("BUY 1 GET 1")
                    ||
                    String(item.offer)
                        .toUpperCase()
                        .includes("BUY 2 GET 1")
                )
            )
                ? `

                    <div style="
                        margin-top:8px;
                        padding:7px 10px;
                        background:#f0f7ff;
                        color:#1769aa;
                        border-radius:7px;
                        font-size:11px;
                        font-weight:600;
                    ">

                        ✨ Offer automatically applied

                    </div>

                `
                : "";


        // ====================================================
        // CREATE ITEM
        // ====================================================

        const itemElement =
            document.createElement("div");


        itemElement.style.cssText = `

            display:flex;

            align-items:center;

            gap:15px;

            padding:15px;

            margin-bottom:12px;

            border:1px solid #eee;

            border-radius:12px;

            background:white;

            flex-wrap:wrap;

        `;


        itemElement.innerHTML = `

            <!-- FOOD IMAGE -->

            <img
                src="${item.image}"
                alt="${item.name}"
                style="
                    width:90px;
                    height:90px;
                    object-fit:cover;
                    border-radius:10px;
                    flex-shrink:0;
                "
                onerror="
                    this.src='https://images.unsplash.com/photo-1498837167922-ddd27525d352';
                "
            >


            <!-- FOOD INFORMATION -->

            <div style="
                flex:1;
                min-width:180px;
            ">

                <h3 style="
                    margin:0 0 8px;
                ">
                    ${item.name}
                </h3>


                <p style="
                    margin:0;
                    color:#ff5722;
                    font-weight:bold;
                ">

                    ₹${price.toFixed(2)}

                    ${
                        item.oldPrice &&
                        Number(item.oldPrice) > price
                            ? `

                                <span style="
                                    color:#999;
                                    text-decoration:line-through;
                                    font-size:12px;
                                    margin-left:5px;
                                ">

                                    ₹${Number(item.oldPrice).toFixed(2)}

                                </span>

                            `
                            : ""
                    }

                </p>


                ${
                    item.type
                        ? `

                            <span style="
                                display:inline-block;
                                margin-top:6px;
                                font-size:12px;
                            ">

                                ${
                                    item.type === "veg"
                                        ? "🟢 Veg"
                                        : "🔴 Non-Veg"
                                }

                            </span>

                        `
                        : ""
                }


                ${offerHTML}

                ${freeHTML}

                ${savingsHTML}

                ${autoOfferHTML}


                <!-- QUANTITY -->

                <div style="
                    display:flex;
                    align-items:center;
                    gap:8px;
                    margin-top:12px;
                ">

                    <button
                        type="button"
                        onclick="decreaseQuantity(${index})"
                        style="
                            width:32px;
                            height:32px;
                            border:1px solid #ddd;
                            background:white;
                            border-radius:6px;
                            cursor:pointer;
                            font-size:18px;
                        "
                    >
                        −
                    </button>


                    <strong>
                        ${quantity}
                    </strong>


                    <button
                        type="button"
                        onclick="increaseQuantity(${index})"
                        style="
                            width:32px;
                            height:32px;
                            border:none;
                            background:#ff5722;
                            color:white;
                            border-radius:6px;
                            cursor:pointer;
                            font-size:18px;
                        "
                    >
                        +
                    </button>

                </div>

            </div>


            <!-- PRICE -->

            <div style="
                text-align:right;
                min-width:120px;
            ">

                ${
                    hasOffer
                        ? `

                            <div style="
                                color:#999;
                                font-size:12px;
                                text-decoration:line-through;
                                margin-bottom:3px;
                            ">

                                ₹${originalItemTotal.toFixed(2)}

                            </div>

                        `
                        : ""
                }


                <strong style="
                    font-size:17px;
                ">

                    ₹${itemTotal.toFixed(2)}

                </strong>


                <br>


                <button
                    type="button"
                    onclick="removeItem(${index})"
                    style="
                        margin-top:10px;
                        border:none;
                        background:#dc3545;
                        color:white;
                        padding:7px 10px;
                        border-radius:6px;
                        cursor:pointer;
                    "
                >

                    Remove

                </button>

            </div>

        `;


        container.appendChild(
            itemElement
        );

    });


    // ========================================================
    // SUMMARY
    // ========================================================

    if (itemsCount) {

        itemsCount.textContent =
            `${totalQuantity} item${totalQuantity !== 1 ? "s" : ""}`;

    }


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }


    if (subtotalElement) {

        subtotalElement.textContent =
            `₹${subtotal.toFixed(2)}`;

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            delivery === 0
                ? "FREE"
                : `₹${delivery.toFixed(2)}`;

    }


    if (discountElement) {

        discountElement.textContent =
            `-₹${totalDiscountAll.toFixed(2)}`;

    }


    if (totalElement) {

        totalElement.textContent =
            `₹${Math.max(0, total).toFixed(2)}`;

    }


    // ========================================================
    // SAVINGS MESSAGE
    // ========================================================

    updateSavingsMessage(
        totalDiscountAll
    );

}


// ============================================================
// SAVINGS MESSAGE
// ============================================================

function updateSavingsMessage(totalSavings) {

    let savingsElement =
        document.getElementById(
            "freshbite-savings"
        );


    if (
        totalSavings <= 0
    ) {

        if (savingsElement) {

            savingsElement.remove();

        }

        return;

    }


    if (!savingsElement) {

        // IMPORTANT:
        // cart.html uses .summary-card
        // NOT .cart-summary

        const summary =
            document.querySelector(
                ".summary-card"
            );


        if (!summary) {
            return;
        }


        savingsElement =
            document.createElement(
                "div"
            );


        savingsElement.id =
            "freshbite-savings";


        savingsElement.style.cssText = `

            margin-top:15px;

            padding:12px;

            background:#eaf8ee;

            color:#218838;

            border-radius:10px;

            text-align:center;

            font-size:14px;

            font-weight:bold;

        `;


        summary.appendChild(
            savingsElement
        );

    }


    savingsElement.innerHTML = `

        🎉 You're saving
        <strong>
            ₹${totalSavings.toFixed(2)}
        </strong>
        with FreshBite offers!

    `;

}


// ============================================================
// INCREASE QUANTITY
// ============================================================
//
// For offer items:
//
// BUY 1 GET 1
// + adds 2 items
//
// BUY 2 GET 1
// + adds 3 items
//
// This keeps the offer active.
// ============================================================

function increaseQuantity(index) {

    const cart = getCart();


    if (!cart[index]) {
        return;
    }


    const bundleSize =
        getOfferBundleSize(
            cart[index]
        );


    cart[index].quantity =
        Number(
            cart[index].quantity || 0
        ) + bundleSize;


    saveCart(cart);

    renderCart();

}


// ============================================================
// DECREASE QUANTITY
// ============================================================
//
// For offer items:
//
// BUY 1 GET 1
// 4 -> 2 -> remove
//
// BUY 2 GET 1
// 6 -> 3 -> remove
//
// This prevents breaking the offer bundle.
// ============================================================

function decreaseQuantity(index) {

    const cart = getCart();


    if (!cart[index]) {
        return;
    }


    const bundleSize =
        getOfferBundleSize(
            cart[index]
        );


    const quantity =
        Number(
            cart[index].quantity || 1
        );


    // --------------------------------------------------------
    // OFFER ITEM
    // --------------------------------------------------------

    if (bundleSize > 1) {

        if (
            quantity <= bundleSize
        ) {

            cart.splice(
                index,
                1
            );

        } else {

            cart[index].quantity =
                quantity - bundleSize;

        }

    }


    // --------------------------------------------------------
    // NORMAL ITEM
    // --------------------------------------------------------

    else {

        if (
            quantity <= 1
        ) {

            cart.splice(
                index,
                1
            );

        } else {

            cart[index].quantity =
                quantity - 1;

        }

    }


    saveCart(cart);

    renderCart();

}


// ============================================================
// REMOVE ITEM
// ============================================================

function removeItem(index) {

    const cart = getCart();


    if (!cart[index]) {
        return;
    }


    cart.splice(
        index,
        1
    );


    saveCart(cart);

    renderCart();

}


// ============================================================
// CLEAR CART
// ============================================================

function clearCart() {

    const cart = getCart();


    if (cart.length === 0) {
        return;
    }


    const confirmed =
        confirm(
            "Are you sure you want to clear your cart?"
        );


    if (!confirmed) {
        return;
    }


    saveCart([]);

    renderCart();

}


// ============================================================
// CHECKOUT
// ============================================================

function proceedToCheckout() {

    const cart = getCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add food first."
        );

        return;

    }


    window.location.href =
        "checkout.html";

}


// ============================================================
// MOBILE MENU
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
// REMOVE ANY REFRESH CONFIRMATION
// ============================================================
//
// This file itself does NOT ask for confirmation when
// refreshing the page.
//
// The only confirmation is for "Clear Cart".
// ============================================================

window.onbeforeunload = null;


// ============================================================
// INITIALIZE
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderCart();

        setupMobileMenu();


        const clearButton =
            document.getElementById(
                "clear-cart"
            );


        if (clearButton) {

            clearButton.addEventListener(
                "click",
                clearCart
            );

        }

    }
);


// ============================================================
// GLOBAL FUNCTIONS
// ============================================================

window.renderCart =
    renderCart;

window.increaseQuantity =
    increaseQuantity;

window.decreaseQuantity =
    decreaseQuantity;

window.removeItem =
    removeItem;

window.clearCart =
    clearCart;

window.proceedToCheckout =
    proceedToCheckout;