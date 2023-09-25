package com.wellsfargo.loanManagementSystem.controller;


import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.model.ItemMaster;
import com.wellsfargo.loanManagementSystem.service.ItemCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api")
public class ItemCardController {

    @Autowired
    ItemCardService itemCardService;


    @PostMapping(value = "/addItemData")
    public String addItemData(@Validated @RequestBody ItemMaster itemMaster) {
        itemCardService.addItemData(itemMaster);
        return "Item added";
    }

    @GetMapping("/getItemData")
    public ResponseEntity<List<ItemMaster>> getItem() {
        List<ItemMaster> i = itemCardService.getItemData();
        return new ResponseEntity<List<ItemMaster>>(i, HttpStatus.OK);
    }


    @GetMapping("/getItemIds")
    public ResponseEntity<List<String>> getItemIds(){
        List<String> l = itemCardService.getItemIds();
        return new ResponseEntity<>(l, HttpStatus.OK);
    }

    @PostMapping("/getItemDetail")
    public ResponseEntity<ItemMaster> getItemDetail(@RequestBody String itemId){
        System.out.println("hiiii-there");
        String iId = itemId.substring(0,itemId.length()-1);
        ItemMaster i = itemCardService.getItem(iId)
                .orElseThrow(() -> new ResourceNotFoundException("item not there"));

        System.out.println(itemId);
        System.out.println(i);
        return new ResponseEntity<>(i,HttpStatus.OK);
    }


}
