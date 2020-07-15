import React from 'react';
import Repository from './Repository';

const organization = ({organization, errors}) => {
    if(errors){
        return(
          <div>
            <strong>Something went wrong:</strong>
            {errors.map(error => error.message).join(' ')}
          </div>
          
        );
    }
    return ( 
      <div>
        <p>
          <strong>Issues from Organization:</strong>
          <a href={organization.url}>{organization.name}</a>
        </p> 
        <Repository repository={organization.repository}/>
      </div>
     );
}
 
export default organization;