package com.wellsfargo.loanManagementSystem.service;

import com.wellsfargo.loanManagementSystem.model.EmployeeMaster;
import com.wellsfargo.loanManagementSystem.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private  EmployeeRepository erepo;

    public EmployeeMaster registerEmployee(EmployeeMaster e)
    {
        return erepo.save(e);
    }

    public Optional<EmployeeMaster> loginEmployee(String id)
    {
        return erepo.findById(id); //Invokes custom method
    }

    public void addEmployee(EmployeeMaster e){
        erepo.save(e);
    }
}