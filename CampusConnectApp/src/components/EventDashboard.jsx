import React, { useEffect, useState } from "react";
import {
  AddStudent,
  DeleteEventById,
  loadEventById,
} from "../services/event-service";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { getClubByClubEmail } from "../services/club-service";
import Base from "./Base";
import { Box, Button, Card, Center, Flex, Image, Text } from "@chakra-ui/react";
import { ParticipantEvent } from "../services/student-service";

const EventDashboard = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isEventPast, setIsEventPast] = useState(false);
  const [check, setCheck] = useState(false);
  const [studentCheck, setStudentCheck] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  useEffect(() => {
    console.log(user);
    loadEventById(eventId)
      .then((data) => {
        console.log(data);
        setEvent(data);
        if (user.email === "admin") {
          setCheck(true);
        } else if (user) {
          getClubByClubEmail(user.email, user.password)
            .then((response) => {
              if (response.clubId === data.club.clubId) {
                setCheck(true);
              }
            })
            .catch((error) => {
              console.log(error);
            });
          for (let student of data.studentList) {
            if (student.studentEmail === user.email) {
              console.log("email");
              setStudentCheck(true);
              break; // Exit loop after finding a match
            }
          }
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

  const handleRegister = (studentEmail, Id) => {
    AddStudent(studentEmail, Id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setStudentCheck(true);
    setEvent(event);
  };

  const handleAccept = (studentId, evenId) => {
    ParticipantEvent(studentId, evenId)
      .then((response) => {
        console.log(response);
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
              <Text>
                <strong>No of Student Registered : </strong>{" "}
                {event?.studentList.length}
              </Text>

              {isEventPast ? (
                <b>
                  You are past the Registration Date. Registration is closed.
                </b>
              ) : user ? (
                user.role === "student" &&
                (studentCheck ? (
                  <Text>Registered</Text>
                ) : (
                  <Button
                    mt="auto"
                    onClick={() => handleRegister(user.email, eventId)}
                    // to={event.eventLink}
                    className="btn btn-primary"
                  >
                    Register
                  </Button>
                ))
              ) : (
                <Link mt="auto" className="btn btn-danger" to={"/login"}>
                  Login as Student for register in event
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
      {check && (
        <Flex direction="column" flex="1" p="4">
          <Center>
            <Box p={4} width="70%">
              {event &&
                event.studentList &&
                event.studentList
                  // .filter((student) => {
                  //   // console.log(student.evenIds.includes(eventId));
                  //   !student.eventIds.includes(eventId);
                  // })
                  .map((student) => (
                    !student.eventIds.includes(Number(eventId)) ? (
                      <Box
                        borderWidth="5px"
                        key={student.studentId}
                        borderRadius="lg"
                        overflow="hidden"
                      >
                        {student.studentName}
                        <Button
                          mt="auto"
                          className="btn btn-primary"
                          colorScheme="blue"
                          onClick={() =>
                            handleAccept(student.studentId, eventId)
                          }
                        >
                          Accept
                        </Button>
                      </Box>
                    ) : null
                  ))}
            </Box>
          </Center>
        </Flex>
      )}
    </Base>
  );
};

export default EventDashboard;
