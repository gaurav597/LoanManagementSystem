package com.wellsfargo.loanManagementSystem.exception;

import org.springframework.http.HttpStatus;

public class CustomException extends Exception{
    private static final long serialVersionUID = 1L;

    private HttpStatus statusCode;

    public CustomException(String message, HttpStatus statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return  super.getMessage();
    }

    public HttpStatus getStatusCode(){
        return this.statusCode;
    }
}
