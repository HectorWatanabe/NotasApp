package com.hectorservicios.models;

import java.time.LocalDateTime;

public class Nota {

	private String title;
	private String description;
	private LocalDateTime createdAt;

	public Nota(String title, String description, LocalDateTime createdAt) {
		this.title = title;
		this.description = description;
		this.createdAt = createdAt;
	}

	/**
	 * @return String return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * @return String return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return LocalDateTime return the createdAt
	 */
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	/**
	 * @param createdAt the createdAt to set
	 */
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

}