package com.wellsfargo.loanManagementSystem.service;

import com.wellsfargo.loanManagementSystem.model.ItemMaster;
import com.wellsfargo.loanManagementSystem.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemCardService {
    @Autowired
    private ItemRepository itemRepo;

    public void addItemData(ItemMaster itemMaster){
        itemRepo.save(itemMaster);
    }
}
