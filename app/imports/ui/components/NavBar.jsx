import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, CloudDownload, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const menuStyle = { paddingTop: '20px', paddingBottom: '20px', marginBottom: '40px', borderBottom: '0.1px solid #D6D8DA' };
  const itemStyle = { paddingLeft: '30px', paddingRight: '30px', color: '#1762A7', fontWeight: 'bold'};
  return (
    <Navbar style={menuStyle}>
      <Container>
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="justify-content-start">
            <Nav.Link style={itemStyle} id={COMPONENT_IDS.NAVBAR_ADD_STUFF} as={NavLink} to="/add" key="add">Classes</Nav.Link>
            <Nav.Link style={itemStyle} id={COMPONENT_IDS.NAVBAR_LIST_STUFF} as={NavLink} to="/list" key="list">About</Nav.Link>
            <Nav.Link style={itemStyle} id={COMPONENT_IDS.NAVBAR_LIST_STUFF} as={NavLink} to="/list" key="list">Resources</Nav.Link>
          </Nav>
            <Navbar.Brand className="ms-auto justify-content-center" id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} to="/"><img src="/images/uh-logo.png" alt="University of Hawaii Logo" /></Navbar.Brand>
          <Nav className="ms-auto justify-content-end">
            {currentUser === '' ? ([
              <Navbar.Text style={{ paddingLeft: '30px', paddingRight: '30px', color: '#FFFFFF', cursor: 'default'}}>Blank</Navbar.Text>,
              <Nav.Link style={itemStyle} id={COMPONENT_IDS.NAVBAR_LOGIN} as={NavLink} to="/login" key="login">Login</Nav.Link>,
              <Nav.Link style={itemStyle} id={COMPONENT_IDS.NAVBAR_SIGN_UP} as={NavLink} to="/signup" key="signup">Sign Up</Nav.Link>
            ]) : ([
                  <Navbar.Text style={{ paddingLeft: '30px', paddingRight: '30px', color: '#FFFFFF', cursor: 'default'}}>Blank</Navbar.Text>,
                  <Navbar.Text style={{ paddingLeft: '30px', paddingRight: '30px', color: '#FFFFFF', cursor: 'default'}}>Blank</Navbar.Text>,
                  <NavDropdown style={itemStyle} id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                    <NavDropdown.Item style={itemStyle} id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout"><BoxArrowRight /> Sign out</NavDropdown.Item>
                  </NavDropdown>
            ])}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
