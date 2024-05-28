import { useEffect, useState } from "react";
import Base from "../components/Base";
import {
  Box,
  Center,
  Image,
  Flex,
  Card,
  Text,
  Button,
  Input,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import {
  EventsBWDate,
  LoadAllEvents,
  SearchPost,
  UpcomingEvents,
} from "../services/event-service";
import { Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { EventCard } from "../components/EventCard";
import "./search.css";

const Event = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [events, setEvents] = useState([]);
  const [isUpcomingEvent, setIsUpcomingEvent] = useState(false);

  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setIsUpcomingEvent(event.target.checked);

    if (!isUpcomingEvent) {
      console.log("handleCheckboxChange");
      UpcomingEvents()
        .then((response) => {
          console.log("then ----", response);
          setEvents([...response]);
        })
        .catch((error) => {
          console.log("Error loading events:", error);
        });
    } else {
      handleClearFilter();
    }
  };

  useEffect(() => {
    LoadAllEvents()
      .then((response) => {
        setEvents([...response]);
      })
      .catch((error) => {
        console.error("Error loading events:", error);
      });
  }, []);

  const printDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const handleDateFilter = () => {
    EventsBWDate(fromDate, toDate)
      .then((response) => {
        setEvents([...response]);
      })
      .catch((error) => {
        console.log("Error loading events bw date", error);
      });
  };

  const handleClearFilter = () => {
    setFromDate("");
    setToDate("");
    setIsUpcomingEvent(false);
    LoadAllEvents()
      .then((response) => {
        setEvents([...response]);
      })
      .catch((error) => {
        console.error("Error loading events:", error);
      });
  };

  const handleClick = (eventId) => {
    navigate("/eventDashBoard", { state: { event_Id: eventId } });
  };

  const search = () => {
    console.log(query);
    SearchPost(query)
      .then((response) => {
        console.log(response);

        let text = `<div class='list-group'>`;

        response.forEach((event) => {
          text += `<a href='/eventdetails/${event.eventId}' class='list-group-item list-group-action'>${event.eventName}</a>`;
        });

        text += "</div>";

        setSearchResult(text);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Base>
      <Flex direction="row" maxW="100%">
        <Box w="200px" p="4" bg="gray.200">
          <Text>Filter Options</Text>
          <Checkbox checked={isUpcomingEvent} onChange={handleCheckboxChange}>
            Upcoming Event
          </Checkbox>
          {isUpcomingEvent ? (
            <Input
              id="fromDate"
              type="date"
              placeholder="Start Date"
              value={fromDate}
              mt="2"
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setFromDate(e.target.value)}
            />
          ) : (
            <Input
              id="fromDate"
              type="date"
              placeholder="Start Date"
              value={fromDate}
              mt="2"
              onChange={(e) => setFromDate(e.target.value)}
            />
          )}
          <Input
            id="toDate"
            type="date"
            placeholder="End Date"
            value={toDate}
            mt="2"
            min={fromDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <Button
            mt="2"
            _hover={{ bg: "blue.500", color: "white" }}
            onClick={handleDateFilter}
          >
            Apply
          </Button>
          <Button
            mt="2"
            _hover={{ bg: "blue.500", color: "white" }}
            onClick={handleClearFilter}
          >
            Clear Filters
          </Button>
        </Box>

        <Flex direction="column" flex="1" p="4">
          <div class="search-container">
            <InputGroup width="100%" mb={1}>
              <InputLeftElement
                pointerEvents="none"
                children={<FaSearch color="gray.300" />}
              />
              <Input
                onKeyUp={search}
                id="search-input"
                value={query}
                class="form-"
                type="text"
                placeholder="Search Events here..."
                borderRadius={4}
                bg="white"
                borderColor="black"
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
            {query && (
              <div
                class="search-result"
                dangerouslySetInnerHTML={{ __html: searchResult }}
              ></div>
            )}
          </div>
          {events.map((event) => (
            <EventCard event={event} />
          ))}
        </Flex>
      </Flex>
    </Base>
  );
};

export default Event;
