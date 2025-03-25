import { pgTable, text, serial, integer, boolean, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (keeping the original one)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Category schema
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Product schema
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: doublePrecision("price").notNull(),
  imageUrl: text("image_url"),
  categoryId: integer("category_id").notNull(),
  ingredients: text("ingredients"),
  dietary: text("dietary").array(), // Array of dietary preferences like "dairy-free", "vegan"
  popularity: integer("popularity").default(0),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Cart Item schema (for client-side use - not stored in DB)
export const cartItemSchema = z.object({
  productId: z.number(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int().positive(),
  imageUrl: z.string().optional(),
  categoryName: z.string().optional(),
});

export type CartItem = z.infer<typeof cartItemSchema>;

// Order schema
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  subtotal: doublePrecision("subtotal").notNull(),
  tax: doublePrecision("tax").notNull(),
  delivery: doublePrecision("delivery").notNull(),
  total: doublePrecision("total").notNull(),
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  status: text("status").default("pending"),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Order Item schema
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  price: doublePrecision("price").notNull(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
});

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;
