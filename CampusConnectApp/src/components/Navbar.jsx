import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuDivider,
  Image,
  Link,
  useMediaQuery,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import { useState } from "react";;
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { getStudetnIdByStudentEmail } from "../services/student-service";
import { getClubByClubEmail } from "../services/club-service";

const Navbar = () => {
  const [isLargerThan1023, isLargerThan768] = useMediaQuery(
    "(min-width: 1024px), (min-width: 768px)"
  );
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setIsOpen(!isOpen);

  const handleProfile = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(user.email);
    if (user.role === "student") {
      getStudetnIdByStudentEmail(user.email, user.password)
        .then((response) => {
          navigate("/studentProfile/" + response.studentId);
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    } else if (user.role === "club") {
      console.log(user.email, user.password);
      getClubByClubEmail(user.email, user.password)
        .then((response) => {
          console.log("navbar", response);
          navigate("/clubDetail/" + response.clubId);
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <Box
      as="nav"
      bg="gray.100"
      px={4}
      py={2}
      shadow="md"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" mr={2}>
          <Image
            borderRadius="full"
            boxSize="55px"
            src="../assets/images/campusconnectlogo.jpeg"
            alt="CampusConnect"
            mr={2}
          />
          <Link
            _hover={{ textDecoration: "none" }}
            style={{ textDecoration: "none" }}
            as={ReactLink}
            to="/"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="xl"
            fontWeight="extrabold"
          >
            Club Hub
          </Link>
        </Box>
        {isLargerThan1023 && (
          <Box display="flex" alignItems="center" mr={2}>
            <Flex>
              <Box display="flex" alignItems="center" mr={2}>
                <Link
                  _hover={{ textDecoration: "none" }}
                  style={{
                    textDecoration: "none",
                    fontSize: isLargerThan768 ? "md" : "sm",
                  }}
                  as={ReactLink}
                  to="/"
                  fontWeight="semibold"
                  mr={50}
                >
                  Home
                </Link>
                <Link
                  _hover={{ textDecoration: "none" }}
                  style={{
                    textDecoration: "none",
                    fontSize: isLargerThan768 ? "md" : "sm",
                  }}
                  as={ReactLink}
                  to="/events"
                  fontWeight="semibold"
                  mr={50}
                >
                  Events
                </Link>
                <Link
                  _hover={{ textDecoration: "none" }}
                  style={{
                    textDecoration: "none",
                    fontSize: isLargerThan768 ? "md" : "sm",
                  }}
                  as={ReactLink}
                  to="/clubs"
                  fontWeight="semibold"
                  mr={50}
                >
                  Clubs
                </Link>

                <Box ml={4}>
                  <Menu>
                    <MenuButton as={Avatar} size="md" />
                    {localStorage.getItem("loggedInUser") === null ? (
                      <MenuList>
                        <Link
                          _hover={{ textDecoration: "none" }}
                          style={{ textDecoration: "none" }}
                          as={ReactLink}
                          to="/login"
                          ml={2}
                        >
                          Login
                        </Link>
                        <MenuDivider />

                        <Link
                          _hover={{ textDecoration: "none" }}
                          style={{ textDecoration: "none" }}
                          as={ReactLink}
                          to="/signup"
                          ml={2}
                        >
                          SignUp
                        </Link>
                      </MenuList>
                    ) : (
                      <MenuList>
                        <Link
                          _hover={{ textDecoration: "none" }}
                          style={{ textDecoration: "none" }}
                          as={ReactLink}
                          onClick={handleProfile}
                          ml={2}
                        >
                          Profile
                        </Link>
                        <MenuDivider />

                        <Link
                          _hover={{ textDecoration: "none" }}
                          style={{ textDecoration: "none" }}
                          as={ReactLink}
                          onClick={handleLogout}
                          ml={2}
                        >
                          Logout
                        </Link>
                      </MenuList>
                    )}
                  </Menu>
                </Box>
              </Box>
            </Flex>
          </Box>
        )}
        {!isLargerThan768 && !isLargerThan1023 && (
          <Box display="flex" alignItems="center" mr={2}>
            <IconButton
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              onClick={handleToggle}
            />
            <Drawer placement="right" onClose={handleToggle} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>
                  <Link
                    _hover={{ textDecoration: "none" }}
                    style={{ textDecoration: "none", fontSize: "md" }}
                    as={ReactLink}
                    to="/"
                    fontWeight="semibold"
                  >
                    Home
                  </Link>
                  <br />
                  <Link
                    _hover={{ textDecoration: "none" }}
                    style={{ textDecoration: "none", fontSize: "md" }}
                    as={ReactLink}
                    to="/events"
                    fontWeight="semibold"
                  >
                    Events
                  </Link>
                  <br />
                  <Link
                    _hover={{ textDecoration: "none" }}
                    style={{ textDecoration: "none", fontSize: "md" }}
                    as={ReactLink}
                    to="/clubs"
                    fontWeight="semibold"
                  >
                    Clubs
                  </Link>
                  <br />

                  {localStorage.getItem("loggedInUser") === null ? (
                    <>
                      <Link
                        _hover={{ textDecoration: "none" }}
                        style={{ textDecoration: "none", fontSize: "md" }}
                        as={ReactLink}
                        fontWeight="semibold"
                        to="/login"
                      >
                        Login
                      </Link>
                      <br />
                      <Link
                        _hover={{ textDecoration: "none" }}
                        style={{ textDecoration: "none", fontSize: "md" }}
                        as={ReactLink}
                        fontWeight="semibold"
                        to="/signup"
                      >
                        SignUp
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        _hover={{ textDecoration: "none" }}
                        style={{ textDecoration: "none", fontSize: "md" }}
                        as={ReactLink}
                        fontWeight="semibold"
                        onClick={handleProfile}
                      >
                        Profile
                      </Link>
                      <br />
                      <Link
                        _hover={{ textDecoration: "none" }}
                        style={{ textDecoration: "none", fontSize: "md" }}
                        as={ReactLink}
                        fontWeight="semibold"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </>
                  )}
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
