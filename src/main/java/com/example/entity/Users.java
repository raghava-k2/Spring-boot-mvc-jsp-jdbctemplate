package com.example.entity;
// Generated Jan 25, 2017 4:22:34 PM by Hibernate Tools 5.2.0.CR1

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Users generated by hbm2java
 */
@Entity
@Table(name = "USERS", schema = "VIJAYA")
public class Users implements java.io.Serializable {

	private BigDecimal userId;
	private String userName;
	private String password;
	private String active;
	private Serializable createdDate;
	private Serializable modifiedDate;
	private Set<UserGroups> userGroupses = new HashSet<UserGroups>(0);

	public Users() {
	}

	public Users(BigDecimal userId, String userName, String password, String active, Serializable createdDate,
			Serializable modifiedDate) {
		this.userId = userId;
		this.userName = userName;
		this.password = password;
		this.active = active;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
	}

	public Users(BigDecimal userId, String userName, String password, String active, Serializable createdDate,
			Serializable modifiedDate, Set<UserGroups> userGroupses) {
		this.userId = userId;
		this.userName = userName;
		this.password = password;
		this.active = active;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.userGroupses = userGroupses;
	}

	@Id

	@Column(name = "USER_ID", unique = true, nullable = false, precision = 22, scale = 0)
	public BigDecimal getUserId() {
		return this.userId;
	}

	public void setUserId(BigDecimal userId) {
		this.userId = userId;
	}

	@Column(name = "USER_NAME", nullable = false, length = 100)
	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Column(name = "PASSWORD", nullable = false, length = 100)
	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "ACTIVE", nullable = false, length = 1)
	public String getActive() {
		return this.active;
	}

	public void setActive(String active) {
		this.active = active;
	}

	@Column(name = "CREATED_DATE", nullable = false)
	public Serializable getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Serializable createdDate) {
		this.createdDate = createdDate;
	}

	@Column(name = "MODIFIED_DATE", nullable = false)
	public Serializable getModifiedDate() {
		return this.modifiedDate;
	}

	public void setModifiedDate(Serializable modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "users")
	public Set<UserGroups> getUserGroupses() {
		return this.userGroupses;
	}

	public void setUserGroupses(Set<UserGroups> userGroupses) {
		this.userGroupses = userGroupses;
	}

}
