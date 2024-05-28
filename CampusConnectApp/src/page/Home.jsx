import { useEffect, useState } from "react";
import Base from "../components/Base";
import ClubsList from "../components/HomeComponents/ClubsList";
import { UpcomingEvents } from "../services/event-service";
import { EventCard } from "../components/EventCard";
import { Box, Heading } from "@chakra-ui/react";
const Home = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    UpcomingEvents()
      .then((response) => {
        console.log("then", response);
        setEvents([...response]);
      })
      .catch((error) => {
        console.log("Error loading events:", error);
      });
  }, []);
  return (
    <Base>
      <ClubsList />
      <br />
      <Heading ml={4}>Upcoming Events</Heading>
      <hr />
      {events.map((event) => (
        <Box
          key={event.eventId}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <EventCard event={event} />
        </Box>
      ))}
    </Base>
  );
};

export default Home;
