//import React from 'react'

const Auth = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="auto-container">
          <h1 className="page-title"></h1>
           <form action="" className="auth-form">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email"  id="email"></input>
              </div>
               <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-input" type="password" id="password" ></input>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Auth