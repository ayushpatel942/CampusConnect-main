package com.campusconnect.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@RequiredArgsConstructor
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Admin_Id")
    private Long Id;

    @Column(name = "Club_Id")
    private Long clubId;

    @Column
    private String clubStatus;
}
