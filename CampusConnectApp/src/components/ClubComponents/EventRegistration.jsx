import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Card,
} from "@chakra-ui/react";
import {
  LoadAllEvents,
  createEvent,
  uploadImage,
} from "../../services/event-service";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const EventRegistration = () => {
  const [eventInfo, setEventInfo] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventVenue: "",
    description: "",
    eventLink: ""
  });

  const [image, setImage] = useState({
    brochure: "",
  });

  const { clubId } = useParams();
  const  navigate  = useNavigate();

  let [eventId, setEventId] = useState();
  useEffect(() => {
    LoadAllEvents().then((data) => {
      const highestEventId = data.reduce(
        (maxId, event) => Math.max(maxId, event.eventId),
        0
      );
      eventId = highestEventId + 1;
    });
  });
  const location = useLocation();

  const handleChange = (e) => {
    setEventInfo(() => ({
      ...eventInfo,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setImage((prevImage) => ({
      ...prevImage,
      brochure: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent(eventInfo, clubId)
      .then((data) => {
        uploadImage(image, eventId)
          .then((data) => {
            console.log("Brochure is uploaded");
          })
          .catch((error) => {
            console.log("Reupload and make sure it's size is less than 20MB");
          });
        navigate("/clubDetail/" + clubId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card
      p={8}
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      maxW="600px"
      mx="auto"
      mt={4}
      mb={4}
    >
      <Heading mb={4} textAlign="center">
        Event Registration
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Event Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter event name"
              name="eventName"
              value={eventInfo.eventName}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              name="eventDate"
              value={eventInfo.eventDate}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Time</FormLabel>
            <Input
              type="time"
              name="eventTime"
              value={eventInfo.eventTime}
              onChange={handleChange}
              step="1"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Venue</FormLabel>
            <Input
              type="text"
              placeholder="Enter venue"
              name="eventVenue"
              value={eventInfo.eventVenue}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Enter event description"
              name="description"
              value={eventInfo.description}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Registration Link</FormLabel>
            <Input
              type="url"
              placeholder="Enter Link"
              name="eventLink"
              value={eventInfo.eventLink}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Event Brochure</FormLabel>
            <Input type="file" name="brochure" onChange={handleImageChange} />
          </FormControl>
          <Flex justify="flex-end">
            <Button type="submit" colorScheme="teal">
              Register Event
            </Button>
          </Flex>
        </Stack>
      </form>
    </Card>
  );
};

export default EventRegistration;
