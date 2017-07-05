package com.example.util;

import java.text.ParseException;
import java.util.List;

import org.quartz.CalendarIntervalScheduleBuilder;
import org.quartz.CronScheduleBuilder;
import org.quartz.JobBuilder;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.TriggerKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.stereotype.Component;

import com.example.entity.UserJobs;
import com.example.job.DiaplyJob;
import com.example.model.GLInfo;
import com.example.model.JobInfo;

@Component
public class JobUtil {
	private static final Logger LOG = LoggerFactory.getLogger(JobUtil.class);
	private static SchedulerFactoryBean schedulerFactoryBean;
	private static Trigger trigger;
	private static JobDetail jobDetail;
	private static Scheduler scheduler;
	private static final String DATE_FORMAT2 = "EEE MMM dd yyyy HH:mm:ss";

	public static JobDetail createJob(JobInfo info) throws Exception {
		jobDetail = JobUtil.createJobDetail(info);
		if (info.getJobExeDays().size() == 7 && info.getJobExeMonths().size() == 12)
			trigger = createCalenderTrigger(info, jobDetail);
		else
			trigger = createCronTrigger(info, jobDetail);
		schedulerFactoryBean.getScheduler().scheduleJob(jobDetail, trigger);
		return jobDetail;
	}

	public static Boolean deleteJob(List<UserJobs> jobDetails) throws SchedulerException {
		Scheduler scheduler = schedulerFactoryBean.getScheduler();
		if (scheduler
				.checkExists(TriggerKey.triggerKey(jobDetails.get(0).getUserJobsDetails().getJobName(),
						jobDetails.get(0).getUserJobsDetails().getJobGrpName()))
				&& scheduler.checkExists(JobKey.jobKey(jobDetails.get(0).getUserJobsDetails().getJobName(),
						jobDetails.get(0).getUserJobsDetails().getJobGrpName()))) {
			scheduler.unscheduleJob(TriggerKey.triggerKey(jobDetails.get(0).getUserJobsDetails().getJobName(),
					jobDetails.get(0).getUserJobsDetails().getJobGrpName()));
			scheduler.deleteJob(JobKey.jobKey(jobDetails.get(0).getUserJobsDetails().getJobName(),
					jobDetails.get(0).getUserJobsDetails().getJobGrpName()));
		}
		return true;
	}

	public static JobDetail updateJob(JobInfo info) throws SchedulerException, ParseException {
		scheduler = schedulerFactoryBean.getScheduler();
		jobDetail = JobUtil.updateExistingJobDetails(JobUtil.getExistingJobDetails(info), info);
		if (info.getJobExeDays().size() == 7 && info.getJobExeMonths().size() == 12)
			trigger = createCalenderTrigger(info, jobDetail);
		else
			trigger = createCronTrigger(info, jobDetail);
		scheduler.addJob(jobDetail, true, true);
		scheduler.rescheduleJob(TriggerKey.triggerKey(info.getJobName(), info.getJobGroupName()), trigger);
		return jobDetail;
	}

	private static JobDetail getExistingJobDetails(JobInfo info) throws SchedulerException {
		return schedulerFactoryBean.getScheduler()
				.getJobDetail(JobKey.jobKey(info.getJobName(), info.getJobGroupName()));
	}

	private static JobDetail updateExistingJobDetails(JobDetail detail, JobInfo info) {
		JobDataMap dataMap = detail.getJobDataMap();
		GLInfo glInfo = (GLInfo) dataMap.get(detail.getKey().getName());
		glInfo.setGlFileName(info.getGlInfo().getGlFileName());
		glInfo.setOutputFileName(info.getGlInfo().getOutputFileName());
		glInfo.setMapName(info.getGlInfo().getMapName());
		detail.getJobBuilder().withDescription(info.getJobDescription());
		return detail;
	}

	private static JobDetail createJobDetail(JobInfo info) {
		JobDataMap dataMap = new JobDataMap();
		dataMap.put(info.getJobName(), info.getGlInfo());
		return JobBuilder.newJob(DiaplyJob.class).withDescription(info.getJobDescription())
				.withIdentity(info.getJobName(), info.getJobGroupName()).setJobData(dataMap).storeDurably(false)
				.build();
	}

	private static Trigger createCalenderTrigger(JobInfo info, JobDetail detail) throws ParseException {
		TriggerBuilder<Trigger> builder = TriggerBuilder.newTrigger().forJob(detail);
		if (StringUtil.isStringNullOrEmpty(info.getJobDateTime()))
			builder.startNow();
		else
			builder.startAt(DateUtil.getDate(info.getJobDateTime(), DATE_FORMAT2));
		builder.withDescription(info.getUserName() + info.getJobGroupName())
				.withIdentity(info.getJobName(), info.getJobGroupName())
				.withSchedule(CalendarIntervalScheduleBuilder.calendarIntervalSchedule());
		if (!StringUtil.isStringNullOrEmpty(info.getJobEndtime()))
			builder.endAt(DateUtil.getDate(info.getJobEndtime(), DATE_FORMAT2));
		return builder.build();
	}

	private static Trigger createCronTrigger(JobInfo info, JobDetail detail) throws ParseException {
		TriggerBuilder<Trigger> triggerBuilder = TriggerBuilder.newTrigger();
		triggerBuilder.forJob(detail);
		if (!StringUtil.isStringNullOrEmpty(info.getJobDateTime())) {
			triggerBuilder.startAt(DateUtil.getDate(info.getJobDateTime(), DATE_FORMAT2));
			triggerBuilder.withSchedule(CronScheduleBuilder
					.cronSchedule(buildCronExpression(DateUtil.getDate(info.getJobDateTime(), DATE_FORMAT2),
							info.getJobExeDays(), info.getJobExeMonths())));
		} else {
			triggerBuilder.startNow();
		}
		if (!StringUtil.isStringNullOrEmpty(info.getJobEndtime()))
			triggerBuilder.endAt(DateUtil.getDate(info.getJobEndtime(), DATE_FORMAT2));
		triggerBuilder.withDescription(info.getUserName() + info.getJobGroupName());
		triggerBuilder.withIdentity(info.getJobName(), info.getJobGroupName());
		return triggerBuilder.build();
	}

	private static String buildCronExpression(java.util.Date date, List<String> weekdays, List<String> months) {
		@SuppressWarnings("deprecation")
		String cronExp = date.getSeconds() + " " + date.getMinutes() + " " + date.getHours() + " " + "?" + " ";
		if (months.size() == 12 || months.size() == 0)
			cronExp += "*" + " ";
		else {
			for (String month : months)
				cronExp += month + ",";
			cronExp = cronExp.substring(0, cronExp.length() - 1) + " ";
		}
		if (weekdays.size() == 7 || weekdays.size() == 0)
			cronExp += "*";
		else {
			for (String weeks : weekdays)
				cronExp += weeks + ",";
			cronExp = cronExp.substring(0, cronExp.length() - 1);
		}
		LOG.info("generated cronExp : " + cronExp);
		return cronExp;
	}

	@Autowired
	public void setschedulerFactoryBean(SchedulerFactoryBean bean) {
		JobUtil.schedulerFactoryBean = bean;
	}
}
