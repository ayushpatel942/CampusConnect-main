import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import {
  Heading,
  Center,
  Image,
  Flex,
  Card,
  CardBody,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { FilterByDept, LoadAllClubs } from "../services/club-service";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../services/helper";
import { Input, Radio, Space } from "antd";

const Clubs = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [dept,setDept] = useState("");
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

  const handleFilter = (e) => {
    setDept(e.target.value);
    FilterByDept(e.target.value).then((response) => {
      setClubs(response);
    }).catch((error) =>{console.log(error);})
  }

  const clearFilter = (e) => {
    setDept("");
    LoadAllClubs()
      .then((response) => {
        setClubs([...response]);
      })
      .catch((error) => {
        console.error("Error loading clubs:", error);
      });
    
  }

  return (
    <Base>
      <Flex direction="row" maxW="100%">
        <Box w="200px" p="4" bg="gray.200">
          <Text>Find by</Text>
          <Radio.Group onChange={handleFilter} value={dept}>
            <Space direction="vertical">
              <Radio value="IT">IT</Radio>
              <Radio value="CE">CE</Radio>
              <Radio value="EC">EC</Radio>
              <Radio value="University">University</Radio>
            </Space>
          </Radio.Group>
          <Button mt="2" _hover={{ bg: "blue.500", color: "white" }} onClick={clearFilter}>
            Clear Filters
          </Button>
        </Box>
        <Flex direction="column" flex="1" p="4">
          {Array.from({ length: Math.ceil(clubs.length / 3) }).map(
            (_, rowIndex) => (
              <Flex
                key={rowIndex}
                justifyContent="center"
                alignItems="flex-start"
              >
                {clubs.slice(rowIndex * 3, (rowIndex + 1) * 3).map((club) => (
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
            )
          )}
        </Flex>
      </Flex>
    </Base>
  );
};

export default Clubs;
