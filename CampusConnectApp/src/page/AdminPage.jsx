import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Heading,
  Image,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  ChangeClubStatus,
  LoadPendingClubs,
  SendMail,
} from "../services/admin-service";
import { BASE_URL } from "../services/helper";

export const AdminPage = () => {
  const [clubs, setClubs] = useState([]);
  const [mailData, setMailData] = useState({
    subject: "About your Club request.",
    message: "",
  });

  const [reject, setReject] = useState("");

  useEffect(() => {
    LoadPendingClubs()
      .then((response) => {
        console.log(response);
        setClubs([...response]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAccept = (Email, clubName) => {
    console.log(Email);
    ChangeClubStatus(Email, "accepted").then(() => {
      console.log("accepted!!");

      LoadPendingClubs()
        .then((response) => {
          setClubs([...response]);
        })
        .catch((error) => {
          console.log(error);
        });

      mailData.message =
        "We are thrilled to inform you that your club " +
        clubName +
        " registration has been accepted! 🥳 On behalf of Campus Connect, we extend our warmest congratulations and welcome you to our community of clubs";
      SendMail(Email, mailData)
        .then(() => {
          console.log("mail send");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const handleReject = (Email, clubName) => {
    console.log(mailData);

    ChangeClubStatus(Email, "rejected")
      .then(() => {
        console.log("rejectd!!");
        LoadPendingClubs()
          .then((response) => {
            setClubs([...response]);
          })
          .catch((error) => {
            console.log(error);
          });
        SendMail(Email, mailData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (clubName) => {
    setReject(clubName);
  };

  const handleChange = (event) => {
    setMailData({ ...mailData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Text as="h2" m={4}>
        Pending requests..
      </Text>
      {clubs &&
        clubs.map((club) => (
          <>
            <Card maxW="sm" margin={5}>
              <CardBody paddingBottom="0">
                <Image
                  src={BASE_URL + "/api/club/logo/" + club?.logo}
                  alt="logo"
                  objectFit="cover"
                  borderRadius="lg"
                />

                <Heading size="md" paddingTop="10px">
                  {club.clubName}
                </Heading>
                <Text>{club.description}</Text>
              </CardBody>

              <CardFooter style={{ margin: 0 }}>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => {
                    handleAccept(club.clubEmail, club.clubName);
                  }}
                  mr={1}
                >
                  Accept
                </Button>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  ml={1}
                  onClick={() => handleClick(club.clubName)}
                >
                  Reject
                </Button>
              </CardFooter>

              {reject === club.clubName && (
                <>
                  <Textarea
                    value={mailData.message}
                    name="message"
                    onChange={handleChange}
                    
                  />
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => handleReject(club.clubEmail, club.clubName)}
                    m={1}
                  >
                    Submit FeedBack
                  </Button>
                </>
              )}
            </Card>
          </>
        ))}
    </div>
  );
};
