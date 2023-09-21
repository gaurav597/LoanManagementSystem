package com.wellsfargo.loanManagementSystem.service;

import com.wellsfargo.loanManagementSystem.model.EmployeeIssueDetails;
import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.model.ItemMaster;
import com.wellsfargo.loanManagementSystem.repository.EmployeeIssueDetailsRepository;
import com.wellsfargo.loanManagementSystem.repository.EmployeeRepository;
import com.wellsfargo.loanManagementSystem.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class ItemCardService {
    @Autowired
    private ItemRepository itemRepo;

    @Autowired
    private EmployeeIssueDetailsRepository employeeIssueDetailsRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public void addItemData(ItemMaster itemMaster){
        itemRepo.save(itemMaster);
    }

    public void applyLoan(Map<String, Object> payload)throws Exception{

        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                .parseCaseInsensitive()
                .appendPattern("yyyy-MM-dd")
                .toFormatter(Locale.ENGLISH);


        LocalDate issueDate  = LocalDate.parse((String)payload.get("issueDate"), formatter);
        LocalDate returnDate = LocalDate.parse((String)payload.get("returnDate"), formatter);
        System.out.println(payload.get("itemDescription"));
        System.out.println(payload);
        ItemMaster itemMaster = new ItemMaster();
        itemMaster.setItemId((String) payload.get("itemId"));
        itemMaster.setItemDescription((String) payload.get("itemDescription"));
        itemMaster.setIssueStatus(((String) payload.get("issueStatus")).charAt(0));
        itemMaster.setItemMake((String) payload.get("itemMake"));
        itemMaster.setItemValuation( Integer.parseInt((String)payload.get("itemValuation")));
        itemMaster.setItemCategory((String) payload.get("itemCategory"));


        EmployeeIssueDetails employeeIssueDetails= new EmployeeIssueDetails();
        employeeIssueDetails.setIssueId((String)payload.get("issueId"));
        employeeIssueDetails.setEmployeeId(employeeRepository.findById((String)payload.get("employeeId")).orElse(new EmployeeMaster()));
        employeeIssueDetails.setItemId(itemRepo.findById((String)payload.get("itemId")).orElse(new ItemMaster()));
        employeeIssueDetails.setIssueDate(issueDate);
        employeeIssueDetails.setReturnDate(returnDate);
        itemMaster.addIssue(employeeIssueDetails);
        employeeIssueDetailsRepository.save(employeeIssueDetails);
        itemRepo.save(itemMaster);


    }


    public List<ItemMaster> getItemData(){
        return itemRepo.findAll();
    }
}
