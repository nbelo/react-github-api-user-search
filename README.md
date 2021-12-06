# React-GitHub-Api-User-Search

This project has 2 pages

1. The Search Page
A very simple page with one input for the username that will be used in the request to the GitHub API.
The request will be triggered by clicking the "Search GitHub Users" button.

2. The User Page
If the Search for GitHub users returned any items (users) you will see this page
Here we can find:
- Total count of users found with the typed username in the Search page.
- "< Back" button to go back to the Search page.
- "Next User >" button to display the next user data (and make another API request to show the respective user repositories).
- The info about the user number from the total of users that were found (this is limited to 1000 by the API).
- The user avatar image and username (login name).
- Total of repositories found for the current displayed user (limited to 100 by the API).
- A list of all the user repositories, displaying the repository name and description.

**NOTE**: A personal GitHub token with very limited access is included, but When this repository became public that Token was revoked by GitHub due to security reasons, so if you want for the API calls to work properly, please get a GitHub Token and replace the one that can be found inside the App.js file.


## Development
This is my first React project, so it's most likely that the React way of organizing code isn't the best.

### User search request
The main goal was to display one user info, but the API response usually returns thousands, or hundreds, of users with a simple request, so I've decided to allow the user to see more than one user data.
For each user request we get 30 users, so this data is used to fulfill an array of users that we can display whitout more requests. And after we reach the 30th user, another API user search request is triggered, and another 30 users are loaded (limited to approximately 1000 users in total).
To manage this additional requests and load different user data, a per_page variable was added, which is increased at every request for additional 30 users.

### User repositories request
When the user data is displayed, at it's change, another API request is triggered to get the user repositories.

### Techs
    
📌 ![JavaScript](https://img.shields.io/badge/-JavaScript-F7B93E?style=flat-square&logo=javascript&logoColor=fff)
**Global variables**:
- userPage with a value that persist between API requests and is only incremented after every 30th users are loaded.
- userName to persist the name of the typed username in the first page.

📌 ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) 
- The visible page (html) is controlled by the number in the **users.total_count** in the JSX code returned by the main App, and If we don't have any users loaded, the first page is displayed, otherwise, the user page is displayed.

📌  ![CSS3](https://img.shields.io/badge/-CSS3-549FDE?style=flat-square&logo=css3&logoColor=white)
- Writing CSS is much more simple and organized if we use SASS, so I've decided to use this prepocessor to help in this task.


--
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Tests
Two automated Tests were developed, one for each page
- [x] **Renders search page** : If the string "The search page" is found in the page, the test passes.
- [x] **Loads and displays user page for username "nuno"** : The username is set to "nuno" and a API search user request is triggered, and, after the string "The user page" is displayed, if the user login name "nuno" is found in the page, the test passes.


## Available Scripts

In the project directory, you can run:


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm test`

Launches the test runner in the interactive watch mode.\


### `serve -s build`

Serve the builded application.
