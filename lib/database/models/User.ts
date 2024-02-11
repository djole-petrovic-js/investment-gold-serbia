/**
 * Make sure to have this table ready.
 * 
 * 
  create table Users (
    id  int(10) unsigned not null AUTO_INCREMENT,
    firstName varchar(255) not null,
    lastName varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
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
  Model
} from "sequelize"
/**
 * Database
 */
import sequelize from "@/lib/database/sequelize"
/**
 * App core
 */
import Password from "@/lib/classes/core/Password"

export interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  /**
   * Some fields are optional when calling UserModel.create() or UserModel.build()
   */
  id: CreationOptional<number>
  firstName: string
  lastName: string
  email: string
  password: string
  comparePasswords: (password: string) => Promise<boolean>
}
/**
 * User Model definition.
 */
const User = sequelize.define<UserModel>("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
})
/**
 * Compare the user DB hash, with the password provided.
 *
 * @param {String} password
 *
 * @return {Promise<boolean>} isMatched
 */
User.prototype.comparePasswords = async function (
  password: string
): Promise<boolean> {
  const { isMatched } = await new Password(password).comparePasswords(
    this.password
  )

  return isMatched
}
/**
 * Before a new user is inserted into the database, hash his password.
 *
 * @param {UserModel} user
 *
 * @return void
 */
User.beforeCreate(async (user: UserModel): Promise<void> => {
  user.password = await new Password(user.password).hashPassword()
})

export default User
