## Software Requirement Specification


[TOC]
![image](https://user-images.githubusercontent.com/94336773/184672457-30ff9fe4-075d-41d8-96a7-1a4ca128d2bd.png)



## 1 Introduction {#1-introduction}


### 1.1 Purpose  {#1-1-purpose}

The purpose of this document is to build a bug tracking system that allows project managers and developers to resolve software bugs with less errors.


### 1.2 Definitions and Acronyms {#1-2-definitions-and-acronyms}

**“Bug”** - “an error flow or fault in the design, development or operation of computer software that causes it to produce an incorrect or unexpected result, or to behave in unintended ways”

 \
**“Ticket”** - documentation that describes the bug, deadline to resolve, and priority

 \
**“Developer”** - also known as software engineers, are individuals that use problem solving and programming to resolve the bugs

**“Tester”** - an individual that evaluates software for compliance before being accepted into the source code. 

**“Project Manager”** - an individual that manages one or more projects, assigns tickets to the necessary developer.


### 1.3 Benefits for the Intended Audience {#1-3-benefits-for-the-intended-audience}


#### Developers {#developers}

Developers are the individuals tasked with reviewing tickets and resolving the bugs. Once their solution has been implemented, they will submit the ticket to a tester for review. Each ticket is assigned to at least one developer.


#### Testers {#testers}

Testers can either test software for bugs or review submissions from developers. Similar to the developer, they should be able to manage and view their tickets easily without a personal note taking system. Each ticket is assigned to at least one developer.


#### Project Manager {#project-manager}

For project managers, it is difficult to keep track of bugs in a large-scale application where there are many issues that arise daily. This application will allow them to view all outstanding tickets and assign tickets to the necessary developers. Each ticket is assigned to at least one project manager. Each project is assigned to at least one project manager.


### 1.4 Project Scope {#1-4-project-scope}

The purpose of this project is to ease and speed up bug tracking and resolution in software development. Without this system, program managers must convey bugs to developers and testers in meetings or through emails. Without a central source of information, miscommunication on the requirements or priorities, or simply losing track of a ticket is possible.

The sequential process will be automated, so when one individual has finished their task, the next individual in the process will be immediately notified, reducing the need for human-to-human communication via email/call/meetings which requires time. The following benefits will be seen from this project:



1. Less manual management of tickets, reducing human error
2. Streamlined bug resolution, reducing frustration within the team
3. Central database for tickets increases communication across team


## 2 Overall Description {#2-overall-description}


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



* **M**ongoDB for database
* **E**xpress for server
* **R**eactJS for frontend framework
* **N**odeJS for backend 


### 

<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![image](https://user-images.githubusercontent.com/94336773/180636763-1d8d5f75-877b-4132-b1d7-3ec79c04273b.png)


### MERN Stack Diagram [^1]


## 3 System Features and Requirements {#3-system-features-and-requirements}


### 3.1 Functional Requirements {#3-1-functional-requirements}

A functional requirement defines a function of a system or its components.


<table>
  <tr>
   <td><strong>Page</strong>
   </td>
   <td><strong>F.R.</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>Input</strong>
   </td>
   <td><strong>Processing</strong>
   </td>
   <td><strong>Output</strong>
   </td>
  </tr>
  <tr>
   <td>Login Page
   </td>
   <td>1
   </td>
   <td>Allow user to create a new login ID, password, and user profile
   </td>
   <td>Request for first name, last name, email address, password, years of experience, coding technologies \

   </td>
   <td>Creates a new user account. Encrypt the password.
   </td>
   <td>Displays the user profile
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>2
   </td>
   <td>Allow user to login
   </td>
   <td>Request for username and ID
   </td>
   <td>Authenticate the user ID and password (JWT Token)
   </td>
   <td>User is sent to the dashboard
   </td>
  </tr>
  <tr>
   <td>Dashboard
   </td>
   <td>3
   </td>
   <td>User can view tickets as a list according to user permissions
   </td>
   <td>Click on pages to go through the different tickets
   </td>
   <td>The next page of results is updated on the page
   </td>
   <td>Tickets are displayed on the page
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>4
   </td>
   <td>User can switch view to Kanban board
   </td>
   <td>User changes View setting to Kanban
   </td>
   <td>The UI updates 
   </td>
   <td>The tickets are displayed as a Kanban
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>5
   </td>
   <td>User can select tickets
   </td>
   <td>User clicks on ticket on the dashboard
   </td>
   <td>Modal appears on the screen
   </td>
   <td>Ticket details are displayed
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>6
   </td>
   <td>User can update tickets according to their permission. All users assigned to the ticket get notified.
   </td>
   <td>User clicks on the ticket on the dashboard, and can modify the status. When done, they can press Save.
   </td>
   <td>The newly updated ticket shows the modified properties.
   </td>
   <td>The ticket is updated, and all assigned users will receive a notification.
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>7
   </td>
   <td>User can filter tickets
   </td>
   <td>User clicks on a ticket property column
   </td>
   <td>The column will sort ascending/descending order.
   </td>
   <td>The list will rearrange
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>8
   </td>
   <td>User can search for tickets
   </td>
   <td>User types into the search bar
   </td>
   <td>As the user types, the list will be filtered
   </td>
   <td>The filtered list will be displayed.
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>9
   </td>
   <td>User can create tickets
   </td>
   <td>User clicks the Create Ticket button. A modal will pop up to create a new ticket. The user will input the ticket details.
   </td>
   <td>A new ticket will be sent to the database.
   </td>
   <td>The ticket will be sent to the PM for approval..
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>10
   </td>
   <td>PMs can assign users to tickets
   </td>
   <td>If the ticket is approved, the PM must assign the priority, developer, tester, and deadline.
   </td>
   <td>The ticket is updated and sent to users.
   </td>
   <td>The new ticket will be displayed on the dashboard for the appropriate users.
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>11
   </td>
   <td>PMs can delete tickets.
   </td>
   <td>The PM clicks a ticket. The PM can click Delete.
   </td>
   <td>The ticket will be deleted from the database.
   </td>
   <td>The ticket is sent to the trash bin.
   </td>
  </tr>
  <tr>
   <td>User Profile
   </td>
   <td>12
   </td>
   <td>User can edit profile
   </td>
   <td>User clicks on the profile icon. User edits profile properties and clicks save.
   </td>
   <td>Once saved, the user profile will be updated.
   </td>
   <td>The new user profile will be displayed.
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>13
   </td>
   <td>User can change password
   </td>
   <td>User clicks on the profile icon. User can click Change Password. User will input the old password and a new password.
   </td>
   <td>If the old password matches, the new password will replace the old password.
   </td>
   <td>The password is updated.
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>14
   </td>
   <td>User can add a profile picture
   </td>
   <td>User clicks on the profile icon. User can upload an image or pick an image from the library.
   </td>
   <td>The photo will be added to their profile.
   </td>
   <td>The profile is updated.
   </td>
  </tr>
  <tr>
   <td>Team Overview (PM only)
   </td>
   <td>15
   </td>
   <td>View all developers in a table according to skills, years of experience, previous tickets resolved, how many active tickets
   </td>
   <td>PM clicks on the Developer tab to see an overview. PM can click on a user to get their user profile.
   </td>
   <td>The developer profile will be loaded.
   </td>
   <td>The developer profile is displayed.
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>16
   </td>
   <td>Filter list of developers
   </td>
   <td>User clicks on a ticket property column
   </td>
   <td>The column will sort ascending/descending order.
   </td>
   <td>The list will rearrange
   </td>
  </tr>
</table>



### 3.2 External Interface Requirements {#3-2-external-interface-requirements}


#### 3.2.1 Software Interfaces {#3-2-1-software-interfaces}

The MERN stack will be used.


#### 3.2.2 Communication Interface {#3-2-2-communication-interface}

Whenever a status is updated, use EmailJS [4]


### 3.3 Nonfunctional Requirements {#3-3-nonfunctional-requirements}


#### 3.3.1 Security Requirements {#3-3-1-security-requirements}

Authentication will be given to Admins (PMs) and Users (Developers/Testers). 


#### 3.3.2 Software Quality Attributes {#3-3-2-software-quality-attributes}

Flexible, user friendly, scalable, cross functionality.


## 4 References {#4-references}

[1] MERN Stack Explaind  [https://www.mongodb.com/mern-stack](https://www.mongodb.com/mern-stack)

[2] How to write an SRS [https://www.perforce.com/blog/alm/how-write-software-requirements-specification-srs-document](https://www.perforce.com/blog/alm/how-write-software-requirements-specification-srs-document)

[3] How to create a table in React [https://www.youtube.com/watch?v=dYjdzpZv5yc](https://www.youtube.com/watch?v=dYjdzpZv5yc)

[4] How to send emails in React with EmailJS [https://www.youtube.com/watch?v=NgWGllOjkbs](https://www.youtube.com/watch?v=NgWGllOjkbs)

[5] How to write a SRS [https://www.perforce.com/blog/alm/how-write-software-requirements-specification-srs-document](https://www.perforce.com/blog/alm/how-write-software-requirements-specification-srs-document)


<!-- Footnotes themselves at the bottom. -->
## Notes

[^1]:
     https://www.mongodb.com/mern-stack
