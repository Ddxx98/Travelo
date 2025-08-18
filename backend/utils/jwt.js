import jwt from "jsonwebtoken";

/**
 * Signs a JWT token
 * @param {object} payload
 * @param {object} options
 * @returns {string} JWT token
 */
export function signJwt(payload, options = {}) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not defined in environment");
  return jwt.sign(payload, secret, { expiresIn: "7d", ...options });
}

/**
 * Verifies and decodes a JWT token
 * @param {string} token
 * @returns {object} Decoded payload
 */
export function verifyJwt(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not defined in environment");
  return jwt.verify(token, secret);
}

export default { signJwt, verifyJwt };