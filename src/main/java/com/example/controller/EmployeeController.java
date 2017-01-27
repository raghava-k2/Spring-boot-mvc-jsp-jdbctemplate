package com.example.controller;

import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class EmployeeController {
	private static final Logger LOG = LoggerFactory.getLogger(EmployeeController.class);
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private HibernateTemplate hibernateTemplate;

	@RequestMapping("/getList")
	public List<String> getList() {
		LOG.info("inside controller" + jdbcTemplate.toString());
		LOG.info("inside controller hbernate object :" + hibernateTemplate.toString());
		return Arrays.asList(new String[] { "raghava", "ravi" });
	}

	@RequestMapping("/gotohome")
	public ModelAndView getToHome() {
		LOG.info("inside go To Home ");
		return new ModelAndView("home");
	}

	@RequestMapping("/login")
	public ModelAndView getToLogin() {
		LOG.info("inside login controller");
		return new ModelAndView("login");
	}
}
