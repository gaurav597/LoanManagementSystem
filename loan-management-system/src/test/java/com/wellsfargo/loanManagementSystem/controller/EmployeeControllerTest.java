package com.wellsfargo.loanManagementSystem.controller;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.repository.EmployeeRepository;
import com.wellsfargo.loanManagementSystem.service.EmployeeService;
import static org.mockito.Mockito.when;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@DisplayName("Testing EmployeeController Methods")
@SpringBootTest
class EmployeeControllerTest {
	
	@Autowired
	private EmployeeController employeeController;
	@MockBean
    private EmployeeService employeeService;
    @MockBean
    private EmployeeRepository employeeRepository;

//	@BeforeEach
//	void setUp() throws Exception {
//		
//	}
//
//	@AfterEach
//	void tearDown() throws Exception {
//	}

    @Test
    public void testCreateEmployee_Success() {
        EmployeeMaster mockEmployee = new EmployeeMaster();
        // Set the properties of the mockEmployee as needed
        mockEmployee.setEmployeeId("1");
        mockEmployee.setEmployeeName("Gaurav");
        mockEmployee.setDateOfBirth(LocalDate.of(2000,1,1));
        mockEmployee.setDateOfJoin(LocalDate.of(2023,1,1));
        mockEmployee.setGender('M');
        
        when(employeeService.addEmployee(any(EmployeeMaster.class))).thenReturn(mockEmployee);

        employeeController = new EmployeeController();
        ResponseEntity<String> response = employeeController.createEmployee(mockEmployee);
        System.out.println("Response: " + response);
        assertEquals("Registration Successful", response.getBody());
    }
    @Test
    public void testCreateEmployee_Failure() {
        EmployeeMaster mockEmployee = new EmployeeMaster();
        // Set the properties of the mockEmployee as needed
        mockEmployee.setEmployeeId("1");
        mockEmployee.setEmployeeName("Gaurav");
        mockEmployee.setDateOfBirth(LocalDate.of(2000,1,1));
        mockEmployee.setDateOfJoin(LocalDate.of(2023,1,1));
        mockEmployee.setGender('M');
        when(employeeService.addEmployee(any(EmployeeMaster.class))).thenReturn(null);

        employeeController = new EmployeeController();

        ResponseEntity<String> response = employeeController.createEmployee(mockEmployee);
        System.out.println("Response: " + response);
        assertEquals("Registration Failed", response.getBody());
        assertEquals(HttpStatus.BAD_REQUEST.value(), response.getStatusCode().value());
        // You can add more specific assertions if needed
    }

    
//    
//
//
//	@Test
//	void testLoginDealer() {
//		fail("Not yet implemented");
//	}
//
//	@Test
//	void testAddCustomer() {
//		fail("Not yet implemented");
//	}
//
//	@Test
//	void testGetCustomer() {
//		fail("Not yet implemented");
//	}
//
//	@Test
//	void testDeleteCustomer() {
//		fail("Not yet implemented");
//	}
//
//	@Test
//	void testGetProductById() {
//		fail("Not yet implemented");
//	}
//
//	@Test
//	void testUpdateProduct() {
//		fail("Not yet implemented");
//	}
//
//	@Test
//	void testUpdateCustomer() {
//		fail("Not yet implemented");
//	}
//
//	@Test
//	void testItemsPurchased() {
//		fail("Not yet implemented");
//	}

}
