package com.wellsfargo.loanManagementSystem.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class EmployeeCardDetails {
    @Id
    @Column(nullable = false)
    private String cardId;
    @ManyToOne
    private EmployeeMaster employeeId;
    @ManyToOne
    private LoanCardMaster loanId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate cardIssueDate;
}
