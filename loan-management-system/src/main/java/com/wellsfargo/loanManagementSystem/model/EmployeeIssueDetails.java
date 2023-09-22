package com.wellsfargo.loanManagementSystem.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
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
    private  String issueId;

    @ManyToOne
    private EmployeeMaster employeeId;
    @ManyToOne
    private ItemMaster itemId;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate issueDate;

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate returnDate;
}
