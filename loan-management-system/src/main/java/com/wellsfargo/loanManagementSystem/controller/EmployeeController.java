package com.wellsfargo.loanManagementSystem.controller;

import com.wellsfargo.loanManagementSystem.exception.ResourceNotFoundException;
import com.wellsfargo.loanManagementSystem.model.*;
import com.wellsfargo.loanManagementSystem.repository.EmployeeRepository;
import com.wellsfargo.loanManagementSystem.repository.ItemRepository;
import com.wellsfargo.loanManagementSystem.service.EmployeeService;

import org.antlr.v4.runtime.misc.Pair;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

//@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @Autowired
    EmployeeRepository employeeRepository;

    @PostMapping("/register")
    public ResponseEntity<String> createEmployee(@Validated @RequestBody EmployeeMaster empMas)
    {
        try{
            EmployeeMaster e = employeeService.addEmployee(empMas);
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
    public Pair<Boolean, String[] >loginDealer(@Validated @RequestBody EmployeeMaster e) throws ResourceNotFoundException
    {
        Boolean isLoggedin = false;

        String id = e.getEmployeeId();
        String password = e.getPassword();

        EmployeeMaster employee = employeeService.getEmployee(id).orElseThrow(()->new ResourceNotFoundException("Employee not found for this id."));

        if(id.equals(employee.getEmployeeId()) && password.equals(employee.getPassword()))
        {
            isLoggedin = true;
        }
        String [] arr =new String [] {employee.getDesignation(), employee.getDepartment()};
        return new Pair <Boolean,String[]> (isLoggedin, arr);
    }

    @PostMapping("/addCustomer")
    public ResponseEntity<String> addCustomer(@Validated @RequestBody EmployeeMaster empMaster)
    {
        try{
            EmployeeMaster employee = employeeService.addEmployee(empMaster);
            if(employee!=null)
            {
                return ResponseEntity.ok("Added customer successfully.");
            }
            else
            {
                return ResponseEntity.badRequest().body("Couldn't add customer.");
            }
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error ocurred: "+e.getMessage());
        }
    }

    @GetMapping("/getCustomer")
    public ResponseEntity<List<EmployeeMaster>> getCustomer()
    {
		try
		{
	        List<EmployeeMaster> employees=employeeService.getEmployees();
			return ResponseEntity.ok(employees);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
    }
 

    @DeleteMapping("/deleteCustomer/{id}")
    public String deleteCustomer(@PathVariable String id){
        employeeService.deleteEmployee(id);
        return "Employee Deleted";
    }
 
	@GetMapping("/getCustomer/{id}")
	public ResponseEntity<EmployeeMaster> getProductById(@PathVariable(value="id") String empId) throws ResourceNotFoundException
	{
		EmployeeMaster e = employeeService.getEmployee(empId).orElseThrow(()->new ResourceNotFoundException("Employee not found for this Id: "+empId));
		return ResponseEntity.ok().body(e);
	}

	 //Open PostMan, make a PUT Request - http://localhost:8085/ims/api/products/1003
    //Select body -> raw -> JSON 
    //Update JSON product object with new Values.
	@PutMapping("/addCustomer/{id}")
	public ResponseEntity<EmployeeMaster> updateProduct(@PathVariable(value="id") String empId, @Validated @RequestBody EmployeeMaster e) throws ResourceNotFoundException
	{
		EmployeeMaster employee = employeeService.getEmployee(empId).orElseThrow(()->new ResourceNotFoundException("Employee not found for this Id: "+empId));

		//Update product with new values
//		employee.setEmployeeId(e.getEmployeeId());
		employee.setEmployeeName(e.getEmployeeName());
		employee.setGender(e.getGender());
		employee.setDesignation(e.getDesignation());
		employee.setDateOfBirth(e.getDateOfBirth());
		employee.setDateOfJoin(e.getDateOfJoin());
		employee.setDepartment(e.getDepartment());

		final EmployeeMaster updatedEmployee = employeeService.addEmployee(employee);
		return ResponseEntity.ok().body(updatedEmployee);
	}

    @PutMapping("/updateCustomer")
    public String updateCustomer(@RequestBody EmployeeMaster employeeMaster){
        EmployeeMaster existingEmployee = employeeRepository.findById(employeeMaster.getEmployeeId())
                        .orElseThrow(() -> new org.springframework.data.rest.webmvc.ResourceNotFoundException("Employee not found with id:" + employeeMaster.getEmployeeId()));
        existingEmployee.setEmployeeName(employeeMaster.getEmployeeName());
        existingEmployee.setDesignation(employeeMaster.getDesignation());
        existingEmployee.setGender(employeeMaster.getGender());
        existingEmployee.setDateOfBirth(employeeMaster.getDateOfBirth());
        existingEmployee.setDateOfJoin(employeeMaster.getDateOfJoin());

        employeeRepository.save(existingEmployee);
        return "Employee saved";
    }

    @PostMapping("/itemsPurchased")
    public List<ItemMaster> itemsPurchased(@RequestBody String eId){
        String empId = eId.substring(0, eId.length()-1);
        System.out.println(empId);
        return employeeService.itemsPurchased(empId);
    }
}