package com.wellsfargo.loanManagementSystem.controller;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.wellsfargo.loanManagementSystem.exception.ResourceNotFoundException;
import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.model.ItemPurchased;
import com.wellsfargo.loanManagementSystem.repository.EmployeeRepository;
import com.wellsfargo.loanManagementSystem.service.EmployeeService;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.antlr.v4.runtime.misc.Pair;

import static org.mockito.ArgumentMatchers.any;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;


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

    private EmployeeMaster e;
	@BeforeEach
	void setUp() throws Exception {
		e = new EmployeeMaster();
	}

	@AfterEach
	void tearDown() throws Exception {
		e = null;
	}

    @Test
    public void testCreateEmployee_Success() {
        e.setEmployeeId("1");
        e.setEmployeeName("Gaurav");
        e.setDateOfBirth(LocalDate.of(2000,1,1));
        e.setDateOfJoin(LocalDate.of(2023,1,1));
        e.setGender('M');
        
        when(employeeService.addEmployee(any(EmployeeMaster.class))).thenReturn(e);

        ResponseEntity<String> response = employeeController.createEmployee(e);
        System.out.println("Response: " + response);
        assertEquals("Registration Successful", response.getBody());
       // verify(employeeService,times(1)).addEmployee(any(EmployeeMaster.class));
    }
	@Test
	public void testCreateEmployee_Failure() {
	    e.setEmployeeId("1");
	    e.setEmployeeName("Gaurav");
	    e.setDateOfBirth(LocalDate.of(2000,1,1));
	    e.setDateOfJoin(LocalDate.of(2023,1,1));
	    e.setGender('M');
        when(employeeService.addEmployee(any(EmployeeMaster.class))).thenReturn(null);

        ResponseEntity<String> response = employeeController.createEmployee(e);
        assertEquals("Registration Failed", response.getBody());
        assertEquals(HttpStatus.BAD_REQUEST.value(), response.getStatusCode().value());
    }
    
//    
//
//
	@Test
    public void testLoginDealer_Success() throws ResourceNotFoundException {

        e.setEmployeeId("testId");
        e.setPassword("testPassword");
        e.setDesignation("Test Designation");
        e.setDepartment("Test Department");

        // Set up a mock response when the getEmployee method is called
        when(employeeService.getEmployee("testId")).thenReturn(java.util.Optional.of(e));

        // Create a sample request body
        EmployeeMaster request = new EmployeeMaster();
        request.setEmployeeId("testId");
        request.setPassword("testPassword");

        // Call the loginDealer method
        Pair<Boolean, String[]> response = employeeController.loginDealer(request);

        // Verify that the response is as expected
        assertEquals(true, response.a);
        assertEquals("Test Designation", response.b[0]);
        assertEquals("Test Department", response.b[1]);
    }
//	@Test
//    public void testLoginDealer_Failure() {
//        // Mock an employee for a login failure scenario
//        EmployeeMaster mockEmployee = new EmployeeMaster();
//        mockEmployee.setEmployeeId("non_existent_id"); // Set an ID that doesn't exist
//
//        // Mock the behavior of the service to return an empty Optional (no employee found)
//        when(employeeService.getEmployee("non_existent_id")).thenReturn(Optional.empty());
//
//        Pair<Boolean, String[]> response = employeeController.loginDealer(mockEmployee);
//
//        assertFalse(response.a); // Check if the login was a failure
//
//        // Check other assertions as needed for the returned response
//    }

	@Test
    public void testAddCustomer_Success() {
				e.setEmployeeId("1");
        e.setEmployeeName("Gaurav");
        e.setDateOfBirth(LocalDate.of(2000,1,1));
        e.setDateOfJoin(LocalDate.of(2023,1,1));
        e.setGender('M');
        // Mock the behavior of the service to return the e
        when(employeeService.addEmployee(e)).thenReturn(e);

        ResponseEntity<String> response = employeeController.addCustomer(e);

        assertEquals("Added customer successfully.", response.getBody());
    }
	@Test
    public void testAddCustomer_Failure() {
		e.setEmployeeId("1");
        e.setEmployeeName("Gaurav");
        e.setDateOfBirth(LocalDate.of(2000,1,1));
        e.setDateOfJoin(LocalDate.of(2023,1,1));
        e.setGender('M');
        // Mock the behavior of the service to return null, indicating a failure
        when(employeeService.addEmployee(e)).thenReturn(null);

        ResponseEntity<String> response = employeeController.addCustomer(e);

        assertEquals("Couldn't add customer.", response.getBody());
    }
    @Test
    public void testGetCustomer_Success() {
        EmployeeMaster e1 = new EmployeeMaster();
        e1.setEmployeeId("1");
        e1.setEmployeeName("John");

        EmployeeMaster e2 = new EmployeeMaster();
        e2.setEmployeeId("2");
        e2.setEmployeeName("Alice");

        List<EmployeeMaster> mockEmployees = Arrays.asList(e1, e2);
        when(employeeService.getEmployees()).thenReturn(mockEmployees);

        ResponseEntity<List<EmployeeMaster>> response = employeeController.getCustomer();

        assertEquals(HttpStatus.OK, response.getStatusCode()); // Check if the response code is OK
        assertEquals(mockEmployees, response.getBody()); // Check if the returned list matches the mockEmployees
    }

//    @Test
//    public void testGetCustomer_Failure() {
//        // Mock a failure scenario where getting customers results in an exception
//        // This is just one example; you can adapt this scenario based on your actual error handling
//
//        // Mock the behavior of the service to throw an exception
//        when(employeeService.getEmployees()).thenThrow(new Exception("Something went wrong"));
//        ResponseEntity<List<EmployeeMaster>> response = employeeController.getCustomer();
//
//        assertEquals(500, response.getStatusCode()); // Check if the response code is INTERNAL_SERVER_ERROR
//        assertNull(response.getBody()); // Check if the response body is null
//    }

    @Test
    void testDeleteCustomer_Success() {
        // Arrange
        String employeeId = "testEmployeeId";

        // Mock the behavior of the employeeService.deleteEmployee method
        doNothing().when(employeeService).deleteEmployee(employeeId);

        // Act
        String response = employeeController.deleteCustomer(employeeId);

        // Assert
        verify(employeeService).deleteEmployee(employeeId);
        assertEquals("Employee Deleted", response);
    }


//    @Test
//    void testDeleteCustomer_NotFound() {
//        // Arrange
//        String employeeId = "nonExistentEmployeeId";
//
//        doThrow(new ResourceNotFoundException("Employee not found")).when(employeeService).deleteEmployee(employeeId);
//
//        // Act and Assert
//        assertThrows(ResponseStatusException.class, () -> employeeController.deleteCustomer(employeeId));
//
//    }

    @Test
    void testGetProductById() {
        // Arrange
        String employeeId = "existingEmployeeId";
        e.setEmployeeId(employeeId);
        e.setEmployeeName("John Doe"); // Set other properties as needed

        // Mock the behavior of the employeeService.getEmployee method
        when(employeeService.getEmployee(employeeId)).thenReturn(java.util.Optional.of(e));

        // Act
        ResponseEntity<EmployeeMaster> response = null;
        try {
            response = employeeController.getProductById(employeeId);
        } catch (ResourceNotFoundException e) {
            // Handle the exception if it's thrown
        }

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Assuming 200 is the HTTP status for a successful response
    }
    


    @Test
    void testUpdateProduct() throws ResourceNotFoundException {
        // Arrange
        String empId = "some-employee-id";
        e.setEmployeeName("Updated Name");


        when(employeeService.getEmployee(empId)).thenReturn(java.util.Optional.of(e));
        when(employeeService.addEmployee(any(EmployeeMaster.class))).thenReturn(e);

        // Act
        ResponseEntity<EmployeeMaster> response = employeeController.updateProduct(empId, e);

        // Assert
        verify(employeeService, times(1)).getEmployee(empId);
        verify(employeeService, times(1)).addEmployee(any(EmployeeMaster.class));

        assertEquals(e, response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
    
    @Test
    public void testUpdateCustomer() {
        e.setEmployeeId("123");
        e.setEmployeeName("John Doe");

        // Mock the behavior of the employeeRepository
        when(employeeRepository.findById(e.getEmployeeId()))
                .thenReturn(Optional.of(e));

        // Create an updated employee
        EmployeeMaster updatedEmployee = new EmployeeMaster();
        updatedEmployee.setEmployeeId("123");
        updatedEmployee.setEmployeeName("Hello");

        // Perform the update
        String response = employeeController.updateCustomer(updatedEmployee);

        // Verify the respons
        assertEquals("Employee saved", response);
        }
    


}
