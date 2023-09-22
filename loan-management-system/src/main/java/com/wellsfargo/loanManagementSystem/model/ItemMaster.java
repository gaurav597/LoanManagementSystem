package com.wellsfargo.loanManagementSystem.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemMaster {
    @Id
    private String itemId;
    private String itemDescription;
    private char issueStatus;
    private String itemMake;

    private String itemCategory;
    private Integer itemValuation;
    @OneToMany(mappedBy = "itemId")
    private List<EmployeeIssueDetails> employeeIssueDetails ;

    public void addIssue(EmployeeIssueDetails employeeIssueDetails){
        if(this.employeeIssueDetails!= null)
            this.employeeIssueDetails.add(employeeIssueDetails);
        else
            this.employeeIssueDetails = new ArrayList<EmployeeIssueDetails>();
    }
}
