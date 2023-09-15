package com.wellsfargo.loanManagementSystem.repository;

import com.wellsfargo.loanManagementSystem.model.EmployeeIssueDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "employeeissuedetails", path = "employeeissuedetails")
public interface EmployeeIssueDetailsRepository extends JpaRepository<EmployeeIssueDetails, String> {
}
