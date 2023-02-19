export type Student = {
  id: String;
  name: String;
  image: String;
};

// the student list does not need to be here
const students: Array<Student> = [
  {
    id: "1",
    name: "Chen",
    image: "",
  },
  {
    id: "2",
    name: "Chen",
    image: "",
  },
  {
    id: "3",
    name: "Chen",
    image: "",
  },
  {
    id: "4",
    name: "Chen",
    image: "",
  },
  {
    id: "5",
    name: "Chen",
    image: "",
  },
  {
    id: "6",
    name: "Chen",
    image: "",
  },
];

const getAllStudents = () => {
  return students;
};

const addStudent = (student: Student) => {
  students.push(student);
};

export default { getAllStudents, addStudent };
