import { myAxios } from "./helper";

export const signUp = (club) => {
  return myAxios
    .post("/api/club/register", club)
    .then((response) => response.json());
};

export const LoadAllClubs = () => {
  return myAxios.get("/api/club/allclub").then((response) => {
    return response.data;
  });
};

export const LoadClubById = (clubId) => {
  console.log(clubId);
  return myAxios.get(`/api/club/${clubId}`).then((response) => {
    console.log("loadclubbyid -- ", response.data);
    return response.data;
  });
};

export const createClub = (clubdata) => {
  console.log(clubdata);
  return myAxios.post(`/api/club/register`, clubdata);
};

export const LoginClub = (email, password) => {
  return myAxios.get(`/api/club/${email}/${password}`).then((response) => {
    return response.data;
  });
};

export const getClubByClubEmail = (email, password) => {
  return myAxios
    .get(`/api/club/getclubtid/${email}/${password}`)
    .then((response) => {
      return response.data;
    });
};

export const Loadallunacceptedclub = () => {
  return myAxios.get(`/api/club/allclubs`).then((response) => {
    return response.data;
  });
};

export const uploadlogo = (image, clubId) => {
  let formData = new FormData();
  formData.append("logo", image.logo);
  return myAxios
    .post(`/api/club/image/upload/${clubId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const FilterByDept = (dept) => {
  return myAxios.get("/api/club/filter/" + dept).then((response) => {
    return response.data;
  });
};