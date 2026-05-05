import * as fs from 'fs'
import * as path from 'path'

// Load .env.local manually (Prisma seed only loads .env by default)
const envLocalPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envLocalPath)) {
  for (const line of fs.readFileSync(envLocalPath, 'utf-8').split('\n')) {
    const match = line.match(/^([^#=\s][^=]*)=(.*)$/)
    if (match) process.env[match[1].trim()] ??= match[2].trim()
  }
}

import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME ?? 'admin'
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!'
  const name = process.env.SEED_ADMIN_NAME ?? 'Master Admin'

  const existing = await prisma.user.findUnique({ where: { username } })
  if (existing) {
    console.log(`Master admin already exists: ${username}`)
    return
  }

  const hashed = await bcrypt.hash(password, 12)
  await prisma.user.create({
    data: { username, password: hashed, name, role: Role.MASTERADMIN },
  })

  console.log(`Master admin created: ${username}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
