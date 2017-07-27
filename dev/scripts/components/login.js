import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      createEmail: '',
      createPassword: '',
      loggedIn: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.createUser = this.createUser.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  render() {
    return (
      <div>
        <div className="create-user">
          <form onSubmit={(event) => this.createUser(event)}>
            <input type="text" placeholder="Please enter your e-mail address" onChange={(event) => this.handleChange(event, "createEmail")} />
            <input type="password" placeholder="Please enter your desired password" onChange={(event) => this.handleChange(event, "createPassword")} />
            <button>Create User</button>
          </form>
        </div>

        { this.state.loggedIn ?
          <div className='sign-out'>
            <button onClick={this.signOut}>Sign Out</button>
          </div>
        :
          <div>
            <form onSubmit={(event) => this.signIn(event)}>
              <input type="text" placeholder="Please enter your e-mail address" onChange={(event) => this.handleChange(event, "loginEmail")} />
              <input type="password" placeholder="Please enter your desired password" onChange={(event) => this.handleChange(event, "loginPassword")} />
              <button>Login</button>
            </form>
          </div>
        }
      </div>
    )
  }

  handleChange(e, field) {
    const newState = Object.assign({}, this.state);
    newState[field] = e.target.value;
    this.setState(newState);
  }

  createUser(e) {
    e.preventDefault();
    const email = this.state.createEmail;
    const password = this.state.createPassword;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => console.error(error.code, error.message));

  }

  signIn(event) {
    event.preventDefault();
    const email = this.state.loginEmail;
    const password = this.state.loginPassword;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((success) => {
        console.log(`Logged in as ${success.email}`);
      }), (error) => {
        console.log(error);
    }
  }

  signOut() {
    firebase.auth().signOut().then(function(success) {
      console.log('Signed out!')
    }, function(error) {
      console.log(error);
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    })
  }
}

export default Login;