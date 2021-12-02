import logo from './images/search-icon.svg';
import './App.css';
import React, { useState, useEffect } from "react";

const App = () => {
  const userName = "";
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [repositories, setUserRepositories] = useState([]);

  const LoadUsers = () => {
    let username = document.getElementById("username").value;
    if (username.length == 0) {
      setError("Please type a username");
      return;
    }
    fetch("https://api.github.com/search/users?q=" + username,{
      method: "GET",
      headers: {
        //Authorization: `token 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 ` 
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log("Result="+result);
        setIsLoaded(true);
        setUsers(result);
        setError(null);
      },
      (error) => {
        console.log("Error="+error);
        setIsLoaded(true);
        setError(error);
      }
    )
  }

  const ResetUsers = () => {
    setUsers({});
  }

  useEffect(() => {
    async function fetchProduct(login) {
      const response = await fetch("https://api.github.com/users/"+login+"/repos?per_page=100");
      const json = await response.json();
      setUserRepositories(json);
      console.log("json loaded="+json.length);
    }
    if (users.total_count > 0) {
      fetchProduct(users.items[0].login);
    }
  },[users]);

  if (!users.total_count) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1>The search page</h1>
        </header>
        <div className="searchUsersBox">
          <div className="searchUsersForm">
          <p className="error">{error}</p>
            <label htmlFor="username">Enter username: </label>
            <input type="text" id="username" data-testid="username" placeholder="Type a username..."/>
            <div className="searchUserButton">
            <button onClick={LoadUsers}>
              Search GitHub Users
            </button>       
            </div>            
          </div>
        </div>
      </div>
    )
  } 
  else {
    return (
      <div className="App">
        <div className="searchUsersResult">
          <header>
            <button className="blueBtn" onClick={ResetUsers}><span>&#x2039;</span> Back</button> 
            <h1>The user page</h1>
            <h2>Found {users.total_count} users</h2>
            {
              <div>
                <img src={users.items[0].avatar_url} alt={users.items[0].login} />
                <p>{users.items[0].login}</p>
                <span>Total of {repositories.length} repositories</span>
                <div className="listOfRepositories">
                  {
                    repositories.map(repo => (
                      <p><a href={repo.html_url} target="_blank">{repo.name}</a><span>{repo.description ? ": " + repo.description : "" }</span></p>
                    ))
                  }
                </div>
              </div>
            }            
          </header>          
        </div>
      </div>
    )
  }
}

export default App;