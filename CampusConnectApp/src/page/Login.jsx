import React, { useEffect, useState } from "react";
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
  Select,
} from "@chakra-ui/react";
import Base from "../components/Base";
import { LoginStudent } from "../services/student-service";
import { useNavigate } from "react-router-dom";
import { LoginClub } from "../services/club-service";
import { doLogin } from "../services/helper";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "select--",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loggedInUser") !== null) {
      navigate("/");
    }
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleLogin = () => {
    if (data.role === "select--") {
      if (data.email === "admin" && data.password === "admin") {
        console.log("admin");
        navigate("/admin");
      }
    }

    if (data.role === "student") {
      console.log(data);
      LoginStudent(data.email, data.password)
        .then((studentId) => {
          doLogin(data);
          navigate("/studentProfile/" + studentId);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (data.role === "club") {
      LoginClub(data.email, data.password)
        .then((clubId) => {
          doLogin(data);
          navigate("/clubDetail/" + clubId);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Base>
      <Center>
        <Card variant="outline" w="400px" m={5}>
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
            <form>
              <Stack spacing="4">
                <FormControl>
                  <FormLabel size="sm">Email</FormLabel>
                  <Input
                    type="text"
                    bg="white"
                    borderColor="#d8dee4"
                    size="sm"
                    borderRadius="6px"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <HStack justify="space-between">
                    <FormLabel size="sm">Password</FormLabel>
                  </HStack>
                  <Input
                    type="password"
                    bg="white"
                    borderColor="#d8dee4"
                    size="sm"
                    borderRadius="6px"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel size="sm">Login as a..</FormLabel>
                  <Select
                    id="select"
                    name="role"
                    value={data.role}
                    onChange={handleChange}
                    bg="white"
                    borderColor="#d8dee4"
                    size="sm"
                    borderRadius="6px"
                  >
                    <option className="py-2" value="select--">
                      Select--
                    </option>

                    <option className="py-2" value="student">
                      Student
                    </option>
                    <option className="py-2" value="club">
                      Club
                    </option>
                  </Select>
                </FormControl>
                <Button
                  bg="#2da44e"
                  color="white"
                  size="sm"
                  _hover={{ bg: "#2c974b" }}
                  _active={{ bg: "#298e46" }}
                  onClick={handleLogin}
                >
                  Log In
                </Button>
                <Button
                  as="a"
                  href="#"
                  variant="link"
                  size="s"
                  color="#0969da"
                  fontWeight="50"
                  ml="-1"
                  onClick={() => {
                    navigate("/signup")
                  }}
                >
                  Are you new? Register
                </Button>
              </Stack>
            </form>
          </CardBody>
        </Card>
      </Center>
    </Base>
  );
};

export default Login;
