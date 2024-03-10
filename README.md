
# Alzeena Fashion Website Performance Testing with Apache JMeter

This repository contains the setup, scripts, and analysis for performance testing the Alzeena fashion website using Apache JMeter. The tests were conducted with different thread counts (150, 200, and 300) to evaluate the website's performance metrics.

## Overview

In this project, we conducted performance testing on the Alzeena fashion website to measure its throughput, error rates, and overall response times under various loads.

### Tools Used:
- **Apache JMeter:** A powerful open-source tool for performance testing, capable of simulating heavy loads on servers and analyzing the overall performance of web applications.
- **JMeter Plugins:** Additional plugins used to enhance JMeter's capabilities.
  
### **Listeners Used**
  
 - View Result Tree

 - Summary Report

 - Aggregate Report

 - Backend Listener

## Test Scenarios

We created multiple test scenarios with varying numbers of concurrent users to simulate real-world usage patterns.

- **Test Scenarios:**
  - 150 Threads
  - 200 Threads
  - 300 Threads

<img width="700" alt="thread" src="https://github.com/ismail-hossain12012/Performance-Testing-JMeter/assets/76116674/f7e5ca1f-a9a0-4360-a996-6e35dd881ada">

## Running the Tests

To run the tests, follow these steps:

1. Clone this repository:
https://github.com/ismail-hossain12012/Performance-Testing-JMeter.git

## **Run the JMeter test for each scenario using the following command:**

jmeter -n -t mahfil100.jmx -l report\mahfil100.jtl

jmeter -g report\mahfil100.jtl -o report\mahfil100.html

<img width="675" alt="Jmeter_Command" src="https://github.com/ismail-hossain12012/Performance-Testing-JMeter/assets/76116674/7edd0738-5e00-473f-8a45-260f962ba432">

## **Test Reports**

We generated comprehensive test reports using JMeter's built-in listeners and plugins. These reports provide insights into the website's performance metrics, such as throughput, error rates, and response times.

**Sample Reports:**

Based on the test reports, we analyzed the performance of the Alzeena fashion website under different load conditions.

### **View Result Tree**
Provides detailed information on each request and response, allowing for in-depth analysis of individual transactions.

<img width="675" alt="1v" src="https://github.com/ismail-hossain12012/Performance-Testing-JMeter/assets/76116674/5703c130-0819-4f48-858c-85772dee4f7b">

### **Summary Report**
 Summarizes key performance indicators such as average response time, throughput, and error rates.
 
<img width="675" alt="2sr" src="https://github.com/ismail-hossain12012/Performance-Testing-JMeter/assets/76116674/0a7b0b0b-d874-4927-816c-0200f09f6958">

### **Aggregate Report**
Aggregates data from multiple samples to give an overview of the entire test run, including minimum, maximum, and average values.

<img width="675" alt="3ar" src="https://github.com/ismail-hossain12012/Performance-Testing-JMeter/assets/76116674/f9a7dda5-7b68-4563-ae61-ba3167a5499c">

### **Backend Listener**
Collects and forwards metrics to external systems for further analysis, integrating JMeter with external monitoring tools.

<img width="675" alt="777" src="https://github.com/ismail-hossain12012/Performance-Testing-JMeter/assets/76116674/9dd284e8-997f-4557-86aa-2d2ff82e623f">

### **Results Analysis**
Based on the generated reports, we conducted a thorough analysis of the Alzeena fashion website's performance under varying load conditions.

<img width="675" alt="200" src="https://github.com/ismail-hossain12012/Performance-Testing-JMeter/assets/76116674/3d826f36-9847-47de-acea-57ef2dd70af3">


## **Throughput Chart**
The throughput chart visualizes the number of requests processed by the website per unit of time. A higher throughput indicates better performance in handling user requests.

**Error Rate Calculation:**
We calculated the error rate percentage for each test scenario to identify any potential issues or bottlenecks.

<img width="675" alt="report200" src="https://github.com/ismail-hossain12012/Performance-Testing-JMeter/assets/76116674/f158fc5a-7d49-4fc9-93f2-a5f5a52e7247">


## **Conclusion**
The performance testing results provide valuable insights into the Alzeena fashion website's scalability and responsiveness under various user loads. These findings can be used to optimize the website's performance and ensure a seamless user experience.
