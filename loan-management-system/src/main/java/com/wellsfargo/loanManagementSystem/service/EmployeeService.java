package com.wellsfargo.loanManagementSystem.service;

import com.wellsfargo.loanManagementSystem.model.EmployeeIssueDetails;
import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.model.ItemMaster;
import com.wellsfargo.loanManagementSystem.model.ItemPurchased;
import com.wellsfargo.loanManagementSystem.repository.EmployeeRepository;
import com.wellsfargo.loanManagementSystem.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private  EmployeeRepository erepo;

    @Autowired
    private ItemRepository itemRepo;

    public EmployeeMaster registerEmployee(EmployeeMaster e)
    {
        return erepo.save(e);
    }

    public Optional<EmployeeMaster> loginEmployee(String id)
    {
        return erepo.findById(id); //Invokes custom method
    }

    public void addEmployee(EmployeeMaster e){
        erepo.save(e);
    }

    public List<EmployeeMaster> getEmployee(){
        return erepo.findAll();
    }

    public void deleteEmployee(String empId){
        erepo.deleteById(empId);
    }

    public List<ItemPurchased> itemsPurchased(String empId){
        EmployeeMaster e = erepo.findById(empId)
                .orElseThrow(() -> new org.springframework.data.rest.webmvc.ResourceNotFoundException("Employee doesn't exist"));

        List<EmployeeIssueDetails> issueList = e.getEmployeeIssueDetailsList();

        List<ItemPurchased> itemPurchasedList = new ArrayList<>();
        for (EmployeeIssueDetails eIssue: issueList
             ) {
            ItemMaster item = itemRepo.findById(eIssue.getIssueId())
                    .orElseThrow(() -> new ResourceNotFoundException("item does not exist"));
            ItemPurchased itemPur = new ItemPurchased();
            itemPur.setIssueId(eIssue.getIssueId());
            itemPur.setItemDescription(item.getItemDescription());
            itemPur.setItemMake(item.getItemMake());
            itemPur.setItemCategory(item.getItemCategory());
            itemPur.setItemValuation(item.getItemValuation());
            itemPurchasedList.add(itemPur);
        }
        return itemPurchasedList;
    }

}