package com.obelov.place.register.backend.resorces;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.obelov.place.register.backend.services.MessageService;

@RestController
@RequestMapping("/messages")
public class MessagesResorce {
	@Autowired
    private MessageService messageService;

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<JSONObject> getMessages(
    		@CookieValue(name = "lang", defaultValue = "En") String lang){
    	JSONObject message = this.messageService.getMessages(lang);

    	if (message == null){
			return new ResponseEntity<JSONObject>(HttpStatus.NOT_FOUND);
		}
    	HttpHeaders headers = new HttpHeaders();
    	headers.add("Set-Cookie", "lang=" + lang);
    	headers.add("Access-Control-Allow-Origin", "*");
    	headers.add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
		headers.add("Access-Control-Max-Age", "3600");
		return new ResponseEntity<JSONObject>(message, headers, HttpStatus.OK);
    }
    
    @GetMapping(value = "/{lang}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<JSONObject> getMessagesChanged(
    		@PathVariable(name = "lang") String lang
    	){
    	JSONObject message = this.messageService.getMessages(lang);
    	if (message == null){
			return new ResponseEntity<JSONObject>(HttpStatus.NOT_FOUND);
		}
    	HttpHeaders headers = new HttpHeaders();
    	headers.add("Set-Cookie", "lang=" + lang);
    	headers.add("Access-Control-Allow-Origin", "*");
		return new ResponseEntity<JSONObject>(message, headers, HttpStatus.OK);
    }
}
