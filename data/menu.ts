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
    id: 'taters',
    title: 'Taters',
    items: [
      { name: 'Fresh Cut Fries',    price: '$3.49' },
      { name: 'Cheese Fries',       price: '$4.49' },
      { name: 'Chili Cheese Fries', price: '$4.99' },
      { name: 'Bacon Cheese Fries', price: '$5.19' },
      { name: 'Raw-Fries',          price: '$3.49' },
      { name: 'Garbage Fries',      price: '$9.99' },
    ],
  },
  {
    id: 'boulders',
    title: 'Boulders',
    subtitle: 'Best Spuds in Town — Double Meat add $1.29',
    items: [
      { name: 'Baked Potato',     price: '$3.99', description: 'Butter, Sour Cream & Chives' },
      { name: 'Loaded Potato',    price: '$5.99', description: 'Butter, Cheese, Bacon, Sour Cream & Chives' },
      { name: 'Knockout Potato',  price: '$5.99', description: 'Butter, Chili, Cheese, Sour Cream & Chives' },
      { name: 'Beano Potato',     price: '$5.99', description: 'Butter, Cheese, Baked Beans & Crispy Onions' },
      { name: 'Porky Potato',     price: '$7.99', description: 'Butter, Cheese, Baked Beans, Pulled Pork & Crispy Onions' },
      { name: 'Cocky Potato',     price: '$7.99', description: 'Butter, Cheese, Pork N Beans, Chicken & Crispy Onions' },
      { name: 'Beefed Up Potato', price: '$9.49', description: 'Butter, Cheese, Pork N Beans, Beef & Crispy Onions' },
    ],
  },
  {
    id: 'sides',
    title: 'Sides',
    items: [
      { name: 'Celery Sticks (6 w/ 1 dressing)', price: '$2.49' },
      { name: 'Applesauce',                       price: '$1.99' },
      { name: 'Fried Pickles',                    price: '$4.49' },
      { name: 'Sweet Potato Fries',               price: '$4.99' },
      { name: 'Jalapeno Poppers (5)',              price: '$4.49' },
      { name: 'Mozzarella Sticks (3)',             price: '$3.99' },
      { name: 'Mozzarella Sticks (6)',             price: '$6.99' },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    subtitle: 'Choice of Drizzle: Caramel, Chocolate, White Chocolate, Raspberry, Strawberry',
    items: [
      { name: 'Brownie',                 price: '$3.29' },
      { name: 'Cheesecake',              price: '$4.99' },
      { name: 'Deep Fried Cheesecake',   price: '$5.49' },
      { name: 'Fried Nutter Butters (4)', price: '$4.19' },
      { name: 'Fried Oreos (4)',          price: '$3.79' },
      { name: 'Ice Cream Bowl (4 oz.)',   price: '$2.49', description: 'Coming Soon' },
      { name: 'Ice Cream Bowl (6 oz.)',   price: '$3.99', description: 'Coming Soon' },
    ],
  },
  {
    id: 'fountain-drinks',
    title: 'Fountain Drinks',
    items: [
      { name: 'Coke',             price: '$2.49' },
      { name: 'Coke Zero',        price: '$2.49' },
      { name: 'Diet Coke',        price: '$2.49' },
      { name: 'Fanta Strawberry', price: '$2.49' },
      { name: 'Mello Yellow',     price: '$2.49' },
      { name: 'Mr. Pibb',         price: '$2.49' },
      { name: 'Root Beer',        price: '$2.49' },
      { name: 'Lemonade',         price: '$2.49' },
      { name: 'Rocky Twist',      price: '$2.49' },
      { name: 'Sweet Tea',        price: '$2.49' },
      { name: 'Unsweet Tea',      price: '$2.49' },
    ],
  },
  {
    id: 'bottled-drinks',
    title: 'Bottled Drinks',
    items: [
      { name: 'Coke (20 oz.)',          price: '$2.29' },
      { name: 'Diet Coke (20 oz.)',     price: '$2.29' },
      { name: 'Mello Yellow (20 oz.)',  price: '$2.29' },
      { name: 'Sprite (20 oz.)',        price: '$2.29' },
      { name: 'Coke (2 Liter)',         price: '$3.49' },
      { name: 'Diet Coke (2 Liter)',    price: '$3.49' },
      { name: 'Mello Yellow (2 Liter)', price: '$3.49' },
      { name: 'Sprite (2 Liter)',       price: '$3.49' },
      { name: 'Water',                  price: '$1.99' },
    ],
  },
  {
    id: 'powerade',
    title: 'Powerade',
    items: [
      { name: 'Fruit Punch',          price: '$2.49' },
      { name: 'Grape',                price: '$2.49' },
      { name: 'Island Burst',         price: '$2.49' },
      { name: 'Lemon Lime',           price: '$2.49' },
      { name: 'Mountain Berry Blast', price: '$2.49' },
    ],
  },
  {
    id: 'ice-coffee',
    title: 'Iced Coffee',
    items: [
      { name: 'Espresso',       price: '$2.89' },
      { name: 'French Vanilla', price: '$2.89' },
      { name: 'Mocha',          price: '$2.89' },
      { name: 'Original',       price: '$2.89' },
    ],
  },
]

export const sauces = [
  'Blue Cheese', 'Buffalo Mild', 'Catalina Spicy', "Flame N' Hot", "General Tso'",
  'Greek w/ Feta', 'Honey Mustard', 'Horsey Hot', 'Hot Honey BBQ', 'Jamaican Jerk',
  'Lemon Pepper', 'Mango Habanero', 'Monterey Jack', 'Northern BBQ', 'Nuclear',
  'Parmesan Garlic', 'Parmesan Ranch', 'Ranch', "Smoke N' Gamecock BBQ", 'Southern BBQ',
  'Southern Fried', 'Sweet Chili', 'Sweet & Sour', 'Teriyaki', 'Teriyaki Hot',
]

export const dryRubs = [
  'Cajun', 'Cajun Garlic', 'Devil Dust', 'Garlic', 'Lemon Pepper',
  'Louisiana Kick', 'Nightmare', 'Parmesan Cheese', 'Ranch',
]
