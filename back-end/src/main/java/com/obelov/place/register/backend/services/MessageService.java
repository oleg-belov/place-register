package com.obelov.place.register.backend.services;

import java.io.FileReader;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	public JSONObject getMessages(String lang) {
		JSONParser parser = new JSONParser();
		JSONObject jsonObject = null;
        try {
        	jsonObject = (JSONObject) parser.parse(
        			new FileReader(
        					getClass().getClassLoader()
        						.getResource(this.getMessageFileName(lang))
        							.getPath()
        			));
 
        } catch (Exception e) {
        	logger.error(e.getMessage());
        }
        
		return jsonObject;
	}
	
	private String getMessageFileName(String lang) {
		String result = "messages.json";
		switch(lang) {
			case "Ru" : result = "messages_ru.json";
			break;
			case "Ro" : result = "messages_ro.json";
		}
		
		return result;
	}
}
