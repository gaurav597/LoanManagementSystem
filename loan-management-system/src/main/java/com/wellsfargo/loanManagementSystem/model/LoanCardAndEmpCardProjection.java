package com.wellsfargo.loanManagementSystem.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LoanCardAndEmpCardProjection {
	
	private String loanId;
	private String loanType;
	private Integer durationInYears;
	private LocalDate cardIssueDate;
	
}
