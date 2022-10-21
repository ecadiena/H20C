import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
// import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Person } from 'react-bootstrap-icons';
// import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const menuStyle = { paddingTop: '10px', paddingBottom: '10px', marginBottom: '10px', borderBottom: '0.1px solid #D6D8DA' };
  const itemStyle = { paddingRight: '40px', color: '#1762A7', fontWeight: 'bold', fontSize: '14px' };
  const rightItemStyle = { color: '#1762A7', fontWeight: 'bold', fontSize: '14px' };
  return (
    <Navbar style={menuStyle} expand="md">
      <Container>
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="justify-content-start">
            <Nav.Link style={itemStyle} id={COMPONENT_IDS.NAVBAR_ADD_STUFF} as={NavLink} to="/add" key="add">Classes</Nav.Link>
            <Nav.Link style={itemStyle} id={COMPONENT_IDS.NAVBAR_LIST_STUFF} as={NavLink} to="/list" key="list">About</Nav.Link>
            <Nav.Link style={itemStyle} id={COMPONENT_IDS.NAVBAR_LIST_STUFF} as={NavLink} to="/list" key="list">Resources</Nav.Link>
          </Nav>
          <Navbar.Brand className="ms-auto justify-content-center" id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} to="/" style={{ width: '20%' }}>
            <img className="img-fluid" src="/images/uh-logo.png" alt="University of Hawaii Logo" />
          </Navbar.Brand>
          <Nav className="ms-auto justify-content-end">
            {currentUser === '' ? ([
              <Nav.Link style={rightItemStyle} id={COMPONENT_IDS.NAVBAR_SIGN_IN_UP} as={NavLink} to="/sign-in-up" key="sign-in-up">
                Sign in / Sign up
              </Nav.Link>,
            ]) : ([
              <NavDropdown style={rightItemStyle} id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                <NavDropdown.Item style={itemStyle} id={COMPONENT_IDS.NAVBAR_ACCOUNT} as={NavLink} to="/profile-page"><Person /> My Profile</NavDropdown.Item>
                <NavDropdown.Item style={itemStyle} id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout"><BoxArrowRight /> Sign out</NavDropdown.Item>
              </NavDropdown>,
            ])}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
