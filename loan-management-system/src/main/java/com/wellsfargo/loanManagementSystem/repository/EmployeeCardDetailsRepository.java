package com.wellsfargo.loanManagementSystem.repository;


import com.wellsfargo.loanManagementSystem.model.EmployeeCardDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "employeecarddetails", path = "employeecarddetails")

public interface EmployeeCardDetailsRepository extends JpaRepository<EmployeeCardDetails, String> {
}
