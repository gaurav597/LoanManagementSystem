package com.wellsfargo.loanManagementSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.service.EmployeeService;



@RestController
@RequestMapping(value="/api")
public class EmployeeController {
	
	@Autowired
	private EmployeeService eservice;
	
	@PostMapping("/employees")
	public EmployeeMaster saveEmp(@Validated @RequestBody EmployeeMaster emp) {
		EmployeeMaster e =eservice.saveEmp(emp);
		return e;
	}
	
	@GetMapping("/employees")
	public List <EmployeeMaster> getAllEmp() {
		return eservice.listAll();
	}
	
}

