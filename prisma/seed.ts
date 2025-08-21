import { PrismaClient, Prisma } from '@prisma/client'
import { randomBytes, scryptSync } from 'node:crypto'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    role: 'ADMIN',
    password: 'password123',
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
  {
    name: 'Bob',
    email: 'bob@prisma.io',
    role: 'USER',
    password: 'password123',
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
        },
      ],
    },
  }
]

export async function main() {
  for (const u of userData) {
    const salt = randomBytes(16).toString('hex')
    const hash = scryptSync(u.password!, salt, 64).toString('hex')
    const password = `${salt}:${hash}`

    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        name: u.name,
        role: u.role,
        password,
      },
      create: {
        ...u,
        password,
      },
    })
  }
}

main()
