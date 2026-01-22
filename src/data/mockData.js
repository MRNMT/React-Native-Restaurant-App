export const CATEGORIES = [
    { id: '1', name: 'All' },
    { id: '2', name: 'Burgers' },
    { id: '3', name: 'Mains' },
    { id: '4', name: 'Starters' },
    { id: '5', name: 'Dessert' },
    { id: '6', name: 'Beverages' },
    { id: '7', name: 'Alcohol' },
];

export const FOOD_ITEMS = [
    {
        id: '1',
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and secret sauce.',
        price: 12.99,
        category: 'Burgers',
        image: 'https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg',
        sides: ['Fries', 'Onion Rings', 'Salad'],
        extras: [
            { name: 'Extra Cheese', price: 1.50 },
            { name: 'Bacon', price: 2.00 },
            { name: 'Avocado', price: 1.50 }
        ]
    },
    {
        id: '2',
        name: 'Grilled Salmon',
        description: 'Fresh grilled salmon served with asparagus and lemon butter sauce.',
        price: 24.99,
        category: 'Mains',
        image: 'https://www.dinneratthezoo.com/wp-content/uploads/2019/05/grilled-salmon-final-2.jpg',
        sides: ['Rice', 'Mashed Potatoes', 'Steamed Veggies'],
        extras: []
    },
    {
        id: '3',
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce, croutons, parmesan cheese, and caesar dressing.',
        price: 9.99,
        category: 'Starters',
        image: 'https://natashaskitchen.com/wp-content/uploads/2019/01/Caesar-Salad-Recipe-3.jpg',
        sides: [],
        extras: [
            { name: 'Grilled Chicken', price: 4.00 },
            { name: 'Shrimp', price: 5.00 }
        ]
    },
    {
        id: '4',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
        price: 8.50,
        category: 'Dessert',
        image: 'https://www.melskitchencafe.com/wp-content/uploads/2023/01/chocolate-lava-cakes-1.jpg',
        sides: [],
        extras: []
    },
    {
        id: '5',
        name: 'Cola',
        description: 'Ice cold cola.',
        price: 2.50,
        category: 'Beverages',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sD379d_tWJ0gXkKzQyP-33w880Qv4400-w&s',
        sides: [],
        extras: []
    },
    {
        id: '6',
        name: 'Craft Beer',
        description: 'Local IPA with citrus notes.',
        price: 6.00,
        category: 'Alcohol',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqLh-t880-99-90-880-99-90-880-99-90&s',
        sides: [],
        extras: []
    },
];
