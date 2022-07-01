package com.example.fichier.download.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fichier.download.model.User;
import com.example.fichier.download.repo.UserRepo;



@RestController
@RequestMapping("./users")
@CrossOrigin(origins= "http://localhost:4200")

public class UserController {
	
	@Autowired
	private UserRepo repo;


	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody User userData) {
		System.out.println(userData);
		User user=repo.findByEmail(userData.getEmail());
		if(user.getPassword().equals(userData.getPassword()))
			return ResponseEntity.ok(user);
		
		return (ResponseEntity<?>) ResponseEntity.internalServerError() ;
	
}
	}
