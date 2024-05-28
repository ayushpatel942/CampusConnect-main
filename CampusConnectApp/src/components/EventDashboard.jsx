import React, { useEffect, useState } from "react";
import { DeleteEventById, loadEventById } from "../services/event-service";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { getClubByClubEmail } from "../services/club-service";
import Base from "./Base";
import { Box, Button, Card, Center, Image, Text } from "@chakra-ui/react";

const EventDashboard = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isEventPast, setIsEventPast] = useState(false);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    loadEventById(eventId)
      .then((data) => {
        setEvent(data);
        if (user) {
          getClubByClubEmail(user.email, user.password)
            .then((response) => {
              if (response.clubId === data.club.clubId) {
                setCheck(true);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
        const eventDate = new Date(data.eventDate);
        const currentDate = new Date();
        setIsEventPast(eventDate < currentDate);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading the event");
      });
  }, [eventId]);

  const handleDelete = () => {
    DeleteEventById(eventId)
      .then(() => {
        toast.success("Event Deleted Successfully!!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const printDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Base>
      <Box
        m={10}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="0px"
      >
        <Card
          width="100%"
          height="100hv"
          boxShadow="md"
          flexDirection="column"
          borderRadius="0px"
        >
          <Center>
            <h2>Event Details</h2>
          </Center>
          <Box flex="1" display="flex">
            <Box flex="2" padding="4">
              <Image
                src={
                  event
                    ? BASE_URL + "/api/event/eventbroucher/" + event.brochure
                    : ""
                }
                alt="Event Brochure"
                objectFit="cover"
              />
            </Box>
            <Box flex="3" padding="4">
              <Text>
                <strong>Name:</strong> {event?.eventName}
              </Text>
              <Text>
                <strong>Date:</strong> {event ? printDate(event.eventDate) : ""}
              </Text>
              <Text>
                <strong>Time:</strong> {event?.eventTime}
              </Text>
              <Text>
                <strong>Venue:</strong> {event?.eventVenue}
              </Text>
              <Text>
                <strong>Description:</strong> {event?.description}
              </Text>
              <Text>
                <strong>Club : </strong> {event?.club.clubName}
              </Text>

              {isEventPast ? (
                <b>
                  You are past the Registration Date. Registration is closed.
                </b>
              ) : localStorage.getItem("loggedInUser") ? (
                event ? (
                  <Link
                    mt="auto"
                    to={event.eventLink}
                    className="btn btn-primary"
                  >
                    Register
                  </Link>
                ) : null
              ) : (
                <Link mt="auto" className="btn btn-danger" to={"/login"}>
                  Login to Register for Event
                </Link>
              )}
              {check && (
                <Box mt={4}>
                  <Box display="inline-block" marginRight="2">
                    <Link
                      mt="auto"
                      className="btn btn-primary"
                      to={"/editEvent/" + eventId}
                    >
                      Update
                    </Link>
                  </Box>
                  <Box display="inline-block">
                    <Button
                      mt="auto"
                      className="btn btn-primary"
                      colorScheme="red"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Card>
      </Box>
    </Base>
  );
};

export default EventDashboard;
