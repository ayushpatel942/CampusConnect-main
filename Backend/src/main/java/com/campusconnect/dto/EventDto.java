package com.campusconnect.dto;

import com.campusconnect.entities.Club;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import java.sql.Time;
import java.util.Date;

@Getter
@Setter
public class EventDto
{
    private Long eventId;

    private String eventName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date eventDate;


    @DateTimeFormat(pattern = "HH:mm:ss")
    private Time eventTime;

    private String eventVenue;

    private String description;

    private String brochure;

    private String eventLink;

    private ClubDto club    ;
}
