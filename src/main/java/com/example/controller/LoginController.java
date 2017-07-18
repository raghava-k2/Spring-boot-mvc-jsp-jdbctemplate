package com.example.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
	private static final Logger LOG = LoggerFactory.getLogger(LoginController.class);

	@GetMapping("/login")
	public @ResponseBody String login() {
		LOG.info("Successfully Logged ");
		return "success";
	}
}
