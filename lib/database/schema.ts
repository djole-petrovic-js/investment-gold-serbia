/**
 * Next.js Core.
 */
import { relations } from "drizzle-orm"

import {
  float,
  int,
  mysqlTable,
  serial,
  timestamp,
  varchar
} from "drizzle-orm/mysql-core"
/**
 * Distributers SQL create query.
 * 
  create table Distributers (
    id int(10) unsigned not null AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    homeUrl VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
  );
 */
export const Distributers = mysqlTable("Distributers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  homeUrl: varchar("homeUrl", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow()
})
/**
 * Products SQL create query.
 * 
  create table Products (
    id int(10) unsigned NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    productType VARCHAR(255) NOT NULL,
    priceSell FLOAT NOT NULL,
    priceBuy FLOAT NOT NULL,
    priceSellPremium FLOAT NOT NULL,
    priceBuyPremium FLOAT NOT NULL,
    distributerId int(10) unsigned NOT NULL,
    urlSell varchar(255) not null default '',
    urlBuy varchar(255) not null default '',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
  );
 */
export const Products = mysqlTable("Products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  productType: varchar("productType", { length: 255 }).notNull(),
  priceSell: float("priceSell").notNull(),
  priceBuy: float("priceBuy").notNull(),
  priceSellPremium: float("priceSellPremium").notNull(),
  priceBuyPremium: float("priceBuyPremium").notNull(),
  distributerId: int("distributerId").references(() => Distributers.id),
  urlSell: varchar("urlSell", { length: 255 }).notNull().default(""),
  urlBuy: varchar("urlBuy", { length: 255 }).notNull().default(""),
  createdAt: timestamp("createdAt").defaultNow()
})
/**
 * Users SQL create query.
 * 
  create table Users (
    id int(10) unsigned not null AUTO_INCREMENT,
    firstName varchar(255) not null,
    lastName varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
  );
 */
export const Users = mysqlTable("Users", {
  id: serial("id").primaryKey(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow()
})
/**
 * Variables SQL create query.
 * 
  create table Variables (
    `key` VARCHAR(255) NOT NULL,
    `value` VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (`key`)
  );
 */
export const Variables = mysqlTable("Variables", {
  key: varchar("key", { length: 255 }).primaryKey().notNull(),
  value: varchar("value", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow()
})
/**
 * Relations.
 */
export const DistributersRelations = relations(Distributers, ({ many }) => ({
  Products: many(Products)
}))

export const ProductsRelations = relations(Products, ({ one }) => ({
  Distributer: one(Distributers, {
    fields: [Products.distributerId],
    references: [Distributers.id]
  })
}))
