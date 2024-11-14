import prisma from "../src/lib/prisma";

async function main() {
  await prisma.course.createMany({
    data: [
      {
        courseName: "Bachelor of Science in Computer Science",
        departmentId: "c8d332af-137c-4821-ac2a-8f653b7da184",
      },
      {
        courseName: "Bachelor of Science in Fisheries",
        departmentId: "ce542f71-65ee-4897-be20-2f8485571f58",
      },
      {
        courseName: "Bachelor of Science in Marine Biology",
        departmentId: "ce542f71-65ee-4897-be20-2f8485571f58",
      },
      {
        courseName: "Bachelor of Science in Environmental Science",
        departmentId: "ce542f71-65ee-4897-be20-2f8485571f58",
      },
      {
        courseName: "Bachelor of Elementary Education",
        departmentId: "1bee8aef-289d-4ae8-bd81-ed5ea7ce6f86",
      },
      {
        courseName: "Bachelor of Secondary Education",
        departmentId: "1bee8aef-289d-4ae8-bd81-ed5ea7ce6f86",
      },
      {
        courseName:
          "Bachelor of Science in Business Administration Major: Financial Management ",
        departmentId: "d750db38-3016-4231-80a7-14952ed1e515",
      },
      {
        courseName:
          "Bachelor of Science in Business Administration Major: Business Economics ",
        departmentId: "d750db38-3016-4231-80a7-14952ed1e515",
      },
      {
        courseName: "Bachelor of Science in Hospitality Management",
        departmentId: "d750db38-3016-4231-80a7-14952ed1e515",
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
