import express, { type Express, Request, Response } from "express";
import type { Server } from "http";
import { createServer } from "http";
import { storage } from "./storage";
import { cartItemSchema, type CartItem } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const apiRouter = express.Router();

  // Get all categories
  apiRouter.get("/categories", async (req: Request, res: Response) => {
    const categories = await storage.getAllCategories();
    res.json(categories);
  });

  // Get category by slug
  apiRouter.get("/categories/:slug", async (req: Request, res: Response) => {
    const { slug } = req.params;
    const category = await storage.getCategoryBySlug(slug);
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    
    res.json(category);
  });

  // Get all products
  apiRouter.get("/products", async (req: Request, res: Response) => {
    const { category, sort, dietary } = req.query;
    
    let products = await storage.getAllProducts();
    
    // Filter by category if provided
    if (category && typeof category === 'string') {
      products = await storage.getProductsByCategorySlug(category);
    }
    
    // Filter by dietary preference if provided
    if (dietary && typeof dietary === 'string') {
      const dietaryPreference = dietary.toLowerCase();
      products = products.filter(product => 
        product.dietary && product.dietary.includes(dietaryPreference)
      );
    }
    
    // Sort products if sort parameter is provided
    if (sort && typeof sort === 'string') {
      switch (sort) {
        case 'price-asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'popular':
          products.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
          break;
        case 'newest':
          // For demo purposes, we'll sort by ID (assuming higher ID = newer)
          products.sort((a, b) => b.id - a.id);
          break;
        default:
          break;
      }
    }
    
    res.json(products);
  });

  // Get products by category slug
  apiRouter.get("/products/category/:slug", async (req: Request, res: Response) => {
    const { slug } = req.params;
    const products = await storage.getProductsByCategorySlug(slug);
    res.json(products);
  });

  // Get product by slug
  apiRouter.get("/products/:slug", async (req: Request, res: Response) => {
    const { slug } = req.params;
    const product = await storage.getProductBySlug(slug);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Get the category for the product
    const category = await storage.getCategoryBySlug(
      (await storage.getAllCategories()).find(c => c.id === product.categoryId)?.slug || ""
    );
    
    res.json({ ...product, category });
  });

  // Create a new order with items
  apiRouter.post("/orders", async (req: Request, res: Response) => {
    try {
      const orderSchema = z.object({
        subtotal: z.number().positive(),
        tax: z.number().min(0),
        delivery: z.number().min(0),
        total: z.number().positive(),
        customerName: z.string().optional(),
        customerEmail: z.string().email().optional(),
        items: z.array(z.object({
          productId: z.number().positive(),
          quantity: z.number().int().positive(),
          price: z.number().positive()
        }))
      });
      
      const validatedData = orderSchema.parse(req.body);
      
      // Create the order
      const order = await storage.createOrder({
        subtotal: validatedData.subtotal,
        tax: validatedData.tax,
        delivery: validatedData.delivery,
        total: validatedData.total,
        customerName: validatedData.customerName,
        customerEmail: validatedData.customerEmail,
        status: "pending"
      });
      
      // Create order items
      const orderItems = await Promise.all(
        validatedData.items.map(item => 
          storage.createOrderItem({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          })
        )
      );
      
      res.status(201).json({
        ...order,
        items: orderItems
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid order data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Mount the API router
  app.use("/api", apiRouter);

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
