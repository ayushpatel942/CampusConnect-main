package com.campusconnect.services.impl;


import com.campusconnect.dto.ClubDto;
import com.campusconnect.dto.StudentDto;
import com.campusconnect.entities.Club;
import com.campusconnect.entities.Student;
import com.campusconnect.repositories.AdminRepo;
import com.campusconnect.repositories.ClubRepo;
import com.campusconnect.services.ClubService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClubServiceImpl implements ClubService {

    @Autowired
    private ClubRepo clubRepo;

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    @Qualifier("modelMapper")
    private ModelMapper model;

    @Override
    public ClubDto createClub(ClubDto clubDto) {
        Club club = this.model.map(clubDto,Club.class);
        Club club1 = this.clubRepo.save(club);
        return this.model.map(club1,ClubDto.class);
    }

    @Override
    public ClubDto updateClub(ClubDto clubDto,Long clubId) {
        System.out.println("hello "+clubId);
        Club club = this.clubRepo.findById(clubId).orElseThrow();
        club.setDept(clubDto.getDept() == null ? club.getDept() : clubDto.getDept());
        club.setMentor(clubDto.getMentor() == null ? club.getMentor() : clubDto.getMentor());
        club.setClubName(clubDto.getClubName() == null ? club.getClubName() : clubDto.getClubName());
        club.setPresident(clubDto.getPresident() == null ? club.getPresident() : clubDto.getPresident());
        club.setDescription(clubDto.getDescription() == null ? club.getDescription() : clubDto.getDescription());
        club.setClubEmail(clubDto.getClubEmail() == null ? club.getClubEmail() : clubDto.getClubEmail());
        Club club1 = this.clubRepo.save(club);
        System.out.println(club1.getClubEmail());
        return this.model.map(club1,ClubDto.class);
    }

    @Override
    public void deleteClub(Long clubId) {
        this.clubRepo.findById(clubId)
                .orElseThrow();
        this.adminRepo.deleteByClubId(clubId);
        this.clubRepo.deleteById(clubId);
    }

    @Override
    public ClubDto getClubById(Long clubId) {
        Club club = this.clubRepo.findById(clubId).orElseThrow();
        return this.model.map(club,ClubDto.class);
    }

    @Override
    public List<Club> getAllClub() {
        return clubRepo.getAllClub();
    }

    @Override
    public ClubDto loginClub(String username, String password) {
        System.out.println(username);
        Club club = clubRepo.findClubByClubEmailAndClubPassword(username,password);
        System.out.println(club);

        return model.map(club,ClubDto.class);
    }

    @Override
    public ClubDto getClubIdByEmailAndPassword(String email, String password) {

        Club club = clubRepo.findClubByClubEmailAndClubPassword(email,password);

        return model.map(club,ClubDto.class);
    }


}
