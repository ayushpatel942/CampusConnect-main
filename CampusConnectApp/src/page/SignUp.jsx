import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, message } from "antd";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Image,
  VStack,
} from "@chakra-ui/react";
import ClubRegistration from "../components/ClubRegistration";
import Base from "../components/Base";

const SignUp = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    if (formData.password !== formData.confirmPassword) {
      message.error("Password and Confirm Password are Not Same");
      return;
    }

    console.log(formData.email);

    navigate("/registration", {
      state: { password: formData.password, email: formData.email },
    });
  };

  const handleSelection = (value) => {
    setRole(value);
  };

  return (
    <Base>
      <Center>
        <Card variant="outline" w="600px" m={4}>
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
              Sign in to CampusConnect
            </Heading>
          </VStack>
          <CardBody>
            <FormControl>
              <FormLabel size="sm">SignUp as a..</FormLabel>
              <Select
                id="select"
                value={role}
                onChange={handleSelection}
                bg="white"
                size="sm"
              >
                <Select.Option className="py-2" value="student">
                  Student
                </Select.Option>
                <Select.Option className="py-2" value="club">
                  Club
                </Select.Option>
              </Select>
            </FormControl>
            {role === "student" ? (
              <form onSubmit={handleSubmit}>
                <Stack spacing="4">
                  <FormControl>
                    <FormLabel size="sm">Email</FormLabel>
                    <Input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                      required={true}
                    />
                  </FormControl>
                  <FormControl>
                    <HStack justify="space-between">
                      <FormLabel size="sm">Password</FormLabel>
                    </HStack>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                      required={true}
                    />
                  </FormControl>
                  <FormControl>
                    <HStack justify="space-between">
                      <FormLabel size="sm">Confirm Password</FormLabel>
                    </HStack>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                      required={true}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    bg="#2da44e"
                    color="white"
                    size="sm"
                    _hover={{ bg: "#2c974b" }}
                    _active={{ bg: "#298e46" }}
                  >
                    Sign Up
                  </Button>
                </Stack>
              </form>
            ) : (
              <ClubRegistration />
            )}
          </CardBody>
        </Card>
      </Center>
    </Base>
  );
};

export default SignUp;
