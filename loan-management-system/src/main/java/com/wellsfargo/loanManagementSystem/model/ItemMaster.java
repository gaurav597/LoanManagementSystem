package com.wellsfargo.loanManagementSystem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
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


//    @OneToMany(mappedBy = "itemId", cascade = CascadeType.ALL)
//    private List<EmployeeIssueDetails> employeeIssueDetails ;


}
