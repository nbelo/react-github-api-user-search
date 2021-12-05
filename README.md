# React-Github-Api-User-Search

This project has 2 pages

1. The Search Page
A very simple page with one input for the username that will be used in the request to the github API
The request will be triggered by clicking the "Search GitHub Users" button

2. The User Page
If the Search for GitHub users returned any items (users) you will see this page
Here we can find:
- Total count of users found with the typed username in the Search page 
- "< Back" button to go back to the Search page
- "Next User >" button to display the next user data (and make another api request to show the respective user repositories)
- The info about the user number from the total of users that were found (this is limited to 1000 by the api)
- The user avatar image and username (login name)
- Total of repositories found for the current displayed user (limited to 100 by the api)
- A list of all the user repositories, displaying the repository name and description

**NOTE**: A personal github token with very limited access is included in the code to improve the success of the api requests because during the development some api errors were found, and with the usage of a token, those request are more successfull.
***This token will expire on Sat, Dec 25 2021.***


## Development
This is my first react project, so it's most likely that the react way of organizing code isn't the best.

### User search request
The main goal was to display one user info, but the api response usuallly returns thousands, or hundreds, of users with a simple request, so I've decided to allow the user to see more than one user data.
For each user request we get 30 users, so this data is used to fullfill an array of users that we can display whitout more requests. And after we reach the 30th user, another api user search request is triggered, and another 30 users are loaded (Limited to approximately 1000 users in total)
To manage this additional requests and load diferent user data, a per_page variable was added, that is increased at every 30 users that are requested.

### User repositories request
When the user data is displayed, at it's change, another api request is triggered to get the user repositories.

### Techs
    
📌 ![JavaScript](https://img.shields.io/badge/-JavaScript-F7B93E?style=flat-square&logo=javascript&logoColor=fff)
**Global variables**:
- userPage with a value that persist between api requests and is only incremented after every 30th users are loaded.
- userName to persist the name of the typed username in the first page.

📌 ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) 
- The visible page (html) is controlled by the number in the **users.total_count** in the JSX code returned by the main App.
- If we don't have any users loaded, the first page is displayed, otherwise, the user page is displayed.

📌  ![CSS3](https://img.shields.io/badge/-CSS3-549FDE?style=flat-square&logo=css3&logoColor=white)
- Writing CSS is much more simple and organized if we use SASS, so I've decided to use this prepocessor to help in this task.

--
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### Tests
Two automated Tests were developed, one for each page
- [x] **Renders search page** : If the string "The search page" is found in the page the test passes.
- [x] **Loads and displays user page for username "nuno"** : The username is set to "nuno" and a api search user request is triggered,and, after the string "The user page" is displayed, if the user login name "nuno" is found in the page, the test passes.


## Available Scripts

In the project directory, you can run:


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm test`

Launches the test runner in the interactive watch mode.\


### `serve -s build`

Serve the builded application 