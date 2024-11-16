import { randomUUID } from "crypto";
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
      adminID: randomUUID(),
      fullname: "ADMINISTRATOR",
    },
  });

  await prisma.yearLevel.createMany({
    data: [
      { yearName: "1ST YEAR" },
      { yearName: "2ND YEAR" },
      { yearName: "3RD YEAR" },
      { yearName: "4TH YEAR" },
    ],
  });
  const yearLevel = await prisma.yearLevel.findMany();

  const yearLevelMap = yearLevel.reduce((acc, y) => {
    acc[y.yearName] = y.id;
    return acc;
  }, {} as Record<string, string>);

  await prisma.department.createMany({
    data: [
      {
        departmentName: "CITE",
        departmentDescription: "College of Information Technology Education",
      },
      {
        departmentName: "CBM",
        departmentDescription: "College of Business and Management",
      },
      {
        departmentName: "CFAAS",
        departmentDescription:
          "College of Forestry, Agriculture and Aquatic Science",
      },
      {
        departmentName: "CTE",
        departmentDescription: "College of Teacher Education",
      },
    ],
  });

  const departments = await prisma.department.findMany();

  const departmentMap = departments.reduce((acc, dept) => {
    acc[dept.departmentName] = dept.id;
    return acc;
  }, {} as Record<string, string>);

  await prisma.course.createMany({
    data: [
      {
        courseName: "Bachelor of Science in Computer Science",
        departmentId: departmentMap["CITE"],
      },
      {
        courseName: "Bachelor of Science in Fisheries",
        departmentId: departmentMap["CFAAS"],
      },
      {
        courseName: "Bachelor of Science in Marine Biology",
        departmentId: departmentMap["CFAAS"],
      },
      {
        courseName: "Bachelor of Science in Environmental Science",
        departmentId: departmentMap["CFAAS"],
      },
      {
        courseName: "Bachelor of Elementary Education",
        departmentId: departmentMap["CTE"],
      },
      {
        courseName: "Bachelor of Secondary Education",
        departmentId: departmentMap["CTE"],
      },
      {
        courseName:
          "Bachelor of Science in Business Administration Major: Financial Management ",
        departmentId: departmentMap["CBM"],
      },
      {
        courseName:
          "Bachelor of Science in Business Administration Major: Business Economics ",
        departmentId: departmentMap["CBM"],
      },
      {
        courseName: "Bachelor of Science in Hospitality Management",
        departmentId: departmentMap["CBM"],
      },
    ],
  });

  await prisma.subject.createMany({
    data: [
      {
        subject_code: "CS 310",
        subjectName: "Automata Theory and Formal Languages",
        departmentId: departmentMap["CITE"],
        yearLevelId: yearLevelMap["3RD YEAR"],
      },
      {
        subject_code: "CS 316",
        subjectName: "Application Devt & Emerging Tech",
        departmentId: departmentMap["CITE"],
        yearLevelId: yearLevelMap["3RD YEAR"],
      },
      {
        subject_code: "CS 319",
        subjectName: "Life and Works of Rizal",
        departmentId: departmentMap["CITE"],
        yearLevelId: yearLevelMap["3RD YEAR"],
      },
      {
        subject_code: "CS 314",
        subjectName: "Systen Fundamentals",
        departmentId: departmentMap["CITE"],
        yearLevelId: yearLevelMap["3RD YEAR"],
      },
      {
        subject_code: "CS 311",
        subjectName: "Architecture and Organization",
        departmentId: departmentMap["CITE"],
        yearLevelId: yearLevelMap["3RD YEAR"],
      },
      {
        subject_code: "CS 316",
        subjectName: "Web System and Technologies 2",
        departmentId: departmentMap["CITE"],
        yearLevelId: yearLevelMap["3RD YEAR"],
      },
      {
        subject_code: "CS 312",
        subjectName: "Information Assurance and Security",
        departmentId: departmentMap["CITE"],
        yearLevelId: yearLevelMap["3RD YEAR"],
      },
      {
        subject_code: "CS 213",
        subjectName: "Data Structures and Algorithms",
        departmentId: departmentMap["CITE"],
        yearLevelId: yearLevelMap["2ND YEAR"],
      },
      {
        subject_code: "PATH-Fit 3",
        subjectName:
          "Menu of Dance, Sports, Martial Arts, Group Exercise, Outdoor and Adventure Activities",
        departmentId: departmentMap["CITE"],
        yearLevelId: yearLevelMap["2ND YEAR"],
      },
      {
        subject_code: "CS 212",
        subjectName: "Object-Oriented Programming",
        departmentId: departmentMap["CITE"],
        yearLevelId: yearLevelMap["2ND YEAR"],
      },
      {
        subject_code: "CS 211",
        subjectName: "Discrete Structure 2",
        departmentId: departmentMap["CITE"],
        yearLevelId: yearLevelMap["2ND YEAR"],
      },
      {
        subject_code: "CS 213",
        subjectName: "Embedded Systems",
        departmentId: departmentMap["CITE"],
        yearLevelId: yearLevelMap["2ND YEAR"],
      },
      {
        subject_code: "Entrep 1",
        subjectName: "The Entrepreneurial Mind",
        departmentId: departmentMap["CITE"],
        yearLevelId: yearLevelMap["2ND YEAR"],
      },
      {
        subject_code: "GE-AA",
        subjectName: "Arts Appreciation",
        departmentId: departmentMap["CITE"],
        yearLevelId: yearLevelMap["2ND YEAR"],
      },
    ],
  });

  console.log({ newUser, newAdministrator });
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
