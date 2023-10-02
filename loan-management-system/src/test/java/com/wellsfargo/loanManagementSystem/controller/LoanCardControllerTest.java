package com.wellsfargo.loanManagementSystem.controller;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellsfargo.loanManagementSystem.exception.ResourceNotFoundException;
import com.wellsfargo.loanManagementSystem.model.EmployeeCardDetails;
import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.model.LoanCardMaster;
import com.wellsfargo.loanManagementSystem.service.EmployeeCardService;
import com.wellsfargo.loanManagementSystem.service.LoanCardService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ContextConfiguration(classes = {LoanCardController.class})
@ExtendWith(SpringExtension.class)
class LoanCardControllerTest {
    @MockBean
    private EmployeeCardService employeeCardService;

    @Autowired
    private LoanCardController loanCardController;

    @MockBean
    private LoanCardService loanCardService;


    @Test
    void testAddEmpCardDetails() throws Exception {
        doNothing().when(employeeCardService).addEmpCard(Mockito.<EmployeeCardDetails>any());

        EmployeeMaster employeeId = new EmployeeMaster();
        employeeId.setDateOfBirth(LocalDate.of(1970, 1, 1));
        employeeId.setDateOfJoin(LocalDate.of(1970, 1, 1));
        employeeId.setDepartment("Department");
        employeeId.setDesignation("Designation");
        employeeId.setEmployeeCardDetailsList(new ArrayList<>());
        employeeId.setEmployeeId("42");
        employeeId.setEmployeeIssueDetailsList(new ArrayList<>());
        employeeId.setEmployeeName("Employee Name");
        employeeId.setGender('A');
        employeeId.setPassword("iloveyou");

        LoanCardMaster loanId = new LoanCardMaster();
        loanId.setDurationInYears(1);
        loanId.setLoanEmpCardDetails(new ArrayList<>());
        loanId.setLoanId("42");
        loanId.setLoanType("Loan Type");

        EmployeeCardDetails employeeCardDetails = new EmployeeCardDetails();
        employeeCardDetails.setCardId(1L);
        employeeCardDetails.setCardIssueDate(null);
        employeeCardDetails.setEmployeeId(employeeId);
        employeeCardDetails.setLoanId(loanId);
        String content = (new ObjectMapper()).writeValueAsString(employeeCardDetails);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/addEmpCardDetails")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
        MockMvcBuilders.standaloneSetup(loanCardController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("text/plain;charset=ISO-8859-1"))
                .andExpect(MockMvcResultMatchers.content().string("Employee Card Details Added"));
    }


    @Test
    void testAddLoanCard() throws Exception {
        LoanCardMaster loanCardMaster = new LoanCardMaster();
        loanCardMaster.setDurationInYears(1);
        loanCardMaster.setLoanEmpCardDetails(new ArrayList<>());
        loanCardMaster.setLoanId("42");
        loanCardMaster.setLoanType("Loan Type");
        when(loanCardService.addLoanCard(Mockito.<LoanCardMaster>any())).thenReturn(loanCardMaster);

        LoanCardMaster loanCardMaster2 = new LoanCardMaster();
        loanCardMaster2.setDurationInYears(1);
        loanCardMaster2.setLoanEmpCardDetails(new ArrayList<>());
        loanCardMaster2.setLoanId("42");
        loanCardMaster2.setLoanType("Loan Type");
        String content = (new ObjectMapper()).writeValueAsString(loanCardMaster2);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/addLoanCard")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
        MockMvcBuilders.standaloneSetup(loanCardController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("text/plain;charset=ISO-8859-1"))
                .andExpect(MockMvcResultMatchers.content().string("Loan card Added"));
    }


    @Test
    void testApplyLoan() throws Exception {
        doNothing().when(loanCardService).applyLoan(Mockito.<Map<String, Object>>any());

        HashMap<String, Object> stringObjectMap = new HashMap<>();
        stringObjectMap.put((String) "itemId", "foo");
        stringObjectMap.put((String) "employeeId", "foo");
        stringObjectMap.put((String) "itemCategory", "foo");
        String content = (new ObjectMapper()).writeValueAsString(stringObjectMap);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/applyLoan")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
        MockMvcBuilders.standaloneSetup(loanCardController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("text/plain;charset=ISO-8859-1"))
                .andExpect(MockMvcResultMatchers.content().string("loan applied"));
    }


    @Test
    void testApplyLoan2() throws Exception {
        doThrow(new ResourceNotFoundException("An error occurred")).when(loanCardService)
                .applyLoan(Mockito.<Map<String, Object>>any());

        HashMap<String, Object> stringObjectMap = new HashMap<>();
        stringObjectMap.put((String) "itemId", "foo");
        stringObjectMap.put((String) "employeeId", "foo");
        stringObjectMap.put((String) "itemCategory", "foo");
        String content = (new ObjectMapper()).writeValueAsString(stringObjectMap);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/applyLoan")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(loanCardController)
                .build()
                .perform(requestBuilder);
        actualPerformResult.andExpect(MockMvcResultMatchers.status().isNotFound());
    }


    @Test
    void testGetLoanInfo() throws Exception {
        when(loanCardService.getLoanInfo(Mockito.<String>any())).thenReturn(new ArrayList<>());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/getEmpLoanData/{id}", "42");
        MockMvcBuilders.standaloneSetup(loanCardController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }


    @Test
    void testAddLoan() throws Exception {
        LoanCardMaster loanCardMaster = new LoanCardMaster();
        loanCardMaster.setDurationInYears(1);
        loanCardMaster.setLoanEmpCardDetails(new ArrayList<>());
        loanCardMaster.setLoanId("42");
        loanCardMaster.setLoanType("Loan Type");
        when(loanCardService.addLoanCard(Mockito.<LoanCardMaster>any())).thenReturn(loanCardMaster);

        LoanCardMaster loanCardMaster2 = new LoanCardMaster();
        loanCardMaster2.setDurationInYears(1);
        loanCardMaster2.setLoanEmpCardDetails(new ArrayList<>());
        loanCardMaster2.setLoanId("42");
        loanCardMaster2.setLoanType("Loan Type");
        String content = (new ObjectMapper()).writeValueAsString(loanCardMaster2);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/addLoan")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
        MockMvcBuilders.standaloneSetup(loanCardController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("text/plain;charset=ISO-8859-1"))
                .andExpect(MockMvcResultMatchers.content().string("Added loan successfully."));
    }


    @Test
    void testDeleteLoan() throws Exception {
        doNothing().when(loanCardService).deleteLoanCard(Mockito.<String>any());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/api/deleteLoan/{loanId}", "42");
        MockMvcBuilders.standaloneSetup(loanCardController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("text/plain;charset=ISO-8859-1"))
                .andExpect(MockMvcResultMatchers.content().string("Loan Deleted"));
    }

    @Test
    void testDeleteLoan2() throws Exception {
        doNothing().when(loanCardService).deleteLoanCard(Mockito.<String>any());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/api/deleteLoan/{loanId}", "42");
        requestBuilder.contentType("https://example.org/example");
        MockMvcBuilders.standaloneSetup(loanCardController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("text/plain;charset=ISO-8859-1"))
                .andExpect(MockMvcResultMatchers.content().string("Loan Deleted"));
    }


    @Test
    void testGetCustomer() throws Exception {
        when(loanCardService.getLoanCardData()).thenReturn(new ArrayList<>());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/getLoanData");
        MockMvcBuilders.standaloneSetup(loanCardController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }


    @Test
    void testGetLoan() throws Exception {
        when(loanCardService.getLoanCardData()).thenReturn(new ArrayList<>());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/getLoan");
        MockMvcBuilders.standaloneSetup(loanCardController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }


    @Test
    void testGetLoanById() throws Exception {
        LoanCardMaster loanCardMaster = new LoanCardMaster();
        loanCardMaster.setDurationInYears(1);
        loanCardMaster.setLoanEmpCardDetails(new ArrayList<>());
        loanCardMaster.setLoanId("42");
        loanCardMaster.setLoanType("Loan Type");
        Optional<LoanCardMaster> ofResult = Optional.of(loanCardMaster);
        when(loanCardService.getLoanCard(Mockito.<String>any())).thenReturn(ofResult);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/getLoan/{id}", "42");
        MockMvcBuilders.standaloneSetup(loanCardController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "{\"loanId\":\"42\",\"loanType\":\"Loan Type\",\"durationInYears\":1,\"loanEmpCardDetails\":[]}"));
    }


    @Test
    void testGetLoanById2() throws Exception {
        Optional<LoanCardMaster> emptyResult = Optional.empty();
        when(loanCardService.getLoanCard(Mockito.<String>any())).thenReturn(emptyResult);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/getLoan/{id}", "42");
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(loanCardController)
                .build()
                .perform(requestBuilder);
        actualPerformResult.andExpect(MockMvcResultMatchers.status().isNotFound());
    }


    @Test
    void testUpdateLoan() throws Exception {
        LoanCardMaster loanCardMaster = new LoanCardMaster();
        loanCardMaster.setDurationInYears(1);
        loanCardMaster.setLoanEmpCardDetails(new ArrayList<>());
        loanCardMaster.setLoanId("42");
        loanCardMaster.setLoanType("Loan Type");
        Optional<LoanCardMaster> ofResult = Optional.of(loanCardMaster);

        LoanCardMaster loanCardMaster2 = new LoanCardMaster();
        loanCardMaster2.setDurationInYears(1);
        loanCardMaster2.setLoanEmpCardDetails(new ArrayList<>());
        loanCardMaster2.setLoanId("42");
        loanCardMaster2.setLoanType("Loan Type");
        when(loanCardService.addLoanCard(Mockito.<LoanCardMaster>any())).thenReturn(loanCardMaster2);
        when(loanCardService.getLoanCard(Mockito.<String>any())).thenReturn(ofResult);

        LoanCardMaster loanCardMaster3 = new LoanCardMaster();
        loanCardMaster3.setDurationInYears(1);
        loanCardMaster3.setLoanEmpCardDetails(new ArrayList<>());
        loanCardMaster3.setLoanId("42");
        loanCardMaster3.setLoanType("Loan Type");
        String content = (new ObjectMapper()).writeValueAsString(loanCardMaster3);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/addLoan/{id}", "42")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
        MockMvcBuilders.standaloneSetup(loanCardController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "{\"loanId\":\"42\",\"loanType\":\"Loan Type\",\"durationInYears\":1,\"loanEmpCardDetails\":[]}"));
    }


    @Test
    void testUpdateLoan2() throws Exception {
        LoanCardMaster loanCardMaster = new LoanCardMaster();
        loanCardMaster.setDurationInYears(1);
        loanCardMaster.setLoanEmpCardDetails(new ArrayList<>());
        loanCardMaster.setLoanId("42");
        loanCardMaster.setLoanType("Loan Type");
        when(loanCardService.addLoanCard(Mockito.<LoanCardMaster>any())).thenReturn(loanCardMaster);
        Optional<LoanCardMaster> emptyResult = Optional.empty();
        when(loanCardService.getLoanCard(Mockito.<String>any())).thenReturn(emptyResult);

        LoanCardMaster loanCardMaster2 = new LoanCardMaster();
        loanCardMaster2.setDurationInYears(1);
        loanCardMaster2.setLoanEmpCardDetails(new ArrayList<>());
        loanCardMaster2.setLoanId("42");
        loanCardMaster2.setLoanType("Loan Type");
        String content = (new ObjectMapper()).writeValueAsString(loanCardMaster2);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/addLoan/{id}", "42")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(loanCardController)
                .build()
                .perform(requestBuilder);
        actualPerformResult.andExpect(MockMvcResultMatchers.status().isNotFound());
    }


    @Test
    void testViewLoans() throws Exception {
        LoanCardMaster loanCardMaster = new LoanCardMaster();
        loanCardMaster.setDurationInYears(1);
        loanCardMaster.setLoanEmpCardDetails(new ArrayList<>());
        loanCardMaster.setLoanId("42");
        loanCardMaster.setLoanType("Loan Type");
        Optional<LoanCardMaster> ofResult = Optional.of(loanCardMaster);
        when(loanCardService.getLoanCardById(Mockito.<String>any())).thenReturn(ofResult);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/viewLoans/{id}", "42");
        MockMvcBuilders.standaloneSetup(loanCardController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "{\"loanId\":\"42\",\"loanType\":\"Loan Type\",\"durationInYears\":1,\"loanEmpCardDetails\":[]}"));
    }


    @Test
    void testViewLoans2() throws Exception {
        Optional<LoanCardMaster> emptyResult = Optional.empty();
        when(loanCardService.getLoanCardById(Mockito.<String>any())).thenReturn(emptyResult);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/viewLoans/{id}", "42");
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(loanCardController)
                .build()
                .perform(requestBuilder);
        actualPerformResult.andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}

