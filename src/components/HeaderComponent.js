import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  Tooltip,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isSigninModalOpen: false,
      isSignupModalOpen: false,
      tooltipOpen: false,
    };

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleSigninModal = this.toggleSigninModal.bind(this);
    this.toggleSignupModal = this.toggleSignupModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  toggleSigninModal() {
    this.setState({
      isSigninModalOpen: !this.state.isSigninModalOpen,
    });
  }

  toggleSignupModal() {
    this.setState({
      isSignupModalOpen: !this.state.isSignupModalOpen,
    });
  }

  handleLogin(event) {
    this.toggleSigninModal();
    this.props.loginUser({
      username: this.username.value,
      password: this.password.value,
    });
    event.preventDefault();
  }

  handleSignup(event) {
    this.toggleSignupModal();
    this.props.signup({
      username: this.username.value,
      password: this.password.value,
    });
    event.preventDefault();
  }

  handleLogout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <React.Fragment>
        <Jumbotron fluid>
          <div className="container">
            <div className="row">
              <div className="col">
                <h1>Paradiso</h1>
                <h2>The best milk tea in SoCal</h2>
              </div>
            </div>
          </div>
        </Jumbotron>

        <Navbar dark sticky="top" expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <i className="fa fa-home fa-lg" /> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/directory">
                    <i className="fa fa-list fa-lg" /> Directory
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/favorites">
                    <i className="fa fa-heart fa-lg" /> My Favorites
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <i className="fa fa-info fa-lg" /> About
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {!this.props.auth.isAuthenticated ? (
                    <>
                      <Button outline onClick={this.toggleSigninModal}>
                        <i className="fa fa-sign-in" id="Tooltip"/> Login
                        {this.props.auth.isFetching ? (
                          <span className="fa fa-spinner fa-pulse fa-fw" />
                        ) : null}
                        <Tooltip
                          placement="bottom"
                          isOpen={this.state.tooltipOpen}
                          target="Tooltip"
                          toggle={this.toggle}
                        >
                          Use "admin" for username, and "password" for password, give it a try!
                        </Tooltip>
                      </Button>
                      <Button outline onClick={this.toggleSignupModal}>
                        <i className="fa fa-user-plus" /> Signup
                        {this.props.auth.isFetching ? (
                          <span className="fa fa-spinner fa-pulse fa-fw" />
                        ) : null}
                      </Button>
                    </>
                  ) : (
                    <div>
                      <div className="navbar-text mr-3">
                        {this.props.auth.user.username}
                      </div>
                      <Button outline onClick={this.handleLogout}>
                        <span className="fa fa-sign-out fa-lg"></span> Logout
                        {this.props.auth.isFetching ? (
                          <span className="fa fa-spinner fa-pulse fa-fw" />
                        ) : null}
                      </Button>
                    </div>
                  )}
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>

        <Modal
          isOpen={this.state.isSigninModalOpen}
          toggle={this.toggleSigninModal}
        >
          <ModalHeader toggle={this.toggleSigninModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={(input) => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={(input) => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerRef={(input) => (this.remember = input)}
                  />
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={this.state.isSignupModalOpen}
          toggle={this.SignuptoggleModal}
        >
          <ModalHeader toggle={this.toggleSignupModal}>Signup</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSignup}>
              <FormGroup>
                <Label htmlFor="firstname">Firstname</Label>
                <Input
                  type="text"
                  id="firstname"
                  name="firstname"
                  innerRef={(input) => (this.firstname = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="lastname">Lastname</Label>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  innerRef={(input) => (this.lastname = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={(input) => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={(input) => (this.password = input)}
                />
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Signup
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;
