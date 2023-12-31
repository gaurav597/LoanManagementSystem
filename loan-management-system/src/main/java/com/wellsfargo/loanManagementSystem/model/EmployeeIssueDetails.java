package com.wellsfargo.loanManagementSystem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeIssueDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long issueId;

    @ManyToOne
    @JsonIgnore
    private EmployeeMaster employeeId;

    @ManyToOne
    @JsonIgnore
    private ItemMaster itemId;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate issueDate;

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate returnDate;

//    public EmployeeIssueDetails(){
//        this.issueId = "123";
//    }

}
