package com.wellsfargo.loanManagementSystem.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.eq;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.wellsfargo.loanManagementSystem.exception.ResourceNotFoundException;
import com.wellsfargo.loanManagementSystem.model.ItemMaster;
import com.wellsfargo.loanManagementSystem.repository.ItemRepository;
import com.wellsfargo.loanManagementSystem.service.ItemCardService;

@SpringBootTest
class ItemCardControllerTest {
	
	@Autowired
	private ItemCardController itemCardController;
	private ItemMaster i;
	@MockBean
	private ItemCardService itemCardService;
	@MockBean
	private ItemRepository itemRepository;
	@BeforeEach
	void setUp() throws Exception {
		i = new ItemMaster();
	}

	@AfterEach
	void tearDown() throws Exception {
		i = null;
	}
	
	@Test
	public void testAddItemData_Success() {
	    i.setItemId("yourItemId");
	    i.setItemDescription("Your item description");
	    // ... set other attributes
	
	    when(itemCardService.addItemData(any(ItemMaster.class))).thenReturn(i);
	
	    String result = String.valueOf(itemCardController.addItemData(i));
	
	    // Assert the result
	    assertEquals("Item added", result);
	}
	
//	@Test
//	public void testAddItemData_Failure() {
//		when(itemCardService.addItemData(any(ItemMaster.class))).thenReturn(null);;
//        
//        // Invoke the controller
//        String response = itemCardController.addItemData(i);
//
//        // Verify the response
//        assertEquals("Couldn't add item", response);
//	}

	@Test
    public void testAddItem_Success() {
        // Mock the behavior of itemCardService.addItemData for a successful case
        when(itemCardService.addItemData(any(ItemMaster.class))).thenReturn(i);

        // Test the addItem method
        ResponseEntity<String> response = itemCardController.addItem(i);

        // Verify the response for success
        assertEquals("Added item successfully.", response.getBody());
    }

    @Test
    public void testAddItem_Failure() {
        // Mock the behavior of itemCardService.addItemData for a failure case
        when(itemCardService.addItemData(any(ItemMaster.class))).thenReturn(null);

        // Test the addItem method
        ResponseEntity<String> response = itemCardController.addItem(new ItemMaster());

        // Verify the response for failure
        assertEquals("Couldn't add item.", response.getBody());
    }

    @Test
    public void testGetItemIds_Success() {
        // Mock the behavior of itemCardService.getItemIds
        List<String> itemIds = Arrays.asList("item1", "item2", "item3");
        when(itemCardService.getItemIds()).thenReturn(itemIds);

        // Test the getItemIds method
        ResponseEntity<List<String>> response = itemCardController.getItemIds();

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(itemIds, response.getBody());
    }

    @Test
    public void testGetItemIds_Failure() {
        // Mock the behavior of itemCardService.getItemIds to return an empty list
        when(itemCardService.getItemIds()).thenReturn(Arrays.asList());

        // Test the getItemIds method
        ResponseEntity<List<String>> response = itemCardController.getItemIds();

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(0, response.getBody().size());
    }

    @Test
    public void testGetItemDetail_Success() {
        // Mock the behavior of itemCardService.getItem to return an ItemMaster
        String itemId = "item1";;
        i.setItemId(itemId);
        when(itemCardService.getItem(itemId)).thenReturn(Optional.of(i));

        // Test the getItemDetail method
        ResponseEntity<ItemMaster> response = itemCardController.getItemDetail(itemId + "x"); // Pass itemId as a string

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(i, response.getBody());
    }

//    @Test
//    public void testGetItemDetail_Failure() {
//        // Mock the behavior of itemCardService.getItem to return an empty Optional
//        String itemId = "item2";
//        when(itemCardService.getItem(itemId)).thenReturn(Optional.empty());
//
//        // Test the getItemDetail method
//        ResponseEntity<ItemMaster> response = itemCardController.getItemDetail(itemId + "x"); // Pass itemId as a string
//
//        // Verify the response
//        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
//    }
//

    @Test
    public void testDeleteItem_Success() {
        // Mock the behavior of itemCardService.deleteItemData to succeed
        String itemId = "sampleItemId";
        doNothing().when(itemCardService).deleteItemData(itemId);

        // Test the deleteItem method
        String response = itemCardController.deleteItem(itemId);

        // Verify the response
        assertEquals("Item Deleted", response);
    }
//
//    @Test
//    public void testDeleteItem_Failure() {
//        // Mock the behavior of itemCardService.deleteItemData to throw an exception
//        String itemId = "nonExistentItemId";
//        doThrow(new ResourceNotFoundException("Item not found for this Id: " + itemId))
//            .when(itemCardService).deleteItemData(itemId);
//
//        // Test the deleteItem method and verify the exception
//
//        // Use assertThrows to verify that a ResourceNotFoundException is thrown
//        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
//            itemCardController.deleteItem(itemId);
//        });
//
//        // You can also verify the exception message or details if needed
//         assertEquals("Expected exception message", exception.getMessage());
//    }
    
    @Test
    public void testGetItemById_Success() {
        // Mock the behavior of itemCardService.getItemData to return an item
        String itemId = "sampleItemId";
        ItemMaster sampleItem = new ItemMaster();
        sampleItem.setItemId(itemId);

        when(itemCardService.getItemData(itemId)).thenReturn(Optional.of(sampleItem));

        // Test the getItemById method
        ResponseEntity<ItemMaster> response = itemCardController.getItemById(itemId);

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(itemId, response.getBody().getItemId());
    }

    @Test
    public void testGetItemById_Failure() {
        // Mock the behavior of itemCardService.getItemData to return an empty optional
         
         String itemId = "nonExistentItemId";
         when(itemCardService.getItemData(itemId)).thenReturn(Optional.empty());

         // Test the getItemById method and verify the exception

         // Update the test to expect the actual exception class
         assertThrows(org.springframework.data.rest.webmvc.ResourceNotFoundException.class, () -> {
             itemCardController.getItemById(itemId);
         });
    }
    
    @Test
    public void testUpdateItem_Success() {
        // Arrange
    	i.setItemId("validItemId");
    	// Create a mock ItemCardService
    	when(itemCardService.getItemData(eq("validItemId"))).thenReturn(Optional.of(new ItemMaster()));
    	when(itemCardService.addItemData(any(ItemMaster.class))).thenReturn(i);

    	// Act
    	ResponseEntity<ItemMaster> response = itemCardController.updateItem("validItemId", i);

    	// Assert
    	assertEquals(HttpStatus.OK, response.getStatusCode());
    }

//    @Test
//    public void testUpdateItem_Failure() {
//    	i.setItemId("nonExistentItemId");
//    	// Create a mock ItemCardService
//    	when(itemCardService.getItemData(eq("nonExistentItemId"))).thenReturn(Optional.empty());
//
//    	// Act and Assert
//    	assertThrows(ResourceNotFoundException.class, () -> {
//    	    itemCardController.updateItem("nonExistentItemId", i);
//    	});
//    }

}
