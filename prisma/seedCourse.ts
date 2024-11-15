import prisma from "../src/lib/prisma";

async function main() {
  await prisma.course.createMany({
    data: [
      {
        courseName: "Bachelor of Science in Computer Science",
        departmentId: "f1773c35-00d9-490f-a5c2-fdf4fa7426ec",
      },
      {
        courseName: "Bachelor of Science in Fisheries",
        departmentId: "ab8830f0-cf9f-42a0-8fb3-0c4078dce8e5",
      },
      {
        courseName: "Bachelor of Science in Marine Biology",
        departmentId: "ab8830f0-cf9f-42a0-8fb3-0c4078dce8e5",
      },
      {
        courseName: "Bachelor of Science in Environmental Science",
        departmentId: "ab8830f0-cf9f-42a0-8fb3-0c4078dce8e5",
      },
      {
        courseName: "Bachelor of Elementary Education",
        departmentId: "fe4ce804-bc2c-41b0-aa48-e8e1726c93ff",
      },
      {
        courseName: "Bachelor of Secondary Education",
        departmentId: "fe4ce804-bc2c-41b0-aa48-e8e1726c93ff",
      },
      {
        courseName:
          "Bachelor of Science in Business Administration Major: Financial Management ",
        departmentId: "b7c45501-9266-42f2-8d04-6a577eb3d1d4",
      },
      {
        courseName:
          "Bachelor of Science in Business Administration Major: Business Economics ",
        departmentId: "b7c45501-9266-42f2-8d04-6a577eb3d1d4",
      },
      {
        courseName: "Bachelor of Science in Hospitality Management",
        departmentId: "b7c45501-9266-42f2-8d04-6a577eb3d1d4",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
