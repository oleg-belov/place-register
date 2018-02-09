package com.obelov.place.register.backend.resorces;

import java.util.ArrayList;
import java.util.Collection;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.obelov.place.register.backend.models.User;
import com.obelov.place.register.backend.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Collection<User>> getUsers(){
    	Collection<User> users = new ArrayList<User>();
    	users.addAll(this.userService.findAllUsers());
		
		if (users.isEmpty()){
			return new ResponseEntity<Collection<User>>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Collection<User>>(users, HttpStatus.OK);
    }
    
    @GetMapping(value = "/check", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Void> checkEmail(@RequestParam("email") String userEmail) {
    	boolean exist = this.userService.checkIfExist(userEmail);
    	
    	if(exist) {
    		return new ResponseEntity<Void>(HttpStatus.FOUND);
    	}
    			
    	return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
    }
    
    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<User> addUser(@RequestBody @Valid User user, BindingResult bindingResult){
		BindingErrorsResponse errors = new BindingErrorsResponse();
		HttpHeaders headers = new HttpHeaders();
		
		if(bindingResult.hasErrors() || (user == null)){
			errors.addAllErrors(bindingResult);
			headers.add("errors", errors.toJSON());
			
			return new ResponseEntity<User>(headers, HttpStatus.BAD_REQUEST);
		}
		
		user = this.userService.saveUser(user);
		
		return new ResponseEntity<User>(user, headers, HttpStatus.CREATED);
	}
}
