package com.wellsfargo.loanManagementSystem.model;

import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name="employee_master_tbl")
public class EmployeeMaster {

	@SequenceGenerator(name="emp_seq",initialValue=1, allocationSize=1)
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY, generator="emp_seq")
	@Column(name="employee_id")
	private long eid;
	
	@Column(name="employee_name")
	private String ename;
	
	@Column
	private String designation; 
	
	@Column
	private String department;
	
	@Column
	private char gender;
	
	@Column(name="date_of_birth")
	private Date dob;
	
	@Column(name="date_of_joining")
	private Date doj;

	public EmployeeMaster() {
		super();
		// TODO Auto-generated constructor stub
	}

	public EmployeeMaster(long eid, String ename, String designation, String department, char gender, Date dob,
			Date doj) {
		super();
		this.eid = eid;
		this.ename = ename;
		this.designation = designation;
		this.department = department;
		this.gender = gender;
		this.dob = dob;
		this.doj = doj;
	}

	public long getEid() {
		return eid;
	}

	public void setEid(long eid) {
		this.eid = eid;
	}

	public String getEname() {
		return ename;
	}

	public void setEname(String ename) {
		this.ename = ename;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public char getGender() {
		return gender;
	}

	public void setGender(char gender) {
		this.gender = gender;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public Date getDoj() {
		return doj;
	}

	public void setDoj(Date doj) {
		this.doj = doj;
	}
	
	

}
