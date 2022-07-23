

## Software Requirement Specification


[TOC]



## 1 Introduction {#1-introduction}


### 1.1 Purpose  {#1-1-purpose}

The purpose of this document is to build a bug tracking system that allows project managers and developers to resolve software bugs with less errors.


### 1.2 Definitions and Acronyms

**“Bug”** - “an error flow or fault in the design, development or operation of computer software that causes it to produce an incorrect or unexpected result, or to behave in unintended ways”

 \
**“Ticket”** - documentation that describes the bug, deadline to resolve, and priority

 \
**“Developer”** - also known as software engineers, are individuals that use problem solving and programming to resolve the bugs

**“Tester”** - an individual that evaluates software for compliance before being accepted into the source code. 

**“Project Manager”** - an individual that manages one or more projects, assigns tickets to the necessary developer.


### 1.3 Benefits for the Intended Audience


#### Developers {#developers}

Developers are the individuals tasked with reviewing tickets and resolving the bugs. Once their solution has been implemented, they will submit the ticket to a tester for review.


#### Testers {#testers}

Testers can either test software for bugs or review submissions from developers. Similar to the developer, they should be able to manage and view their tickets easily without a personal note taking system.


#### Project Manager {#project-manager}

For project managers, it is difficult to keep track of bugs in a large-scale application where there are many issues that arise daily. This application will allow them to view all outstanding tickets and assign tickets to the necessary developers.


### 1.4 Project Scope {#1-4-project-scope}

The purpose of this project is to ease and speed up bug tracking and resolution in software development. Without this system, program managers must convey bugs to developers and testers in meetings or through emails. Without a central source of information, miscommunication on the requirements or priorities, or simply losing track of a ticket is possible.

The sequential process will be automated, so when one individual has finished their task, the next individual in the process will be immediately notified, reducing the need for human-to-human communication via email/call/meetings which requires time. The following benefits will be seen from this project:



1. Less manual management of tickets, reducing human error
2. Streamlined bug resolution, reducing frustration within the team
3. Central database for tickets increases communication across team


## 2 Overall Description


### 2.1 Project Features {#2-1-project-features}



1. Login Page (oAuth)
2. CRUD Users Login
3. Ability to CRUD tickets
4. View all tickets
    1. Filter by priority, deadline, assigned to
5. Ticket View
    2. Deadline


### 2.2 User Classes and Characteristics {#2-2-user-classes-and-characteristics}


#### Tester {#tester}



* Login
* Add comments
* Modify ticket status 
* Create new tickets to be sent to the PM


#### Developer {#developer}



* Add a profile (tech stack, years of experience)
* Login
* View ticket
* Add comments
* View all tickets
* View ticket analytics 
* Change
* Modify ticket status / steps to resolve bug


#### Project Manager	 {#project-manager}



* Create new tickets
* View all tickets in a project
* Create a new project
* View all developers and sort by skills, years of experience
* Assign tickets
* View how many tickets a developer has, so you don’t overload them


### 2.2 Assumptions and Dependencies {#2-2-assumptions-and-dependencies}

I will be using the MERN tech stack [1]

![image](https://user-images.githubusercontent.com/94336773/180620454-886d0d1f-d000-46eb-a2b8-46b71e246e08.png)


* **M**ongoDB for database
* **E**xpress for server
* **R**eactJS for frontend framework
* **N**odeJS for backend 


### 





### MERN Stack Diagram [^1]


## 3 System Features and Requirements


### 3.1 Functional Requirements {#3-1-functional-requirements}


### 3.2 External Interface Requirements {#3-2-external-interface-requirements}


### 3.3 System Features {#3-3-system-features}


### 3.4 Nonfunctional Requirements {#3-4-nonfunctional-requirements}


## 4 References

[1] MERN Stack Explaind  [https://www.mongodb.com/mern-stack](https://www.mongodb.com/mern-stack)


<!-- Footnotes themselves at the bottom. -->
## Notes

[^1]:
     https://www.mongodb.com/mern-stack
