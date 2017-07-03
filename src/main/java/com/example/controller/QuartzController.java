package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.JSONData;
import com.example.model.JobInfo;
import com.example.service.SchedulerService;

@RestController
public class QuartzController {
	@Autowired
	private SchedulerService schedulerService;

	@GetMapping("/jobdetails")
	public List<JobInfo> jobDetails(String jobName) {
		return schedulerService.getJobDetails(jobName);
	}

	@RequestMapping(path = "/createjob", method = RequestMethod.POST)
	public JSONData createJob(JobInfo info) {
		return schedulerService.createNewJob(info);
	}

	@RequestMapping(path = "/updatejob", method = RequestMethod.POST)
	public JSONData updateJob(JobInfo info) {
		return schedulerService.updateJobDetails(info);
	}

	@RequestMapping(path = "/deletejob", method = RequestMethod.POST)
	public JSONData deleteJob(List<String> clientIds) {
		return schedulerService.deleteJobs(clientIds);
	}
}
