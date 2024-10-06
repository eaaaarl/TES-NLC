export interface Students {
  id?: string;
  studentID: string;
  firstname: string;
  middlename: string;
  lastname: string;
  course: {
    courseDep: string;
  };
  yearlevel: string;
  status: string;
  createdAt: string;
}

export interface Course {
  course_id: string;
  courseName: string;
}
