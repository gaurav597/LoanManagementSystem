package com.wellsfargo.loanManagementSystem.service;

import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private  EmployeeRepository erepo;

    public Optional<EmployeeMaster> getEmployee(String id)
    {
        return erepo.findById(id); //Invokes custom method
    }

    public EmployeeMaster addEmployee(EmployeeMaster e){
        return erepo.save(e);
    }

    public List<EmployeeMaster> getEmployees(){
        return erepo.findAll();
    }
   

    public void deleteEmployee(String empId){
        erepo.deleteById(empId);
    }

}