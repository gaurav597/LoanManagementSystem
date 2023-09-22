package com.wellsfargo.loanManagementSystem.service;

import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.model.ItemMaster;
import com.wellsfargo.loanManagementSystem.model.LoanCardMaster;
import com.wellsfargo.loanManagementSystem.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemCardService {
    @Autowired
    private ItemRepository itemRepo;

    public List<ItemMaster> getItemData(){
        return itemRepo.findAll();
    }

    public Optional<ItemMaster> getItemData(String id)
    {
        return itemRepo.findById(id);
    }

    public ItemMaster addItemData(ItemMaster i){
        return itemRepo.save(i);
    }

    public void deleteItemData(String itemId){
    	itemRepo.deleteById(itemId);
    }
}
