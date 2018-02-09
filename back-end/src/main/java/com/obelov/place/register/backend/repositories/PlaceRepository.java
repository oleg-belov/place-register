package com.obelov.place.register.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.obelov.place.register.backend.models.Place;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
}
