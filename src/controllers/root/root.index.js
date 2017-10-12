import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

/**
 * GET /
 */
export const authenticate = (req, res) => {
  const token = jwt.sign({ foo: 'bar' }, JWT_SECRET);
  return res.json({ token })
}
  export const get = (req, res) => res.json({ olar: 'olar' })