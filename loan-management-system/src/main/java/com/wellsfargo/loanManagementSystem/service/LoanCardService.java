package com.wellsfargo.loanManagementSystem.service;

import com.wellsfargo.loanManagementSystem.model.LoanCardMaster;
import com.wellsfargo.loanManagementSystem.repository.LoanCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoanCardService {

    @Autowired
    private LoanCardRepository loanRepo;

    public void addLoanCard(LoanCardMaster l){
        loanRepo.save(l);
    }
}
