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
import { useNavigate } from "react-router-dom";
import Base from "../components/Base";

export const AdminPage = () => {
  const [check,setCheck] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [mailData, setMailData] = useState({
    subject: "About your Club request.",
    message: "",
  });

  const navigate = useNavigate();

  const [reject, setReject] = useState("");

  useEffect(() => {
    if(JSON.parse(localStorage.getItem("loggedInUser")).email!=="admin")
    {
      navigate("/");
    }
    LoadPendingClubs()
    .then((response) => {
      console.log(response);
      setClubs([...response]);
    })
    .catch((error) => {
      console.log(error);
    });
    console.log(localStorage.getItem("loggedInUser"));
  }, []);

  const handleAccept = (clubId, clubName, clubEmail) => {
    // console.log(Email);
    ChangeClubStatus(clubId, "accepted").then(() => {
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
      SendMail(clubEmail, mailData)
        .then(() => {
          console.log("mail send");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const handleReject = (clubId, clubEmail) => {
    console.log(mailData);

    ChangeClubStatus(clubId, "rejected")
      .then(() => {
        console.log("rejectd!!");
        LoadPendingClubs()
          .then((response) => {
            setClubs([...response]);
          })
          .catch((error) => {
            console.log(error);
          });
        SendMail(clubEmail, mailData);
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
    <Base>
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
                    handleAccept(club.clubId, club.clubName, club.clubEmail);
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
                    onClick={() => handleReject(club.clubId, club.clubEmail)}
                    m={1}
                  >
                    Submit FeedBack
                  </Button>
                </>
              )}
            </Card>
          </>
        ))}
    </Base>
  );
};
