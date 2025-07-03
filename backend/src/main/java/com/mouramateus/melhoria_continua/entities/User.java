package com.mouramateus.melhoria_continua.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Profile profile;

    private String resetToken;
    private LocalDateTime resetTokenExpiryDate;

    @ManyToOne
    @JoinColumn(name = "sector_id")
    private Sector sector;

    public User() {
    }

    public User(String name, String email, String password, Profile profile) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.profile = profile;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public LocalDateTime getResetTokenExpiryDate() {
        return resetTokenExpiryDate;
    }

    public void setResetTokenExpiryDate(LocalDateTime resetTokenExpiryDate) {
        this.resetTokenExpiryDate = resetTokenExpiryDate;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public Sector getSector() {
        return sector;
    }

    public void setSector(Sector sector) {
        this.sector = sector;
    }
}
