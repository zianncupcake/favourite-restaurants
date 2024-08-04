# PLEASE NOTE
## Adding restaurants feature
I was inspired by the 'Autofill with LinkedIn / Resume' function on job application sites which greatly reduced the time it took for me to fill in the respective form fields. Likewise, I recreated this functionality by creating an 'autofill with Instagram' function using the Pupeteer library in NodeJS. It automates interactions with Instagram to retrieve the profile information (Bio, description, location, website) when given an Instagram username. However, I encountered significant challenges while attempting to deploy my backend server (perhaps due to security measures from Instagram as it is possible to be used for malicious purposes).

### Current functionality on hosted application
I used dummy data from '@flipcoffeeroasters'to simulate the retrieving data and autofilling of the form

### Full functionality demo on localhost

Script opening Instagram on external browser view:

https://github.com/user-attachments/assets/3a45d92b-5695-4941-95b4-088a2a313505

Application view:

https://github.com/user-attachments/assets/1ce1a0aa-4452-432f-a468-0e2255a69e73


If you would like to try it out using your Instagram account credentials:
1. Clone the deploy branch and npm i
2. npm start (localhost:3000)

3. Head to backend/index.js 
4. Fill in your account Username and Password in line 27 and 31 respectively
5. npm start (localhost:3001)

