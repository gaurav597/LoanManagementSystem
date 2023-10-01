package com.wellsfargo.loanManagementSystem.controller;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@DisplayName("Testing AuthController")
@SpringBootTest
class AuthControllerTest {
	
	private AuthController authController;
	@BeforeEach
	void setUp() throws Exception {
		authController = new AuthController();
	}

	@AfterEach
	void tearDown() throws Exception {
		authController = null;
	}

	@Test
	void testGreet() {
		String response = authController.greet();
        assertEquals("Greetings from LMS", response);
    }
	

}
