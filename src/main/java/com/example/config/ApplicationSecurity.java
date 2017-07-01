package com.example.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import com.example.service.CustomUserDetailService;

@Configuration
public class ApplicationSecurity extends WebSecurityConfigurerAdapter {
	private static final Logger LOG = LoggerFactory.getLogger(ApplicationSecurity.class);
	@Autowired
	private CustomUserDetailService customUserDetailService;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		LOG.info(auth.toString());
		auth.userDetailsService(customUserDetailService);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		LOG.info(http.toString());
		http.csrf().disable();
		http.authorizeRequests().antMatchers("/").permitAll().anyRequest().authenticated().and().httpBasic().and()
				.sessionManagement().disable();
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		LOG.info(web.toString());
		super.configure(web);
	}
}
