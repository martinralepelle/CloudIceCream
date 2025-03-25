import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  products, type Product, type InsertProduct,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem
} from "@shared/schema";

// Interface for all storage operations
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Category methods
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductsByCategoryId(categoryId: number): Promise<Product[]>;
  getProductsByCategorySlug(slug: string): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]>;
}

// In-memory implementation of IStorage
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  
  // Counters for generating IDs
  private userCounter: number;
  private categoryCounter: number;
  private productCounter: number;
  private orderCounter: number;
  private orderItemCounter: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    
    this.userCounter = 1;
    this.categoryCounter = 1;
    this.productCounter = 1;
    this.orderCounter = 1;
    this.orderItemCounter = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCounter++;
    const category: Category = { 
      ...insertCategory, 
      id,
      description: insertCategory.description ?? null,
      imageUrl: insertCategory.imageUrl ?? null
    };
    this.categories.set(id, category);
    return category;
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductsByCategoryId(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId
    );
  }
  
  async getProductsByCategorySlug(slug: string): Promise<Product[]> {
    const category = await this.getCategoryBySlug(slug);
    if (!category) return [];
    return this.getProductsByCategoryId(category.id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCounter++;
    const product: Product = { 
      ...insertProduct, 
      id,
      description: insertProduct.description ?? null,
      imageUrl: insertProduct.imageUrl ?? null,
      ingredients: insertProduct.ingredients ?? null,
      dietary: insertProduct.dietary ?? null,
      popularity: insertProduct.popularity ?? null
    };
    this.products.set(id, product);
    return product;
  }
  
  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderCounter++;
    const order: Order = { 
      ...insertOrder, 
      id,
      status: insertOrder.status ?? null,
      customerName: insertOrder.customerName ?? null,
      customerEmail: insertOrder.customerEmail ?? null
    };
    this.orders.set(id, order);
    return order;
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.orderItemCounter++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }
  
  async getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      (orderItem) => orderItem.orderId === orderId
    );
  }
  
  // Initialize with sample data
  private async initializeData() {
    // Create categories
    const cloudSwirls = await this.createCategory({
      name: "Cloud Swirls",
      slug: "cloud-swirls",
      description: "Light and fluffy ice creams with soft textures.",
      imageUrl: "https://images.unsplash.com/photo-1563589173312-476d8c36b242?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    const frozenBliss = await this.createCategory({
      name: "Frozen Bliss",
      slug: "frozen-bliss",
      description: "Decadent, indulgent flavors for the ultimate dessert lovers.",
      imageUrl: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    const sunKissedScoops = await this.createCategory({
      name: "Sun-Kissed Scoops",
      slug: "sun-kissed-scoops",
      description: "Refreshing, fruity options inspired by summer.",
      imageUrl: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    const velvetDrizzle = await this.createCategory({
      name: "Velvet Drizzle",
      slug: "velvet-drizzle",
      description: "Rich, creamy, and luxurious flavors with smooth toppings.",
      imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    const arcticCrunch = await this.createCategory({
      name: "Arctic Crunch",
      slug: "arctic-crunch",
      description: "Ice creams with crunchy, nutty, or crispy add-ins.",
      imageUrl: "https://images.unsplash.com/photo-1558138838-76294be30005?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    // Create products for Cloud Swirls
    await this.createProduct({
      name: "Vanilla Cloud",
      slug: "vanilla-cloud",
      description: "Classic vanilla with whipped cream clouds",
      price: 4.99,
      imageUrl: "https://images.unsplash.com/photo-1514849302-984523450cf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryId: cloudSwirls.id,
      ingredients: "Cream, milk, sugar, vanilla extract, whipped cream",
      dietary: ["gluten-free"],
      popularity: 8
    });
    
    await this.createProduct({
      name: "Cotton Candy Swirl",
      slug: "cotton-candy-swirl",
      description: "Blue and pink swirls with candy bits",
      price: 5.99,
      imageUrl: "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryId: cloudSwirls.id,
      ingredients: "Cream, milk, sugar, cotton candy pieces (sugar, artificial flavor, color), natural flavors, stabilizers",
      dietary: ["gluten-free"],
      popularity: 9
    });
    
    await this.createProduct({
      name: "Lavender Dream",
      slug: "lavender-dream",
      description: "Subtle lavender with honey drizzle",
      price: 6.49,
      imageUrl: "https://images.unsplash.com/photo-1633933358116-a27b902db71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryId: cloudSwirls.id,
      ingredients: "Cream, milk, sugar, lavender extract, honey",
      dietary: ["gluten-free"],
      popularity: 7
    });
    
    await this.createProduct({
      name: "Whipped Marshmallow",
      slug: "whipped-marshmallow",
      description: "Light marshmallow flavor with toasted bits",
      price: 5.49,
      imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryId: cloudSwirls.id,
      ingredients: "Cream, milk, sugar, marshmallow bits, vanilla extract",
      dietary: ["gluten-free"],
      popularity: 8
    });
    
    // Create products for Frozen Bliss
    await this.createProduct({
      name: "Chocolate Euphoria",
      slug: "chocolate-euphoria",
      description: "Intense chocolate with chocolate chunks",
      price: 5.99,
      imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryId: frozenBliss.id,
      ingredients: "Cream, milk, cocoa powder, sugar, chocolate chunks",
      dietary: ["gluten-free"],
      popularity: 10
    });
    
    await this.createProduct({
      name: "Caramel Indulgence",
      slug: "caramel-indulgence",
      description: "Rich caramel with salted caramel swirls",
      price: 6.49,
      imageUrl: "https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryId: frozenBliss.id,
      ingredients: "Cream, milk, sugar, caramel sauce, sea salt",
      dietary: ["gluten-free"],
      popularity: 9
    });
    
    // Create products for Sun-Kissed Scoops
    await this.createProduct({
      name: "Mango Tango",
      slug: "mango-tango",
      description: "Fresh mango with a hint of lime",
      price: 5.99,
      imageUrl: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryId: sunKissedScoops.id,
      ingredients: "Mango puree, cream, sugar, lime juice",
      dietary: ["gluten-free"],
      popularity: 8
    });
    
    await this.createProduct({
      name: "Berry Blush",
      slug: "berry-blush",
      description: "Mixed berries with a vanilla base",
      price: 5.99,
      imageUrl: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryId: sunKissedScoops.id,
      ingredients: "Strawberries, blueberries, raspberries, cream, sugar, vanilla",
      dietary: ["gluten-free"],
      popularity: 7
    });
    
    // Create products for Velvet Drizzle
    await this.createProduct({
      name: "Cookies & Cream Drizzle",
      slug: "cookies-cream-drizzle",
      description: "Smooth vanilla with chocolate cookie crumbles and chocolate drizzle",
      price: 6.99,
      imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryId: velvetDrizzle.id,
      ingredients: "Cream, milk, sugar, chocolate cookies, chocolate sauce",
      dietary: [],
      popularity: 10
    });
    
    // Create products for Arctic Crunch
    await this.createProduct({
      name: "Nutty Avalanche",
      slug: "nutty-avalanche",
      description: "Vanilla ice cream with roasted nuts and chocolate chunks",
      price: 6.99,
      imageUrl: "https://images.unsplash.com/photo-1558138838-76294be30005?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryId: arcticCrunch.id,
      ingredients: "Cream, milk, sugar, almonds, walnuts, pecans, chocolate chunks",
      dietary: ["gluten-free"],
      popularity: 8
    });
  }
}

export const storage = new MemStorage();
