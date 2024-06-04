package com.campusconnect.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
@RequiredArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Student_Id")
    private Long studentId;

    @Column(name = "Student_name")
    private String studentName;

    @Column(name = "Student_Email")
    private String studentEmail;

    @Column(name = "Student_Username")
    private String studentUsername;

    @Column(name = "Student_Password")
    private String studentPassword;

    @Column(name = "Semester")
    private String studentSem;

    @Column(name = "Department")
    private String studentDept;

    @Column
    @ElementCollection
    private List<Long> eventIds;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Event> eventList;
}
