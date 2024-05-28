package com.campusconnect.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@RequiredArgsConstructor
public class Club {
    @Id
    @Column(name = "Club_Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clubId;

    @Column(name = "Club_Name")
    private String clubName;

    @Column(name = "Mentor_Name")
    private String mentor;

    @Column(name = "Email")
    private String clubEmail;

    @Column(name = "Password")
    private String clubPassword;

    @Column(name = "Description")
    private String description;

    @Column(name = "Department")
    private String dept;

    @Column(name="President")
    private String president;

    @Column(name = "Logo_link", length = Integer.MAX_VALUE)
    private String logo;

    @OneToMany(mappedBy = "club", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Event> eventList = new ArrayList<>();

}
