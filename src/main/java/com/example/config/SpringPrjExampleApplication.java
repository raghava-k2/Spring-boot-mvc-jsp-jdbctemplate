package com.example.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@ComponentScan({"com.example"})
@EnableWebMvc
public class SpringPrjExampleApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringPrjExampleApplication.class, args);
	}
}
