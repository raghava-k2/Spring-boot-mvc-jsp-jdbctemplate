package com.example.entity;
// Generated Jan 25, 2017 4:22:34 PM by Hibernate Tools 5.2.0.CR1

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * UserGroups generated by hbm2java
 */
@Entity
@Table(name = "USER_GROUPS", schema = "VIJAYA")
public class UserGroups implements java.io.Serializable {

	private BigDecimal groupId;
	private Users users;
	private String groupName;
	private String groupDesc;
	private Serializable createdDate;
	private Serializable modifiedDate;

	public UserGroups() {
	}

	public UserGroups(BigDecimal groupId, Users users, String groupName, Serializable createdDate,
			Serializable modifiedDate) {
		this.groupId = groupId;
		this.users = users;
		this.groupName = groupName;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
	}

	public UserGroups(BigDecimal groupId, Users users, String groupName, String groupDesc, Serializable createdDate,
			Serializable modifiedDate) {
		this.groupId = groupId;
		this.users = users;
		this.groupName = groupName;
		this.groupDesc = groupDesc;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
	}

	@Id

	@Column(name = "GROUP_ID", unique = true, nullable = false, precision = 22, scale = 0)
	public BigDecimal getGroupId() {
		return this.groupId;
	}

	public void setGroupId(BigDecimal groupId) {
		this.groupId = groupId;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_ID", nullable = false)
	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	@Column(name = "GROUP_NAME", nullable = false, length = 100)
	public String getGroupName() {
		return this.groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	@Column(name = "GROUP_DESC", length = 1000)
	public String getGroupDesc() {
		return this.groupDesc;
	}

	public void setGroupDesc(String groupDesc) {
		this.groupDesc = groupDesc;
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

}
