package com.wellsfargo.loanManagementSystem.service;

import com.wellsfargo.loanManagementSystem.model.EmployeeIssueDetails;
import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.model.ItemMaster;
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

    public Optional<EmployeeMaster> getEmployee(String id)
    {
        return erepo.findById(id); //Invokes custom method
    }

    @Autowired
    private ItemRepository itemRepo;

    public EmployeeMaster registerEmployee(EmployeeMaster e)
    {
        return erepo.save(e);
    }

    public EmployeeMaster addEmployee(EmployeeMaster e){
        return erepo.save(e);
    }

    public List<EmployeeMaster> getEmployees(){
        return erepo.findAll();
    }
   

    public void deleteEmployee(String empId){
        erepo.deleteById(empId);
    }

    public List<ItemMaster> itemsPurchased(String empId){
        EmployeeMaster e = erepo.findById(empId)
                .orElseThrow(() -> new org.springframework.data.rest.webmvc.ResourceNotFoundException("Employee doesn't exist"));

        List<EmployeeIssueDetails> issueList = e.getEmployeeIssueDetailsList();

        List<ItemMaster> itemPurchasedList = new ArrayList<>();
        for (EmployeeIssueDetails eIssue: issueList
             ) {
            ItemMaster item = itemRepo.findById(eIssue.getIssueId())
                            .orElseThrow(()-> new ResourceNotFoundException("item does not exist"));
            itemPurchasedList.add(item);
        }
        return itemPurchasedList;
    }

}