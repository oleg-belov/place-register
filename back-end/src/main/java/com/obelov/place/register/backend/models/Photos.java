package com.obelov.place.register.backend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Photos {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;
	private String miniaturePath;
	private String bannerPath;
	private String galeryPath;
	
	public Photos() {}

	public Photos(String miniaturePath, String bannerPath, String galeryPath) {
		this.miniaturePath = miniaturePath;
		this.bannerPath = bannerPath;
		this.galeryPath = galeryPath;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMiniaturePath() {
		return miniaturePath;
	}

	public void setMiniaturePath(String miniaturePath) {
		this.miniaturePath = miniaturePath;
	}

	public String getBannerPath() {
		return bannerPath;
	}

	public void setBannerPath(String bannerPath) {
		this.bannerPath = bannerPath;
	}

	public String getGaleryPath() {
		return galeryPath;
	}

	public void setGaleryPath(String galeryPath) {
		this.galeryPath = galeryPath;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((bannerPath == null) ? 0 : bannerPath.hashCode());
		result = prime * result + ((galeryPath == null) ? 0 : galeryPath.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((miniaturePath == null) ? 0 : miniaturePath.hashCode());
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
		Photos other = (Photos) obj;
		if (bannerPath == null) {
			if (other.bannerPath != null)
				return false;
		} else if (!bannerPath.equals(other.bannerPath))
			return false;
		if (galeryPath == null) {
			if (other.galeryPath != null)
				return false;
		} else if (!galeryPath.equals(other.galeryPath))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (miniaturePath == null) {
			if (other.miniaturePath != null)
				return false;
		} else if (!miniaturePath.equals(other.miniaturePath))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Photos [id=" + id + ", miniaturePath=" + miniaturePath + ", bannerPath=" + bannerPath + ", galeryPath="
				+ galeryPath + "]";
	}
}
