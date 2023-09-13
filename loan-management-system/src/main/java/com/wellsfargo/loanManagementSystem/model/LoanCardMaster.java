package com.wellsfargo.loanManagementSystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class LoanCardMaster {
    @Id
    private String loanId;
    private String loanType;
    private Integer durationInYears;
    @OneToMany(mappedBy = "loanId")
    private List<EmployeeCardDetails> loanEmpCardDetails;
}
