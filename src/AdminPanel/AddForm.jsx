import React, { Component } from "react";
import "./MyCss.css";
import swal from "sweetalert";

class Employees extends Component {
  state = {
    users: [],
    orignalEmail: "admin@domain.com",
    orignalPassword: "admin",
    isLoggedIn: false,
    enableForm: false,
    firstName: "",
    lastName: "",
    email2: "",
    phone: "",
    email: "",
    password: "",
    date: "",
    currentIndex: null,
    editClicked: false
  };
  render() {
    const { isLoggedIn, enableForm } = this.state;
    return (
      <div className="container">
        {!isLoggedIn && this.renderLogin()}
        {isLoggedIn && !enableForm && this.showTable()}
        {isLoggedIn && enableForm && this.addEmployee()}
      </div>
    );
  }

  updateTask = () => {
    const {
      firstName,
      lastName,
      email2,
      phone,
      date,
      users,
      currentIndex
    } = this.state;
    let newData = {
      firstName: firstName,
      lastName: lastName,
      email2: email2,
      phone: phone,
      date: date
    };
    users[currentIndex] = newData;
    console.log(newData);
    console.log(users[currentIndex]);

    this.setState({
      users,
      firstName: "",
      lastName: "",
      email2: "",
      phone: "",
      date: "",
      enableForm: false,
      editClicked: false
    });
  };

  addUser = () => {
    const { firstName, lastName, email2, phone, date, users } = this.state;
    users.push({
      firstName: firstName,
      lastName: lastName,
      email2: email2,
      phone: phone,
      date: date
    });
    this.setState({
      users,
      firstName: "",
      lastName: "",
      email2: "",
      phone: "",
      date: "",
      enableForm: false
    });
  };

  renderLogin() {
    return (
      <div className="text-center">
        <h3 className="display-4 mb-3 text-center">Login</h3>

        <div className="form-group">
          <input
            value={this.state.email}
            type="email"
            className="form-control"
            name="email"
            placeholder="admin@domain.com"
            onChange={this.handleEmail}
          />
        </div>
        <div className="form-group">
          <input
            value={this.state.password}
            type="password"
            name="password"
            className="form-control"
            id="password1"
            placeholder="admin"
            onChange={this.handlePassword}
          />
        </div>
        <button className="btn btn-primary" onClick={this.HandleLogin}>
          Login
        </button>
      </div>
    );
  }

  handleEmail = email => {
    this.setState({
      email: email.target.value
    });
  };

  handlePassword = password => {
    this.setState({
      password: password.target.value
    });
  };

  HandleLogin = () => {
    if (
      this.state.email === this.state.orignalEmail &&
      this.state.password === this.state.orignalPassword
    ) {
      swal("Success", "Logged In", "success").then(val => {
        this.setState({
          isLoggedIn: true
        });
      });
    } else {
      swal("Error", "Try Again", "error");
    }
  };

  showTable() {
    const { users } = this.state;
    return (
      <div id="showUsers" className="container">
        <button
          className="btn btn-primary btn-lg float-left mb-2 mt-2"
          onClick={this.enableUserAdd}
        >
          Add User
        </button>

        <button
          className="btn btn-danger btn-lg float-right mb-2 mt-2"
          onClick={this.logout}
        >
          Logout
        </button>
        <table className="table table-bordered table-light table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Index</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Edit Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email2}</td>
                  <td>{user.phone}</td>
                  <td>{user.date}</td>
                  <td>
                    <div className="butt text-center">
                      <span>
                        <button
                          className="myButton btn btn-sm btn-danger"
                          onClick={this.delete.bind(this, index)}
                        >
                          Delete
                        </button>
                      </span>
                      <span>
                        <button
                          className="myButton btn btn-sm btn-warning"
                          onClick={this.edit.bind(this, index)}
                        >
                          Edit
                        </button>
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  enableUserAdd = () => {
    this.setState({
      enableForm: true
    });
  };

  logout = () => {
    this.setState({
      enableForm: false,
      isLoggedIn: false

    });
  };

  addEmployee() {
    const { editClicked } = this.state;
    return (
      <div>
        <div id="userForm" className="container">
          <h1 className="h1 text-center mt-2">Add User</h1>

          {this.FirstName()}
          {this.LastName()}
          {this.Email2()}
          {this.Salary()}
          {this.JoiningDate()}

          <div className="text-center">
            {!editClicked ? (
              <button
                onClick={this.addUser}
                className="btn btn-sm addTask btn-primary mb-3 text-center"
              >
                Add User
              </button>
            ) : (
                <button className="btn btn-info" onClick={this.updateTask}>
                  Update
              </button>
              )}
          </div>
        </div>
      </div> //main div for all
    );
  }

  handleFirstName = firstName => {
    this.setState({
      firstName: firstName.target.value
    });
  };

  handleLastName = lastName => {
    this.setState({
      lastName: lastName.target.value
    });
  };

  handleEmail2 = email2 => {
    this.setState({
      email2: email2.target.value
    });
  };

  handlePhone = phone => {
    this.setState({
      phone: phone.target.value
    });
  };

  handleDate = date => {
    this.setState({
      date: date.target.value
    });
  };

  JoiningDate() {
    return (
      <input
        value={this.state.date}
        onChange={this.handleDate}
        type="date"
        placeholder="Date"
        className="form-control mb-3"
      />
    );
  }

  Salary() {
    return (
      <input
        value={this.state.phone}
        onChange={this.handlePhone}
        type="number"
        placeholder="Phone"
        className="form-control mb-3"
      />
    );
  }

  Email2() {
    return (
      <input
        value={this.state.email2}
        onChange={this.handleEmail2}
        type="email"
        placeholder="Email"
        className="form-control mb-3"
      />
    );
  }

  LastName() {
    return (
      <input
        value={this.state.lastName}
        onChange={this.handleLastName}
        type="text"
        placeholder="Last Name"
        className="form-control mb-3"
      />
    );
  }

  FirstName() {
    return (
      <input
        value={this.state.firstName}
        onChange={this.handleFirstName}
        type="text"
        placeholder="First Name"
        className="form-control mb-3"
      />
    );
  }

  delete(index) {
    const { users } = this.state;
    users.splice(index, 1);
    this.setState({
      users
    });
  }

  edit(index) {
    const { users } = this.state;

    this.setState({
      currentIndex: index,
      editClicked: true,
      enableForm: true,
      firstName: users[index].firstName,
      lastName: users[index].lastName,
      email2: users[index].email2,
      phone: users[index].phone,
      date: users[index].handleDate
      // currentIndex: index
    });
  }
}

export default Employees;
