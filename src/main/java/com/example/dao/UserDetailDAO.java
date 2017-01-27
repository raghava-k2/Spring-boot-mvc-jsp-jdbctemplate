package com.example.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.example.entity.Users;

@Repository
public class UserDetailDAO {
	private static final Logger LOG = LoggerFactory.getLogger(UserDetailDAO.class);
	@Autowired
	private HibernateTemplate hibernateTemplate;

	@SuppressWarnings("unchecked")
	public List<Users> findByUserName() {
		Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(Users.class);
		criteria.add(Restrictions.eq("userName", "raghava"));
		return criteria.list();
	}
}
