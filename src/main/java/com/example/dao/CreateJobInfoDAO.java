package com.example.dao;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.quartz.CronTrigger;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.ObjectAlreadyExistsException;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerKey;
import org.quartz.impl.triggers.CalendarIntervalTriggerImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.stereotype.Repository;

import com.example.entity.UserJobs;
import com.example.entity.UserJobsDetails;
import com.example.model.GLInfo;
import com.example.model.JobInfo;
import com.example.util.DateUtil;
import com.example.util.JobUtil;
import com.example.util.StringUtil;

@Repository
public class CreateJobInfoDAO {
	private static final Logger LOG = LoggerFactory.getLogger(CreateJobInfoDAO.class);
	@Autowired
	private HibernateTemplate hibernateTemplate;
	@Autowired
	private SchedulerFactoryBean schedulerFactoryBean;
	private static final String DATE_FORMAT = "MM/dd/yyyy hh:mm a";
	private static final String DATE_FORMAT2 = "EEE MMM dd yyyy HH:mm:ss";

	public String createJobforUser(JobInfo info) {
		try {
			this.insertIntoUserJobs(info);
			this.addJobToscheduler(info);
		} catch (ObjectAlreadyExistsException e) {
			LOG.error("There exists job with same group.Please enter different job details.", e);
			return "There exists job with same group.Please enter different job details.";
		} catch (Exception e) {
			LOG.error("Exception occured in CreateJobForUserDAO :", e);
			return "some error occured.Contact system admin.";
		}
		return "success";
	}

	public List<JobInfo> getJobDetailsByName(String jobName) {
		try {
			return getAllJobDetails(jobName);
		} catch (SQLException | SchedulerException e) {
			LOG.error("SQL/Scheduled Exception in getJobDeails method :", e);
		} catch (Exception e) {
			LOG.error("Exception in getJobDeails method :", e);
		}
		return new ArrayList<JobInfo>();
	}

	public String deleteJob(String jobId) {
		try {
			List<UserJobsDetails> list = this.getUserJobDetailsById(jobId);
			deleteJobDetails(jobId);
			this.deleteQrtzJob(list);
		} catch (SQLException | SchedulerException e) {
			LOG.error("SQL/Scheduler Exception in deleteJobDeails method :", e);
			return "failed removing the jobId : " + jobId;
		} catch (Exception e) {
			LOG.error("Exception in deleteJobDeails method :", e);
			return "some error occured.Contact system admin.";
		}
		return "success";
	}

	public String updateJobDetails(JobInfo info) {
		try {
			updateUserJob(info);
			this.updateQrtzJob(info);
		} catch (SQLException | ParseException e) {
			LOG.error("SQL/Scheduler Exception in updateJobDeails method :", e);
			return "Unable to update the Job";
		} catch (Exception e) {
			LOG.error("Exception in updateJobDeails method :", e);
			return "some error occured.Contact system admin.";
		} finally {
		}
		return "success";
	}

	private void insertIntoUserJobs(JobInfo info) throws ParseException {
		Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
		List<UserJobs> jobList = getUserJobByName(info.getUserName());
		if (jobList.isEmpty()) {
			UserJobs userJobs = new UserJobs();
			userJobs.setId(BigDecimal.valueOf((Math.random() * 1234567890)));
			userJobs.setUserName(info.getUserName());
			userJobs.setCreatedDate(new Date());
			userJobs.setModifiedDate(new Date());
			userJobs.setSchedulerName("testscheduler");
			UserJobsDetails details = insertIntoUserJobsDetails(info, userJobs);
			session.save(userJobs);
			session.save(details);
		} else {
			for (UserJobs jobs : jobList) {
				session.save(insertIntoUserJobsDetails(info, jobs));
			}
		}
	}

	private UserJobsDetails insertIntoUserJobsDetails(JobInfo info, UserJobs userJobs) throws ParseException {
		UserJobsDetails userJobsDetails = new UserJobsDetails();
		userJobsDetails.setId(BigDecimal.valueOf((Math.random() * 1234567890)));
		userJobsDetails.setJobName(info.getJobName());
		userJobsDetails.setJobDesc(info.getJobDescription());
		userJobsDetails.setJobGrpName(info.getJobGroupName());
		if (StringUtil.isStringNullOrEmpty(info.getJobDateTime()))
			userJobsDetails.setJobDateTime(new Date());
		else
			userJobsDetails.setJobDateTime(DateUtil.getDate(info.getJobDateTime(), DATE_FORMAT2));
		userJobsDetails.setCreatedDate(new Date());
		userJobsDetails.setModifiedDate(new Date());
		userJobsDetails.setUserJobs(userJobs);
		return userJobsDetails;
	}

	private JobDetail addJobToscheduler(JobInfo info) throws Exception {
		return JobUtil.createJob(info);
	}

	private List<JobInfo> getAllJobDetails(String jobName) throws SQLException, SchedulerException {
		List<JobInfo> jobInfosList = new ArrayList<>();
		Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(UserJobs.class);
		if (!StringUtil.isStringNullOrEmpty(jobName))
			criteria.add(Restrictions.eq("userName", jobName));
		criteria.addOrder(Order.desc("createdDate"));
		for (Object userjob : criteria.list()) {
			JobInfo jobInfo = new JobInfo();
			jobInfo.setClientId(((UserJobs) userjob).getId().toString());
			jobInfo.setUserName(((UserJobs) userjob).getUserName());
			for (UserJobsDetails details : ((UserJobs) userjob).getUserJobsDetails()) {
				jobInfo.setJobName(details.getJobName());
				jobInfo.setJobGroupName(details.getJobGrpName());
				jobInfo.setJobDescription(details.getJobDesc());
				jobInfo.setJobId(details.getId().toString());
				this.getQrtxTriggerDetails(jobInfo);
				this.getQrtxJobDetails(jobInfo);
				this.getCronDetails(jobInfo);
				jobInfosList.add(jobInfo);
			}
		}
		return jobInfosList;
	}

	private JobInfo getQrtxTriggerDetails(JobInfo info) throws SQLException, SchedulerException {
		Scheduler scheduler = schedulerFactoryBean.getScheduler();
		Trigger trigger = scheduler.getTrigger(TriggerKey.triggerKey(info.getJobName(), info.getJobGroupName()));
		if (trigger != null) {
			info.setJobDateTime(DateUtil.getStringDate(trigger.getStartTime(), DATE_FORMAT));
			info.setJobEndtime(DateUtil.getStringDate(trigger.getEndTime(), DATE_FORMAT));
			info.setNextExecTime(DateUtil.getStringDate(trigger.getNextFireTime(), DATE_FORMAT));
		}
		info.setStatus(
				scheduler.getTriggerState(TriggerKey.triggerKey(info.getJobName(), info.getJobGroupName())).toString());
		return info;
	}

	private JobInfo getQrtxJobDetails(JobInfo info) throws SchedulerException {
		Scheduler scheduler = schedulerFactoryBean.getScheduler();
		JobDetail detail = scheduler.getJobDetail(new JobKey(info.getJobName(), info.getJobGroupName()));
		if (detail != null)
			info.setGlInfo((GLInfo) detail.getJobDataMap().get(info.getJobName()));
		return info;
	}

	private JobInfo getCronDetails(JobInfo info) throws SchedulerException {
		Scheduler scheduler = schedulerFactoryBean.getScheduler();
		if (scheduler.getTrigger(TriggerKey.triggerKey(info.getJobName(), info.getJobGroupName())) != null) {
			if (!(scheduler.getTrigger(TriggerKey.triggerKey(info.getJobName(),
					info.getJobGroupName())) instanceof CalendarIntervalTriggerImpl)) {
				CronTrigger cronTrigger = (CronTrigger) scheduler
						.getTrigger(TriggerKey.triggerKey(info.getJobName(), info.getJobGroupName()));
				String[] cron = cronTrigger.getCronExpression().split(" ");
				info.setJobExeMonths(this.convertStringToList(cron[4], ","));
				info.setJobExeDays(this.convertStringToList(cron[5], ","));
			} else {
				info.setJobExeMonths(Arrays.asList("*"));
				info.setJobExeDays(Arrays.asList("*"));
			}
		}
		return info;
	}

	private List<String> convertStringToList(String value, String split) {
		List<String> list = new ArrayList<String>();
		for (String s : value.split(split))
			list.add(s);
		return list;
	}

	@SuppressWarnings("unchecked")
	private List<UserJobs> getJobDetailsById(String id) {
		LOG.info("Search user job by client Id :" + id);
		return hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(UserJobs.class)
				.add(Restrictions.eq("id", new BigDecimal(id))).list();
	}

	private Boolean deleteJobDetails(String id) throws SQLException {
		for (UserJobsDetails job : getUserJobDetailsById(id)) {
			hibernateTemplate.getSessionFactory().getCurrentSession().delete(job);
		}
		return true;
	}

	private Boolean deleteQrtzJob(List<UserJobsDetails> jobDetails) throws SchedulerException {
		return JobUtil.deleteJob(jobDetails);
	}

	private Boolean updateUserJob(JobInfo info) throws SQLException {
		for (UserJobs jobs : getJobDetailsById(info.getClientId())) {
			jobs.setModifiedDate(new Date());
			for (UserJobsDetails details : jobs.getUserJobsDetails()) {
				if (details.getId().toString().equals(info.getJobId())) {
					details.setJobDesc(info.getJobDescription());
					if (StringUtil.isStringNullOrEmpty(info.getJobDateTime()))
						details.setJobDateTime(new Date());
					else {
						try {
							details.setJobDateTime(DateUtil.getDate(info.getJobDateTime(), DATE_FORMAT2));
						} catch (ParseException e) {
						}
					}
					details.setModifiedDate(new Date());
					hibernateTemplate.getSessionFactory().getCurrentSession().saveOrUpdate(jobs);
				}
			}
		}
		return true;
	}

	private JobDetail updateQrtzJob(JobInfo info) throws SchedulerException, ParseException {
		return JobUtil.updateJob(info);
	}

	@SuppressWarnings("unchecked")
	public List<UserJobs> getUserJobByName(String username) {
		LOG.info("Find Job details by userName :", username);
		return hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(UserJobs.class)
				.add(Restrictions.eq("userName", username)).list();
	}

	@SuppressWarnings("unchecked")
	public List<UserJobsDetails> getUserJobDetailsById(String id) {
		LOG.info("Find Job details by jobId :", id);
		return hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(UserJobs.class)
				.add(Restrictions.eq("id", new BigDecimal(id))).list();
	}
}
