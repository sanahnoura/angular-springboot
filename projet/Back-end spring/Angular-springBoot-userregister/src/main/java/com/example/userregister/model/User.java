package com.example.userregister.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="users")
public class User {
	
	

	@Id
	private String   idUsers;
	private String    prenom;
	private String  nom;
	private String   email;
	private String  adresse;
	private String  password;
	private String   bibliographie;
	private String activite;
	public String getIdUsers() {
		return idUsers;
	}
	public void setIdUsers(String idUsers) {
		this.idUsers = idUsers;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAdresse() {
		return adresse;
	}
	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getBibliographie() {
		return bibliographie;
	}
	public void setBibliographie(String bibliographie) {
		this.bibliographie = bibliographie;
	}
	public String getActivite() {
		return activite;
	}
	public void setActivite(String activite) {
		this.activite = activite;
	}

   
}
