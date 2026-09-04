const CART_KEY = "cart";

// ============================================================
// FRESHBITE - COMPLETE FOOD MENU
// ============================================================

const foodItems = [

    // ========================================================
    // PIZZAS
    // ========================================================

    {
        id: 1,
        name: "Margherita Pizza",
        price: 249,
        oldPrice: 299,
        category: "pizza",
        type: "veg",
        rating: 4.6,
        time: "25 min",
        serves: "1-2",
        spice: "Mild",
        ingredients: "Mozzarella, tomato sauce, basil, Italian herbs",
        description:
            "Classic Italian pizza prepared with rich tomato sauce, fresh mozzarella cheese and fragrant basil on a golden crispy crust. A simple and comforting choice for cheese lovers.",
        offer: "20% OFF",
        image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 2,
        name: "Farmhouse Pizza",
        price: 299,
        oldPrice: 349,
        category: "pizza",
        type: "veg",
        rating: 4.7,
        time: "30 min",
        serves: "1-2",
        spice: "Mild",
        ingredients: "Capsicum, onion, mushroom, tomato, mozzarella",
        description:
            "A loaded vegetarian pizza topped with crunchy capsicum, fresh onions, juicy tomatoes, mushrooms and plenty of melted mozzarella cheese.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 3,
        name: "Paneer Tikka Pizza",
        price: 329,
        oldPrice: 379,
        category: "pizza",
        type: "veg",
        rating: 4.8,
        time: "30 min",
        serves: "1-2",
        spice: "Medium",
        ingredients: "Paneer tikka, onion, capsicum, mozzarella, herbs",
        description:
            "A fusion pizza topped with smoky paneer tikka, crunchy onions, capsicum and creamy mozzarella. Perfect for people who love Indian flavours with Italian pizza.",
        offer: "BUY 1 GET 1",
        image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 4,
        name: "Chicken Pepperoni Pizza",
        price: 349,
        oldPrice: 399,
        category: "pizza",
        type: "non-veg",
        rating: 4.8,
        time: "32 min",
        serves: "1-2",
        spice: "Medium",
        ingredients: "Chicken pepperoni, mozzarella, tomato sauce, oregano",
        description:
            "Crispy chicken pepperoni layered over rich tomato sauce and melted mozzarella cheese. Finished with Italian herbs for a smoky and savoury flavour.",
        offer: "FLAT ₹50 OFF",
        image:
            "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 5,
        name: "BBQ Chicken Pizza",
        price: 369,
        oldPrice: 429,
        category: "pizza",
        type: "non-veg",
        rating: 4.9,
        time: "35 min",
        serves: "1-2",
        spice: "Medium",
        ingredients: "Grilled chicken, BBQ sauce, onion, mozzarella",
        description:
            "Juicy grilled chicken combined with smoky BBQ sauce, caramelized onions and melted cheese on a freshly baked crust.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 6,
        name: "Cheese Burst Pizza",
        price: 319,
        oldPrice: 369,
        category: "pizza",
        type: "veg",
        rating: 4.7,
        time: "30 min",
        serves: "1-2",
        spice: "Mild",
        ingredients: "Mozzarella, cheddar, tomato sauce, herbs",
        description:
            "A rich and cheesy pizza with a delicious cheese-filled crust, tomato sauce and extra melted cheese for people who simply love cheese.",
        offer: "20% OFF",
        image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80"
    },


    // ========================================================
    // BURGERS
    // ========================================================

    {
        id: 7,
        name: "Classic Chicken Burger",
        price: 179,
        oldPrice: 219,
        category: "burger",
        type: "non-veg",
        rating: 4.7,
        time: "20 min",
        serves: "1",
        spice: "Medium",
        ingredients: "Chicken patty, lettuce, tomato, cheese, burger sauce",
        description:
            "A juicy chicken patty served inside a soft toasted bun with fresh lettuce, tomato, cheese and our signature creamy burger sauce.",
        offer: "20% OFF",
        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 8,
        name: "Cheese Burger",
        price: 149,
        oldPrice: 179,
        category: "burger",
        type: "veg",
        rating: 4.5,
        time: "18 min",
        serves: "1",
        spice: "Mild",
        ingredients: "Veg patty, cheddar cheese, lettuce, tomato, sauce",
        description:
            "Crispy vegetarian patty topped with melted cheddar cheese, fresh vegetables and creamy sauce inside a soft toasted burger bun.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 9,
        name: "Double Chicken Burger",
        price: 249,
        oldPrice: 299,
        category: "burger",
        type: "non-veg",
        rating: 4.9,
        time: "25 min",
        serves: "1",
        spice: "Medium",
        ingredients: "Two chicken patties, cheese, lettuce, onion, smoky sauce",
        description:
            "Two juicy chicken patties stacked with melted cheese, crunchy lettuce, onions and smoky sauce for a filling and satisfying meal.",
        offer: "BUY 1 GET 1",
        image:
            "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 10,
        name: "Paneer Tikka Burger",
        price: 189,
        oldPrice: 229,
        category: "burger",
        type: "veg",
        rating: 4.6,
        time: "20 min",
        serves: "1",
        spice: "Medium",
        ingredients: "Paneer tikka, onion, lettuce, cheese, mint sauce",
        description:
            "Grilled paneer tikka combined with crunchy lettuce, onions, cheese and refreshing mint sauce inside a toasted burger bun.",
        offer: "20% OFF",
        image:
            "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 11,
        name: "Crispy Chicken Burger",
        price: 219,
        oldPrice: 259,
        category: "burger",
        type: "non-veg",
        rating: 4.8,
        time: "22 min",
        serves: "1",
        spice: "Spicy",
        ingredients: "Crispy chicken, lettuce, mayo, cheese, spicy sauce",
        description:
            "Golden crispy chicken fillet topped with fresh lettuce, cheese and spicy creamy sauce inside a soft toasted bun.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=600&q=80"
    },


    // ========================================================
    // INDIAN FOOD
    // ========================================================

    {
        id: 12,
        name: "Paneer Butter Masala",
        price: 249,
        oldPrice: 289,
        category: "indian",
        type: "veg",
        rating: 4.8,
        time: "25 min",
        serves: "1-2",
        spice: "Medium",
        ingredients: "Paneer, tomato, butter, cream, onion, Indian spices",
        description:
            "Soft paneer cubes cooked in a rich tomato and butter gravy with cream and aromatic Indian spices. Creamy, mildly sweet and perfectly spiced.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 13,
        name: "Veg Biryani",
        price: 199,
        oldPrice: 239,
        category: "indian",
        type: "veg",
        rating: 4.6,
        time: "30 min",
        serves: "1",
        spice: "Medium",
        ingredients: "Basmati rice, vegetables, onion, mint, saffron, spices",
        description:
            "Fragrant basmati rice cooked with fresh vegetables, caramelized onions, mint, saffron and traditional biryani spices for a flavorful one-pot meal.",
        offer: "20% OFF",
        image:
            "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 14,
        name: "Chicken Biryani",
        price: 279,
        oldPrice: 329,
        category: "indian",
        type: "non-veg",
        rating: 4.9,
        time: "35 min",
        serves: "1",
        spice: "Medium",
        ingredients: "Chicken, basmati rice, saffron, fried onion, mint, spices",
        description:
            "Aromatic basmati rice layered with tender marinated chicken, fried onions, mint and traditional spices. A rich and satisfying classic Indian meal.",
        offer: "FLAT ₹50 OFF",
        image:
            "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 15,
        name: "Masala Dosa",
        price: 129,
        oldPrice: 159,
        category: "indian",
        type: "veg",
        rating: 4.5,
        time: "20 min",
        serves: "1",
        spice: "Medium",
        ingredients: "Rice batter, urad dal, potato, onion, mustard seeds",
        description:
            "Thin and crispy South Indian dosa filled with flavorful spiced potato masala. Served with coconut chutney and sambar.",
        offer: "20% OFF",
        image:
            "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 16,
        name: "Dal Makhani",
        price: 189,
        oldPrice: 229,
        category: "indian",
        type: "veg",
        rating: 4.7,
        time: "25 min",
        serves: "1-2",
        spice: "Mild",
        ingredients: "Black lentils, kidney beans, butter, cream, tomato, spices",
        description:
            "Slow-cooked black lentils and kidney beans simmered with butter, cream and aromatic spices to create a rich and comforting North Indian classic.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 17,
        name: "Chole Bhature",
        price: 169,
        oldPrice: 199,
        category: "indian",
        type: "veg",
        rating: 4.6,
        time: "25 min",
        serves: "1",
        spice: "Medium",
        ingredients: "Chickpeas, bhature, onion, tomato, spices",
        description:
            "Spicy and flavorful chickpea curry served with soft, fluffy and freshly fried bhature. A popular North Indian comfort meal.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 18,
        name: "Butter Chicken",
        price: 289,
        oldPrice: 339,
        category: "indian",
        type: "non-veg",
        rating: 4.9,
        time: "30 min",
        serves: "1-2",
        spice: "Medium",
        ingredients: "Chicken, tomato, butter, cream, fenugreek, spices",
        description:
            "Tender grilled chicken pieces cooked in a creamy tomato-butter gravy with fenugreek and aromatic spices. Rich, smooth and mildly spicy.",
        offer: "FLAT ₹50 OFF",
        image:
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
    },


    // ========================================================
    // CHINESE / ASIAN
    // ========================================================

    {
        id: 19,
        name: "Veg Hakka Noodles",
        price: 159,
        oldPrice: 189,
        category: "chinese",
        type: "veg",
        rating: 4.5,
        time: "20 min",
        serves: "1",
        spice: "Medium",
        ingredients: "Noodles, cabbage, carrot, capsicum, spring onion, sauces",
        description:
            "Stir-fried noodles tossed with crunchy vegetables, spring onions and flavorful Asian-style sauces for a smoky and satisfying meal.",
        offer: "20% OFF",
        image:
            "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 20,
        name: "Chicken Hakka Noodles",
        price: 219,
        oldPrice: 259,
        category: "chinese",
        type: "non-veg",
        rating: 4.7,
        time: "25 min",
        serves: "1",
        spice: "Medium",
        ingredients: "Noodles, chicken, cabbage, carrot, capsicum, sauces",
        description:
            "Hakka noodles stir-fried with tender chicken strips, fresh vegetables and savory Asian sauces for a delicious smoky flavour.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 21,
        name: "Veg Fried Rice",
        price: 149,
        oldPrice: 179,
        category: "chinese",
        type: "veg",
        rating: 4.5,
        time: "18 min",
        serves: "1",
        spice: "Medium",
        ingredients: "Rice, carrot, beans, capsicum, spring onion, soy sauce",
        description:
            "Fluffy rice wok-tossed with colourful vegetables, spring onions and soy-based sauces for a simple and flavorful Asian meal.",
        offer: "20% OFF",
        image:
            "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 22,
        name: "Chicken Fried Rice",
        price: 199,
        oldPrice: 239,
        category: "chinese",
        type: "non-veg",
        rating: 4.7,
        time: "22 min",
        serves: "1",
        spice: "Medium",
        ingredients: "Rice, chicken, egg, vegetables, spring onion, soy sauce",
        description:
            "Wok-fried rice combined with juicy chicken pieces, vegetables, egg and aromatic sauces for a hearty and flavorful meal.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 23,
        name: "Veg Manchurian",
        price: 169,
        oldPrice: 199,
        category: "chinese",
        type: "veg",
        rating: 4.6,
        time: "25 min",
        serves: "1",
        spice: "Spicy",
        ingredients: "Vegetable balls, cabbage, onion, garlic, soy sauce",
        description:
            "Crispy vegetable Manchurian balls tossed in a spicy, tangy and slightly sweet Indo-Chinese sauce with fresh vegetables.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1625398407796-82650a8c1c8b?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 24,
        name: "Chicken Chilli",
        price: 229,
        oldPrice: 269,
        category: "chinese",
        type: "non-veg",
        rating: 4.8,
        time: "25 min",
        serves: "1",
        spice: "Spicy",
        ingredients: "Chicken, capsicum, onion, green chilli, soy sauce",
        description:
            "Crispy chicken pieces tossed with capsicum, onions, green chillies and spicy Indo-Chinese sauce for a bold and fiery taste.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
    },


    // ========================================================
    // ITALIAN / PASTA
    // ========================================================

    {
        id: 25,
        name: "Creamy Alfredo Pasta",
        price: 229,
        oldPrice: 269,
        category: "italian",
        type: "veg",
        rating: 4.7,
        time: "25 min",
        serves: "1",
        spice: "Mild",
        ingredients: "Pasta, cream, parmesan, garlic, butter, herbs",
        description:
            "Penne pasta coated in a creamy Alfredo sauce made with butter, cream, garlic and parmesan cheese. Smooth, rich and comforting.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 26,
        name: "Arrabbiata Pasta",
        price: 209,
        oldPrice: 249,
        category: "italian",
        type: "veg",
        rating: 4.6,
        time: "22 min",
        serves: "1",
        spice: "Spicy",
        ingredients: "Pasta, tomato, garlic, chilli flakes, basil, herbs",
        description:
            "Pasta tossed in a rich tomato sauce with garlic, chilli flakes and Italian herbs. A perfect choice for people who enjoy spicy food.",
        offer: "20% OFF",
        image:
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 27,
        name: "Cheesy White Sauce Pasta",
        price: 239,
        oldPrice: 279,
        category: "italian",
        type: "veg",
        rating: 4.8,
        time: "25 min",
        serves: "1",
        spice: "Mild",
        ingredients: "Pasta, white sauce, mozzarella, vegetables, herbs",
        description:
            "Creamy white sauce pasta loaded with vegetables and melted cheese, finished with Italian herbs for a rich and comforting flavour.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
    },


    // ========================================================
    // SNACKS / FAST FOOD
    // ========================================================

    {
        id: 28,
        name: "French Fries",
        price: 99,
        oldPrice: 129,
        category: "snacks",
        type: "veg",
        rating: 4.5,
        time: "12 min",
        serves: "1",
        spice: "Mild",
        ingredients: "Potatoes, salt, seasoning",
        description:
            "Golden and crispy potato fries seasoned with a light blend of salt and spices. A perfect side dish or quick snack.",
        offer: "20% OFF",
        image:
            "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 29,
        name: "Peri Peri Fries",
        price: 119,
        oldPrice: 149,
        category: "snacks",
        type: "veg",
        rating: 4.7,
        time: "12 min",
        serves: "1",
        spice: "Spicy",
        ingredients: "Potatoes, peri peri seasoning, herbs",
        description:
            "Crispy golden fries tossed in bold peri peri seasoning for a spicy and flavour-packed snack.",
        offer: "20% OFF",
        image:
            "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 30,
        name: "Veg Cheese Sandwich",
        price: 139,
        oldPrice: 169,
        category: "snacks",
        type: "veg",
        rating: 4.5,
        time: "15 min",
        serves: "1",
        spice: "Mild",
        ingredients: "Bread, cheese, capsicum, tomato, onion, sauce",
        description:
            "Toasted sandwich filled with crunchy vegetables, melted cheese and creamy sauce. Light, tasty and perfect for a quick meal.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 31,
        name: "Chicken Wrap",
        price: 199,
        oldPrice: 239,
        category: "snacks",
        type: "non-veg",
        rating: 4.8,
        time: "18 min",
        serves: "1",
        spice: "Medium",
        ingredients: "Chicken, tortilla, lettuce, onion, cheese, sauce",
        description:
            "Juicy seasoned chicken wrapped with fresh lettuce, onions, cheese and creamy sauce in a soft tortilla.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 32,
        name: "Veg Momos",
        price: 129,
        oldPrice: 159,
        category: "snacks",
        type: "veg",
        rating: 4.6,
        time: "20 min",
        serves: "1",
        spice: "Medium",
        ingredients: "Flour, cabbage, carrot, onion, garlic, chilli sauce",
        description:
            "Soft steamed dumplings filled with seasoned vegetables and served with spicy chilli dip. A popular snack for any time of the day.",
        offer: "20% OFF",
        image:
            "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 33,
        name: "Chicken Momos",
        price: 169,
        oldPrice: 199,
        category: "snacks",
        type: "non-veg",
        rating: 4.8,
        time: "22 min",
        serves: "1",
        spice: "Medium",
        ingredients: "Chicken, flour, onion, garlic, herbs, chilli sauce",
        description:
            "Steamed dumplings filled with juicy seasoned chicken and served with a spicy homemade-style chilli dip.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1541696490-8744a5cdbf0d?auto=format&fit=crop&w=600&q=80"
    },


    // ========================================================
    // DESSERTS
    // ========================================================

    {
        id: 34,
        name: "Chocolate Brownie",
        price: 99,
        oldPrice: 129,
        category: "dessert",
        type: "veg",
        rating: 4.7,
        time: "10 min",
        serves: "1",
        spice: "None",
        ingredients: "Chocolate, cocoa, flour, butter, sugar",
        description:
            "Rich and fudgy chocolate brownie with a soft centre and deep cocoa flavour. A perfect sweet treat after a delicious meal.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 35,
        name: "Chocolate Cake",
        price: 129,
        oldPrice: 159,
        category: "dessert",
        type: "veg",
        rating: 4.8,
        time: "10 min",
        serves: "1",
        spice: "None",
        ingredients: "Chocolate sponge, cocoa, cream, sugar",
        description:
            "Soft and moist chocolate cake layered with smooth chocolate cream and rich cocoa for an indulgent dessert experience.",
        offer: "20% OFF",
        image:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 36,
        name: "Red Velvet Cake",
        price: 179,
        oldPrice: 219,
        category: "dessert",
        type: "veg",
        rating: 4.8,
        time: "12 min",
        serves: "1",
        spice: "None",
        ingredients: "Red velvet sponge, cream cheese frosting",
        description:
            "Soft red velvet sponge layered with smooth cream cheese frosting. A balanced combination of mild cocoa flavour and creamy sweetness.",
        offer: "BUY 2 GET 1",
        image:
            "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 37,
        name: "Gulab Jamun",
        price: 89,
        oldPrice: 109,
        category: "dessert",
        type: "veg",
        rating: 4.7,
        time: "8 min",
        serves: "1",
        spice: "None",
        ingredients: "Milk solids, flour, sugar syrup, cardamom",
        description:
            "Soft golden gulab jamuns soaked in warm cardamom-flavoured sugar syrup. A traditional Indian dessert loved for its rich sweetness.",
        offer: "20% OFF",
        image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 38,
        name: "New York Cheesecake",
        price: 199,
        oldPrice: 239,
        category: "dessert",
        type: "veg",
        rating: 4.9,
        time: "10 min",
        serves: "1",
        spice: "None",
        ingredients: "Cream cheese, biscuit base, sugar, vanilla",
        description:
            "Creamy and smooth cheesecake on a buttery biscuit base with a delicate vanilla flavour. Perfect for cheesecake lovers.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=600&q=80"
    },


    // ========================================================
    // DRINKS
    // ========================================================

    {
        id: 39,
        name: "Fresh Lime Soda",
        price: 69,
        oldPrice: 89,
        category: "drinks",
        type: "veg",
        rating: 4.4,
        time: "8 min",
        serves: "1",
        spice: "None",
        ingredients: "Fresh lime, soda, sugar, mint",
        description:
            "Refreshing chilled lime soda prepared with fresh lime juice, soda, mint and just the right amount of sweetness.",
        offer: "20% OFF",
        image:
            "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 40,
        name: "Mango Smoothie",
        price: 119,
        oldPrice: 149,
        category: "drinks",
        type: "veg",
        rating: 4.6,
        time: "10 min",
        serves: "1",
        spice: "None",
        ingredients: "Fresh mango, milk, sugar, ice",
        description:
            "Creamy chilled smoothie prepared with ripe mangoes and milk. Naturally fruity, refreshing and perfect for mango lovers.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 41,
        name: "Cold Coffee",
        price: 129,
        oldPrice: 159,
        category: "drinks",
        type: "veg",
        rating: 4.7,
        time: "10 min",
        serves: "1",
        spice: "None",
        ingredients: "Coffee, milk, sugar, ice cream",
        description:
            "Smooth chilled coffee blended with creamy milk, sugar and ice cream for a refreshing café-style drink.",
        offer: "20% OFF",
        image:
            "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 42,
        name: "Strawberry Milkshake",
        price: 139,
        oldPrice: 169,
        category: "drinks",
        type: "veg",
        rating: 4.6,
        time: "10 min",
        serves: "1",
        spice: "None",
        ingredients: "Strawberry, milk, vanilla ice cream, sugar",
        description:
            "Creamy strawberry milkshake made with fruity strawberry flavour and chilled milk, finished with smooth vanilla ice cream.",
        offer: "15% OFF",
        image:
            "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
    }

];


// ============================================================
// RENDER FOOD ITEMS
// ============================================================

function renderFoodItems(category = "all") {

    const container = document.getElementById("food-container");

    if (!container) return;

    const filteredItems =
        category === "all"
            ? foodItems
            : foodItems.filter(
                item => item.category === category
            );

    container.innerHTML = "";

    if (filteredItems.length === 0) {

        container.innerHTML = `
            <div style="
                grid-column:1 / -1;
                text-align:center;
                padding:60px 20px;
                background:white;
                border-radius:20px;
            ">
                <div style="font-size:55px;">🍽️</div>

                <h3 style="
                    margin-top:15px;
                    font-size:24px;
                ">
                    No food items found
                </h3>

                <p style="
                    color:#777;
                    margin-top:8px;
                ">
                    Please try another category.
                </p>
            </div>
        `;

        return;
    }


    filteredItems.forEach(food => {

        const typeLabel =
            food.type === "veg"
                ? "🟢 Veg"
                : "🔴 Non-Veg";


        const priceHTML =
            food.oldPrice > food.price
                ? `
                    <div>
                        <span style="
                            color:#ff6b35;
                            font-size:21px;
                            font-weight:bold;
                        ">
                            ₹${food.price}
                        </span>

                        <span style="
                            color:#999;
                            font-size:13px;
                            text-decoration:line-through;
                            margin-left:6px;
                        ">
                            ₹${food.oldPrice}
                        </span>
                    </div>
                `
                : `
                    <span style="
                        color:#ff6b35;
                        font-size:21px;
                        font-weight:bold;
                    ">
                        ₹${food.price}
                    </span>
                `;


        container.innerHTML += `

            <div
                class="food-card"
                data-category="${food.category}"
                id="food-card-${food.id}"
            >

                <!-- FOOD IMAGE -->

                <div style="
                    position:relative;
                ">

                    <img
                        src="${food.image}"
                        alt="${food.name}"
                    >

                    <span style="
                        position:absolute;
                        top:12px;
                        left:12px;
                        background:#ff6b35;
                        color:white;
                        padding:6px 10px;
                        border-radius:20px;
                        font-size:12px;
                        font-weight:bold;
                    ">
                        ${food.offer}
                    </span>

                </div>


                <!-- FOOD INFORMATION -->

                <div class="food-info">

                    <h3 class="food-name">
                        ${food.name}
                    </h3>


                    <!-- BASIC INFORMATION -->

                    <div style="
                        display:flex;
                        align-items:center;
                        gap:8px;
                        flex-wrap:wrap;
                        margin:8px 0;
                        font-size:13px;
                    ">

                        <span>
                            ${typeLabel}
                        </span>

                        <span class="rating">
                            ⭐ ${food.rating}
                        </span>

                        <span style="color:#777;">
                            ⏱️ ${food.time}
                        </span>

                    </div>


                    <!-- DESCRIPTION -->

                    <p class="food-description">
                        ${food.description}
                    </p>


                    <!-- FOOD DETAILS -->

                    <div style="
                        background:#fffaf5;
                        border:1px solid #f1ddd0;
                        border-radius:10px;
                        padding:10px;
                        margin:10px 0;
                        font-size:12px;
                        color:#66534a;
                    ">

                        <div style="
                            margin-bottom:5px;
                        ">
                            🍽️ <strong>Ingredients:</strong>
                            ${food.ingredients}
                        </div>

                        <div style="
                            display:flex;
                            justify-content:space-between;
                            gap:8px;
                            flex-wrap:wrap;
                        ">

                            <span>
                                🌶️ <strong>Spice:</strong>
                                ${food.spice}
                            </span>

                            <span>
                                👥 <strong>Serves:</strong>
                                ${food.serves}
                            </span>

                        </div>

                    </div>


                    <!-- OFFER -->

                    <div style="
                        background:#fff4ed;
                        color:#e85d22;
                        padding:7px 10px;
                        border-radius:8px;
                        font-size:12px;
                        font-weight:bold;
                        margin-bottom:12px;
                    ">
                        🎁 ${food.offer}
                    </div>


                    <!-- PRICE + CART -->

                    <div class="food-bottom">

                        ${priceHTML}

                        <button
                            class="add-cart"
                            onclick="addToCart(${food.id})"
                            title="Add ${food.name} to cart"
                            aria-label="Add ${food.name} to cart"
                        >
                            +
                        </button>

                    </div>


                    <!-- ITEM-SPECIFIC SUCCESS MESSAGE -->

                    <div
                        id="added-message-${food.id}"
                        style="
                            display:none;
                            margin-top:10px;
                            padding:8px 10px;
                            background:#eaf8ee;
                            color:#218838;
                            border-radius:8px;
                            font-size:13px;
                            font-weight:bold;
                            text-align:center;
                        "
                    >
                        ✓ Added to Cart
                    </div>

                </div>

            </div>
        `;
    });
}


// ============================================================
// CART FUNCTIONS
// ============================================================

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


// ============================================================
// SHOW "ADDED TO CART" BELOW ITEM
// ============================================================

function showAddedMessage(foodId) {

    const message =
        document.getElementById(
            `added-message-${foodId}`
        );

    if (!message) return;

    message.style.display = "block";

    if (message.hideTimer) {
        clearTimeout(message.hideTimer);
    }

    message.hideTimer =
        setTimeout(() => {

            message.style.display = "none";

        }, 2200);
}


// ============================================================
// ADD TO CART
// ============================================================

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

    } else {

        cart.push({

            id: food.id,

            name: food.name,

            price: food.price,

            oldPrice: food.oldPrice,

            category: food.category,

            type: food.type,

            rating: food.rating,

            time: food.time,

            serves: food.serves,

            spice: food.spice,

            ingredients: food.ingredients,

            description: food.description,

            offer: food.offer,

            image: food.image,

            quantity: 1

        });
    }


    saveCart(cart);

    updateCartCount();

    showAddedMessage(foodId);

    showToast(
        `${food.name} added to cart 🛒`
    );
}


// ============================================================
// BOTTOM-CENTER TOAST
// ============================================================

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

        document.body.appendChild(toast);
    }


    // IMPORTANT:
    // Bottom center instead of bottom right

    toast.style.position = "fixed";

    toast.style.bottom = "30px";

    toast.style.left = "50%";

    toast.style.right = "auto";

    toast.style.transform =
        "translateX(-50%)";

    toast.style.zIndex = "99999";

    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(window.toastTimer);


    window.toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 1800);
}


// ============================================================
// CATEGORY FILTER
// ============================================================

function filterCategory(category) {

    renderFoodItems(category);


    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.classList.remove("active");


            if (
                button.dataset.category === category
            ) {

                button.classList.add("active");
            }

        });
}


// ============================================================
// MOBILE MENU
// ============================================================

function setupMobileMenu() {

    const menuButton =
        document.getElementById("menu-btn");

    const navigation =
        document.querySelector(".nav-links");


    if (!menuButton || !navigation) {
        return;
    }


    menuButton.addEventListener(
        "click",
        function () {

            navigation.classList.toggle(
                "mobile-active"
            );

        }
    );
}


// ============================================================
// CATEGORY BUTTONS
// ============================================================

function setupCategoryButtons() {

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


// ============================================================
// PAGE LOAD
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // Read category from URL
        // Example:
        // menu.html?category=burger

        const params = new URLSearchParams(
            window.location.search
        );

        let category =
            params.get("category");


        // If no category is provided,
        // show all food items

        if (!category) {

            category = "all";

        } else {

            // Make sure category is lowercase
            category =
                category.trim().toLowerCase();

        }


        // Render the selected category

        renderFoodItems(category);


        // Make the correct filter button active

        document
            .querySelectorAll(".filter-btn")
            .forEach(button => {

                button.classList.remove("active");


                if (
                    button.dataset.category === category
                ) {

                    button.classList.add("active");

                }

            });


        updateCartCount();

        setupMobileMenu();

        setupCategoryButtons();

    }
);