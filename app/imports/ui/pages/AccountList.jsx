import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Container, Row, Col, Card, ListGroup, Form, Button, InputGroup, Accordion, useAccordionButton } from 'react-bootstrap';
import { Search, CaretDown } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import AccountListItem from '../components/accountList/AccountListItem';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const AccountList = () => {
  const { ready, accounts } = useTracker(() => {
    const userProfileSubscription = UserProfiles.subscribe();
    const adminProfileSubscription = AdminProfiles.subscribe();
    const rdy = userProfileSubscription.ready() && adminProfileSubscription.ready();

    const user = UserProfiles.find({}, { sort: { username: 1 } }).fetch();
    const admin = AdminProfiles.find({}, { sort: { username: 1 } }).fetch();

    const users = _.sortBy(user.concat(admin), (obj) => obj.lastName);
    return {
      accounts: users,
      ready: rdy,
    };
  }, []);

  return ready ? (
    <Container id={PAGE_IDS.ACCOUNT_PAGE} className="py-3">
      <h1>User Accounts</h1>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item className="p-4">
            <InputGroup>
              <InputGroup.Text style={{ border: 'none' }}><Search /></InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search"
                style={{ backgroundColor: '#e9ecef', border: 'none' }}
              />
              <Button variant="dark" type="button" style={{ marginLeft: '2em' }}>Search User</Button>
            </InputGroup>
          </ListGroup.Item>
          <ListGroup.Item className="p-4">
            <Row className="px-3 py-2">
              <Col><b>NAME</b></Col>
              <Col><b>EMAIL</b></Col>
              <Col xs={2}><b>ROLE</b></Col>
              <Col xs={1} />
            </Row>
            <Accordion>
              {accounts.map((account, index) => <AccountListItem key={index} eventKey={index} account={account} />)}
            </Accordion>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  ) : <LoadingSpinner message="Loading Accounts" />;
};

export default AccountList;
