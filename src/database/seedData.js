import { FirestoreService } from '../services/FirestoreService';

export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Sample food items
    const sampleFoodItems = [
      {
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and secret sauce.',
        price: 12.99,
        category: 'Burgers',
        image: 'https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg',
        restaurantId: 'restaurant-1',
        rating: 4.5,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Grilled Salmon',
        description: 'Fresh grilled salmon served with asparagus and lemon butter sauce.',
        price: 24.99,
        category: 'Mains',
        image: 'https://www.dinneratthezoo.com/wp-content/uploads/2019/05/grilled-salmon-final-2.jpg',
        restaurantId: 'restaurant-1',
        rating: 4.8,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce, croutons, parmesan cheese, and caesar dressing.',
        price: 9.99,
        category: 'Starters',
        image: 'https://natashaskitchen.com/wp-content/uploads/2019/01/Caesar-Salad-Recipe-3.jpg',
        restaurantId: 'restaurant-1',
        rating: 4.2,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
        price: 8.50,
        category: 'Dessert',
        image: 'https://www.melskitchencafe.com/wp-content/uploads/2023/01/chocolate-lava-cakes-1.jpg',
        restaurantId: 'restaurant-1',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Cola',
        description: 'Ice cold cola.',
        price: 2.50,
        category: 'Beverages',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sD379d_tWJ0gXkKzQyP-33w880Qv4400-w&s',
        restaurantId: 'restaurant-1',
        rating: 4.0,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Craft Beer',
        description: 'Local IPA with citrus notes.',
        price: 6.00,
        category: 'Alcohol',
        image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13',
        restaurantId: 'restaurant-1',
        rating: 4.3,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Buffalo Wings',
        description: 'Spicy chicken wings with blue cheese dressing.',
        price: 12.99,
        category: 'Starters',
        image: 'https://www.allrecipes.com/thmb/TnZh0w-rjB8-A6ZQR8vQrGZ8rUc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/187822-buffalo-chicken-wings-DDMFS-4x3-6e8b2c6c3e8b4c0b8a9c3f5f7d2c1e8f.jpg',
        restaurantId: 'restaurant-1',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Onion Rings',
        description: 'Crispy fried onion rings.',
        price: 7.99,
        category: 'Sides',
        image: 'https://www.allrecipes.com/thmb/Z8cYo5Zr3qKzZQz8c8Y8o8Y8o8Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/82659-restaurant-style-onion-rings-DDMFS-4x3-2a2a2a2a2a2a2a2a2a2a2a2a2a2a.jpg',
        restaurantId: 'restaurant-1',
        rating: 4.3,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Truffle Fries',
        description: 'Hand-cut fries with truffle oil and parmesan.',
        price: 9.99,
        category: 'Sides',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877',
        restaurantId: 'restaurant-1',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Iced Tea',
        description: 'Freshly brewed iced tea with lemon.',
        price: 2.99,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
        restaurantId: 'restaurant-1',
        rating: 4.1,
        available: true,
        createdAt: new Date().toISOString()
      },

      // Restaurant 2 - Italian & International
      {
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomato sauce, and basil on a thin crust.',
        price: 15.99,
        category: 'Pizza',
        image: 'https://www.simplyrecipes.com/thmb/8caxM88NgxZgzlLp1Yp4lP2N2aI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Homemade-Pizza-LEAD-3-8aa37af554cf4445a82e6a0c44b7862d.jpg',
        restaurantId: 'restaurant-2',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta with eggs, cheese, pancetta, and black pepper.',
        price: 16.99,
        category: 'Pasta',
        image: 'https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-square640-v2.jpg',
        restaurantId: 'restaurant-2',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Beef Tacos',
        description: 'Three soft tacos with seasoned beef, salsa, lettuce, and cheese.',
        price: 13.99,
        category: 'Mexican',
        image: 'https://www.dinneratthezoo.com/wp-content/uploads/2018/04/beef-tacos-final-2.jpg',
        restaurantId: 'restaurant-2',
        rating: 4.4,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Greek Salad',
        description: 'Fresh vegetables, feta cheese, olives, and olive oil dressing.',
        price: 11.99,
        category: 'Starters',
        image: 'https://www.allrecipes.com/thmb/K8vCLc1vXdOdqbQC72z09-7JrSA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/14373-The-Best-Greek-Salad-mfs-beauty-3x2-BP-2979-95337697f8774302b4e138400fe8ce7c.jpg',
        restaurantId: 'restaurant-2',
        rating: 4.3,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Mozzarella Sticks',
        description: 'Breaded and fried mozzarella with marinara sauce.',
        price: 9.99,
        category: 'Starters',
        image: 'https://www.allrecipes.com/thmb/S5FJ8jZ3kQ1kQ1kQ1kQ1kQ1kQ1k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/233918-mozzarella-sticks-DDMFS-4x3-3b3b3b3b3b3b3b3b3b3b3b3b3b3b.jpg',
        restaurantId: 'restaurant-2',
        rating: 4.5,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Quesadilla',
        description: 'Cheese quesadilla with sour cream and salsa.',
        price: 10.99,
        category: 'Mexican',
        image: 'https://www.allrecipes.com/thmb/qmvEp3qmvEp3qmvEp3qmvEp3qmv=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/55384-quesadillas-DDMFS-4x3-4c4c4c4c4c4c4c4c4c4c4c4c4c4c.jpg',
        restaurantId: 'restaurant-2',
        rating: 4.4,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Lasagna',
        description: 'Layered pasta with meat sauce, ricotta, and mozzarella.',
        price: 18.99,
        category: 'Pasta',
        image: 'https://www.allrecipes.com/thmb/MkKfYU4oim-MkKfYU4oim-MkKfYU4o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/23600-worlds-best-lasagna-ARMAG-5x4-1-b74096a5f7d14c6c9c7e8c8c8c8c8c8c.jpg',
        restaurantId: 'restaurant-2',
        rating: 4.8,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Bruschetta',
        description: 'Toasted bread with tomatoes, garlic, and basil.',
        price: 8.99,
        category: 'Starters',
        image: 'https://www.allrecipes.com/thmb/jC7-jC7-jC7-jC7-jC7-jC7-jC7-jC7=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/23600-bruschetta-DDMFS-4x3-5d5d5d5d5d5d5d5d5d5d5d5d5d5d.jpg',
        restaurantId: 'restaurant-2',
        rating: 4.4,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Sangria',
        description: 'Red wine punch with fresh fruit.',
        price: 8.99,
        category: 'Alcohol',
        image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7',
        restaurantId: 'restaurant-2',
        rating: 4.5,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Sparkling Water',
        description: 'Chilled sparkling mineral water.',
        price: 3.50,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504',
        restaurantId: 'restaurant-2',
        rating: 4.2,
        available: true,
        createdAt: new Date().toISOString()
      },

      // Restaurant 3 - Asian Cuisine
      {
        name: 'Pad Thai',
        description: 'Stir-fried rice noodles with shrimp, tofu, peanuts, and tamarind sauce.',
        price: 14.99,
        category: 'Thai',
        image: 'https://hot-thai-kitchen.com/wp-content/uploads/2022/02/Pad-Thai-Blog.jpg',
        restaurantId: 'restaurant-3',
        rating: 4.8,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'California Roll',
        description: 'Sushi roll with crab, avocado, and cucumber.',
        price: 12.99,
        category: 'Sushi',
        image: 'https://www.seriouseats.com/thmb/3NhN6r-vfhGaV6hEfqfXLd3MGVA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20230620-california-roll-vicky-wasik-24-35f4ead23b8e41fa81ce94a9b2453ed4.jpg',
        restaurantId: 'restaurant-3',
        rating: 4.5,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'General Tso Chicken',
        description: 'Crispy chicken in sweet and spicy sauce with broccoli.',
        price: 15.99,
        category: 'Chinese',
        image: 'https://thewoksoflife.com/wp-content/uploads/2019/07/general-tsos-chicken-11.jpg',
        restaurantId: 'restaurant-3',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Ramen Bowl',
        description: 'Rich pork broth with noodles, egg, pork belly, and green onions.',
        price: 16.99,
        category: 'Japanese',
        image: 'https://www.justonecookbook.com/wp-content/uploads/2023/04/Spicy-Shoyu-Ramen-8055-I.jpg',
        restaurantId: 'restaurant-3',
        rating: 4.9,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Spring Rolls',
        description: 'Fresh vegetables wrapped in rice paper with peanut sauce.',
        price: 8.99,
        category: 'Starters',
        image: 'https://www.allrecipes.com/thmb/cw5VGWKgX2k-Gg6L0vT0JMJfRnk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/24239-vietnamese-spring-rolls-DDMFS-4x3-081e0055e30f4dc7b3c5c5bcd4f7a7ea.jpg',
        restaurantId: 'restaurant-3',
        rating: 4.4,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Green Tea',
        description: 'Hot or iced authentic Japanese green tea.',
        price: 3.50,
        category: 'Beverages',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Green_tea_3.jpg/1200px-Green_tea_3.jpg',
        restaurantId: 'restaurant-3',
        rating: 4.2,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Tom Yum Soup',
        description: 'Spicy and sour Thai soup with shrimp.',
        price: 11.99,
        category: 'Thai',
        image: 'https://hot-thai-kitchen.com/wp-content/uploads/2013/03/tom-yum-goong-blog.jpg',
        restaurantId: 'restaurant-3',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Dumplings',
        description: 'Pan-fried pork dumplings with soy dipping sauce.',
        price: 9.99,
        category: 'Chinese',
        image: 'https://www.allrecipes.com/thmb/j0ZhLB3ZhLB3ZhLB3ZhLB3ZhLB3Z=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6555-chinese-pork-dumplings-DDMFS-4x3-5d5d5d5d5d5d5d5d5d5d5d5d5d5d.jpg',
        restaurantId: 'restaurant-3',
        rating: 4.8,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Miso Soup',
        description: 'Traditional Japanese soup with tofu and seaweed.',
        price: 4.99,
        category: 'Starters',
        image: 'https://www.justonecookbook.com/wp-content/uploads/2022/08/Miso-Soup-5292-I.jpg',
        restaurantId: 'restaurant-3',
        rating: 4.3,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Sake',
        description: 'Premium Japanese rice wine, served hot or cold.',
        price: 9.99,
        category: 'Alcohol',
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b',
        restaurantId: 'restaurant-3',
        rating: 4.5,
        available: true,
        createdAt: new Date().toISOString()
      },

      // Restaurant 4 - Breakfast & Brunch
      {
        name: 'Pancake Stack',
        description: 'Fluffy pancakes with maple syrup, butter, and fresh berries.',
        price: 11.99,
        category: 'Breakfast',
        image: 'https://www.allrecipes.com/thmb/kvvETNZfOtAptH69RqkUppy9WTA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21014-Good-old-Fashioned-Pancakes-mfs_001-1fa26bcdedc345f182537d95b6cf92d8.jpg',
        restaurantId: 'restaurant-4',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Eggs Benedict',
        description: 'Poached eggs on English muffin with Canadian bacon and hollandaise.',
        price: 14.99,
        category: 'Breakfast',
        image: 'https://www.simplyrecipes.com/thmb/AXL1YJbEIZHIXsISBw_H0x-WEqY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Eggs-Benedict-LEAD-1-a17c550bc8a545fd85b0cf5917c05c3b.jpg',
        restaurantId: 'restaurant-4',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Avocado Toast',
        description: 'Smashed avocado on sourdough with poached egg and chili flakes.',
        price: 12.99,
        category: 'Breakfast',
        image: 'https://www.loveandlemons.com/wp-content/uploads/2023/08/avocado-toast.jpg',
        restaurantId: 'restaurant-4',
        rating: 4.5,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'French Toast',
        description: 'Thick-cut brioche French toast with cinnamon and powdered sugar.',
        price: 10.99,
        category: 'Breakfast',
        image: 'https://www.allrecipes.com/thmb/TBJmJEVS3VAYQ8FQhyNeWMa0hOE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7016-french-toast-mfs-047-1x1-8e256d0b4f724e43bb0e85953e2f4297.jpg',
        restaurantId: 'restaurant-4',
        rating: 4.8,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Breakfast Burrito',
        description: 'Scrambled eggs, bacon, cheese, and salsa wrapped in a flour tortilla.',
        price: 9.99,
        category: 'Breakfast',
        image: 'https://www.allrecipes.com/thmb/1qKNJlAqMFEJCO_FuD7qQPrOqZo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Breakfast-Burrito-2000-d2e2c4ba4dcb45bbbab4ea8c95b32a47.jpg',
        restaurantId: 'restaurant-4',
        rating: 4.4,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice.',
        price: 4.99,
        category: 'Beverages',
        image: 'https://www.allrecipes.com/thmb/eQpUMJ7KHkNVJBQOQvmLnYr7Ndk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21651-fresh-squeezed-orange-juice-ddmfs-3x4-0523-0d4d42b11db4448ba8ac55ba0edecb93.jpg',
        restaurantId: 'restaurant-4',
        rating: 4.3,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Belgian Waffles',
        description: 'Light and crispy waffles with whipped cream and berries.',
        price: 10.99,
        category: 'Breakfast',
        image: 'https://www.allrecipes.com/thmb/pL8-pL8-pL8-pL8-pL8-pL8-pL8-pL8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/22180-waffles-i-mfs-049-4x3-6f6f6f6f6f6f6f6f6f6f6f6f6f6f.jpg',
        restaurantId: 'restaurant-4',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Bacon and Eggs',
        description: 'Classic breakfast with crispy bacon and eggs any style.',
        price: 9.99,
        category: 'Breakfast',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8',
        restaurantId: 'restaurant-4',
        rating: 4.5,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Omelette',
        description: 'Three-egg omelette with your choice of fillings.',
        price: 11.99,
        category: 'Breakfast',
        image: 'https://www.allrecipes.com/thmb/k9o-k9o-k9o-k9o-k9o-k9o-k9o-k9o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/49522-western-omelet-DDMFS-4x3-7h7h7h7h7h7h7h7h7h7h7h7h7h7h.jpg',
        restaurantId: 'restaurant-4',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Coffee',
        description: 'Freshly brewed artisan coffee.',
        price: 3.99,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
        restaurantId: 'restaurant-4',
        rating: 4.5,
        available: true,
        createdAt: new Date().toISOString()
      },

      // Restaurant 5 - Steakhouse
      {
        name: 'Ribeye Steak',
        description: '16oz premium ribeye, grilled to perfection with garlic butter.',
        price: 39.99,
        category: 'Steaks',
        image: 'https://www.simplyrecipes.com/thmb/z_zz3BHdSGq8pBWBiQ06jfD3mW8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Grilled-Ribeye-Steak-LEAD-7-8b6e45b58c974ea3be49052fc0c5c915.jpg',
        restaurantId: 'restaurant-5',
        rating: 4.9,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Filet Mignon',
        description: '8oz tender filet with red wine reduction.',
        price: 44.99,
        category: 'Steaks',
        image: 'https://www.vindulge.com/wp-content/uploads/2021/04/Filet-Mignon-4.jpg',
        restaurantId: 'restaurant-5',
        rating: 5.0,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Lobster Tail',
        description: 'Grilled lobster tail with lemon butter sauce.',
        price: 49.99,
        category: 'Seafood',
        image: 'https://www.allrecipes.com/thmb/XJ0fMbPABLBkbRNDnfTuXkD8DKk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/232097-Easiest-Way-to-Cook-Lobster-Tails-1x1-1-37c68de4d12d401bb01b0b62aba1b6bb.jpg',
        restaurantId: 'restaurant-5',
        rating: 4.8,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Loaded Baked Potato',
        description: 'Baked potato with sour cream, cheese, bacon, and chives.',
        price: 8.99,
        category: 'Sides',
        image: 'https://www.allrecipes.com/thmb/5_Tx4LwQuGbLKnT5sOcyPE0Wgnk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/54679-PerfectBakedPotato-mfs-3x2-036-d55b8406dc2048508c2dce390f4c15ea.jpg',
        restaurantId: 'restaurant-5',
        rating: 4.5,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Creamed Spinach',
        description: 'Rich and creamy spinach side dish.',
        price: 7.99,
        category: 'Sides',
        image: 'https://www.allrecipes.com/thmb/yOdz8jOJg8dkDNd8PpZKDwP8P48=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/85333-creamed-spinach-ddmfs-3x2-0523-6e2a8c43df7a4c3e92f9d1a1e6b2e9c4.jpg',
        restaurantId: 'restaurant-5',
        rating: 4.4,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Red Wine',
        description: 'Premium Cabernet Sauvignon.',
        price: 12.00,
        category: 'Alcohol',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3',
        restaurantId: 'restaurant-5',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'New York Strip',
        description: '12oz strip steak with herb butter.',
        price: 36.99,
        category: 'Steaks',
        image: 'https://www.vindulge.com/wp-content/uploads/2021/07/New-York-Strip-IG.jpg',
        restaurantId: 'restaurant-5',
        rating: 4.8,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Grilled Asparagus',
        description: 'Fresh asparagus with olive oil and parmesan.',
        price: 8.99,
        category: 'Sides',
        image: 'https://www.allrecipes.com/thmb/1P9-1P9-1P9-1P9-1P9-1P9-1P9-1P9=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/214931-oven-roasted-asparagus-DDMFS-4x3-7g7g7g7g7g7g7g7g7g7g7g7g7g7g.jpg',
        restaurantId: 'restaurant-5',
        rating: 4.4,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Caesar Salad',
        description: 'Classic Caesar salad with house-made dressing.',
        price: 10.99,
        category: 'Starters',
        image: 'https://natashaskitchen.com/wp-content/uploads/2019/01/Caesar-Salad-Recipe-3.jpg',
        restaurantId: 'restaurant-5',
        rating: 4.3,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Whiskey',
        description: 'Premium single malt scotch.',
        price: 15.00,
        category: 'Alcohol',
        image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8',
        restaurantId: 'restaurant-5',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },

      // Restaurant 6 - Vegetarian/Vegan
      {
        name: 'Buddha Bowl',
        description: 'Quinoa, roasted vegetables, chickpeas, and tahini dressing.',
        price: 14.99,
        category: 'Bowls',
        image: 'https://www.acouplecooks.com/wp-content/uploads/2020/02/Buddha-Bowl-006.jpg',
        restaurantId: 'restaurant-6',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Veggie Burger',
        description: 'Plant-based patty with lettuce, tomato, and special sauce.',
        price: 13.99,
        category: 'Burgers',
        image: 'https://minimalistbaker.com/wp-content/uploads/2019/02/THE-BEST-Burger-30-minutes-SO-meaty-juicy-and-satisfying-vegan-glutenfree-burger-recipe-veggie-plantbased.jpg',
        restaurantId: 'restaurant-6',
        rating: 4.5,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Falafel Wrap',
        description: 'Crispy falafel in pita with hummus, vegetables, and tahini.',
        price: 11.99,
        category: 'Wraps',
        image: 'https://www.themediterraneandish.com/wp-content/uploads/2020/02/falafel-recipe-1.jpg',
        restaurantId: 'restaurant-6',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Acai Bowl',
        description: 'Acai berries blended with banana, topped with granola and fresh fruit.',
        price: 12.99,
        category: 'Bowls',
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
        restaurantId: 'restaurant-6',
        rating: 4.8,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Vegan Curry',
        description: 'Coconut curry with tofu, vegetables, and jasmine rice.',
        price: 15.99,
        category: 'Curry',
        image: 'https://www.allrecipes.com/thmb/2yIkPZMHkfZ8J5HhD3f3c8W3h9k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/228823-vegan-thai-red-curry-DDMFS-4x3-0709f52f3c5f4f7e9f3f5f3c5f4f7e9f.jpg',
        restaurantId: 'restaurant-6',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Kombucha',
        description: 'Organic fermented tea beverage.',
        price: 5.50,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
        restaurantId: 'restaurant-6',
        rating: 4.3,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Quinoa Salad',
        description: 'Healthy quinoa with roasted vegetables and lemon vinaigrette.',
        price: 13.99,
        category: 'Bowls',
        image: 'https://www.allrecipes.com/thmb/8J8-8J8-8J8-8J8-8J8-8J8-8J8-8J8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/229156-zesty-quinoa-salad-DDMFS-4x3-8h8h8h8h8h8h8h8h8h8h8h8h8h8h.jpg',
        restaurantId: 'restaurant-6',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Smoothie Bowl',
        description: 'Blended berries topped with granola, coconut, and chia seeds.',
        price: 11.99,
        category: 'Bowls',
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
        restaurantId: 'restaurant-6',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Vegan Tacos',
        description: 'Three tacos with seasoned jackfruit, salsa, and avocado.',
        price: 12.99,
        category: 'Mexican',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47',
        restaurantId: 'restaurant-6',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Fresh Juice',
        description: 'Cold-pressed green juice.',
        price: 6.99,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec',
        restaurantId: 'restaurant-6',
        rating: 4.4,
        available: true,
        createdAt: new Date().toISOString()
      },

      // Restaurant 7 - BBQ
      {
        name: 'BBQ Ribs',
        description: 'Slow-cooked baby back ribs with house BBQ sauce.',
        price: 24.99,
        category: 'BBQ',
        image: 'https://www.allrecipes.com/thmb/tZ7-tZ7-tZ7-tZ7-tZ7-tZ7-tZ7-tZ7=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/BBQ-Ribs-2000-5d8c8f8f8f8f8f8f8f8f8f8f8f8f.jpg',
        restaurantId: 'restaurant-7',
        rating: 4.9,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Pulled Pork Sandwich',
        description: 'Tender pulled pork with coleslaw on a brioche bun.',
        price: 14.99,
        category: 'BBQ',
        image: 'https://www.recipetineats.com/wp-content/uploads/2018/12/Pulled-Pork_9.jpg',
        restaurantId: 'restaurant-7',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Brisket Plate',
        description: 'Smoked brisket with two sides of your choice.',
        price: 22.99,
        category: 'BBQ',
        image: 'https://www.vindulge.com/wp-content/uploads/2019/05/Smoked-Brisket-IG-1.jpg',
        restaurantId: 'restaurant-7',
        rating: 4.8,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Mac and Cheese',
        description: 'Creamy homemade macaroni and cheese.',
        price: 7.99,
        category: 'Sides',
        image: 'https://www.allrecipes.com/thmb/p5CY3qLILy8E7iN9rq5r3qKEz_g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/238691-Simple-Macaroni-And-Cheese-mfs_002-4x3-cb0b1f0e70b74b7a9c8c5f6c8e6f8e8e.jpg',
        restaurantId: 'restaurant-7',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Cornbread',
        description: 'Sweet and buttery cornbread.',
        price: 5.99,
        category: 'Sides',
        image: 'https://www.allrecipes.com/thmb/xq5K7N7N7N7N7N7N7N7N7N7N7N7=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/17891-Golden-Sweet-Cornbread-mfs-3x2-0545-2e5e5e5e5e5e5e5e5e5e5e5e5e5e.jpg',
        restaurantId: 'restaurant-7',
        rating: 4.5,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Lemonade',
        description: 'Fresh-squeezed lemonade.',
        price: 3.99,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9b',
        restaurantId: 'restaurant-7',
        rating: 4.4,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Smoked Wings',
        description: 'Smoky chicken wings with BBQ rub.',
        price: 13.99,
        category: 'BBQ',
        image: 'https://www.allrecipes.com/thmb/0C9-0C9-0C9-0C9-0C9-0C9-0C9-0C9=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/233922-bbq-chicken-wings-DDMFS-4x3-9i9i9i9i9i9i9i9i9i9i9i9i9i9i.jpg',
        restaurantId: 'restaurant-7',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Coleslaw',
        description: 'Creamy coleslaw with a hint of tang.',
        price: 4.99,
        category: 'Sides',
        image: 'https://www.allrecipes.com/thmb/jK9-jK9-jK9-jK9-jK9-jK9-jK9-jK9=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25498-best-ever-coleslaw-DDMFS-4x3-0j0j0j0j0j0j0j0j0j0j0j0j0j0j.jpg',
        restaurantId: 'restaurant-7',
        rating: 4.3,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Baked Beans',
        description: 'Slow-cooked beans with bacon and molasses.',
        price: 6.99,
        category: 'Sides',
        image: 'https://www.allrecipes.com/thmb/mL9-mL9-mL9-mL9-mL9-mL9-mL9-mL9=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/140398-baked-beans-DDMFS-4x3-0k0k0k0k0k0k0k0k0k0k0k0k0k0k.jpg',
        restaurantId: 'restaurant-7',
        rating: 4.4,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Sweet Tea',
        description: 'Southern-style sweet iced tea.',
        price: 2.99,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
        restaurantId: 'restaurant-7',
        rating: 4.2,
        available: true,
        createdAt: new Date().toISOString()
      },

      // Restaurant 8 - Dessert Cafe
      {
        name: 'New York Cheesecake',
        description: 'Classic creamy cheesecake with graham cracker crust.',
        price: 8.99,
        category: 'Dessert',
        image: 'https://www.allrecipes.com/thmb/mKn8J8J8J8J8J8J8J8J8J8J8J8J=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8350-New-York-Cheesecake-mfs_003-4e5e5e5e5e5e5e5e5e5e5e5e5e5e.jpg',
        restaurantId: 'restaurant-8',
        rating: 4.9,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Tiramisu',
        description: 'Italian dessert with coffee-soaked ladyfingers and mascarpone.',
        price: 9.99,
        category: 'Dessert',
        image: 'https://www.allrecipes.com/thmb/uVW8E8E8E8E8E8E8E8E8E8E8E8E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21412-Tiramisu-mfs-3x2-0459-1c5c5c5c5c5c5c5c5c5c5c5c5c5c.jpg',
        restaurantId: 'restaurant-8',
        rating: 4.8,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Brownie Sundae',
        description: 'Warm brownie with vanilla ice cream, chocolate sauce, and whipped cream.',
        price: 10.99,
        category: 'Dessert',
        image: 'https://www.allrecipes.com/thmb/kM7M7M7M7M7M7M7M7M7M7M7M7M7=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25080-best-brownies-mfs-017-4x3-1d7d7d7d7d7d7d7d7d7d7d7d7d7d.jpg',
        restaurantId: 'restaurant-8',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Crème Brûlée',
        description: 'Vanilla custard with caramelized sugar topping.',
        price: 11.99,
        category: 'Dessert',
        image: 'https://www.allrecipes.com/thmb/9K9K9K9K9K9K9K9K9K9K9K9K9K9=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/17615-Creme-Brulee-mfs-009-4x3-2e9e9e9e9e9e9e9e9e9e9e9e9e9e.jpg',
        restaurantId: 'restaurant-8',
        rating: 5.0,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Fruit Tart',
        description: 'Buttery tart shell with pastry cream and fresh seasonal fruit.',
        price: 9.50,
        category: 'Dessert',
        image: 'https://www.kingarthurbaking.com/sites/default/files/2020-05/fruit-tart.jpg',
        restaurantId: 'restaurant-8',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Espresso',
        description: 'Rich Italian espresso.',
        price: 3.50,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04',
        restaurantId: 'restaurant-8',
        rating: 4.5,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Gelato',
        description: 'Italian ice cream in various flavors.',
        price: 7.50,
        category: 'Dessert',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
        restaurantId: 'restaurant-8',
        rating: 4.8,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Cappuccino',
        description: 'Rich espresso with steamed milk and foam.',
        price: 4.99,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
        restaurantId: 'restaurant-8',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Cannoli',
        description: 'Crispy pastry shells filled with sweet ricotta cream.',
        price: 8.50,
        category: 'Dessert',
        image: 'https://www.allrecipes.com/thmb/nO9-nO9-nO9-nO9-nO9-nO9-nO9-nO9=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20279-cannoli-DDMFS-4x3-1l1l1l1l1l1l1l1l1l1l1l1l1l1l.jpg',
        restaurantId: 'restaurant-8',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Affogato',
        description: 'Vanilla gelato with a shot of hot espresso.',
        price: 7.99,
        category: 'Dessert',
        image: 'https://images.unsplash.com/photo-1616690710400-a16d146927c5',
        restaurantId: 'restaurant-8',
        rating: 4.8,
        available: true,
        createdAt: new Date().toISOString()
      },

      // Restaurant 9 - Seafood
      {
        name: 'Fish and Chips',
        description: 'Beer-battered cod with crispy fries and tartar sauce.',
        price: 17.99,
        category: 'Seafood',
        image: 'https://www.allrecipes.com/thmb/HqY3Y3Y3Y3Y3Y3Y3Y3Y3Y3Y3Y3Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/244150-Yummy-Fish-and-Chips-mfs_001-2f5f5f5f5f5f5f5f5f5f5f5f5f5f.jpg',
        restaurantId: 'restaurant-9',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Shrimp Scampi',
        description: 'Garlic butter shrimp over linguine pasta.',
        price: 21.99,
        category: 'Seafood',
        image: 'https://www.allrecipes.com/thmb/cNw5cNw5cNw5cNw5cNw5cNw5cNw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/229960-shrimp-scampi-with-pasta-DDMFS-4x3-81f81f81f81f81f81f81f81f81f81f.jpg',
        restaurantId: 'restaurant-9',
        rating: 4.8,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Crab Cakes',
        description: 'Pan-seared crab cakes with remoulade sauce.',
        price: 19.99,
        category: 'Seafood',
        image: 'https://www.allrecipes.com/thmb/8p8p8p8p8p8p8p8p8p8p8p8p8p8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/23478-awesome-crab-cakes-DDMFS-4x3-3s3s3s3s3s3s3s3s3s3s3s3s3s3s.jpg',
        restaurantId: 'restaurant-9',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Clam Chowder',
        description: 'Creamy New England-style clam chowder.',
        price: 9.99,
        category: 'Starters',
        image: 'https://www.allrecipes.com/thmb/7b7b7b7b7b7b7b7b7b7b7b7b7b7=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/13107-new-england-clam-chowder-DDMFS-4x3-8e8e8e8e8e8e8e8e8e8e8e8e8e8e.jpg',
        restaurantId: 'restaurant-9',
        rating: 4.5,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Oysters Rockefeller',
        description: 'Baked oysters with herbs and cheese.',
        price: 16.99,
        category: 'Starters',
        image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41',
        restaurantId: 'restaurant-9',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'White Wine',
        description: 'Chilled Chardonnay.',
        price: 11.00,
        category: 'Alcohol',
        image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0',
        restaurantId: 'restaurant-9',
        rating: 4.4,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Calamari',
        description: 'Fried calamari rings with marinara sauce.',
        price: 14.99,
        category: 'Seafood',
        image: 'https://www.allrecipes.com/thmb/lN9-lN9-lN9-lN9-lN9-lN9-lN9-lN9=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/221630-fried-calamari-restaurant-style-DDMFS-4x3-0k0k0k0k0k0k0k0k0k0k0k0k0k0k.jpg',
        restaurantId: 'restaurant-9',
        rating: 4.5,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Seafood Pasta',
        description: 'Mixed seafood in a white wine garlic sauce over linguine.',
        price: 23.99,
        category: 'Seafood',
        image: 'https://www.allrecipes.com/thmb/mO9-mO9-mO9-mO9-mO9-mO9-mO9-mO9=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11772-seafood-pasta-DDMFS-4x3-1l1l1l1l1l1l1l1l1l1l1l1l1l1l.jpg',
        restaurantId: 'restaurant-9',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Grilled Swordfish',
        description: 'Fresh swordfish steak with lemon and herbs.',
        price: 26.99,
        category: 'Seafood',
        image: 'https://www.allrecipes.com/thmb/pQ9-pQ9-pQ9-pQ9-pQ9-pQ9-pQ9-pQ9=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9046-grilled-swordfish-DDMFS-4x3-2m2m2m2m2m2m2m2m2m2m2m2m2m2m.jpg',
        restaurantId: 'restaurant-9',
        rating: 4.8,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Tuna Tartare',
        description: 'Fresh tuna with avocado, sesame, and soy dressing.',
        price: 18.99,
        category: 'Starters',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d',
        restaurantId: 'restaurant-9',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },

      // Restaurant 10 - Mediterranean
      {
        name: 'Lamb Gyro',
        description: 'Seasoned lamb in pita with tzatziki, tomatoes, and onions.',
        price: 13.99,
        category: 'Mediterranean',
        image: 'https://www.allrecipes.com/thmb/uTs-uTs-uTs-uTs-uTs-uTs-uTs-uTs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/70932-slow-cooker-lamb-gyros-DDMFS-4x3-0b0b0b0b0b0b0b0b0b0b0b0b0b0b.jpg',
        restaurantId: 'restaurant-10',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Moussaka',
        description: 'Layered eggplant, ground beef, and béchamel sauce.',
        price: 18.99,
        category: 'Mediterranean',
        image: 'https://www.allrecipes.com/thmb/kD9-kD9-kD9-kD9-kD9-kD9-kD9-kD9=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25097-moussaka-DDMFS-4x3-9f9f9f9f9f9f9f9f9f9f9f9f9f9f.jpg',
        restaurantId: 'restaurant-10',
        rating: 4.8,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Spanakopita',
        description: 'Flaky phyllo pastry filled with spinach and feta cheese.',
        price: 11.99,
        category: 'Mediterranean',
        image: 'https://www.allrecipes.com/thmb/4z4z4z4z4z4z4z4z4z4z4z4z4z4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25089-spanakopita-DDMFS-4x3-1e1e1e1e1e1e1e1e1e1e1e1e1e1e.jpg',
        restaurantId: 'restaurant-10',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Hummus Platter',
        description: 'Homemade hummus with warm pita bread and vegetables.',
        price: 10.99,
        category: 'Starters',
        image: 'https://www.allrecipes.com/thmb/vHx-vHx-vHx-vHx-vHx-vHx-vHx-vHx=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/26305-Quick-Hummus-mfs-3x2-0579-7d7d7d7d7d7d7d7d7d7d7d7d7d7d.jpg',
        restaurantId: 'restaurant-10',
        rating: 4.5,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Baklava',
        description: 'Sweet pastry with layers of phyllo, nuts, and honey.',
        price: 7.99,
        category: 'Dessert',
        image: 'https://www.allrecipes.com/thmb/mQ8-mQ8-mQ8-mQ8-mQ8-mQ8-mQ8-mQ8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20153-baklava-DDMFS-4x3-5c5c5c5c5c5c5c5c5c5c5c5c5c5c.jpg',
        restaurantId: 'restaurant-10',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Turkish Coffee',
        description: 'Strong, aromatic coffee.',
        price: 4.50,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1514481538271-cf9f99627ab4',
        restaurantId: 'restaurant-10',
        rating: 4.4,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Dolmades',
        description: 'Stuffed grape leaves with rice and herbs.',
        price: 9.99,
        category: 'Mediterranean',
        image: 'https://www.allrecipes.com/thmb/nP9-nP9-nP9-nP9-nP9-nP9-nP9-nP9=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25089-stuffed-grape-leaves-dolmades-DDMFS-4x3-2m2m2m2m2m2m2m2m2m2m2m2m2m2m.jpg',
        restaurantId: 'restaurant-10',
        rating: 4.4,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Tzatziki',
        description: 'Greek yogurt dip with cucumber, garlic, and dill.',
        price: 6.99,
        category: 'Starters',
        image: 'https://www.allrecipes.com/thmb/oQ9-oQ9-oQ9-oQ9-oQ9-oQ9-oQ9-oQ9=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/14308-tzatziki-sauce-DDMFS-4x3-3n3n3n3n3n3n3n3n3n3n3n3n3n3n.jpg',
        restaurantId: 'restaurant-10',
        rating: 4.6,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Souvlaki',
        description: 'Grilled meat skewers with pita and tzatziki.',
        price: 15.99,
        category: 'Mediterranean',
        image: 'https://www.allrecipes.com/thmb/rS9-rS9-rS9-rS9-rS9-rS9-rS9-rS9=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1106-greek-souvlaki-DDMFS-4x3-4o4o4o4o4o4o4o4o4o4o4o4o4o4o.jpg',
        restaurantId: 'restaurant-10',
        rating: 4.7,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        name: 'Ouzo',
        description: 'Traditional Greek anise-flavored aperitif.',
        price: 7.99,
        category: 'Alcohol',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b',
        restaurantId: 'restaurant-10',
        rating: 4.3,
        available: true,
        createdAt: new Date().toISOString()
      }
    ];

    // Seed the food items
    for (const item of sampleFoodItems) {
      await FirestoreService.addFoodItem(item);
    }

    console.log(`Successfully seeded ${sampleFoodItems.length} food items!`);
    return { success: true, count: sampleFoodItems.length };

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

module.exports = { seedDatabase };
