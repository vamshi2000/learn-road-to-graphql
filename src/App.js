import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Organization from './Components/Organization';

function App() {
  const title = 'React GraphQL GitHub Client';
  const axiosGitHubGraphQL = axios.create({ baseURL: 'https://api.github.com/graphql', headers: {
    Authorization: `bearer ${ process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`}, });
  
  const [path,pathSetter] = useState('the-road-to-learn-react/the-road-to-learn-react');
  const [organization,organizationSetter] = useState(null);
  const [errors, errorsSetter] = useState(null);

  useEffect(()=>{
    onFetchFromGitHub(path);
  },[]);

  const onFetchFromGitHub =(path) => {
    debugger;
    const [organization, repository] = path.split('/');
    axiosGitHubGraphQL
    .post('',{query: getIssuesOfRepositorhy(organization,repository)})
    .then(result => {
      organizationSetter(result.data.data.organization);
      errorsSetter(result.data.errors);
    });
  }


  const getIssuesOfRepositorhy = (organization, repository) =>  `{
    organization(login: "${organization}"){
      name
      url
      repository(name: "${repository}") {
        name
        url 
        issues(last: 5) {
          edges { 
            node {
              id 
              title 
              url
            }
          }
        }
      }
    }
  }`;

  const onsubmit = (event) => {
    event.preventDefault();
    console.log("submit clicked");
    onFetchFromGitHub(path);

  }
  const handlechange = (event) => {
    console.log("submit clicked"+event);
    pathSetter(event.target.value);
  }
  return (
    <div className="App">
      <p>
        {title}
      </p>
      <form onSubmit={(e)=>{onsubmit(e);}}> 
        <label htmlFor="url">Show open issues for https://github.com/ </label>
        <input
          id="url"
          type="text" 
          value={path}
          onChange={(e)=>{handlechange(e);}}
          style={{ width: '300px' }}
        />
        <button type="submit">Search</button> 
      </form>
      <hr/>
      <div>
        {(organization) && (
          <Organization organization={organization} errors={errors}/>
        )}
      </div>
    </div>
  );
}

export default App;
