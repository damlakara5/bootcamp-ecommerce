import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContexts'

function ProtectedRoute({component: Component,admin, ...rest}) {
    const {loggedIn, user} = useAuth()
    
  return (
    <Route render={(props) => {
      if(admin && user.role !== "admin"){
        return <Redirect to={{pathName : "/"}}  />
      }

        if(loggedIn) {
            return <Component {...props} />
        }

        return <Redirect  to={{pathName : '/'}} />
    }}  {...rest} />
  )
}

export default ProtectedRoute