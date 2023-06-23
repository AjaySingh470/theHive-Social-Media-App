# Social-media-web-app
A fully-featured social media web application, built with the MERN stack.

### Pages

- Login Page
- Signup Page
- Create Profile Page
- Edit Profile Page
- Create Post Page
- Delete Post Page
- Feed/Home page
- User Profile Page

### Features

- [x] Follow/Unfollow Users
- [x] Like/Unlike the posts
- [x] Update profile
- [x] Delete Profile
- [ ] Comment on user posts
- [x] User suggestion section


### Backend 
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" /> 
### Front-end
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/>
### Database 
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>


### Installation
1) Clone this repository  
```
git clone https://github.com/ihtasham42/social-media-app.git
```
2) Install dependencies  
```
cd social-media-app  
npm install
cd client
npm install
```
3) Create .env in root directory
```
cd ..
touch .env
```
4) Configure environment variables in your new .env file. To acquire your MONGO_URI, create a cluster for free over at https://www.mongodb.com/.
```
MONGO_URI=<YOUR_MONGO_URI> 
TOKEN_KEY=<YOUR_TOKEN_KEY>
PORT=4000
```
5) Run the server
```
npm run server
```
6) Start a new terminal and run react's development server
```
cd social-media-app
cd client
npm start
```
