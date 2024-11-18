export interface Students {
  id: string;
  avatarUrl?: string;
  studentID: string;
  firstname: string;
  middlename: string | null;
  lastname: string;
  courseID: string;
  departmentId: string;
  gender: string;
  course: {
    department: {
      departmentName: string;
    };
  };
  yearLevel: {
    yearName: string | null;
  };
  section: {
    id: string;
    sectionName: string | null;
  };
  status: string;
  createdAt: string;
}

export interface Course {
  id: string;
  courseName: string;
  department: {
    id: string;
    departmentName: string;
    departmentDescription: string;
  };
}

export interface Department {
  id: string;
  departmentName: string | null;
  departmentDescription: string;
}

export interface Sections {
  id: string;
  sectionName: string;
  yearLevel: {
    id: string;
    yearName: string;
  };
  departmentId: string;
}

export interface YearLevel {
  id: string;
  yearName: string;
}

export interface Subject {
  id: string;
  subject_code?: string | null;
  subjectName: string;
  yearLevelId: string;
  departmentId: string;
}

export interface AcademicYear {
  id: string;
  semester: string;
  year: string;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  question: string;
  description?: string;
  required: boolean;
  allowComments: boolean;
  createdAt: Date;
  updatedAt: Date;

  ratingScale: {
    id: string;
    rating: number;
    description: string;
  }[];

  category: {
    id: string;
    name: string;
  };
}
