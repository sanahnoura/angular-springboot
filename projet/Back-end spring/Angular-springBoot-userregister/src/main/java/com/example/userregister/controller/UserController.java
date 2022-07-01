package com.example.userregister.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.userregister.model.User;
import com.example.userregister.repo.UserRepo;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	@Autowired
	private UserRepo repo;
	
	@PostMapping("/user")
	public ResponseEntity<User> registerUser(@RequestBody User user) {
		
	 System.out.println("Controller called");
	 return ResponseEntity.ok(repo.save(user));
		
		
	}
}
