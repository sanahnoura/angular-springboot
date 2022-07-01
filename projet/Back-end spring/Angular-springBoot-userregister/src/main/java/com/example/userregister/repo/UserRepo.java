package com.example.userregister.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.userregister.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, String>{

}
