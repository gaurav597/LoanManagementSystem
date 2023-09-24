package com.wellsfargo.loanManagementSystem.repository;

import com.wellsfargo.loanManagementSystem.model.EmployeeCardDetails;
import com.wellsfargo.loanManagementSystem.model.LoanCardAndEmpCardProjection;
import com.wellsfargo.loanManagementSystem.model.LoanCardMaster;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanCardRepository extends JpaRepository<LoanCardMaster, String> {

	@Query("SELECT new com.wellsfargo.loanManagementSystem.model.LoanCardAndEmpCardProjection"
			+ "(l.loanId,l.loanType,l.durationInYears," + "e.cardIssueDate,e.employeeId)"
			+ "FROM LoanCardMaster l JOIN l.loanEmpCardDetails e "
//			"WHERE e.employeeId=:employeeId"
			)
	List<LoanCardAndEmpCardProjection> findSelectedFieldsFromLoanAndEmpCards(@Param("employeeId") String employeeId);

//	@Query("SELECT new com.wellsfargo.loanManagementSystem.model.LoanCardMaster"
//			+ "(l.loanId,l.loanType,l.durationInYears)" 
//			+ "FROM LoanCardMaster l")
//	Optional<LoanCardMaster> findSelectedFieldsFromLoanAndEmpCards();

//	@Query("SELECT *"
//	+ "FROM LoanCardMaster l  where l.loanType = :loanType")
//    List<LoanCardMaster> findByLoanType(@Param("loanType") String loanType);

	@Query(value = "SELECT * FROM LOAN_CARD_MASTER  WHERE LOAN_TYPE= :loanType", nativeQuery = true)
	List<LoanCardMaster> getLoanCard(@Param("loanType") String loanType);
}
