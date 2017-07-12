package com.example.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dao.UserDetailDAO;
import com.example.model.UserInfo;

@Service
public class UserService {
	@Autowired
	private UserDetailDAO userDetailDAO;

	@Transactional
	public String createUser(UserInfo info) {
		userDetailDAO.saveUser(info);
		return "success";
	}
}
