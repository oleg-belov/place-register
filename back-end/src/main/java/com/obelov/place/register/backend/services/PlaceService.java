package com.obelov.place.register.backend.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

	public void saveImage(MultipartFile file) throws IOException {
		File resourcesDirectory = new File("src/main/resources");

        byte[] bytes = file.getBytes();
        Path path = Paths.get(resourcesDirectory.getPath() + "/" + file.getOriginalFilename());
        Files.write(path, bytes);
	}

	public File getDowlangImage(String fileName) {
		System.out.println(fileName);
		return new File(getClass()
				.getClassLoader()
        		.getResource(fileName).getPath());
	}
}
