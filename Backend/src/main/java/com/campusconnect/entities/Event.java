package com.campusconnect.entities;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Time;
import java.util.Date;
import java.util.List;

@Entity
@Setter
@Getter
@RequiredArgsConstructor
@JsonIgnoreProperties({"club"})
public class Event {
    @Id
    @Column(name = "Event_Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    @Column(name = "Event_Name")
    private String eventName;

    @Column(name = "Event_Date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date eventDate;

    @Column(name = "Event_Time")
    @DateTimeFormat(pattern = "HH:mm:ss")
    private Time eventTime;

    @Column(name = "Event_Venue")
    private String eventVenue;

    @Column(name = "Event_Description")
    private String description;

    @Column(name = "Event_Link")
    private String eventLink;

    @Column(name = "Brochure")
    private String brochure;

    @ManyToOne
    @JoinColumn(name = "Club_FK")
    @JsonBackReference
    private Club club;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Student> student;
}
