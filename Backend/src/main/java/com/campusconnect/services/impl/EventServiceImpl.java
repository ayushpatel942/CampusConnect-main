package com.campusconnect.services.impl;

import com.campusconnect.dto.EventDto;
import com.campusconnect.dto.StudentDto;
import com.campusconnect.entities.Club;
import com.campusconnect.entities.Event;
import com.campusconnect.entities.Student;
import com.campusconnect.repositories.ClubRepo;
import com.campusconnect.repositories.EventRepo;
import com.campusconnect.repositories.StudentRepo;
import com.campusconnect.services.EventService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepo eventRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private ClubRepo clubRepo;

    @Autowired
    @Qualifier("modelMapper")
    private ModelMapper model;
    @Override
    public EventDto createEvent(EventDto eventDto,Long clubId)
    {
        Club club = this.clubRepo.findById(clubId).orElseThrow();
        Event event = model.map(eventDto,Event.class);
        event.setClub(club);
        Event event1 = this.eventRepo.save(event);
//        System.out.println(event1.getEventTime());
        return this.model.map(event1,EventDto.class);
    }

    @Override
    public EventDto updateEvent(EventDto eventDto, Long eventId) {
        Event event = this.eventRepo.findById(eventId).orElseThrow();
        event.setEventName(eventDto.getEventName() == null ? event.getEventName() : eventDto.getEventName());
        event.setEventDate(eventDto.getEventDate() == null ? event.getEventDate() : eventDto.getEventDate());
        event.setEventTime(eventDto.getEventTime() == null ? event.getEventTime() : eventDto.getEventTime());
        event.setEventVenue(eventDto.getEventVenue() == null ? event.getEventVenue() : eventDto.getEventVenue());
        event.setDescription(eventDto.getDescription() == null ? event.getDescription() : eventDto.getDescription());
        event.setBrochure(eventDto.getBrochure() == null ? event.getBrochure() : eventDto.getBrochure());
        Event updatedEvent = this.eventRepo.save(event);
        return this.model.map(updatedEvent,EventDto.class);
    }

    @Override
    public void deleteEvent(Long eventId)
    {
        this.eventRepo.findById(eventId)
                .orElseThrow();

       this.eventRepo.deleteById(eventId);
    }

    @Override
    public List<Event> getAllEventsByClub(Long clubId) {

        Club club = this.clubRepo.findById(clubId).orElseThrow();
        List<Event> eventList = club.getEventList();
        return eventList;
    }

    @Override
    public List<Event> getEventsBWDate(Date date1, Date date2) {
        return eventRepo.getEventsBWDate(date1,date2);
    }

    @Override
    public List<Event> getAllEvent(){
        return eventRepo.getAllEvent();
    }

    @Override
    public List<Event> getUpcomingEvent() {
        Date date = new Date();
        List<Event> upcomingEvents = this.eventRepo.getUpcomingEvents(date);

        return upcomingEvents;
    }

    @Override
    public Event getEventbyId(Long eventId) {
        Event event = this.eventRepo.findById(eventId).orElseThrow();
//        System.out.println(event.getClub().getClubId());
        return event;
    }

    @Override
    public Event addStudent(String studentEmail, Long eventId) {
        Event event = eventRepo.findById(eventId).orElseThrow();

        Student student = studentRepo.findStudentByStudentEmail(studentEmail);

        List<Student> studentList = event.getStudent();
        studentList.add(student);
        event.setStudent(studentList);

        List<Event> eventList = student.getEventList();
        eventList.add(event);
        student.setEventList(eventList);

        eventRepo.save(event);
        studentRepo.save(student);

        return event;
    }
}
