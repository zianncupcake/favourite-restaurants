# Favourite Restaurants
Created using ReactJS and Redux

## Adding restaurants feature:
I was inspired by the 'autofill with LinkedIn / Resume' function on job application sites which greatly reduced the time it took for me to fill in the respective form fields. Likewise, I recreated this functionality by creating an 'autofill with Instagram' function using Pupeteer in NodeJS. It automates interactions with Instagram to retrieve the profile information (Bio, description, location) when given an Instagram username. However, I realised I encountered significant challenges while attempting to deploy my backend server (perhaps due to security measures from Instagram).

Current functionality on hosted application:
I used dummy data from '@flipcoffeeroasters'to simulate the retrieving data and autofilling of the form

Demo on localhost:


https://github.com/user-attachments/assets/1ce1a0aa-4452-432f-a468-0e2255a69e73



If you would like to try it out for yourself:
1. Clone the deploy branch and npm i

2. Head to frontend/src/pages/AddRestaurant.js
3. Uncomment const { data } = await axios.get(`http://localhost:3001/scrape?username=${username}`); (line 45-47)
4. npm start (localhost:3000)

5. Head to backend/index.js 
6. Fill in your Instagram username and Password in line xxxx respectively
7. npm start (localhost:3001)

