package com.wellsfargo.loanManagementSystem.service;

import com.wellsfargo.loanManagementSystem.model.*;
import com.wellsfargo.loanManagementSystem.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class LoanCardService {

	@Autowired
	private LoanCardRepository loanRepo;

	@Autowired
	private ItemRepository itemRepo;

	@Autowired
	private EmployeeIssueDetailsRepository issueRepo;

	public void addLoanCard(LoanCardMaster l) {
		loanRepo.save(l);
	}

	public List<LoanCardMaster> getLoanCardData() {
		return loanRepo.findAll();
	}
	
	public List<LoanCardAndEmpCardProjection> getLoanInfo(String id){
		return loanRepo.findSelectedFieldsFromLoanAndEmpCards(id);
	}

	@Autowired
	EmployeeRepository eRepo;
	@Autowired
	EmployeeCardDetailsRepository eCardrepo;
	public void applyLoan(Map<String, Object> payload)throws Exception {
		EmployeeIssueDetails eissue= new EmployeeIssueDetails();
		eissue.setIssueId((String)payload.get("issueId"));
		ItemMaster i = itemRepo.findById((String) payload.get("itemId"))
				.orElseThrow(() -> new ResourceNotFoundException("item not there"));
		eissue.setItemId(i);
		EmployeeMaster e = eRepo.findById((String) payload.get("employeeId"))
				.orElseThrow(() -> new ResourceNotFoundException("item not there"));
		eissue.setEmployeeId(e);
		issueRepo.save(eissue);


		EmployeeCardDetails ecard = new EmployeeCardDetails();
		ecard.setCardId("123456");
		ecard.setCardIssueDate(LocalDate.now());
		eCardrepo.save(ecard);
//		LoanCardMaster l = loanRepo.findById("123")
//				.orElseThrow(() -> new ResourceNotFoundException("item not there"));
//		EmployeeCardDetails ecard = new EmployeeCardDetails("123",e,l,LocalDate.now());
//		ecard.setCardId((String)payload.get("issueId"));
//		ecard.setCardIssueDate(LocalDate.now());
//		LoanCardMaster l = loanRepo.findById("123")
//				.orElseThrow(() -> new ResourceNotFoundException("item not there"));
//		ecard.setLoanId(l);
//		eCardrepo.save(ecard);
//		System.out.println(ecard);

//		ecard.setCardId("1");
//		ecard.setEmployeeId(e);
//		ecard.setCardIssueDate(LocalDate.now());
////		LoanCardMaster l = loanRepo.findByLoanType((String) payload.get("itemCategory")).get(0);
////		ecard.setLoanId(l);
//		eCardrepo.save(ecard);




//		DateTimeFormatter formatter = new DateTimeFormatterBuilder()
//				.parseCaseInsensitive()
//				.appendPattern("yyyy-MM-dd")
//				.toFormatter(Locale.ENGLISH);
//
//
//		LocalDate issueDate = LocalDate.parse((String) payload.get("issueDate"), formatter);
//		LocalDate returnDate = LocalDate.parse((String) payload.get("returnDate"), formatter);
//		System.out.println(payload.get("itemDescription"));
//		System.out.println(payload);
//		ItemMaster itemMaster = new ItemMaster();
//		itemMaster.setItemId((String) payload.get("itemId"));
//		itemMaster.setItemDescription((String) payload.get("itemDescription"));
//		itemMaster.setIssueStatus(((String) payload.get("issueStatus")).charAt(0));
//		itemMaster.setItemMake((String) payload.get("itemMake"));
//		itemMaster.setItemValuation(Integer.parseInt((String) payload.get("itemValuation")));
//		itemMaster.setItemCategory((String) payload.get("itemCategory"));
//
//
//		EmployeeIssueDetails employeeIssueDetails = new EmployeeIssueDetails();
//		employeeIssueDetails.setIssueId((String) payload.get("issueId"));
//		employeeIssueDetails.setEmployeeId(employeeRepository.findById((String) payload.get("employeeId")).orElse(new EmployeeMaster()));
//		employeeIssueDetails.setItemId(itemRepo.findById((String) payload.get("itemId")).orElse(new ItemMaster()));
//		employeeIssueDetails.setIssueDate(issueDate);
//		employeeIssueDetails.setReturnDate(returnDate);
//		itemMaster.addIssue(employeeIssueDetails);
//		employeeIssueDetailsRepository.save(employeeIssueDetails);
//		itemRepo.save(itemMaster);

	}
	}
