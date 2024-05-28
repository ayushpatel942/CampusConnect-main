package com.campusconnect.controller;


import com.campusconnect.dto.AdminDto;
import com.campusconnect.dto.ClubDto;
import com.campusconnect.entities.Admin;
import com.campusconnect.entities.Club;
import com.campusconnect.entities.Mail;
import com.campusconnect.repositories.ClubRepo;
import com.campusconnect.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class    AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
    private ClubRepo clubRepo;

    @PostMapping("/send/{mail}")
    public ResponseEntity<?> sendMail(@PathVariable String mail,@RequestBody Mail mailStructure)
    {
        System.out.println(mailStructure.getMessage());
        adminService.sendMail(mail,mailStructure);
        return new ResponseEntity<String>("Successfully set the mail!!",HttpStatus.OK);
    }

    @PostMapping("/")
    private ResponseEntity<?> createAdmin(@RequestBody AdminDto adminDto){
        AdminDto adminDto1 = adminService.createAdmin(adminDto);
        return new ResponseEntity<>(adminDto1, HttpStatus.CREATED);
    }

    @DeleteMapping("/")
    private ResponseEntity<?> deleteAdmin(@RequestBody AdminDto adminDto){
        AdminDto adminDto1 = adminService.deleteAdmin(adminDto);
        return new ResponseEntity<>(adminDto1, HttpStatus.CREATED);
    }

    @GetMapping("/clubs")
    private ResponseEntity<?> getClub()
    {
        List<Club> adminList = adminService.getClubEmails().stream()
                .filter(admin -> admin.getClubStatus().equals("pending"))
                .map(admin -> clubRepo.findClubByClubEmail(admin.getClubEmail()))
                .collect(Collectors.toList());


        return new ResponseEntity<List<Club>>(adminList,HttpStatus.OK);
    }

    @PutMapping("/changeStatus/{clubEmail}/{status}")
    private ResponseEntity<?> changeClubStatus(@PathVariable("clubEmail") String clubEmail,@PathVariable("status") String status)
    {
        System.out.println("changestutas is called");
        AdminDto adminDto = adminService.changeStatus(clubEmail,status);
        return new ResponseEntity<AdminDto>(adminDto,HttpStatus.OK);
    }

    @GetMapping("/checkStatus/{clubEmail}")
    private ResponseEntity<?> checkClubStatus(@PathVariable("clubEmail") String clubEmail)
    {
        String status = adminService.checkStatus(clubEmail);
        return new ResponseEntity<String>(status,HttpStatus.OK);
    }

}