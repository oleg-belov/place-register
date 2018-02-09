package com.obelov.place.register.backend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Entity
public class Place {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;
	
	@NotNull
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="location_info_id")
	private LocationInfo locationInfo;
	
	@NotNull
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="contact_data_id")
	private ContactData contactData;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
