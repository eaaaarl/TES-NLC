export interface Students {
  id?: string;
  studentID: string;
  firstname: string;
  middlename: string;
  lastname: string;
  course: {
    Department: {
      departmentName: string;
    };
  };
  yearlevel: string;
  status: string;
  createdAt: string;
}

export interface Course {
  course_id: string;
  courseName: string;
  Department: {
    id: string;
    departmentName: string;
  };
}

export interface Sections {
  section_id: string;
  sectionName: string;
}
