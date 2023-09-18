package com.wellsfargo.loanManagementSystem.controller;

import com.wellsfargo.loanManagementSystem.model.LoanCardMaster;
import com.wellsfargo.loanManagementSystem.service.LoanCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api")
public class LoanCardController {

    @Autowired
    LoanCardService loanCardService;

    @PostMapping(value="/addLoanCard")
    public String addLoanCard(@Validated @RequestBody LoanCardMaster loanCardMaster) {
        loanCardService.addLoanCard(loanCardMaster);
        return "Loan card Added";
    }


}
