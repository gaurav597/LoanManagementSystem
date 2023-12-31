package com.wellsfargo.loanManagementSystem.controller;

import com.wellsfargo.loanManagementSystem.exception.ResourceNotFoundException;
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
import java.util.Map;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api")
public class LoanCardController {

    @Autowired
    LoanCardService loanCardService;

    @PostMapping(value="/addLoanCard")
    public String addLoanCard(@Validated @RequestBody LoanCardMaster loanCardMaster) {
        loanCardService.addLoanCard(loanCardMaster);
        return "Loan card Added";
    }

/*****************************************************************************/
    @PostMapping("/addLoan")
    public ResponseEntity<String> addLoan(@Validated @RequestBody LoanCardMaster l)
    {
        try{
        	LoanCardMaster loan = loanCardService.addLoanCard(l);
            if(loan!=null)
            {
                return ResponseEntity.ok("Added loan successfully.");
            }
            else
            {
                return ResponseEntity.badRequest().body("Couldn't add loan.");
            }
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error ocurred: "+e.getMessage());
        }
    }

    @GetMapping("/getLoan")
    public ResponseEntity<List<LoanCardMaster>> getLoan()
    {
		try
		{
	        List<LoanCardMaster> loans = loanCardService.getLoanCardData();
			return ResponseEntity.ok(loans);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
    }
 

    @DeleteMapping("/deleteLoan/{loanId}")
    public String deleteLoan(@PathVariable String loanId){
        loanCardService.deleteLoanCard(loanId);
        return "Loan Deleted";
    }
 
	@GetMapping("/getLoan/{id}")
	public ResponseEntity<LoanCardMaster> getLoanById(@PathVariable(value="id") String loanId) throws ResourceNotFoundException
	{
		LoanCardMaster l = loanCardService.getLoanCard(loanId).orElseThrow(()->new ResourceNotFoundException("Loan not found for this Id: "+loanId));
		return ResponseEntity.ok().body(l);
	}

	 //Open PostMan, make a PUT Request - http://localhost:8085/ims/api/products/1003
    //Select body -> raw -> JSON 
    //Update JSON product object with new Values.
	@PutMapping("/addLoan/{id}")
	public ResponseEntity<LoanCardMaster> updateLoan(@PathVariable(value="id") String loanId, @Validated @RequestBody LoanCardMaster l) throws ResourceNotFoundException
	{
		LoanCardMaster loan = loanCardService.getLoanCard(loanId).orElseThrow(()->new ResourceNotFoundException("Loan not found for this Id: "+loanId));

		//Update product with new values
		loan.setLoanType(l.getLoanType());
		loan.setDurationInYears(l.getDurationInYears());

		final LoanCardMaster updatedLoan = loanCardService.addLoanCard(loan);
		return ResponseEntity.ok().body(updatedLoan);
	}

	@Autowired
	EmployeeCardService empCardService;

	@GetMapping("/getLoanData")
	public ResponseEntity<List<LoanCardMaster>> getCustomer() {
		List<LoanCardMaster> l = loanCardService.getLoanCardData();
		return new ResponseEntity<List<LoanCardMaster>>(l, HttpStatus.OK);
	}

	@PostMapping(value="/applyLoan")
	public String applyLoan(@RequestBody Map<String, Object> payload) throws Exception{
		System.out.println(payload);
		loanCardService.applyLoan(payload);
//		itemCardService.applyLoan(payload);
		return "loan applied";
	}

	@PostMapping(value = "/addEmpCardDetails")
	public String addEmpCardDetails(@Validated @RequestBody EmployeeCardDetails empCard) {
		empCardService.addEmpCard(empCard);
		return "Employee Card Details Added";
	}

	@GetMapping("/getEmpLoanData/{id}")
	public ResponseEntity<List<LoanCardAndEmpCardProjection>> getLoanInfo(@PathVariable(value = "id") String id) {
		try {
			List<LoanCardAndEmpCardProjection> selectedFields = loanCardService.getLoanInfo(id);
			return ResponseEntity.ok(selectedFields);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/viewLoans/{id}")
	public ResponseEntity<LoanCardMaster> viewLoans(@PathVariable(value = "id") String id)
			throws ResourceNotFoundException {
		LoanCardMaster l = loanCardService.getLoanCardById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Not found"));
		return ResponseEntity.ok().body(l);

	}
}
