import prisma from "../src/lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  const hashedPassword = await bcrypt.hash("1234567890", 10);

  const newUser = await prisma.user.upsert({
    where: {
      email: "admin@nemsulc.com",
    },
    update: {},
    create: {
      email: "admin@nemsulc.com",
      password: hashedPassword,
      Role: "ADMINISTRATOR",
    },
  });

  const newAdministrator = await prisma.administrator.upsert({
    where: {
      userId: newUser.id,
    },
    update: {},
    create: {
      userId: newUser.id,
      adminID: "ADMIN001",
      fullname: "Administrator",
    },
  });

  console.log("Seed admin created", { newUser, newAdministrator });
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
