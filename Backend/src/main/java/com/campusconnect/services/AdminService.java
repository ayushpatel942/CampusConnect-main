package com.campusconnect.services;

import com.campusconnect.dto.AdminDto;
import com.campusconnect.entities.Admin;
import com.campusconnect.entities.Mail;
import jdk.dynalink.linker.LinkerServices;

import java.util.List;

public interface AdminService {

    public void sendMail(String mail, Mail mailStructure);
    public AdminDto createAdmin(AdminDto admindto);
    public AdminDto updateAdmin(AdminDto admindto);
    public AdminDto deleteAdmin(AdminDto admindto);

    public List<Admin> getClubIds();

    public AdminDto changeStatus(Long clubId,String status);

    public String checkStatus(Long clubId);
}