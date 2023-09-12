package com.wellsfargo.training.IMS.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.IMS.exception.ResourceNotFoundException;
import com.wellsfargo.training.IMS.model.Address;
import com.wellsfargo.training.IMS.model.Dealer;
import com.wellsfargo.training.IMS.service.DealerService;

@RestController
@RequestMapping(value="/api")
public class DealerController {

	@Autowired
	private DealerService dservice;

	/* ResponseEntity represents an HTTP response, including headers, body, and status. */

	@PostMapping("/register")
	public ResponseEntity<String> createDealer(@Validated @RequestBody Dealer dealer)
	{
		try
		{
			Address address = dealer.getAddress();
			
			//Establish a bidirectional 1-1 mapping
			address.setDealer(dealer);
			dealer.setAddress(address);

			Dealer d = dservice.registerDealer(dealer);
			if(d!=null)
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

	//Open Postman and make POST request with email & password - http://localhost:8085/ims/api/login
	@PostMapping("/login")
	public Boolean loginDealer(@Validated @RequestBody Dealer d) throws ResourceNotFoundException
	{
		Boolean isLoggedin = false;

		String email = d.getEmail();
		String password = d.getPassword();

		Dealer dealer = dservice.loginDealer(email).orElseThrow(()->new ResourceNotFoundException("Dealer not found for this email id."));
	
		if(email.equals(dealer.getEmail()) && password.equals(dealer.getPassword()))
		{
			isLoggedin = true;
		}

		return isLoggedin;
	}
}
