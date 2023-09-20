package com.wellsfargo.loanManagementSystem.service;

import com.wellsfargo.loanManagementSystem.model.EmployeeIssueDetails;
import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.model.ItemMaster;
import com.wellsfargo.loanManagementSystem.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemCardService {
    @Autowired
    private ItemRepository itemRepo;

    public void addItemData(ItemMaster itemMaster){
        itemRepo.save(itemMaster);
    }

    public void applyLoan(ItemMaster itemMaster, EmployeeIssueDetails employeeIssueDetails){

    }


    public List<ItemMaster> getItemData(){
        return itemRepo.findAll();
    }
}
