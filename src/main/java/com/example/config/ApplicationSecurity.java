package com.example.config;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.authentication.www.DigestAuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.DigestAuthenticationFilter;

@Configuration
public class ApplicationSecurity extends WebSecurityConfigurerAdapter {
	private static final Logger LOG = LoggerFactory.getLogger(ApplicationSecurity.class);

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		LOG.info(auth.toString());
		auth.userDetailsService(userDetailsService());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		LOG.info(http.toString());
		http.authorizeRequests().antMatchers("/").permitAll().anyRequest().authenticated().and()
				.addFilterAfter(digestAuthenticationFilter(), BasicAuthenticationFilter.class);
		/*
		 * httpBasic().and()
		 * .csrf().ignoringAntMatchers("/").csrfTokenRepository(
		 * CookieCsrfTokenRepository.withHttpOnlyFalse());
		 */
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		LOG.info(web.toString());
		super.configure(web);
	}

	@Override
	protected UserDetailsService userDetailsService() {
		LOG.info("inside user details service");
		return username -> new User("raghava", "raghava", Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
	}

	@Bean
	public DigestAuthenticationEntryPoint digestEntryPoint() {
		DigestAuthenticationEntryPoint digestAuthenticationEntryPoint = new DigestAuthenticationEntryPoint();
		digestAuthenticationEntryPoint.setKey("gli");
		digestAuthenticationEntryPoint.setRealmName("Gli_Rest_Realm");
		digestAuthenticationEntryPoint.setNonceValiditySeconds(10);
		return digestAuthenticationEntryPoint;
	}

	@Bean
	public DigestAuthenticationFilter digestAuthenticationFilter() {
		DigestAuthenticationFilter digestAuthenticationFilter = new DigestAuthenticationFilter();
		digestAuthenticationFilter.setAuthenticationEntryPoint(digestEntryPoint());
		digestAuthenticationFilter.setUserDetailsService(userDetailsService());
		return digestAuthenticationFilter;
	}
}
