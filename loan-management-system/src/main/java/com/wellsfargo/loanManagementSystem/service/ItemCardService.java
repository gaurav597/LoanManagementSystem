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
import java.util.*;

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




    public List<ItemMaster> getItemData(){
        return itemRepo.findAll();
    }

    public List<String> getItemIds(){
        List<ItemMaster> l= itemRepo.findAll();
        List<String> ret = new ArrayList<String>();
        for (ItemMaster item : l
             ) {
            ret.add(item.getItemId());
        }
        return ret;
    }

    public Optional<ItemMaster> getItem(String itemId){
        System.out.println(itemId);
        return itemRepo.findById(itemId);
    }



}
