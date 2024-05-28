import React, { useEffect, useState } from "react";
import {
  Heading,
  Center,
  Image,
  Flex,
  Card,
  CardBody,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/helper";
import Base from "../Base";
import { LoadAllClubs } from "../../services/club-service";

const ClubsList = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [dept, setDept] = useState("");
  useEffect(() => {
    LoadAllClubs()
      .then((response) => {
        setClubs([...response]);
      })
      .catch((error) => {
        console.error("Error loading events:", error);
      });
  }, []);

  const handleClick = (clubId) => {
    navigate(`/clubDetail/${clubId}`);
  };

  return (
    <div style={{ paddingTop: "10px" }}>
    <Heading ml={4}>Clubs</Heading>
      <hr />
      {Array.from({ length: 1 }).map((_, rowIndex) => (
        <Flex key={rowIndex} justifyContent="center" alignItems="flex-start">
          {clubs.slice(0, 4).map((club) => (
            <Card key={club.clubId} maxW="sm" mx={2} mt={2}>
              <CardBody paddingBottom="0">
                <Image
                  src={BASE_URL + "/api/club/logo/" + club?.logo}
                  alt="Logo"
                  boxSize="350px"
                  objectFit="cover"
                  borderRadius="lg"
                />
                <Heading size="md" paddingTop="10px">
                  {club.clubName}
                </Heading>
              </CardBody>
              <Center>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => handleClick(club.clubId)}
                  mb={2}
                >
                  View Details
                </Button>
              </Center>
            </Card>
          ))}
        </Flex>
      ))}
    </div>
  );
};

export default ClubsList;
