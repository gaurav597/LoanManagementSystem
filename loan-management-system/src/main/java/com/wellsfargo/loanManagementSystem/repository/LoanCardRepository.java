package com.wellsfargo.loanManagementSystem.repository;

import com.wellsfargo.loanManagementSystem.model.EmployeeCardDetails;
import com.wellsfargo.loanManagementSystem.model.LoanCardAndEmpCardProjection;
import com.wellsfargo.loanManagementSystem.model.LoanCardMaster;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "loancards", path = "loancards")
public interface LoanCardRepository extends JpaRepository<LoanCardMaster, String> {

	@Query("SELECT new com.wellsfargo.loanManagementSystem.model.LoanCardAndEmpCardProjection"
			+ "(l.loanId,l.loanType,l.durationInYears," 
			+ "e.cardIssueDate)"
			+ "FROM LoanCardMaster l JOIN l.loanEmpCardDetails e where e.employeeId = :employeeId")
	List<LoanCardAndEmpCardProjection> findSelectedFieldsFromLoanAndEmpCards(@Param("employeeId") String employeeId);
}
