package com.wellsfargo.loanManagementSystem.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Admin {

    @Id
    private String adminId;
    private String password;
}
