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
import java.util.Optional;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

@Service
public class LoanCardService {

	@Autowired
	private LoanCardRepository loanRepo;

    public Optional<LoanCardMaster> getLoanCard(String id)
    {
        return loanRepo.findById(id); //Invokes custom method
    }

    public LoanCardMaster addLoanCard(LoanCardMaster l){
        return loanRepo.save(l);
    }

    public List<LoanCardMaster> getLoanCardData(){
        return loanRepo.findAll();
    }

    public void deleteLoanCard(String loanId){
        loanRepo.deleteById(loanId);
    }

	@Autowired
	private ItemRepository itemRepo;

	@Autowired
	private EmployeeIssueDetailsRepository issueRepo;
	
	public Optional<LoanCardMaster> getLoanCardById(String id){
		return loanRepo.findById(id);
	}
	public List<LoanCardAndEmpCardProjection> getLoanInfo(String id){
		return loanRepo.findSelectedFieldsFromLoanAndEmpCards(id);
	}

	@Autowired
	EmployeeRepository eRepo;
	
	@Autowired
	EmployeeCardDetailsRepository eCardrepo;

	@Autowired
	LoanCardAndEmpCardProjectionRepository laeRepo;

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

//		List<EmployeeIssueDetails> eissuelist = i.getEmployeeIssueDetails();
//		eissuelist.add(eissue);
//		i.setEmployeeIssueDetails(eissuelist);
//		itemRepo.save(i);

		List<EmployeeIssueDetails> eissuelist1 = e.getEmployeeIssueDetailsList();
		eissuelist1.add(eissue);
		e.setEmployeeIssueDetailsList(eissuelist1);
		eRepo.save(e);


		EmployeeCardDetails ecard = new EmployeeCardDetails();
		ecard.setCardId((String)payload.get("issueId"));
		EmployeeMaster e1 = eRepo.findById((String) payload.get("employeeId"))
				.orElseThrow(() -> new ResourceNotFoundException("item not there"));
		ecard.setEmployeeId(e1);
		ecard.setCardIssueDate(LocalDate.now());
		LoanCardMaster l = loanRepo.getLoanCard((String) payload.get("itemCategory")).get(0);
		ecard.setLoanId(l);
		eCardrepo.save(ecard);

		List<EmployeeCardDetails> ecardlist = e1.getEmployeeCardDetailsList();
		ecardlist.add(ecard);
		e1.setEmployeeCardDetailsList(ecardlist);
		eRepo.save(e1);
		List<EmployeeCardDetails> ecardlist2 = l.getLoanEmpCardDetails();
		ecardlist2.add(ecard);
		l.setLoanEmpCardDetails(ecardlist2);
		loanRepo.save(l);
		LoanCardAndEmpCardProjection lae = new LoanCardAndEmpCardProjection();
		lae.setLoanId(l.getLoanId());
		lae.setLoanType(l.getLoanType());
		lae.setCardIssueDate(ecard.getCardIssueDate());
		lae.setDurationInYears(l.getDurationInYears());
		laeRepo.save(lae);
	}
	}
