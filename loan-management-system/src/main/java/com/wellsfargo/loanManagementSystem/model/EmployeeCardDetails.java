package com.wellsfargo.loanManagementSystem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeCardDetails {
    @Id
    @Column(nullable = false)
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String cardId;


    @ManyToOne
    @JsonIgnore
    private EmployeeMaster employeeId;
    


    @ManyToOne
    @JsonIgnore
    private LoanCardMaster loanId;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate cardIssueDate;

//    public EmployeeCardDetails(){
//        this.cardId = "Ol";
//    }

}
