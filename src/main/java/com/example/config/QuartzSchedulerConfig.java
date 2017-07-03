package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

@Configuration
public class QuartzSchedulerConfig {
	@Bean
	public SchedulerFactoryBean schedulerFactoryBean() {
		SchedulerFactoryBean schedulerFactoryBean = new SchedulerFactoryBean();
		schedulerFactoryBean.setAutoStartup(true);
		schedulerFactoryBean.setConfigLocation(new ClassPathResource("quartz.properties"));
		schedulerFactoryBean.setPhase(1);
		schedulerFactoryBean.setWaitForJobsToCompleteOnShutdown(true);
		return schedulerFactoryBean;
	}

}
