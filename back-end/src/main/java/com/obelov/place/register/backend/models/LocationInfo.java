package com.obelov.place.register.backend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class LocationInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;
	
	@NotNull
	@Size(max = 50)
	private String juridicName;
	
	@NotNull
	@Size(max = 50)
	private String comercialName;

	@NotNull
	@Size(max = 50)
	private String category;
	
	@NotNull
	@Size(max = 250)
	private String descriptionRo;
	
	@NotNull
	@Max(100)
	@Min(7)
	private int discount;
	
	@NotNull
	private boolean isBroningAvalible;
	
	@NotNull
	@Size(max = 50)
	private String averageComandPriceRange;
	
	@NotNull
	@Size(max = 250)
	private String descriptionRu;
	
	@OneToOne(fetch = FetchType.LAZY, mappedBy = "locationInfo")
	private Place place;
	
	public LocationInfo() {}
	
	public LocationInfo(String juridicName, String comercialName, String category, String descriptionRo, int discount,
			boolean isBroningAvalible, String averageComandPriceRange, String descriptionRu) {
		super();
		this.juridicName = juridicName;
		this.comercialName = comercialName;
		this.category = category;
		this.descriptionRo = descriptionRo;
		this.discount = discount;
		this.isBroningAvalible = isBroningAvalible;
		this.averageComandPriceRange = averageComandPriceRange;
		this.descriptionRu = descriptionRu;
	}
	
	public LocationInfo(String juridicName, String comercialName, String category, String descriptionRo, int discount,
			boolean isBroningAvalible, String averageComandPriceRange, String descriptionRu, Place place) {
		super();
		this.juridicName = juridicName;
		this.comercialName = comercialName;
		this.category = category;
		this.descriptionRo = descriptionRo;
		this.discount = discount;
		this.isBroningAvalible = isBroningAvalible;
		this.averageComandPriceRange = averageComandPriceRange;
		this.descriptionRu = descriptionRu;
		this.place = place;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getJuridicName() {
		return juridicName;
	}

	public void setJuridicName(String juridicName) {
		this.juridicName = juridicName;
	}

	public String getComercialName() {
		return comercialName;
	}

	public void setComercialName(String comercialName) {
		this.comercialName = comercialName;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getDescriptionRo() {
		return descriptionRo;
	}

	public void setDescriptionRo(String descriptionRo) {
		this.descriptionRo = descriptionRo;
	}

	public int getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	public boolean isBroningAvalible() {
		return isBroningAvalible;
	}

	public void setBroningAvalible(boolean isBroningAvalible) {
		this.isBroningAvalible = isBroningAvalible;
	}

	public String getAverageComandPriceRange() {
		return averageComandPriceRange;
	}

	public void setAverageComandPriceRange(String averageComandPriceRange) {
		this.averageComandPriceRange = averageComandPriceRange;
	}

	public String getDescriptionRu() {
		return descriptionRu;
	}

	public void setDescriptionRu(String descriptionRu) {
		this.descriptionRu = descriptionRu;
	}

	public Place getPlace() {
		return place;
	}

	public void setPlace(Place place) {
		this.place = place;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((averageComandPriceRange == null) ? 0 : averageComandPriceRange.hashCode());
		result = prime * result + ((category == null) ? 0 : category.hashCode());
		result = prime * result + ((comercialName == null) ? 0 : comercialName.hashCode());
		result = prime * result + ((descriptionRo == null) ? 0 : descriptionRo.hashCode());
		result = prime * result + ((descriptionRu == null) ? 0 : descriptionRu.hashCode());
		result = prime * result + discount;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + (isBroningAvalible ? 1231 : 1237);
		result = prime * result + ((juridicName == null) ? 0 : juridicName.hashCode());
		result = prime * result + ((place == null) ? 0 : place.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		LocationInfo other = (LocationInfo) obj;
		if (averageComandPriceRange == null) {
			if (other.averageComandPriceRange != null)
				return false;
		} else if (!averageComandPriceRange.equals(other.averageComandPriceRange))
			return false;
		if (category == null) {
			if (other.category != null)
				return false;
		} else if (!category.equals(other.category))
			return false;
		if (comercialName == null) {
			if (other.comercialName != null)
				return false;
		} else if (!comercialName.equals(other.comercialName))
			return false;
		if (descriptionRo == null) {
			if (other.descriptionRo != null)
				return false;
		} else if (!descriptionRo.equals(other.descriptionRo))
			return false;
		if (descriptionRu == null) {
			if (other.descriptionRu != null)
				return false;
		} else if (!descriptionRu.equals(other.descriptionRu))
			return false;
		if (discount != other.discount)
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (isBroningAvalible != other.isBroningAvalible)
			return false;
		if (juridicName == null) {
			if (other.juridicName != null)
				return false;
		} else if (!juridicName.equals(other.juridicName))
			return false;
		if (place == null) {
			if (other.place != null)
				return false;
		} else if (!place.equals(other.place))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "LocationInfo [id=" + id + ", juridicName=" + juridicName + ", comercialName=" + comercialName
				+ ", category=" + category + ", descriptionRo=" + descriptionRo + ", discount=" + discount
				+ ", isBroningAvalible=" + isBroningAvalible + ", averageComandPriceRange=" + averageComandPriceRange
				+ ", descriptionRu=" + descriptionRu + "]";
	}
}
