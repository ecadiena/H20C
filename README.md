## Hawaii Broadband

Status of Hawaii Broadband 
[![ci-broadband-for-hawaii](https://github.com/HACC2022/Chipmunks/actions/workflows/ci.yml/badge.svg)](https://github.com/HACC2022/Chipmunks/actions/workflows/ci.yml/badge.svg)

Broadband for Hawaii is an interactive website application that helps build digital equity for residents of Hawaii. 
 
Hawaiʻi citizens living in rural communities do not have the same access to the Internet as those who live in areas with higher broadband usage. Access to the internet alone does not guarantee that the person knows how the internet works or why it's important. With modern technologies relying heavily on staying connected, providing quality broadband to all Hawai’i citizens is essential to decreasing the academic disparity on these topics. This problem prevents those individuals who lack access to the internet or those who are unfamiliar with technology from experiencing all that the internet has to offer. 
 
Everything relies on the internet, and we need to make sure people have access to the Internet and knowledge of how to use it. We depend on computers and the Internet to facilitate our daily activities. They are an essential part of communication, transportation, retail, financing, and health care. In order for us as a community to decrease this social and economic divide, we must find a solution to bring the Internet to all.

## How to use Hawaii Broadband

### Deployed Version: 

To visit the demo of the app, the user may use any device with a web browser to go to the [website](https://hawaiibroadband.xyz/) to access the application.

- To test the application as a general public user (i.e, user does not have an account), they can explore several pages: Classes, About, and Resources. These are all located in the left corner of the Nav Bar.
- To test the application as a new user, login or create an account by filling out the information on prompted on the sign up form. New users will need to agree to a data collection form prior to accessing the application. They will be able to edit their personal profile, enable two factor authentication, register for sessions and events, and accumulate points. They are enabled to view lessons and then test their knowledge by taking quizzes that provide feedback when completed.
- To test the application as an admin, first login using the admin credentials. Admins will be able to create classes (including courses and events), lessons, and quizzes. Admins can explore other pages: Account List and Data Analytics. These are located in the top right of the Nav Bar under the Admin dropdown. 

### From the source code: 

For developers to activated the deployed version of this application, they will need to install Meteor 2.7.3, Node.js and get an Google API key. 

1. Clone the repository to download the GitHub repo to your local computer. 
2. Change directory (cd) into the app/ directory, and install third party libraries with: ```meteor npm install```
3. Make a copy the settings.development.json file from config/ directory, and rename it to settings.production.json in the same directory. Place your Google API key in the “defaultKey” section under “key” property with a title “Google API”. The .gitignore file contains settings.production.json so it will not appear on GitHub when you commit.  
4. In your terminal, change directory (cd) into the app/ directory and run the command: ```meteor npm run start```
5. Open http://localhost:3000 to view the running local application 

### Important Links
Github Repository URL: https://github.com/HACC2022/Chipmunks
Deployed website: https://hawaiibroadband.xyz/
DevPost: https://devpost.com/software/chipmunks
Function Evaluation Video: https://youtu.be/ICR5q8FrtbE 

Template: [Meteor-Application-Template-Production](https://github.com/ics-software-engineering/meteor-application-template-production)

