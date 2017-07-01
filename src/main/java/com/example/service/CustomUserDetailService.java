package com.example.service;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.UserDetailDAO;
import com.example.entity.Users;

@Service
public class CustomUserDetailService implements UserDetailsService {
	private static final Logger LOG = LoggerFactory.getLogger(CustomUserDetailService.class);
	@Autowired
	private UserDetailDAO userDetailDAO;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Users user = getUserDetails(username);
		if (user == null)
			throw new UsernameNotFoundException("User not found");
		return new User(user.getUserName(), user.getPassword(),
				user.getUserGroupses().stream().map((group) -> {
					return new SimpleGrantedAuthority(group.getGroupName());
				}).collect(Collectors.toList()));
	}

	@Transactional
	public Users getUserDetails(String username) {
		LOG.info("inside user details service");
		List<Users> users = userDetailDAO.findByUserName(username);
		if (!users.isEmpty())
			return users.get(0);
		else
			return null;
	}
}
