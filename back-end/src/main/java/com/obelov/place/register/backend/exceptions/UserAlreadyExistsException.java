package com.obelov.place.register.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_FOUND, reason="This User Already Exists...")
public class UserAlreadyExistsException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	
	public UserAlreadyExistsException() {
        super();
    }
    public UserAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
    public UserAlreadyExistsException(String message) {
        super(message);
    }
    public UserAlreadyExistsException(Throwable cause) {
        super(cause);
    }
}
