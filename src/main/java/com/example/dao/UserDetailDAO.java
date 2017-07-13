package com.example.dao;

import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.example.entity.UserGroups;
import com.example.entity.Users;
import com.example.model.UserInfo;

@Repository
public class UserDetailDAO {
	private static final Logger LOG = LoggerFactory.getLogger(UserDetailDAO.class);
	@Autowired
	private HibernateTemplate hibernateTemplate;

	@SuppressWarnings("unchecked")
	public List<Users> findByUserName(String userName) {
		LOG.info("Inside FindByUserName");
		Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(Users.class);
		criteria.add(Restrictions.eq("userName", userName));
		return criteria.list();
	}

	public void saveUser(UserInfo info) {
		LOG.info("Inside saveUsergroup method");
		Users users = new Users();
		users.setUserName(info.getUserName());
		users.setPassword(info.getPassword());
		users.setActive("Y");
		users.setCreatedDate(new Date());
		users.setModifiedDate(new Date());
		users.setUserGroupses(new HashSet<UserGroups>(Arrays.asList(setUserGroups(users))));
		hibernateTemplate.getSessionFactory().getCurrentSession().save(users);
	}

	private UserGroups setUserGroups(Users user) {
		UserGroups groups = new UserGroups();
		groups.setGroupName("USER");
		groups.setGroupDesc("User group");
		groups.setCreatedDate(new Date());
		groups.setModifiedDate(new Date());
		groups.setUsers(user);
		return groups;
	}
}
