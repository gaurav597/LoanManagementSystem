package com.wellsfargo.loanManagementSystem.service;

import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.model.LoanCardMaster;
import com.wellsfargo.loanManagementSystem.repository.LoanCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
}
