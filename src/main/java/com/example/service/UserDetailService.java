package com.example.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dao.UserDetailDAO;
import com.example.entity.Users;

@Service
public final class UserDetailService {
	private static final Logger LOG = LoggerFactory.getLogger(UserDetailService.class);
	@Autowired
	private UserDetailDAO userDetailDAO;

	public Users getUserDetails() {
		LOG.info("inside user details service");
		List<Users> users = userDetailDAO.findByUserName();
		if (!users.isEmpty())
			return users.get(0);
		else
			return null;
	}
}
