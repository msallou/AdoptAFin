

export interface FishProps {
    predators: string;
    id: number;
    fish: string;
    species: string;
    price: number;
    color: string;
    stars: number;
    lifespan: string;
    weight: string;
    height: string;
    diet: string;
    conservationStatus: string;
    uaAdaptations: string;
    uaExplanation: string;
    speed: string;
    reproduction: string;
    migrationPatterns: string;
    schoolingBehavior: string;
    habitatRange: string;
    predator: string;
    prey: string;
    venomousPoisonous: string;
    fact1: string;
    fact2: string;
    fact3: string;
    source: string;
    factSource: string;
    image: string;
    x_cor: number;
    y_cor: number;
    fish_link: string;
    adopted: boolean;
}

export interface FeaturedFishProps {
    id: number;
    fish_id: number;
}

export interface Egg {
    id: number;
    name: string;
    rarity: string;
    rarityColor: string;
    image: string;
    price: number;
    description: string;
    icon: string;
    main: string;
    one: string;
    two: string;
    three: string;
}

export interface UsersAdoptedFish {
    id: number;
    user_email: string;
    fish: string;
    species: string;
    price: number;
    x_cor: number;
    y_cor: number;
    image: string;
    predators: string;
    color: string;
    stars: number;
    lifespan: string;
    weight: string;
    height: string;
    diet: string;
    conservationStatus: string;
    uaAdaptations: string;
    uaExplanation: string;
    speed: string;
    reproduction: string;
    migrationPatterns: string;
    schoolingBehavior: string;
    habitatRange: string;
    predator: string;
    prey: string;
    venomousPoisonous: string;
    fact1: string;
    fact2: string;
    fact3: string;
    source: string;
    factSource: string;
}

export interface Fish {
    id: number;
    name: string;
    category: string;
    image_url: string;
    fact1: string;
    fact2: string;
    fact3: string;
    price: number;
}

export interface Donations {
    id: number;
    user: string;
    donated_amount: number;
}

export interface CartComponentProps {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  removeFromCart: (index: number) => void;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface CartItem {
  fish: string;
  price: number;
  image: string;
  x_cor: number;
  y_cor: number;
  species: string;
  quantity: number;
  fish_link: string;
}

export interface GroupedCartItem extends CartItem {
  quantity: number;
}

export interface CheckoutProps {
  onBack: () => void;
}

export interface PaymentHistory {
  id: number;
  userEmail: string;
  fishAdopted: { name: string; quantity: number; price: number }[];
  purchaseDate: string;
  amountPaid: number;
  adoptedOrDonated: string;
}