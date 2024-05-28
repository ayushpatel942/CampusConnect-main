import { myAxios } from "./helper";

export const SignUpFunc = (student) => {
  console.log("in signup function");
  console.log(student);
  return myAxios.post("/api/student/create", student);
};

export const LoginStudent = (email, password) => {
  console.log(email);
  return myAxios
    .get(`/api/student/${email}/${password}`)
    .then((response) => {
      return response.data;
    });
};

export const LoadStudentById = (studentId) => {
  return myAxios
    .get(`/api/student/${studentId}`)
    .then((response) => response.data);
};

export const getStudetnIdByStudentEmail = (email, password) => {
  return myAxios
    .get(`/api/student/getstudentid/${email}/${password}`)
    .then((response) => {
      return response.data;
    });
};
