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
import { Link, useParams } from "react-router-dom";
import { LoadClubById, UpdateClubDetails } from "../services/club-service";

export const UpdateClub = () => {
  const [check, setCheck] = useState(false);
  const [club, setClub] = useState(null);
  const { clubId } = useParams();

  useEffect(() => {
    LoadClubById(clubId)
      .then((response) => {
        setClub(response);
        if (
          response.clubEmail ===
            JSON.parse(localStorage.getItem("loggedInUser")).email ||
          JSON.parse(localStorage.getItem("loggedInUser")).email === "admin"
        ) {
          setCheck(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clubId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setClub((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    UpdateClubDetails(club, clubId)
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
        club && (
          <Container maxW="lg" justifyContent="center">
            <Card p={4} m={5}>
              <Container>
                <FormControl>
                  <FormLabel>Club Name</FormLabel>
                  <Input
                    name="clubName"
                    type="text"
                    value={club.clubName}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Mentor Name</FormLabel>
                  <Input
                    name="mentor"
                    type="text"
                    value={club.mentor}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={club.description}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Department</FormLabel>
                  <Input
                    name="dept"
                    value={club.dept}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="clubEmail"
                    value={club.clubEmail}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>President</FormLabel>
                  <Input
                    name="president"
                    value={club.president}
                    onChange={handleChange}
                  />
                </FormControl>
                <Container textAlign="center" mt={4}>
                  <Link
                    className="btn btn-primary"
                    onClick={handleUpdate}
                    to={"/clubDetail/" + club.clubId}
                  >
                    Update
                  </Link>
                  <Link
                    style={{ marginLeft: "10px" }}
                    className="btn btn-danger"
                    onClick={handleUpdate}
                    to={"/eventdetails/" + club.clubId}
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
