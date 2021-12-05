import logo from './images/search-icon.svg';
import './App.css';
import React, { useState, useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(true)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState([])
  const [repositories, setUserRepositories] = useState([])

  const LoadUsers = () => {
    if (document.getElementById("username") != null) {
      window.var.userName = document.getElementById("username").value
      if (window.var.userName.length === 0) {
        setError("Please type a username");
        return;
      }      
    }

    fetch("https://api.github.com/search/users?q=" + window.var.userName + "&page=" + window.var.userPage, {
      method: "GET", 
      headers: {
        Authorization: `token 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 ` 
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result["items"]) {
          setUsers(result)      
          setUser(result.items[0])
          setError("")
        } else {
          if (result.message === "Only the first 1000 search results are available") {
            setError("No more users are available to load")
            window.var.userPage--            
          }
        }
      }
    )
  }

  const ResetUsers = () => {
    window.var.userPage = 1
    setError("")
    setUsers({})
  }
  
  const NextUser = () => {
    let idx = users.items.indexOf(user, 0)
    document.getElementById("loadingRepos").style.display = "block"
    document.getElementById("totalOfRepositories").style.opacity = 0
    if (idx === (users.items.length - 1)) {
      window.var.userPage++
      LoadUsers()
      setUser(users.items[0])    
    } else {
      setUser(users.items[idx+1])
    }
  }

  useEffect(() => {
    async function fetchRepos() {
      const response = await fetch("https://api.github.com/users/"+user.login+"/repos?per_page=100",{
        method: "GET",
        headers: {
          Authorization: `token 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 ` 
        }
      })
      const json = await response.json()
      document.getElementById("loadingRepos").style.display = "none"
      document.getElementById("totalOfRepositories").style.opacity = 1
      setUserRepositories(json)
    }
    if (users.total_count > 0) {
      fetchRepos()
    }
  },[user])

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
              <button className="blueBtn" onClick={LoadUsers}>
                Search GitHub Users
              </button>       
            </div>            
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="App">
        <div className="searchUsersResult">
          <header> 
            <h1>The user page</h1>
            <p className="error">{error}</p>
            <h2>Found {users.total_count} {users.total_count > 1 ? "users" : "user"}</h2>
            <button className="blueBtn" onClick={ResetUsers}><span>&#x2039;</span> Back</button>&nbsp;&nbsp;          
            <button className="blueBtn" onClick={NextUser}>Next user <span>&#x203A;</span></button>
            <h3>Showing user #{users.items.indexOf(user, 0) + 1 + ((window.var.userPage-1)*30)}</h3>
          </header>
          {
            <div className="userInfoBox">
              <img src={user.avatar_url} alt={user.login} />
              <p>{user.login}</p>
              <p className="totalOfRepositories" id="totalOfRepositories">Total of {repositories.length} repositories</p>
              <p id="loadingRepos" className="loadingRepos">Loading repositories...</p>
              <div id="listRepos" className="listRepos">                
                {
                  repositories.map(repo => (
                    <p key={repo.name}><a href={repo.html_url} target="_blank"rel="noreferrer">{repo.name}</a>
                      <span>{repo.description ? ": " + repo.description : "" }</span>
                    </p>
                  ))
                }
              </div>
            </div>
          }                    
        </div>
      </div>
    )
  }
}

export default App;