/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import {
  Box,
  CardBody,
  Container,
  Heading,
  Tbody,
  Td,
  Tr,
  Card,
  Table,
  Button,
  cookieStorageManager,
  Flex,
  Center,
} from "@chakra-ui/react";
// import { Card, Table } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LoadStudentById } from "../services/student-service";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const location = useLocation();
  const { studentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loggedInUser") === null) {
      console.log("student");
      navigate("/login");
      return;
    }
    LoadStudentById(studentId)
      .then((response) => {
        console.log(response);
        setStudent(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Base>
      <Box className="Profile" mt={4} mb={4} minHeight="500px">
        <Container maxW="container.md">
          <Box textAlign="center">
            <Heading>User Profile Details</Heading>
          </Box>
          {student && (
            <Card>
              <CardBody>
                <Table variant="striped" borderWidth="1px" borderRadius="md">
                  <Tbody>
                    <Tr>
                      <Td>NAME</Td>
                      <Td>{student.studentName}</Td>
                    </Tr>
                    <Tr>
                      <Td>USERNAME</Td>
                      <Td>{student.studentUsername}</Td>
                    </Tr>
                    <Tr>
                      <Td>Email</Td>
                      <Td>{student.studentEmail}</Td>
                    </Tr>
                    <Tr>
                      <Td>SEMESTER</Td>
                      <Td>{student.studentSem}</Td>
                    </Tr>
                    <Tr>
                      <Td>DEPARTMENT</Td>
                      <Td>{student.studentDept}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          )}
        </Container>
        
        {/* {student && ( */}
              <Heading >Events</Heading>
          <Flex direction="column" flex="1" p="4">
            <Center>
              <Box p={4} width="70%">
                {student &&
                student.eventList &&
                student.eventList.map((event) => (
                <Box
                  borderWidth="5px"
                  key={event.eventId}
                  borderRadius="lg"
                  overflow="hidden"
                >
                  {event.eventName}
                </Box>
                ))} 
              </Box>
            </Center>
          </Flex>
      </Box>
    </Base>
  );
};

export default StudentProfile;
