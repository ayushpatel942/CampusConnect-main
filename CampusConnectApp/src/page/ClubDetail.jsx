import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { Box, Center, Image, Flex, Card, Text, Button } from "@chakra-ui/react";
import { LoadClubById } from "../services/club-service";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../services/helper";
import { CheckClubStatus } from "../services/admin-service";
import { EventCard } from "../components/EventCard";

const ClubDetails = () => {
  const location = useLocation();
  const [club, setClub] = useState({});
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [check, setCheck] = useState(true);

  useEffect(() => {
    console.log(clubId);
    LoadClubById(clubId)
      .then((response) => {
        CheckClubStatus(response.clubEmail).then((res) => {
          console.log("checkCLubStatus", res);

          if (res === "pending") {
            setCheck(false);
            localStorage.removeItem("loggedInUser");
          }
        });
        console.log("then ", response);
        setClub(response);
      })
      .catch((error) => {
        console.log("jj", error);
      });
  }, [clubId]);

  const handleCreate = (clubId) => {
    navigate("/eventRegistry/" + clubId);
  };

  return (
    <Base>
      {check ? (
        <>
          <Center>
            <Card maxW="70%" mt="2" borderRadius="0">
              <Center as="h1" size="xl" mb={4}>
                {club.clubName}
              </Center>
              <Flex>
                <Image
                  margin="3"
                  boxSize="200px"
                  src={BASE_URL + "/api/club/logo/" + club?.logo}
                  alt="Logo"
                  objectFit="cover"
                  borderRadius="lg"
                />
                <Box ml="30px" mt="20px">
                  <Text as="h4">Mentor: {club.mentor}</Text>
                  <Text as="h4">President: {club.president}</Text>
                  <Text as="h4">Department: {club.dept}</Text>
                  <Text as="h4">Email: {club.clubEmail}</Text>
                </Box>
              </Flex>
              <Text as="h6" m="3">
                {club.description}
              </Text>
              {localStorage.getItem("loggedInUser") &&
                JSON.parse(localStorage.getItem("loggedInUser")).email ===
                  club.clubEmail && (
                  <>
                    <Button
                      m="3"
                      width="20%"
                      variant="solid"
                      colorScheme="blue"
                      onClick={() => handleCreate(club.clubId)}
                    >
                      Create New Event
                    </Button>
                  </>
                )}
            </Card>
          </Center>
          <Flex direction="column" flex="1" p="4">
            <Center>
              <Box p={4} width="70%">
                {club.eventList &&
                  club.eventList.map((event) => (
                    <Box
                      key={event.eventId}
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                    >
                      <EventCard event={event} />
                    </Box>
                  ))}
              </Box>
            </Center>
          </Flex>
        </>
      ) : (
        <Center mt={10}>
        <Text as="h4">
          Your request is sent successfully to the admin. Please wait for the conformation
        </Text>
        </Center>
      )}
    </Base>
  );
};

export default ClubDetails;