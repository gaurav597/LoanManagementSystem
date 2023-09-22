package com.wellsfargo.loanManagementSystem.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ManyToAny;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;

@Entity
@Data
public class EmployeeMaster {
    @Id
    private String employeeId;
    private String employeeName;
    private String password;
    private char gender;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfJoin;
    private String designation;
    private String department;
    @OneToMany(mappedBy = "employeeId")
    private List<EmployeeCardDetails> employeeCardDetailsList ;
    @OneToMany(mappedBy = "employeeId")
    private List<EmployeeIssueDetails> employeeIssueDetailsList;


    public void setPassword(String password) {
        Base64.Encoder encoder = Base64.getEncoder();
        String normalString = password;
        String encodedString = encoder.encodeToString(   // encrypt password in database field
                normalString.getBytes(StandardCharsets.UTF_8) );
        this.password = encodedString;
    }


}