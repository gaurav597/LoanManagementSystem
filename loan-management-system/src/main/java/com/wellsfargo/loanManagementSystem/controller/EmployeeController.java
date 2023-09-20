package com.wellsfargo.loanManagementSystem.controller;

import com.wellsfargo.loanManagementSystem.exception.ResourceNotFoundException;
import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.model.LoanCardMaster;
import com.wellsfargo.loanManagementSystem.service.EmployeeService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;
    @PostMapping("/register")
    public ResponseEntity<String> createEmployee(@Validated @RequestBody EmployeeMaster empMas)
    {
        try{
            EmployeeMaster e = employeeService.registerEmployee(empMas);
            if(e!=null)
            {
                return ResponseEntity.ok("Registration Successfull");
            }
            else
            {
                return ResponseEntity.badRequest().body("Registration Failed");
            }
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error ocurred: "+e.getMessage());
        }
    }

    @PostMapping("/login")
    public Boolean loginDealer(@Validated @RequestBody EmployeeMaster e) throws ResourceNotFoundException
    {
        Boolean isLoggedin = false;

        String id = e.getEmployeeId();
        String password = e.getPassword();

        EmployeeMaster employee = employeeService.loginEmployee(id).orElseThrow(()->new ResourceNotFoundException("Employee not found for this id."));

        if(id.equals(employee.getEmployeeId()) && password.equals(employee.getPassword()))
        {
            isLoggedin = true;
        }

        return isLoggedin;
    }

    @PostMapping("/addCustomer")
    public String addCustomer(@Validated @RequestBody EmployeeMaster empMaster){
        employeeService.addEmployee(empMaster);
        return "Customer added";
    }

    @GetMapping("/getCustomer")
    public ResponseEntity<List<EmployeeMaster>> getCustomer(){
        List<EmployeeMaster> e=employeeService.getEmployee();
        return new ResponseEntity<List<EmployeeMaster>>(e, HttpStatus.OK);
    }

    @DeleteMapping("/deleteCustomer/{id}")
    public String deleteCustomer(@PathVariable String id){
        employeeService.deleteEmployee(id);
        return "Employee Deleted";
    }




}