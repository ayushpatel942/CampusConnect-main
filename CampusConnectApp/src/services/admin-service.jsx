import { myAxios } from "./helper";

export const ChangeClubStatus = (clubId,status) => {
  // console.log(clubEmail);
  return myAxios.put(`/api/admin/changeStatus/${clubId}/${status}`);
};

export const LoadPendingClubs = () => {
  return myAxios.get("/api/admin/clubs").then((response) => {
    return response.data;
  });
};

export const CheckClubStatus = (clubId) => {
  return myAxios.get(`/api/admin/checkStatus/${clubId}`).then((response) => {
    return response.data;
  });
};

export const SendMail = (clubEmail,mailData) => {
  console.log("service",mailData);
  return myAxios.post("/api/admin/send/"+clubEmail,mailData);
}