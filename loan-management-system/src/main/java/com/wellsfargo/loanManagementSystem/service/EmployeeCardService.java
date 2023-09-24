package com.wellsfargo.loanManagementSystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.loanManagementSystem.model.EmployeeCardDetails;
import com.wellsfargo.loanManagementSystem.repository.EmployeeCardDetailsRepository;

@Service
public class EmployeeCardService {

	@Autowired
	private EmployeeCardDetailsRepository empCardRepo;

	public void addEmpCard(EmployeeCardDetails e) {
		empCardRepo.save(e);
	}


}
