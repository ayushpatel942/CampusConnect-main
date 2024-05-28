/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import {
  Box,
  Card,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Button } from "antd";
import { UpdateEvent, loadEventById } from "../services/event-service";
import { Link, useParams } from "react-router-dom";

export const EditEvent = () => {
  const [event, setEvent] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");
  const { eventId } = useParams();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    loadEventById(eventId)
      .then((response) => {
        console.log(response);
        setEvent(response);
        setFormattedDate(printDate(response.eventDate));

        if (
          response.club.clubEmail ===
          JSON.parse(localStorage.getItem("loggedInUser")).email
        ) {
          setCheck(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "eventDate") {
      setFormattedDate(value);
    }
    setEvent((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const printDate = (date) => {
    const newDate = new Date(date);

    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();

    return `${year}-${month}-${day}`;
  };

  const handleUpdate = () => {
    UpdateEvent(event, eventId)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Base>
      {check ? (
        event && (
          <Container  maxW='lg' justifyContent='center'>
          <Card p={4} m={5} >
            <Container>
              <FormControl>
                <FormLabel>Event Name</FormLabel>
                <Input
                  name="eventName"
                  type="text"
                  value={event.eventName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Event Description</FormLabel>
                <Textarea
                  name="description"
                  value={event.description}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Event Date</FormLabel>
                <Input
                  name="eventDate"
                  type="date"
                  value={formattedDate}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Event Time</FormLabel>
                <Input
                  type="time"
                  name="eventTime"
                  value={event.eventTime}
                  onChange={handleChange}
                  step="1"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Event Venue</FormLabel>
                <Input
                  name="eventVenue"
                  value={event.eventVenue}
                  onChange={handleChange}
                />
              </FormControl>
              <Container textAlign="center" mt={4}>
                <Link
                  className="btn btn-primary"
                  onClick={handleUpdate}
                  to={"/eventdetails/" + event.eventId}
                >
                  Update
                </Link>
                <Link
                  style={{ marginLeft: '10px' }}
                  className="btn btn-danger"
                  onClick={handleUpdate}
                  to={"/eventdetails/" + event.eventId}
                >
                  Cancel
                </Link>
              </Container>
            </Container>
          </Card>
          </Container>
        )
      ) : (
        <h2>This is not your post</h2>
      )}
    </Base>
  );
};
