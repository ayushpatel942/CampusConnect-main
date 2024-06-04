package com.campusconnect.repositories;

import com.campusconnect.entities.Admin;
import com.campusconnect.entities.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdminRepo extends JpaRepository<Admin, Long> {
    @Query("SELECT a FROM Admin a")
    public List<Admin> getAllAdmin();

    public Admin findAdminByClubId(Long clubId);

    public void deleteByClubId(Long clubId);
}
