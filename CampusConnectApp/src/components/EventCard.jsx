import { Card, Center, Flex, Image, Text, Heading,Box} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../services/helper";

export const EventCard = (prop) => {
  const event = prop.event;

  const printDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Box mb="4">
      {event && (
        <Card>
          <Flex direction="row" p="3">
            <Image
              src={BASE_URL + "/api/event/eventbroucher/" + event.brochure}
              alt="Event Logo"
              boxSize="200px"
              borderRadius="10px"
              objectFit="cover"
            />
            <Flex direction="column" flex="1" ml="2">
              <Heading size="md">{event.eventName}</Heading>
              <Text>Date: {printDate(event.eventDate)}</Text>
              <Text>Time: {event.eventTime}</Text>
              <Text> Venue: {event.eventVenue}</Text>
              <Link
                mt="auto"
                to={"/eventdetails/" + event.eventId}
                className="btn btn-primary"
              >
                View Details
              </Link>
            </Flex>
          </Flex>
        </Card>
      )}
      </Box>
  );
};
