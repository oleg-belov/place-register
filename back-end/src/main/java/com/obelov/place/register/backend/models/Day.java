package com.obelov.place.register.backend.models;

import java.time.DayOfWeek;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Pattern;

@Entity
public class Day {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;
	
	@Enumerated(EnumType.STRING)
	private DayOfWeek dayName;
	
	@Pattern(regexp = "\\d{2}:\\d{2}")
	private String openFrom;
	
	@Pattern(regexp = "\\d{2}:\\d{2}")
	private String openTo;
	
	private boolean is24of24;
	
	private boolean isClosed;
	
	public Day() {}

	public Day(DayOfWeek dayName, String openFrom, String openTo, boolean is24of24, boolean isClosed) {
		this.dayName = dayName;
		this.openFrom = openFrom;
		this.openTo = openTo;
		this.is24of24 = is24of24;
		this.isClosed = isClosed;
	}
	
	public Day(Long id, DayOfWeek dayName, String openFrom, String openTo, boolean is24of24, boolean isClosed) {
		this.id = id;
		this.dayName = dayName;
		this.openFrom = openFrom;
		this.openTo = openTo;
		this.is24of24 = is24of24;
		this.isClosed = isClosed;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public DayOfWeek getDayName() {
		return dayName;
	}

	public void setDayName(DayOfWeek dayName) {
		this.dayName = dayName;
	}

	public String getOpenFrom() {
		return openFrom;
	}

	public void setOpenFrom(String openFrom) {
		this.openFrom = openFrom;
	}

	public String getOpenTo() {
		return openTo;
	}

	public void setOpenTo(String openTo) {
		this.openTo = openTo;
	}

	public boolean isIs24of24() {
		return is24of24;
	}

	public void setIs24of24(boolean is24of24) {
		this.is24of24 = is24of24;
	}

	public boolean isClosed() {
		return isClosed;
	}

	public void setClosed(boolean isClosed) {
		this.isClosed = isClosed;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((dayName == null) ? 0 : dayName.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + (is24of24 ? 1231 : 1237);
		result = prime * result + (isClosed ? 1231 : 1237);
		result = prime * result + ((openFrom == null) ? 0 : openFrom.hashCode());
		result = prime * result + ((openTo == null) ? 0 : openTo.hashCode());
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
		Day other = (Day) obj;
		if (dayName != other.dayName)
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (is24of24 != other.is24of24)
			return false;
		if (isClosed != other.isClosed)
			return false;
		if (openFrom == null) {
			if (other.openFrom != null)
				return false;
		} else if (!openFrom.equals(other.openFrom))
			return false;
		if (openTo == null) {
			if (other.openTo != null)
				return false;
		} else if (!openTo.equals(other.openTo))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Day [id=" + id + ", dayName=" + dayName + ", openFrom=" + openFrom + ", openTo=" + openTo
				+ ", is24of24=" + is24of24 + ", isClosed=" + isClosed + "]";
	}
}
