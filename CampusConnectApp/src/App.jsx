import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Clubs from "./page/Clubs";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import Registration from "./page/Registration";
import ClubDetail from "./page/ClubDetail";
import EventDashboard from "./components/EventDashboard";
import EventRegistration from "./components/ClubComponents/EventRegistration";
import ClubRegistration from "./components/ClubRegistration";
import { AdminPage } from "./page/AdminPage";
import StudentProfile from "./page/StudentProfile";
import { EditEvent } from "./page/EditEvent";
import Event from "./page/Event";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Event />} />
        <Route path="/eventdetails/:eventId" element={<EventDashboard />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/clubDetail/:clubId" element={<ClubDetail />} />
        <Route path="/eventRegistry/:clubId" element={<EventRegistration />} />
        <Route path="/clubRegistry" element={<ClubRegistration />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/studentProfile/:studentId" element={<StudentProfile />} />
        <Route path="/editEvent/:eventId" element={<EditEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

  export default App;
