package com.campusconnect.services.impl;

import com.campusconnect.dto.AdminDto;
import com.campusconnect.entities.Admin;
import com.campusconnect.entities.Club;
import com.campusconnect.entities.Mail;
import com.campusconnect.repositories.AdminRepo;
import com.campusconnect.repositories.ClubRepo;
import com.campusconnect.services.AdminService;
import jakarta.persistence.EntityNotFoundException;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private ClubRepo clubRepo;

    @Autowired
    @Qualifier("modelMapper")
    private ModelMapper model;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromMail;

    @Override
    public void sendMail(String mail, Mail mailStructure)
    {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        simpleMailMessage.setFrom(fromMail);
        simpleMailMessage.setSubject(mailStructure.getSubject());
        simpleMailMessage.setText(mailStructure.getMessage());
        simpleMailMessage.setTo(mail);

        mailSender.send(simpleMailMessage);
    }

    @Override
    public AdminDto createAdmin(AdminDto admindto) {
        Admin admin = model.map(admindto,Admin.class);
        Admin admin1 = adminRepo.save(admin);
        return model.map(admin1, AdminDto.class);
    }

    @Override
    public AdminDto updateAdmin(AdminDto admindto) {
        return null;
    }


    @Override
    public AdminDto deleteAdmin(AdminDto admindto) {
        return null;
    }

    @Override
    public List<Admin> getClubIds() {
        List<Admin> adminList = adminRepo.getAllAdmin();
        return adminList;
    }

//    @Override
//    public AdminDto changeStatus(Long clubId,String status) {
////        System.out.println(clubEmail);
//        Admin admin = adminRepo.findAdminByClubId(clubId);
//
//
//        admin.setClubStatus(status);
//
//        if(status.equals("rejected"))
//        {
//            adminRepo.deleteByClubId(clubId);
//            clubRepo.deleteById(clubId);
//        }
//
//        adminRepo.save(admin);
//
//        return model.map(admin,AdminDto.class);
//    }

    @Transactional
    @Override
    public AdminDto changeStatus(Long clubId, String status) {
        Admin admin = adminRepo.findAdminByClubId(clubId);

        if (admin == null) {
            throw new EntityNotFoundException("Admin not found with clubId: " + clubId);
        }

        admin.setClubStatus(status);

        if ("rejected".equals(status)) {
            adminRepo.deleteByClubId(clubId);
            clubRepo.deleteById(clubId);
        } else {
            adminRepo.save(admin);
        }

        return model.map(admin, AdminDto.class);
    }

    @Override
    public String checkStatus(Long clubId) {

        return adminRepo.findAdminByClubId(clubId).getClubStatus();
    }
}