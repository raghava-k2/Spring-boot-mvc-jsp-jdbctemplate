package com.example.controller;

import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {
	private static final Logger LOG = LoggerFactory.getLogger(EmployeeController.class);

	@RequestMapping("/getList")
	public List<String> getList() {
		LOG.info("inside controller");
		return Arrays.asList(new String[] { "raghava", "ravi" });
	}
}
