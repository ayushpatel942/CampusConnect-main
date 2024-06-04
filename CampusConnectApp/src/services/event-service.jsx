import { myAxios } from "./helper";

export const LoadAllEvents = () => {
  return myAxios.get("/api/event/allEvents").then((response) => {
    return response.data;
  });
};

export const UpcomingEvents = () => {
  return myAxios.get("/api/event/upcomingEvents").then((response) => {
    return response.data;
  });
};

export const EventsBWDate = (d1, d2) => {
  return myAxios
    .get(`/api/event/geteventbwdate/${d1}/${d2}`)
    .then((response) => {
      return response.data;
    });
};

export const loadEventById = (eventId) => {
  return myAxios.get("/api/event/" + eventId).then((response) => response.data);
};

export const createEvent = (eventData, clubId) => {
  console.log(clubId);
  return myAxios
    .post(`/api/event/createEvent/${clubId}`, eventData);
};

export const DeleteEventById = (eventId) => {
  return myAxios.delete(`/api/event/${eventId}`).then((response) => {
    return response.data;
  })
};

export const UpdateEvent = (eventData,eventId) => {
  return myAxios.put('/api/event/updateEvent/' + eventId,eventData);
}

export const uploadImage = (image, eventId) => {
  let formData = new FormData();
  formData.append("brochure", image.brochure); 
  return myAxios
    .post(`/api/event/image/upload/${eventId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data; 
    });
};

export const SearchPost = (query) => {
  return myAxios.get("api/event/search/" + query).then((response) => {
    return response.data;
  });
};

export const AddStudent = (studentEmail,eventId) => {
  return myAxios.put("/api/event/addStudent/"+studentEmail+"/"+eventId)
} 