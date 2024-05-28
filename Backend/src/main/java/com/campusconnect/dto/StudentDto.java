package com.campusconnect.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import com.campusconnect.entities.Event;
import java.util.List;

@Setter
@Getter
@RequiredArgsConstructor
public class StudentDto {
    private Long studentId;

    private String studentName;

    private String studentEmail;

    private String studentUsername;

    private String studentPassword;

    private String studentSem;

    private String studentDept;

    private List<Event> eventList;
}
