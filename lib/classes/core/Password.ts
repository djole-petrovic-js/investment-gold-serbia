/**
 * Next.js core.
 */
import bcrypt from "bcrypt"
/**
 * Manage users passwords ( hash / compare etc. ).
 */
export default class Password {
  private password: string

  constructor(password: string) {
    this.password = password
  }
  /**
   * Check if the hash matches the plain text password.
   *
   * @param {String} hash
   *
   * @returns {Promise<{ isMatched: boolean }>}
   */
  async comparePasswords(hash: string): Promise<{ isMatched: boolean }> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(this.password, hash, function (err, isMatched) {
        if (err) {
          return reject(err)
        }

        resolve({ isMatched })
      })
    })
  }
  /**
   * Hash a plain text password.
   *
   * @returns {Promise<string>} hash
   */
  async hashPassword(): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(this.password, 10, function (err, hash) {
        if (err) {
          return reject(err)
        }

        resolve(hash)
      })
    })
  }
}
