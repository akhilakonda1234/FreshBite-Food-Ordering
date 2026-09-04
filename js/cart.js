// ============================================================
// FRESHBITE CART - FRONTEND ONLY
// ============================================================

const CART_KEY = "cart";

// ============================================================
// GET CART
// ============================================================

function getCart() {

    try {

        const cart =
            JSON.parse(
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

    const cart = getCart();

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
    // EMPTY
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
            itemsCount.textContent = "0 items";
        }

        if (cartCount) {
            cartCount.textContent = "0";
        }

        if (subtotalElement) {
            subtotalElement.textContent = "₹0.00";
        }

        if (deliveryElement) {
            deliveryElement.textContent = "₹0.00";
        }

        if (discountElement) {
            discountElement.textContent = "-₹0.00";
        }

        if (totalElement) {
            totalElement.textContent = "₹0.00";
        }

        return;
    }

    // ========================================================
    // CALCULATE
    // ========================================================

    let subtotal = 0;
    let totalQuantity = 0;

    cart.forEach(item => {

        const price =
            Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;

        subtotal +=
            price * quantity;

        totalQuantity +=
            quantity;

    });

    let delivery = 0;

    if (subtotal > 0 && subtotal < 500) {
        delivery = 40;
    }

    let discount = 0;

    if (subtotal >= 1000) {
        discount = subtotal * 0.10;
    }

    const total =
        subtotal +
        delivery -
        discount;

    // ========================================================
    // DISPLAY ITEMS
    // ========================================================

    container.innerHTML = "";

    cart.forEach((item, index) => {

        const price =
            Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;

        const itemTotal =
            price * quantity;

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
        `;

        itemElement.innerHTML = `

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

            <div style="
                flex:1;
            ">

                <h3 style="
                    margin:0 0 8px;
                ">
                    ${item.name}
                </h3>

                <p style="
                    margin:0 0 10px;
                    color:#ff5722;
                    font-weight:bold;
                ">
                    ₹${price.toFixed(2)}
                </p>

                <div style="
                    display:flex;
                    align-items:center;
                    gap:8px;
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
                        "
                    >
                        +
                    </button>

                </div>

            </div>

            <div style="
                text-align:right;
            ">

                <strong>
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
            `-₹${discount.toFixed(2)}`;
    }

    if (totalElement) {
        totalElement.textContent =
            `₹${total.toFixed(2)}`;
    }
}

// ============================================================
// INCREASE
// ============================================================

function increaseQuantity(index) {

    const cart = getCart();

    if (!cart[index]) {
        return;
    }

    cart[index].quantity =
        Number(cart[index].quantity || 0) + 1;

    saveCart(cart);

    renderCart();
}

// ============================================================
// DECREASE
// ============================================================

function decreaseQuantity(index) {

    const cart = getCart();

    if (!cart[index]) {
        return;
    }

    const quantity =
        Number(cart[index].quantity || 1);

    if (quantity <= 1) {

        cart.splice(index, 1);

    } else {

        cart[index].quantity =
            quantity - 1;

    }

    saveCart(cart);

    renderCart();
}

// ============================================================
// REMOVE
// ============================================================

function removeItem(index) {

    const cart = getCart();

    if (!cart[index]) {
        return;
    }

    cart.splice(index, 1);

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
// GLOBAL
// ============================================================

window.renderCart = renderCart;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.removeItem = removeItem;
window.clearCart = clearCart;
window.proceedToCheckout = proceedToCheckout;