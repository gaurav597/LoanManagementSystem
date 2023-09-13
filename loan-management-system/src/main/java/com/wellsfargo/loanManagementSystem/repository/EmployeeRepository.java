package com.wellsfargo.loanManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;

public interface EmployeeRepository extends JpaRepository<EmployeeMaster, Long> {

}
