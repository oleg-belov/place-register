package com.obelov.place.register.backend.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.obelov.place.register.backend.models.Place;
import com.obelov.place.register.backend.repositories.PlaceRepository;

@Service
public class PlaceService {
	
	@Autowired
	private PlaceRepository placeRepository;
	
	public Place savePlace(Place place) {
		return this.placeRepository.saveAndFlush(place);
	}

	public Place findPlaceById(long placeId) {
		return this.placeRepository.getOne(placeId);
	}

	public Collection<Place> findAllPlaces() {
		return this.placeRepository.findAll();
	}
}
