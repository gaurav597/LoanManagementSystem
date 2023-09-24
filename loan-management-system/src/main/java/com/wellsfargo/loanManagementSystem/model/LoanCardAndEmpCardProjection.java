package com.wellsfargo.loanManagementSystem.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LoanCardAndEmpCardProjection {
	@Id
	private String loanId;
	private String loanType;
	private Integer durationInYears;
	private LocalDate cardIssueDate;
	private String employeeId;
	
	public LoanCardAndEmpCardProjection( String loanId, String loanType, Integer durationInYears, LocalDate cardIssueDate, EmployeeMaster employeeId) {
		this.loanId=loanId;
		this.loanType=loanType;
		this.durationInYears=durationInYears;
		this.cardIssueDate=cardIssueDate;
		this.employeeId=employeeId.getEmployeeId();
	}
	
}
