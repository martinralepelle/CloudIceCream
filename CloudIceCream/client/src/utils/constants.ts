// Ice cream categories
export const CATEGORIES = [
  {
    name: "All Flavors",
    slug: "all",
  },
  {
    name: "Cloud Swirls",
    slug: "cloud-swirls",
    description: "Light and fluffy ice creams with soft textures.",
  },
  {
    name: "Frozen Bliss",
    slug: "frozen-bliss",
    description: "Decadent, indulgent flavors for the ultimate dessert lovers.",
  },
  {
    name: "Sun-Kissed Scoops",
    slug: "sun-kissed-scoops",
    description: "Refreshing, fruity options inspired by summer.",
  },
  {
    name: "Velvet Drizzle",
    slug: "velvet-drizzle",
    description: "Rich, creamy, and luxurious flavors with smooth toppings.",
  },
  {
    name: "Arctic Crunch",
    slug: "arctic-crunch",
    description: "Ice creams with crunchy, nutty, or crispy add-ins.",
  },
];

// Dietary options for filtering
export const DIETARY_OPTIONS = [
  { value: "", label: "Filter by dietary needs" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten Free" },
  { value: "dairy-free", label: "Dairy Free" },
  { value: "nut-free", label: "Nut Free" },
];

// Sort options
export const SORT_OPTIONS = [
  { value: "popular", label: "Sort by popularity" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "new", label: "Newest Arrivals" },
];

// US States for checkout form
export const US_STATES = [
  { value: "", label: "Select State" },
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

// Tax rate (percentage)
export const TAX_RATE = 0.1;

// Shipping fee
export const SHIPPING_FEE = 5.00;
