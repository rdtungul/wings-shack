export type MenuItem = {
  name: string
  price: string
  description?: string
}

export type MenuCategory = {
  id: string
  title: string
  subtitle?: string
  items: MenuItem[]
}

export const menuData: MenuCategory[] = [
  {
    id: 'wings',
    title: 'Wings',
    subtitle: 'Traditional bone-in or boneless — tossed in your choice of sauce or dry rub',
    items: [
      { name: '6 pc. Traditional Wings',  price: '$8.99' },
      { name: '12 pc. Traditional Wings', price: '$14.99' },
      { name: '18 pc. Traditional Wings', price: '$20.99' },
      { name: '24 pc. Traditional Wings', price: '$26.99' },
      { name: '10 pc. Boneless Wings',    price: '$9.99' },
      { name: '15 pc. Boneless Wings',    price: '$13.99' },
      { name: '20 pc. Boneless Wings',    price: '$16.99' },
      { name: '30 pc. Boneless Wings',    price: '$22.99' },
    ],
  },
  {
    id: 'meal-deals',
    title: 'Meal Deals & Kids',
    subtitle: 'Includes fries, celery, dressing & 20 oz. drink',
    items: [
      { name: 'Meal Deal - 6 pc. Traditional Wings',  price: '$12.99' },
      { name: 'Meal Deal - 12 pc. Traditional Wings', price: '$18.99' },
      { name: 'Meal Deal - 18 pc. Traditional Wings', price: '$25.99' },
      { name: 'Meal Deal - 10 pc. Boneless Wings',    price: '$13.99' },
      { name: 'Meal Deal - 15 pc. Boneless Wings',    price: '$17.99' },
      { name: 'Meal Deal - 20 pc. Boneless Wings',    price: '$20.49' },
      { name: 'Kids Meal - 5 pc. Boneless Wings',     price: '$6.49' },
      { name: 'Kids Meal - 4 pc. Chicken Nuggets',    price: '$5.99', description: 'includes fries or applesauce & 12 oz drink' },
      { name: 'Kids Meal - 4 pc. Mini Corn Dogs',     price: '$6.99', description: 'includes fries or applesauce & 12 oz drink' },
    ],
  },
  {
    id: 'sides',
    title: 'Sides',
    items: [
      { name: 'French Fries',         price: '$3.49' },
      { name: 'Large French Fries',   price: '$4.99' },
      { name: 'Celery & Dressing',    price: '$1.99' },
      { name: 'Coleslaw',             price: '$2.49' },
      { name: 'Mac & Cheese',         price: '$3.49' },
      { name: 'Corn on the Cob',      price: '$1.99' },
      { name: 'Hush Puppies (6 pc.)', price: '$2.99' },
      { name: 'Onion Rings',          price: '$3.99' },
    ],
  },
  {
    id: 'taters',
    title: 'Taters',
    subtitle: 'Loaded potato dishes',
    items: [
      { name: 'Loaded Tater Tots',         price: '$7.99', description: 'bacon, cheese, sour cream, chives' },
      { name: 'Tater Tots',                price: '$3.99' },
      { name: 'Loaded Baked Potato',       price: '$5.99' },
      { name: 'Buffalo Chicken Tater Bowl',price: '$8.99' },
    ],
  },
  {
    id: 'boulders',
    title: 'Boulders',
    subtitle: 'Jumbo-sized bone-in wings',
    items: [
      { name: '5 pc. Boulders',   price: '$10.99' },
      { name: '10 pc. Boulders',  price: '$19.99' },
      { name: '15 pc. Boulders',  price: '$27.99' },
    ],
  },
  {
    id: 'pizzas',
    title: 'Pizzas',
    items: [
      { name: 'Cheese Pizza (10")',         price: '$9.99' },
      { name: 'Pepperoni Pizza (10")',      price: '$11.99' },
      { name: 'Buffalo Chicken Pizza (10")',price: '$12.99' },
      { name: 'BBQ Chicken Pizza (10")',    price: '$12.99' },
      { name: 'Build Your Own (10")',       price: '$9.99+', description: 'choose your toppings' },
    ],
  },
  {
    id: 'pizza-cones',
    title: 'Pizza Cones',
    subtitle: 'Pizza in a cone — a Wing Shack original!',
    items: [
      { name: 'Cheese Pizza Cone',          price: '$5.99' },
      { name: 'Pepperoni Pizza Cone',       price: '$6.99' },
      { name: 'Buffalo Chicken Pizza Cone', price: '$7.99' },
      { name: 'BBQ Chicken Pizza Cone',     price: '$7.99' },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    items: [
      { name: 'Funnel Cake Fries',         price: '$4.99' },
      { name: 'Cinnamon Sugar Fries',      price: '$4.99' },
      { name: 'Chocolate Lava Cake',       price: '$3.99' },
      { name: 'Cheesecake Slice',          price: '$3.49' },
    ],
  },
  {
    id: 'drinks',
    title: 'Drinks',
    items: [
      { name: '20 oz. Fountain Drink', price: '$2.49' },
      { name: '32 oz. Fountain Drink', price: '$2.99' },
      { name: 'Bottled Water',          price: '$1.99' },
      { name: 'Lemonade',               price: '$2.99' },
      { name: 'Sweet Tea',              price: '$2.49' },
      { name: '2-Liter (for orders)',   price: '$3.99' },
    ],
  },
  {
    id: 'party-deals',
    title: 'Party Deals',
    subtitle: 'Perfect for events, game days, and gatherings',
    items: [
      { name: '50 pc. Party Pack',  price: '$49.99', description: 'choose up to 2 sauces/rubs' },
      { name: '100 pc. Party Pack', price: '$89.99', description: 'choose up to 4 sauces/rubs' },
      { name: '250 pc. Party Pack', price: '$199.99', description: 'choose up to 6 sauces/rubs — call ahead to order' },
    ],
  },
]

export const sauces = [
  'Blue Cheese', 'Buffalo Mild', 'Catalina Spicy', 'Flame N\' Hot', 'General Tao',
  'Greek w/ Feta', 'Honey Mustard', 'Horsey Hot', 'Hot Honey BBQ', 'Jamaican Jerk',
  'Lemon Pepper', 'Mango Habanero', 'Monterey Jack', 'Northern BBQ', 'Nuclear',
  'Parmesan Garlic', 'Parmesan Ranch', 'Ranch', 'Smoke N\' Gamecock BBQ', 'Southern BBQ',
  'Southern Fried', 'Sweet Chili', 'Sweet Sour', 'Teriyaki', 'Teriyaki Hot',
]

export const dryRubs = [
  'Cajun', 'Cajun Garlic', 'Devil Dust', 'Devil Ranch', 'Garlic',
  'Lemon Garlic', 'Louisiana Rub', 'Nightmare', 'Parmesan Cheese', 'Ranch',
]
