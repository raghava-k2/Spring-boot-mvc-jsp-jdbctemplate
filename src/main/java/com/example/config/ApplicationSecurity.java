package com.example.config;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;

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
		http.authorizeRequests().antMatchers("/").permitAll().antMatchers("/user/createuser").permitAll()
				.antMatchers("/static/**").permitAll().anyRequest().authenticated().and().httpBasic().and()
				.sessionManagement().disable();
		http.addFilterBefore(new WebSecurityCorsFilter(), ChannelProcessingFilter.class);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		LOG.info(web.toString());
		super.configure(web);
	}

	public class WebSecurityCorsFilter implements Filter {
		@Override
		public void init(FilterConfig filterConfig) throws ServletException {
		}

		@Override
		public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
				throws IOException, ServletException {
			HttpServletResponse res = (HttpServletResponse) response;
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
			res.setHeader("Access-Control-Max-Age", "3600");
			res.setHeader("Access-Control-Allow-Headers",
					"Authorization, Content-Type, Accept, x-requested-with, Cache-Control");
			chain.doFilter(request, res);
		}

		@Override
		public void destroy() {
		}
	}
}
