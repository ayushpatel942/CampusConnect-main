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

    @Column(name = "Admin_name")
    private String Name;

    @Column(name = "Admin_Email")
    private String Email;

    @Column(name = "Admin_Username")
    private String Username;

    @Column(name = "Admin_Password")
    private String Password;

    @Column(name = "Club_Email")
    private String clubEmail;

    @Column
    private String clubStatus;
}
