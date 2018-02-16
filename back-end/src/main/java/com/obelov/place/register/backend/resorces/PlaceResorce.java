package com.obelov.place.register.backend.resorces;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
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
	
	@PostMapping(value = "/upload", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Object> uploadImage(@RequestParam("file") MultipartFile file,
    		UriComponentsBuilder ucBuilder) throws IOException {
		this.placeService.saveImage(file);
		String url = ucBuilder
				.path("/places/dowland/{name}")
				.buildAndExpand(file.getOriginalFilename())
				.toUri()
				.toString();
    	Map<String, String> map = new HashMap<>();
    	map.put("imgUrl", url);
    	
    	return new ResponseEntity<Object>(map, HttpStatus.OK);
    }
	
	@GetMapping(value = "/dowland/{name:.+}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public ResponseEntity<Resource> downladImage(@PathVariable("name") String fileName) throws FileNotFoundException {
		File file =  this.placeService.getDowlangImage(fileName);
		InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

	    return ResponseEntity.ok()
	            .contentLength(file.length())
	            .contentType(MediaType.parseMediaType("application/octet-stream"))
	            .body(resource);
    }
}