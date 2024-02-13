/**
 * Make sure to have this table ready.
 * 
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
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
  );
 */
/**
 * Next.js core
 */
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from "sequelize"
/**
 * Model Interface
 */
export interface IProductModel
  extends Model<
    InferAttributes<IProductModel>,
    InferCreationAttributes<IProductModel>
  > {
  /**
   * Some fields are optional when calling .create() or .build()
   */
  id: CreationOptional<number>
  name: string
  slug: string
  productType: string
  priceSell: number
  priceBuy: number
  priceSellPremium: number
  priceBuyPremium: number
  distributerId: number
  createProductImageUrl: () => string
}
/**
 * Model definer function.
 *
 * @param {Sequelize} sequelize
 *
 * @returns {void}
 */
export default function ProductModelInit(sequelize: Sequelize): void {
  /**
   * Model definition.
   */
  const Product = sequelize.define<IProductModel>(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false
      },
      productType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      priceSell: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      priceBuy: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      priceSellPremium: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      priceBuyPremium: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      distributerId: {
        type: DataTypes.NUMBER,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  )
  /**
   * Create a product image url.
   *
   * @returns {String}
   */
  Product.prototype.createProductImageUrl = function (): string {
    return `/images/${this.slug}.jpg`
  }
}