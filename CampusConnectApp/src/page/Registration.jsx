/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  VStack,
  Select,
} from "@chakra-ui/react";
import { SignUpFunc } from "../services/student-service";
import { toast } from "react-toastify";
import Base from "../components/Base";

const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "",
    studentUsername: "",
    studentSem: "",
    studentDept: "",
    studentEmail: location.state.email,
    studentPassword: location.state.password,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SignUpFunc(formData)
      .then((response) => {
        toast.success("User Registered Successfully!!");
      })
      .catch((error) => {
        toast.error(JSON.stringify(error.response.data.message));
      });
    navigate("/");
  };

  return (
    <Base>
      <Center m={4}>
        <Stack spacing="4">
          <Card variant="outline" w="150%">
            <VStack as="header" spacing="6" mt="8">
              <Image
                borderRadius="full"
                boxSize="100px"
                src="./assets/images/campusconnectlogo.jpeg"
                alt="CampusConnect"
              />
              <Heading
                as="h1"
                fontWeight="500"
                fontSize="24px"
                letterSpacing="-0.5px"
              >
                Register Here
              </Heading>
            </VStack>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <Stack spacing="4">
                  <FormControl>
                    <FormLabel size="sm">Full Name</FormLabel>
                    <Input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel size="sm">Username</FormLabel>
                    <Input
                      type="text"
                      name="studentUsername"
                      value={formData.studentUsername}
                      onChange={handleInputChange}
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel size="sm">Semester</FormLabel>
                    <Input
                      type="number"
                      name="studentSem"
                      value={formData.studentSem}
                      onChange={handleInputChange}
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel size="sm">Department</FormLabel>
                    <Select
                      name="studentDept"
                      value={formData.studentDept}
                      onChange={handleInputChange}
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                    >
                      <option value="">Select Department</option>
                      <option value="CSE">Computer Science</option>
                      <option value="IT">Information Technology</option>
                      <option value="ECE">Electronics</option>
                      <option value="ME">Mechanical</option>
                    </Select>
                  </FormControl>
                  <Button
                    type="submit"
                    bg="#2da44e"
                    color="white"
                    size="sm"
                    _hover={{ bg: "#2c974b" }}
                    _active={{ bg: "#298e46" }}
                  >
                    Register
                  </Button>
                </Stack>
              </form>
            </CardBody>
          </Card>
        </Stack>
      </Center>
    </Base>
  );
};

export default Registration;
