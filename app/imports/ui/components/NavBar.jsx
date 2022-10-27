import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, Person, StarFill } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import Survey from './Survey';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';

const NavBar = () => {
  const { ready, currentUser, username } = useTracker(() => {
    const usrname = Meteor.user() ? Meteor.user().username : '';
    const sub = UserProfiles.subscribe();
    const sub2 = AdminProfiles.subscribe();
    const rdy = sub.ready() && sub2.ready();

    let user = UserProfiles.findOne({ email: usrname }, {});
    if (user === undefined) user = AdminProfiles.findOne({ email: usrname }, {});
    return {
      ready: rdy,
      currentUser: user,
      username: usrname,
    };
  }, []);
  const menuStyle = { paddingTop: '10px', paddingBottom: '10px', marginBottom: '10px', borderBottom: '0.1px solid #D6D8DA', position: 'relative' };
  const itemStyle = { paddingRight: '30px', color: '#1762A7', fontWeight: 'bold', fontSize: '14px' };
  const rightItemStyle = { color: '#1762A7', fontWeight: 'bold', fontSize: '14px' };
  const pointsStyle = { paddingRight: '10px', color: '#ef8500', fontWeight: 'bold', fontSize: '18px', width: 'fit-content', paddingTop: '5px' };

  return ready ? (
    <Navbar style={menuStyle} expand="lg" id={COMPONENT_IDS.NAVBAR_LANDING_PAGE}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" style={{ minWidth: '270px', width: '22vw', position: 'absolute', top: 0, left: '50%', marginLeft: '-170px' }}>
          <Image className="img-fluid" src="/images/uh-logo.png" alt="University of Hawaii Logo" />
        </Navbar.Brand>
        <Navbar.Toggle className="ms-auto justify-content-end" aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="justify-content-start">
            <Nav.Link
              style={itemStyle}
              id={COMPONENT_IDS.NAVBAR_CLASSES}
              as={NavLink}
              to="/classes"
              key="classes"
              className="classes"
            >
              Classes
            </Nav.Link>
            <Nav.Link
              style={itemStyle}
              id={COMPONENT_IDS.NAVBAR_ABOUT}
              as={NavLink}
              to="/about"
              key="about"
              className="about"
            >
              About
            </Nav.Link>
            <Nav.Link
              style={itemStyle}
              id={COMPONENT_IDS.NAVBAR_RESOURCES}
              as={NavLink}
              to="/resources"
              key="resources"
              className="resources"
            >
              Resources
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto justify-content-end">
            { username !== '' && Roles.userIsInRole(Meteor.userId(), [ROLE.USER]) ?
              <Survey /> : ''}
            { username !== '' ? <Nav.Item style={pointsStyle}><StarFill style={{ marginRight: '0.3em', paddingBottom: '5px', fontSize: '25px' }} /><span style={{ marginTop: '1em' }}>{currentUser.totalPoints}</span></Nav.Item> : '' }
            {username !== '' && Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
              <NavDropdown style={rightItemStyle} id={COMPONENT_IDS.NAVBAR_ADMIN} title="Admin" key="Admin">
                <NavDropdown.Item className="navbar-dropdown-item" id={COMPONENT_IDS.NAVBAR_ACCOUNT_LIST} as={NavLink} to="/accounts" key="accounts">Account List</NavDropdown.Item>
                <NavDropdown.Item className="navbar-dropdown-item" as={NavLink} to="/analytics" key="analytics">Data Analytics</NavDropdown.Item>
              </NavDropdown>
            ) : ''}
            {username === '' ? ([
              <Nav.Link
                style={rightItemStyle}
                id={COMPONENT_IDS.NAVBAR_SIGN_IN_UP}
                as={NavLink}
                to="/sign-in-up"
                key="sign-in-up"
                className="signinup"
              >
                Sign in / Sign up
              </Nav.Link>,
            ]) : ([
              <NavDropdown style={rightItemStyle} id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={username} key="User">
                <NavDropdown.Item className="navbar-dropdown-item" id={COMPONENT_IDS.NAVBAR_ACCOUNT} as={NavLink} to="/profile-page" key="profile"><Person /> My Profile</NavDropdown.Item>
                <NavDropdown.Item className="navbar-dropdown-item" id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout" key="signout"><BoxArrowRight /> Sign out</NavDropdown.Item>
              </NavDropdown>,
            ])}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : '';
};

export default NavBar;
