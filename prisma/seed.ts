import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('villa123', salt);

  // Delete existing admin if exists
  await prisma.admin.deleteMany();

  // Create new admin
  await prisma.admin.create({
    create: {
      username: 'admin@villagaleon.com',
      passwordHash,
    },
  });

  console.log('Database seeded with admin user');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });