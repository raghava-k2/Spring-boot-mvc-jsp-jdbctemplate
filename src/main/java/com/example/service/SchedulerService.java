package com.example.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dao.CreateJobInfoDAO;
import com.example.model.JSONData;
import com.example.model.JobInfo;
import com.example.util.StringUtil;

@Service
public class SchedulerService {
	@Autowired
	private CreateJobInfoDAO createJobInfoDAO;

	@Transactional
	public JSONData createNewJob(JobInfo info) {
		JSONData data = new JSONData();
		data.setMsg(createJobInfoDAO.createJobforUser(info));
		if (data.getMsg() != null)
			data.setStatus("failure");
		else
			data.setStatus("success");
		return data;
	}

	@Transactional
	public List<JobInfo> getJobDetails(String jobName) {
		return createJobInfoDAO.getJobDetailsByName(jobName);
	}

	@Transactional
	public JSONData deleteJobs(List<String> jobIds) {
		JSONData data = new JSONData();
		for (String jobId : jobIds) {
			data.setMsg(deleteSingleJob(jobId));
			if (!StringUtil.isStringNullOrEmpty(data.getMsg())) {
				data.setStatus("success");
				continue;
			} else {
				data.setStatus("failure");
				break;
			}
		}
		return data;
	}

	@Transactional
	private String deleteSingleJob(String jobId) {
		return createJobInfoDAO.deleteJob(jobId);
	}

	@Transactional
	public JSONData updateJobDetails(JobInfo info) {
		JSONData data = new JSONData();
		data.setMsg(createJobInfoDAO.updateJobDetails(info));
		if (data.getMsg() != null)
			data.setStatus("failure");
		else
			data.setStatus("success");
		return data;
	}
}
