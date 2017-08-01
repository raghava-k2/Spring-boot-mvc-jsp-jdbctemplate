package com.example.model;

import java.io.Serializable;

public class GLInfo implements Serializable {
	private static final long serialVersionUID = -7329007911636837618L;
	private String fileSpec;
	private String mapName;
	private String payroll;
	private String outputFile;
	private String outputFileName;

	public String getFileSpec() {
		return fileSpec;
	}

	public void setFileSpec(String fileSpec) {
		this.fileSpec = fileSpec;
	}

	public String getPayroll() {
		return payroll;
	}

	public void setPayroll(String payroll) {
		this.payroll = payroll;
	}

	public String getOutputFile() {
		return outputFile;
	}

	public void setOutputFile(String outputFile) {
		this.outputFile = outputFile;
	}

	public String getOutputFileName() {
		return outputFileName;
	}

	public void setOutputFileName(String outputFileName) {
		this.outputFileName = outputFileName;
	}

	public String getMapName() {
		return mapName;
	}

	public void setMapName(String mapName) {
		this.mapName = mapName;
	}

}
