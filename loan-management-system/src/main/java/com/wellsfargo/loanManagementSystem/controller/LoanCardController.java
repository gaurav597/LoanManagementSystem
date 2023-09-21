package com.wellsfargo.loanManagementSystem.controller;

import com.wellsfargo.loanManagementSystem.model.EmployeeCardDetails;
import com.wellsfargo.loanManagementSystem.model.EmployeeIssueDetails;
import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.model.ItemMaster;
import com.wellsfargo.loanManagementSystem.model.LoanCardAndEmpCardProjection;
import com.wellsfargo.loanManagementSystem.model.LoanCardMaster;
import com.wellsfargo.loanManagementSystem.service.EmployeeCardService;
import com.wellsfargo.loanManagementSystem.service.ItemCardService;
import com.wellsfargo.loanManagementSystem.service.LoanCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api")
public class LoanCardController {

	@Autowired
	LoanCardService loanCardService;

	@Autowired
	ItemCardService itemCardService;

	@Autowired
	EmployeeCardService empCardService;

	@PostMapping(value = "/addLoanCard")
	public String addLoanCard(@Validated @RequestBody LoanCardMaster loanCardMaster) {
		loanCardService.addLoanCard(loanCardMaster);
		return "Loan card Added";
	}

	@PostMapping(value = "/addItemData")
	public String addItemData(@Validated @RequestBody ItemMaster itemMaster) {
		itemCardService.addItemData(itemMaster);
		return "Item added";
	}

	@GetMapping("/getLoanData")
	public ResponseEntity<List<LoanCardMaster>> getCustomer() {
		List<LoanCardMaster> l = loanCardService.getLoanCardData();
		return new ResponseEntity<List<LoanCardMaster>>(l, HttpStatus.OK);
	}

	@GetMapping("/getItemData")
	public ResponseEntity<List<ItemMaster>> getItem() {
		List<ItemMaster> i = itemCardService.getItemData();
		return new ResponseEntity<List<ItemMaster>>(i, HttpStatus.OK);
	}

	@PostMapping(value = "/applyLoan")
	public String applyLoan(@Validated @RequestBody ItemMaster itemMaster, EmployeeIssueDetails employeeIssueDetails) {
		itemCardService.applyLoan(itemMaster, employeeIssueDetails);
		return "loan applied";
	}

	@PostMapping(value = "/addEmpCardDetails")
	public String addEmpCardDetails(@Validated @RequestBody EmployeeCardDetails empCard) {
		empCardService.addEmpCard(empCard);
		return "Employee Card Details Added";
	}

	@GetMapping("/getEmpLoanData/{id}")
	public ResponseEntity<List<LoanCardAndEmpCardProjection>> getLoanInfo(String id) {
		try {
			List<LoanCardAndEmpCardProjection> selectedFields = loanCardService.getLoanInfo(id);
			return ResponseEntity.ok(selectedFields);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

}
