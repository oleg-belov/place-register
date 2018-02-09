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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.obelov.place.register.backend.models.Place;
import com.obelov.place.register.backend.services.PlaceService;

@RestController
@RequestMapping("/places")
public class PlaceResorce {
	@Autowired
	private PlaceService placeService;
	
	@PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Place> addVisit(@RequestBody @Valid Place place, BindingResult bindingResult, UriComponentsBuilder ucBuilder){
		BindingErrorsResponse errors = new BindingErrorsResponse();
		HttpHeaders headers = new HttpHeaders();
		if(bindingResult.hasErrors() || (place == null)){
			errors.addAllErrors(bindingResult);
			headers.add("errors", errors.toJSON());
			
			return new ResponseEntity<Place>(headers, HttpStatus.BAD_REQUEST);
		}
		place = this.placeService.savePlace(place);
		headers.setLocation(ucBuilder.path("/place/{id}").buildAndExpand(place.getId()).toUri());
		
		return new ResponseEntity<Place>(place, headers, HttpStatus.CREATED);
	}
	
	@GetMapping(value = "/{placeId}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Place> getPlace(@PathVariable("placeId") int placeId){
		Place visit = this.placeService.findPlaceById(placeId);
		
		if(visit == null){
			return new ResponseEntity<Place>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Place>(visit, HttpStatus.OK);
	}
	
	@GetMapping(value = "", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Collection<Place>> getAllPlaces(){
		Collection<Place> visits = new ArrayList<Place>();
		visits.addAll(this.placeService.findAllPlaces());
		
		if (visits.isEmpty()){
			return new ResponseEntity<Collection<Place>>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Collection<Place>>(visits, HttpStatus.OK);
	}
}