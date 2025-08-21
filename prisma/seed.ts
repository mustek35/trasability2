import { PrismaClient } from '@prisma/client'
import { randomBytes, scryptSync } from 'crypto'

const prisma = new PrismaClient()

function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

async function main() {
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      role: 'ADMIN',
      password: hashPassword('password'),
      posts: {
        create: [
          {
            title: 'Join the Prisma Discord',
            content: 'https://pris.ly/discord',
            published: true,
          },
          {
            title: 'Prisma on YouTube',
            content: 'https://pris.ly/youtube',
          },
        ],
      },
    },
  })

  await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@prisma.io',
      role: 'USER',
      password: hashPassword('password'),
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://www.twitter.com/prisma',
            published: true,
          },
        ],
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
