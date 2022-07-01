package com.example.fichier.download.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.fichier.download.model.User;


@Repository
public interface UserRepo extends JpaRepository<User, String >{
	User findByEmail(String email);

}
