import bcrypt from 'bcryptjs'

export async function hash(password: string, salt = 10): Promise<string> {
  return await bcrypt.hash(password, salt)
}

export async function compare(blank: string, hashed: string): Promise<boolean> {
  return await bcrypt.compare(blank, hashed)
}

export default { hash, compare }
