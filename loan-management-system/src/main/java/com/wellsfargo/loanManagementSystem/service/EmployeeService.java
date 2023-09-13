package com.wellsfargo.loanManagementSystem.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.repository.EmployeeRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class EmployeeService {

	@Autowired
	private EmployeeRepository erepo;
	
	public EmployeeMaster saveEmp(EmployeeMaster e) {
		return erepo.save(e);
	}
	
	public List<EmployeeMaster> listAll(){
		return erepo.findAll();
	}
}
