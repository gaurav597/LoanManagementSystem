package com.wellsfargo.loanManagementSystem.repository;

import com.wellsfargo.loanManagementSystem.model.LoanCardAndEmpCardProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanCardAndEmpCardProjectionRepository extends JpaRepository<LoanCardAndEmpCardProjection, String> {

}
