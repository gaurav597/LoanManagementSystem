package com.wellsfargo.loanManagementSystem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
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
    @OneToMany(mappedBy = "loanId",cascade = CascadeType.ALL)
    private List<EmployeeCardDetails> loanEmpCardDetails;
}
