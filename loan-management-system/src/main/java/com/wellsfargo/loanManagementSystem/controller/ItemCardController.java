package com.wellsfargo.loanManagementSystem.controller;


import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.model.ItemMaster;
import com.wellsfargo.loanManagementSystem.service.ItemCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api")
public class ItemCardController {

    @Autowired
    ItemCardService itemCardService;


    @PostMapping(value = "/addItemData")
    public ResponseEntity<String> addItemData(@Validated @RequestBody ItemMaster itemMaster) {
        try {
            itemCardService.addItemData(itemMaster);
            return ResponseEntity.ok("Item added");
        } catch (Exception ex) {
            // Handle other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + ex.getMessage());
        }
    }

//    @GetMapping("/getItemData")
//    public ResponseEntity<List<ItemMaster>> getItem() {
//        List<ItemMaster> i = itemCardService.getItemData();
//        return new ResponseEntity<List<ItemMaster>>(i, HttpStatus.OK);
//    }


    @GetMapping("/getItemIds")
    public ResponseEntity<List<String>> getItemIds(){
        try{
            List<String> l = itemCardService.getItemIds();
            return new ResponseEntity<>(l, HttpStatus.OK);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonList(e.getMessage()));
        }
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

    /********************************************************************************/
    @PostMapping("/addItem")
    public ResponseEntity<String> addItem(@Validated @RequestBody ItemMaster i)
    {
        try{
        	ItemMaster item = itemCardService.addItemData(i);
            if(item!=null)
            {
                return ResponseEntity.ok("Added item successfully.");
            }
            else
            {
                return ResponseEntity.badRequest().body("Couldn't add item.");
            }
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error ocurred: "+e.getMessage());
        }
    }

    @GetMapping("/getItem")
    public ResponseEntity<List<ItemMaster>> getItem()
    {
		try
		{
	        List<ItemMaster> items = itemCardService.getItemData();
			return ResponseEntity.ok(items);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
    }
 

    @DeleteMapping("/deleteItem/{itemId}")
    public String deleteItem(@PathVariable String itemId){
        itemCardService.deleteItemData(itemId);
        return "Item Deleted";
    }
 
	@GetMapping("/getItem/{id}")
	public ResponseEntity<ItemMaster> getItemById(@PathVariable(value="id") String itemId) throws ResourceNotFoundException
	{
		ItemMaster i = itemCardService.getItemData(itemId).orElseThrow(()->new ResourceNotFoundException("Item not found for this Id: "+itemId));
		return ResponseEntity.ok().body(i);
	}

	 //Open PostMan, make a PUT Request - http://localhost:8085/ims/api/products/1003
    //Select body -> raw -> JSON 
    //Update JSON product object with new Values.
	@PutMapping("/addItem/{id}")
	public ResponseEntity<ItemMaster> updateItem(@PathVariable(value="id") String itemId, @Validated @RequestBody ItemMaster i) throws ResourceNotFoundException
	{
		ItemMaster item = itemCardService.getItemData(itemId).orElseThrow(()->new ResourceNotFoundException("Item not found for this Id: "+itemId));

		//Update product with new values
		item.setItemId(i.getItemId());
		item.setItemDescription(i.getItemDescription());
	    item.setIssueStatus(i.getIssueStatus());
	    item.setItemMake(i.getItemMake());
	    item.setItemCategory(i.getItemCategory());
	    item.setItemValuation(i.getItemValuation());

		final ItemMaster updatedItem = itemCardService.addItemData(item);
		return ResponseEntity.ok().body(updatedItem);
	}
	/********************************************************************************/
}
