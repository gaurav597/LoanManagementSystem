package com.wellsfargo.loanManagementSystem.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.anyChar;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellsfargo.loanManagementSystem.exception.CustomException;
import com.wellsfargo.loanManagementSystem.model.EmployeeCardDetails;
import com.wellsfargo.loanManagementSystem.model.EmployeeIssueDetails;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
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
import static org.mockito.Mockito.mock;
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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.server.ResponseStatusException;


@ExtendWith(SpringExtension.class)
@DisplayName("Testing EmployeeController Methods")
@SpringBootTest
class EmployeeControllerTest {

    @Autowired
    private EmployeeController employeeController;
    @MockBean
    private EmployeeService employeeService;
    @MockBean
    private EmployeeRepository employeeRepository;
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
        e.setDateOfBirth(LocalDate.of(2000, 1, 1));
        e.setDateOfJoin(LocalDate.of(2023, 1, 1));
        e.setGender('M');

        when(employeeService.addEmployee(any(EmployeeMaster.class))).thenReturn(e);

        ResponseEntity<String> response = employeeController.createEmployee(e);
        System.out.println("Response: " + response);
        assertEquals("Registration Successful", response.getBody());
        // verify(employeeService,times(1)).addEmployee(any(EmployeeMaster.class));
    }

    /**
     * Method under test: {@link EmployeeController#createEmployee(EmployeeMaster)}
     */
    @Test
    void testCreateEmployee() {
        //   Diffblue Cover was unable to write a Spring test,
        //   so wrote a non-Spring test instead.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Java 8 date/time type `java.time.LocalDate` not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310" to enable handling (through reference chain: com.wellsfargo.loanManagementSystem.model.EmployeeMaster["dateOfBirth"])
        //       at com.fasterxml.jackson.databind.exc.InvalidDefinitionException.from(InvalidDefinitionException.java:77)
        //       at com.fasterxml.jackson.databind.SerializerProvider.reportBadDefinition(SerializerProvider.java:1308)
        //       at com.fasterxml.jackson.databind.ser.impl.UnsupportedTypeSerializer.serialize(UnsupportedTypeSerializer.java:35)
        //       at com.fasterxml.jackson.databind.ser.BeanPropertyWriter.serializeAsField(BeanPropertyWriter.java:732)
        //       at com.fasterxml.jackson.databind.ser.std.BeanSerializerBase.serializeFields(BeanSerializerBase.java:772)
        //       at com.fasterxml.jackson.databind.ser.BeanSerializer.serialize(BeanSerializer.java:178)
        //       at com.fasterxml.jackson.databind.ser.DefaultSerializerProvider._serialize(DefaultSerializerProvider.java:479)
        //       at com.fasterxml.jackson.databind.ser.DefaultSerializerProvider.serializeValue(DefaultSerializerProvider.java:318)
        //       at com.fasterxml.jackson.databind.ObjectMapper._writeValueAndClose(ObjectMapper.java:4719)
        //       at com.fasterxml.jackson.databind.ObjectMapper.writeValueAsString(ObjectMapper.java:3964)
        //   See https://diff.blue/R013 to resolve this issue.

        EmployeeController employeeController = new EmployeeController();

        EmployeeMaster empMas = new EmployeeMaster();
        empMas.setDateOfBirth(LocalDate.of(1970, 1, 1));
        empMas.setDateOfJoin(LocalDate.of(1970, 1, 1));
        empMas.setDepartment("Department");
        empMas.setDesignation("Designation");
        empMas.setEmployeeCardDetailsList(new ArrayList<>());
        empMas.setEmployeeId("42");
        empMas.setEmployeeIssueDetailsList(new ArrayList<>());
        empMas.setEmployeeName("Employee Name");
        empMas.setGender('A');
        empMas.setPassword("iloveyou");
        ResponseEntity<String> actualCreateEmployeeResult = employeeController.createEmployee(empMas);
        assertEquals("An error ocurred: Cannot invoke \"com.wellsfargo.loanManagementSystem.service.EmployeeService"
                + ".addEmployee(com.wellsfargo.loanManagementSystem.model.EmployeeMaster)\" because \"this.employeeService\""
                + " is null", actualCreateEmployeeResult.getBody());
        assertEquals(500, actualCreateEmployeeResult.getStatusCodeValue());
        assertTrue(actualCreateEmployeeResult.getHeaders().isEmpty());
    }

    /**
     * Method under test: {@link EmployeeController#createEmployee(EmployeeMaster)}
     */
    @Test
    void testCreateEmployee2() {
        //   Diffblue Cover was unable to write a Spring test,
        //   so wrote a non-Spring test instead.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Java 8 date/time type `java.time.LocalDate` not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310" to enable handling (through reference chain: com.wellsfargo.loanManagementSystem.model.EmployeeMaster["dateOfBirth"])
        //       at com.fasterxml.jackson.databind.exc.InvalidDefinitionException.from(InvalidDefinitionException.java:77)
        //       at com.fasterxml.jackson.databind.SerializerProvider.reportBadDefinition(SerializerProvider.java:1308)
        //       at com.fasterxml.jackson.databind.ser.impl.UnsupportedTypeSerializer.serialize(UnsupportedTypeSerializer.java:35)
        //       at com.fasterxml.jackson.databind.ser.BeanPropertyWriter.serializeAsField(BeanPropertyWriter.java:732)
        //       at com.fasterxml.jackson.databind.ser.std.BeanSerializerBase.serializeFields(BeanSerializerBase.java:772)
        //       at com.fasterxml.jackson.databind.ser.BeanSerializer.serialize(BeanSerializer.java:178)
        //       at com.fasterxml.jackson.databind.ser.DefaultSerializerProvider._serialize(DefaultSerializerProvider.java:479)
        //       at com.fasterxml.jackson.databind.ser.DefaultSerializerProvider.serializeValue(DefaultSerializerProvider.java:318)
        //       at com.fasterxml.jackson.databind.ObjectMapper._writeValueAndClose(ObjectMapper.java:4719)
        //       at com.fasterxml.jackson.databind.ObjectMapper.writeValueAsString(ObjectMapper.java:3964)
        //   See https://diff.blue/R013 to resolve this issue.

        EmployeeController employeeController = new EmployeeController();
        EmployeeMaster empMas = mock(EmployeeMaster.class);
        doNothing().when(empMas).setDateOfBirth(Mockito.<LocalDate>any());
        doNothing().when(empMas).setDateOfJoin(Mockito.<LocalDate>any());
        doNothing().when(empMas).setDepartment(Mockito.<String>any());
        doNothing().when(empMas).setDesignation(Mockito.<String>any());
        doNothing().when(empMas).setEmployeeCardDetailsList(Mockito.<List<EmployeeCardDetails>>any());
        doNothing().when(empMas).setEmployeeId(Mockito.<String>any());
        doNothing().when(empMas).setEmployeeIssueDetailsList(Mockito.<List<EmployeeIssueDetails>>any());
        doNothing().when(empMas).setEmployeeName(Mockito.<String>any());
        doNothing().when(empMas).setGender(anyChar());
        doNothing().when(empMas).setPassword(Mockito.<String>any());
        empMas.setDateOfBirth(LocalDate.of(1970, 1, 1));
        empMas.setDateOfJoin(LocalDate.of(1970, 1, 1));
        empMas.setDepartment("Department");
        empMas.setDesignation("Designation");
        empMas.setEmployeeCardDetailsList(new ArrayList<>());
        empMas.setEmployeeId("42");
        empMas.setEmployeeIssueDetailsList(new ArrayList<>());
        empMas.setEmployeeName("Employee Name");
        empMas.setGender('A');
        empMas.setPassword("iloveyou");
        ResponseEntity<String> actualCreateEmployeeResult = employeeController.createEmployee(empMas);
        assertEquals("An error ocurred: Cannot invoke \"com.wellsfargo.loanManagementSystem.service.EmployeeService"
                + ".addEmployee(com.wellsfargo.loanManagementSystem.model.EmployeeMaster)\" because \"this.employeeService\""
                + " is null", actualCreateEmployeeResult.getBody());
        assertEquals(500, actualCreateEmployeeResult.getStatusCodeValue());
        assertTrue(actualCreateEmployeeResult.getHeaders().isEmpty());
        verify(empMas).setDateOfBirth(Mockito.<LocalDate>any());
        verify(empMas).setDateOfJoin(Mockito.<LocalDate>any());
        verify(empMas).setDepartment(Mockito.<String>any());
        verify(empMas).setDesignation(Mockito.<String>any());
        verify(empMas).setEmployeeCardDetailsList(Mockito.<List<EmployeeCardDetails>>any());
        verify(empMas).setEmployeeId(Mockito.<String>any());
        verify(empMas).setEmployeeIssueDetailsList(Mockito.<List<EmployeeIssueDetails>>any());
        verify(empMas).setEmployeeName(Mockito.<String>any());
        verify(empMas).setGender(anyChar());
        verify(empMas).setPassword(Mockito.<String>any());
    }

    @Test
    public void testCreateEmployee_Failure() {
        e.setEmployeeId("1");
        e.setEmployeeName("Gaurav");
        e.setDateOfBirth(LocalDate.of(2000, 1, 1));
        e.setDateOfJoin(LocalDate.of(2023, 1, 1));
        e.setGender('M');
        when(employeeService.addEmployee(any(EmployeeMaster.class))).thenReturn(null);

        ResponseEntity<String> response = employeeController.createEmployee(e);
        assertEquals("Registration Failed", response.getBody());
        assertEquals(HttpStatus.BAD_REQUEST.value(), response.getStatusCode().value());
    }

    /**
     * Method under test: {@link EmployeeController#deleteCustomer(String)}
     */
    @Test
    void testDeleteCustomer() throws Exception {
        doNothing().when(employeeService).deleteEmployee(Mockito.<String>any());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/api/deleteCustomer/{id}", "42");
        MockMvcBuilders.standaloneSetup(employeeController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("text/plain;charset=ISO-8859-1"))
                .andExpect(MockMvcResultMatchers.content().string("Employee Deleted"));
    }

    /**
     * Method under test: {@link EmployeeController#deleteCustomer(String)}
     */
    @Test
    void testDeleteCustomer2() throws Exception {
        doThrow(new org.springframework.data.rest.webmvc.ResourceNotFoundException("An error occurred"))
                .when(employeeService)
                .deleteEmployee(Mockito.<String>any());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/api/deleteCustomer/{id}", "42");
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(employeeController)
                .build()
                .perform(requestBuilder);
        actualPerformResult.andExpect(MockMvcResultMatchers.status().is(500))
                .andExpect(MockMvcResultMatchers.content().contentType("text/plain;charset=ISO-8859-1"))
                .andExpect(MockMvcResultMatchers.content().string("An error occured:An error occurred"));
    }

    /**
     * Method under test: {@link EmployeeController#deleteCustomer(String)}
     */
    @Test
    void testDeleteCustomer3() throws Exception {
        doNothing().when(employeeService).deleteEmployee(Mockito.<String>any());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/api/deleteCustomer/{id}", "42");
        requestBuilder.contentType("https://example.org/example");
        MockMvcBuilders.standaloneSetup(employeeController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("text/plain;charset=ISO-8859-1"))
                .andExpect(MockMvcResultMatchers.content().string("Employee Deleted"));
    }

    /**
     * Method under test: {@link EmployeeController#getCustomer()}
     */
    @Test
    void testGetCustomer() throws Exception {
        when(employeeService.getEmployees()).thenReturn(new ArrayList<>());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/getCustomer");
        MockMvcBuilders.standaloneSetup(employeeController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }

    /**
     * Method under test: {@link EmployeeController#getProductById(String)}
     */
    @Test
    void testGetProductById2() throws Exception {
        EmployeeMaster employeeMaster = new EmployeeMaster();
        employeeMaster.setDateOfBirth(LocalDate.of(1970, 1, 1));
        employeeMaster.setDateOfJoin(LocalDate.of(1970, 1, 1));
        employeeMaster.setDepartment("Department");
        employeeMaster.setDesignation("Designation");
        employeeMaster.setEmployeeCardDetailsList(new ArrayList<>());
        employeeMaster.setEmployeeId("42");
        employeeMaster.setEmployeeIssueDetailsList(new ArrayList<>());
        employeeMaster.setEmployeeName("Employee Name");
        employeeMaster.setGender('A');
        employeeMaster.setPassword("iloveyou");
        Optional<EmployeeMaster> ofResult = Optional.of(employeeMaster);
        when(employeeService.getEmployee(Mockito.<String>any())).thenReturn(ofResult);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/getCustomer/{id}", "42");
        MockMvcBuilders.standaloneSetup(employeeController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "{\"employeeId\":\"42\",\"employeeName\":\"Employee Name\",\"password\":\"aWxvdmV5b3U=\",\"gender\":\"A\",\"dateOfBirth"
                                        + "\":\"1970-01-01\",\"dateOfJoin\":\"1970-01-01\",\"designation\":\"Designation\",\"department\":\"Department\","
                                        + "\"employeeCardDetailsList\":[],\"employeeIssueDetailsList\":[]}"));
    }

    /**
     * Method under test: {@link EmployeeController#getProductById(String)}
     */
    @Test
    void testGetProductById3() throws Exception {
        Optional<EmployeeMaster> emptyResult = Optional.empty();
        when(employeeService.getEmployee(Mockito.<String>any())).thenReturn(emptyResult);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/getCustomer/{id}", "42");
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(employeeController)
                .build()
                .perform(requestBuilder);
        actualPerformResult.andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    /**
     * Method under test: {@link EmployeeController#getProductById(String)}
     */
    @Test
    void testGetProductById4() throws Exception {
        when(employeeService.getEmployee(Mockito.<String>any()))
                .thenThrow(new org.springframework.data.rest.webmvc.ResourceNotFoundException("An error occurred"));
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/getCustomer/{id}", "42");
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(employeeController)
                .build()
                .perform(requestBuilder);
        actualPerformResult.andExpect(MockMvcResultMatchers.status().is(500));
    }

    //
//
//
    @Test
    public void testLoginDealer_Success() throws ResourceNotFoundException, CustomException {

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
        Pair<Boolean, String[]> response = employeeController.loginDealer(request).getBody();

        // Verify that the response is as expected
        assertEquals(true, response.a);
        assertEquals("Test Designation", response.b[0]);
        assertEquals("Test Department", response.b[1]);
    }

    /**
     * Method under test: {@link EmployeeController#loginDealer(EmployeeMaster)}
     */
    @Test
    void testLoginDealer() throws CustomException, ResourceNotFoundException {
        //   Diffblue Cover was unable to write a Spring test,
        //   so wrote a non-Spring test instead.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Java 8 date/time type `java.time.LocalDate` not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310" to enable handling (through reference chain: com.wellsfargo.loanManagementSystem.model.EmployeeMaster["dateOfBirth"])
        //       at com.fasterxml.jackson.databind.exc.InvalidDefinitionException.from(InvalidDefinitionException.java:77)
        //       at com.fasterxml.jackson.databind.SerializerProvider.reportBadDefinition(SerializerProvider.java:1308)
        //       at com.fasterxml.jackson.databind.ser.impl.UnsupportedTypeSerializer.serialize(UnsupportedTypeSerializer.java:35)
        //       at com.fasterxml.jackson.databind.ser.BeanPropertyWriter.serializeAsField(BeanPropertyWriter.java:732)
        //       at com.fasterxml.jackson.databind.ser.std.BeanSerializerBase.serializeFields(BeanSerializerBase.java:772)
        //       at com.fasterxml.jackson.databind.ser.BeanSerializer.serialize(BeanSerializer.java:178)
        //       at com.fasterxml.jackson.databind.ser.DefaultSerializerProvider._serialize(DefaultSerializerProvider.java:479)
        //       at com.fasterxml.jackson.databind.ser.DefaultSerializerProvider.serializeValue(DefaultSerializerProvider.java:318)
        //       at com.fasterxml.jackson.databind.ObjectMapper._writeValueAndClose(ObjectMapper.java:4719)
        //       at com.fasterxml.jackson.databind.ObjectMapper.writeValueAsString(ObjectMapper.java:3964)
        //   See https://diff.blue/R013 to resolve this issue.

        EmployeeController employeeController = new EmployeeController();

        EmployeeMaster e = new EmployeeMaster();
        e.setDateOfBirth(LocalDate.of(1970, 1, 1));
        e.setDateOfJoin(LocalDate.of(1970, 1, 1));
        e.setDepartment("Department");
        e.setDesignation("Designation");
        e.setEmployeeCardDetailsList(new ArrayList<>());
        e.setEmployeeId("42");
        e.setEmployeeIssueDetailsList(new ArrayList<>());
        e.setEmployeeName("Employee Name");
        e.setGender('A');
        e.setPassword("iloveyou");
        assertThrows(CustomException.class, () -> employeeController.loginDealer(e));
    }

    @Test
    public void testLoginDealer_Failure() {
        // Mock an employee for a login failure scenario
        EmployeeMaster mockEmployee = new EmployeeMaster();
        mockEmployee.setEmployeeId("non_existent_id"); // Set an ID that doesn't exist

        // Mock the behavior of the service to return an empty Optional (no employee found)
        when(employeeService.getEmployee("non_existent_id")).thenReturn(Optional.empty());
        try {
            Pair<Boolean, String[]> response = employeeController.loginDealer(mockEmployee).getBody();
            // Check if the login was a failure
            assertFalse(response.a);

            // Check other assertions as needed for the returned response
        } catch (ResourceNotFoundException | CustomException ex) {
            // Check if the exception message matches the expected message
            assertEquals("Employee Not found", ex.getMessage());
        }

        // Check other assertions as needed for the returned response
    }

    @Test
    public void testAddCustomer_Success() {
        e.setEmployeeId("1");
        e.setEmployeeName("Gaurav");
        e.setDateOfBirth(LocalDate.of(2000, 1, 1));
        e.setDateOfJoin(LocalDate.of(2023, 1, 1));
        e.setGender('M');
        // Mock the behavior of the service to return the e
        when(employeeService.addEmployee(e)).thenReturn(e);

        ResponseEntity<String> response = employeeController.addCustomer(e);

        assertEquals("Added customer successfully.", response.getBody());
    }

    /**
     * Method under test: {@link EmployeeController#addCustomer(EmployeeMaster)}
     */
    @Test
    void testAddCustomer() {
        //   Diffblue Cover was unable to write a Spring test,
        //   so wrote a non-Spring test instead.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Java 8 date/time type `java.time.LocalDate` not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310" to enable handling (through reference chain: com.wellsfargo.loanManagementSystem.model.EmployeeMaster["dateOfBirth"])
        //       at com.fasterxml.jackson.databind.exc.InvalidDefinitionException.from(InvalidDefinitionException.java:77)
        //       at com.fasterxml.jackson.databind.SerializerProvider.reportBadDefinition(SerializerProvider.java:1308)
        //       at com.fasterxml.jackson.databind.ser.impl.UnsupportedTypeSerializer.serialize(UnsupportedTypeSerializer.java:35)
        //       at com.fasterxml.jackson.databind.ser.BeanPropertyWriter.serializeAsField(BeanPropertyWriter.java:732)
        //       at com.fasterxml.jackson.databind.ser.std.BeanSerializerBase.serializeFields(BeanSerializerBase.java:772)
        //       at com.fasterxml.jackson.databind.ser.BeanSerializer.serialize(BeanSerializer.java:178)
        //       at com.fasterxml.jackson.databind.ser.DefaultSerializerProvider._serialize(DefaultSerializerProvider.java:479)
        //       at com.fasterxml.jackson.databind.ser.DefaultSerializerProvider.serializeValue(DefaultSerializerProvider.java:318)
        //       at com.fasterxml.jackson.databind.ObjectMapper._writeValueAndClose(ObjectMapper.java:4719)
        //       at com.fasterxml.jackson.databind.ObjectMapper.writeValueAsString(ObjectMapper.java:3964)
        //   See https://diff.blue/R013 to resolve this issue.

        EmployeeController employeeController = new EmployeeController();

        EmployeeMaster empMaster = new EmployeeMaster();
        empMaster.setDateOfBirth(LocalDate.of(1970, 1, 1));
        empMaster.setDateOfJoin(LocalDate.of(1970, 1, 1));
        empMaster.setDepartment("Department");
        empMaster.setDesignation("Designation");
        empMaster.setEmployeeCardDetailsList(new ArrayList<>());
        empMaster.setEmployeeId("42");
        empMaster.setEmployeeIssueDetailsList(new ArrayList<>());
        empMaster.setEmployeeName("Employee Name");
        empMaster.setGender('A');
        empMaster.setPassword("iloveyou");
        ResponseEntity<String> actualAddCustomerResult = employeeController.addCustomer(empMaster);
        assertEquals("An error ocurred: Cannot invoke \"com.wellsfargo.loanManagementSystem.service.EmployeeService"
                + ".addEmployee(com.wellsfargo.loanManagementSystem.model.EmployeeMaster)\" because \"this.employeeService\""
                + " is null", actualAddCustomerResult.getBody());
        assertEquals(500, actualAddCustomerResult.getStatusCodeValue());
        assertTrue(actualAddCustomerResult.getHeaders().isEmpty());
    }

    /**
     * Method under test: {@link EmployeeController#addCustomer(EmployeeMaster)}
     */
    @Test
    void testAddCustomer2() {
        //   Diffblue Cover was unable to write a Spring test,
        //   so wrote a non-Spring test instead.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Java 8 date/time type `java.time.LocalDate` not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310" to enable handling (through reference chain: com.wellsfargo.loanManagementSystem.model.EmployeeMaster["dateOfBirth"])
        //       at com.fasterxml.jackson.databind.exc.InvalidDefinitionException.from(InvalidDefinitionException.java:77)
        //       at com.fasterxml.jackson.databind.SerializerProvider.reportBadDefinition(SerializerProvider.java:1308)
        //       at com.fasterxml.jackson.databind.ser.impl.UnsupportedTypeSerializer.serialize(UnsupportedTypeSerializer.java:35)
        //       at com.fasterxml.jackson.databind.ser.BeanPropertyWriter.serializeAsField(BeanPropertyWriter.java:732)
        //       at com.fasterxml.jackson.databind.ser.std.BeanSerializerBase.serializeFields(BeanSerializerBase.java:772)
        //       at com.fasterxml.jackson.databind.ser.BeanSerializer.serialize(BeanSerializer.java:178)
        //       at com.fasterxml.jackson.databind.ser.DefaultSerializerProvider._serialize(DefaultSerializerProvider.java:479)
        //       at com.fasterxml.jackson.databind.ser.DefaultSerializerProvider.serializeValue(DefaultSerializerProvider.java:318)
        //       at com.fasterxml.jackson.databind.ObjectMapper._writeValueAndClose(ObjectMapper.java:4719)
        //       at com.fasterxml.jackson.databind.ObjectMapper.writeValueAsString(ObjectMapper.java:3964)
        //   See https://diff.blue/R013 to resolve this issue.

        EmployeeController employeeController = new EmployeeController();
        EmployeeMaster empMaster = mock(EmployeeMaster.class);
        doNothing().when(empMaster).setDateOfBirth(Mockito.<LocalDate>any());
        doNothing().when(empMaster).setDateOfJoin(Mockito.<LocalDate>any());
        doNothing().when(empMaster).setDepartment(Mockito.<String>any());
        doNothing().when(empMaster).setDesignation(Mockito.<String>any());
        doNothing().when(empMaster).setEmployeeCardDetailsList(Mockito.<List<EmployeeCardDetails>>any());
        doNothing().when(empMaster).setEmployeeId(Mockito.<String>any());
        doNothing().when(empMaster).setEmployeeIssueDetailsList(Mockito.<List<EmployeeIssueDetails>>any());
        doNothing().when(empMaster).setEmployeeName(Mockito.<String>any());
        doNothing().when(empMaster).setGender(anyChar());
        doNothing().when(empMaster).setPassword(Mockito.<String>any());
        empMaster.setDateOfBirth(LocalDate.of(1970, 1, 1));
        empMaster.setDateOfJoin(LocalDate.of(1970, 1, 1));
        empMaster.setDepartment("Department");
        empMaster.setDesignation("Designation");
        empMaster.setEmployeeCardDetailsList(new ArrayList<>());
        empMaster.setEmployeeId("42");
        empMaster.setEmployeeIssueDetailsList(new ArrayList<>());
        empMaster.setEmployeeName("Employee Name");
        empMaster.setGender('A');
        empMaster.setPassword("iloveyou");
        ResponseEntity<String> actualAddCustomerResult = employeeController.addCustomer(empMaster);
        assertEquals("An error ocurred: Cannot invoke \"com.wellsfargo.loanManagementSystem.service.EmployeeService"
                + ".addEmployee(com.wellsfargo.loanManagementSystem.model.EmployeeMaster)\" because \"this.employeeService\""
                + " is null", actualAddCustomerResult.getBody());
        assertEquals(500, actualAddCustomerResult.getStatusCodeValue());
        assertTrue(actualAddCustomerResult.getHeaders().isEmpty());
        verify(empMaster).setDateOfBirth(Mockito.<LocalDate>any());
        verify(empMaster).setDateOfJoin(Mockito.<LocalDate>any());
        verify(empMaster).setDepartment(Mockito.<String>any());
        verify(empMaster).setDesignation(Mockito.<String>any());
        verify(empMaster).setEmployeeCardDetailsList(Mockito.<List<EmployeeCardDetails>>any());
        verify(empMaster).setEmployeeId(Mockito.<String>any());
        verify(empMaster).setEmployeeIssueDetailsList(Mockito.<List<EmployeeIssueDetails>>any());
        verify(empMaster).setEmployeeName(Mockito.<String>any());
        verify(empMaster).setGender(anyChar());
        verify(empMaster).setPassword(Mockito.<String>any());
    }

    @Test
    public void testAddCustomer_Failure() {
        e.setEmployeeId("1");
        e.setEmployeeName("Gaurav");
        e.setDateOfBirth(LocalDate.of(2000, 1, 1));
        e.setDateOfJoin(LocalDate.of(2023, 1, 1));
        e.setGender('M');
        // Mock the behavior of the service to return null, indicating a failure
        when(employeeService.addEmployee(e)).thenReturn(null);

        ResponseEntity<String> response = employeeController.addCustomer(e);

        assertEquals("Couldn't add customer.", response.getBody());
    }

    @Test
    public void testGetCustomer_Success() throws CustomException {
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


    @Test
    void testDeleteCustomer_Success() {
        // Arrange
        String employeeId = "testEmployeeId";

        // Mock the behavior of the employeeService.deleteEmployee method
        doNothing().when(employeeService).deleteEmployee(employeeId);

        // Act
        String response = employeeController.deleteCustomer(employeeId).getBody();

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
    void testUpdateProduct() throws ResourceNotFoundException, CustomException {
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

    /**
     * Method under test: {@link EmployeeController#updateProduct(String, EmployeeMaster)}
     */
    @Test
    void testUpdateProduct2() throws CustomException, ResourceNotFoundException {
        //   Diffblue Cover was unable to write a Spring test,
        //   so wrote a non-Spring test instead.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Java 8 date/time type `java.time.LocalDate` not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310" to enable handling (through reference chain: com.wellsfargo.loanManagementSystem.model.EmployeeMaster["dateOfBirth"])
        //       at com.fasterxml.jackson.databind.exc.InvalidDefinitionException.from(InvalidDefinitionException.java:77)
        //       at com.fasterxml.jackson.databind.SerializerProvider.reportBadDefinition(SerializerProvider.java:1308)
        //       at com.fasterxml.jackson.databind.ser.impl.UnsupportedTypeSerializer.serialize(UnsupportedTypeSerializer.java:35)
        //       at com.fasterxml.jackson.databind.ser.BeanPropertyWriter.serializeAsField(BeanPropertyWriter.java:732)
        //       at com.fasterxml.jackson.databind.ser.std.BeanSerializerBase.serializeFields(BeanSerializerBase.java:772)
        //       at com.fasterxml.jackson.databind.ser.BeanSerializer.serialize(BeanSerializer.java:178)
        //       at com.fasterxml.jackson.databind.ser.DefaultSerializerProvider._serialize(DefaultSerializerProvider.java:479)
        //       at com.fasterxml.jackson.databind.ser.DefaultSerializerProvider.serializeValue(DefaultSerializerProvider.java:318)
        //       at com.fasterxml.jackson.databind.ObjectMapper._writeValueAndClose(ObjectMapper.java:4719)
        //       at com.fasterxml.jackson.databind.ObjectMapper.writeValueAsString(ObjectMapper.java:3964)
        //   See https://diff.blue/R013 to resolve this issue.

        EmployeeController employeeController = new EmployeeController();

        EmployeeMaster e = new EmployeeMaster();
        e.setDateOfBirth(LocalDate.of(1970, 1, 1));
        e.setDateOfJoin(LocalDate.of(1970, 1, 1));
        e.setDepartment("Department");
        e.setDesignation("Designation");
        e.setEmployeeCardDetailsList(new ArrayList<>());
        e.setEmployeeId("42");
        e.setEmployeeIssueDetailsList(new ArrayList<>());
        e.setEmployeeName("Employee Name");
        e.setGender('A');
        e.setPassword("iloveyou");
        assertThrows(CustomException.class, () -> employeeController.updateProduct("42", e));
    }

    @Test
    public void testUpdateCustomer() throws CustomException, ResourceNotFoundException {
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

    /**
     * Method under test: {@link EmployeeController#updateCustomer(EmployeeMaster)}
     */
    @Test
    void testUpdateCustomer2() throws CustomException, ResourceNotFoundException {
        //   Diffblue Cover was unable to write a Spring test,
        //   so wrote a non-Spring test instead.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Java 8 date/time type `java.time.LocalDate` not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310" to enable handling (through reference chain: com.wellsfargo.loanManagementSystem.model.EmployeeMaster["dateOfBirth"])
        //       at com.fasterxml.jackson.databind.exc.InvalidDefinitionException.from(InvalidDefinitionException.java:77)
        //       at com.fasterxml.jackson.databind.SerializerProvider.reportBadDefinition(SerializerProvider.java:1308)
        //       at com.fasterxml.jackson.databind.ser.impl.UnsupportedTypeSerializer.serialize(UnsupportedTypeSerializer.java:35)
        //       at com.fasterxml.jackson.databind.ser.BeanPropertyWriter.serializeAsField(BeanPropertyWriter.java:732)
        //       at com.fasterxml.jackson.databind.ser.std.BeanSerializerBase.serializeFields(BeanSerializerBase.java:772)
        //       at com.fasterxml.jackson.databind.ser.BeanSerializer.serialize(BeanSerializer.java:178)
        //       at com.fasterxml.jackson.databind.ser.DefaultSerializerProvider._serialize(DefaultSerializerProvider.java:479)
        //       at com.fasterxml.jackson.databind.ser.DefaultSerializerProvider.serializeValue(DefaultSerializerProvider.java:318)
        //       at com.fasterxml.jackson.databind.ObjectMapper._writeValueAndClose(ObjectMapper.java:4719)
        //       at com.fasterxml.jackson.databind.ObjectMapper.writeValueAsString(ObjectMapper.java:3964)
        //   See https://diff.blue/R013 to resolve this issue.

        EmployeeController employeeController = new EmployeeController();

        EmployeeMaster employeeMaster = new EmployeeMaster();
        employeeMaster.setDateOfBirth(LocalDate.of(1970, 1, 1));
        employeeMaster.setDateOfJoin(LocalDate.of(1970, 1, 1));
        employeeMaster.setDepartment("Department");
        employeeMaster.setDesignation("Designation");
        employeeMaster.setEmployeeCardDetailsList(new ArrayList<>());
        employeeMaster.setEmployeeId("42");
        employeeMaster.setEmployeeIssueDetailsList(new ArrayList<>());
        employeeMaster.setEmployeeName("Employee Name");
        employeeMaster.setGender('A');
        employeeMaster.setPassword("iloveyou");
        assertThrows(CustomException.class, () -> employeeController.updateCustomer(employeeMaster));
    }

    /**
     * Method under test: {@link EmployeeController#itemsPurchased(String)}
     */
    @Test
    void testItemsPurchased() throws Exception {
        when(employeeService.itemsPurchased(Mockito.<String>any())).thenReturn(new ArrayList<>());
        MockHttpServletRequestBuilder contentTypeResult = MockMvcRequestBuilders.post("/api/itemsPurchased")
                .contentType(MediaType.APPLICATION_JSON);
        MockHttpServletRequestBuilder requestBuilder = contentTypeResult
                .content((new ObjectMapper()).writeValueAsString("foo"));
        MockMvcBuilders.standaloneSetup(employeeController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }


}
