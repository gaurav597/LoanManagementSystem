package com.wellsfargo.loanManagementSystem.repository;


import com.wellsfargo.loanManagementSystem.model.EmployeeCardDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeCardDetailsRepository extends JpaRepository<EmployeeCardDetails, String> {
}
