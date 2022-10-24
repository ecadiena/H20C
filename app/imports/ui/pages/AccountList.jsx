import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Container, Row, Col, Card, ListGroup, Form, Button, InputGroup, Accordion } from 'react-bootstrap';
import { Search, ChevronRight, ChevronDoubleRight, ChevronLeft, ChevronDoubleLeft } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import AccountListItem from '../components/accountList/AccountListItem';

const AccountList = () => {
  const [search, setSearch] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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

  let filteredProfiles;
  let numProfiles;
  let numPages;

  if (ready) {
    filteredProfiles = accounts.filter(post => {
      if (search === '') {
        return post;
      }
      if (post.firstName.toLowerCase().includes(search.toLowerCase())) {
        return post;
      }
      if (post.lastName.toLowerCase().includes(search.toLowerCase())) {
        return post;
      }
      if (post.email.toLowerCase().includes(search.toLowerCase())) {
        return post;
      }
      return undefined;
    });
    numProfiles = _.size(filteredProfiles);
    numPages = parseInt(numProfiles / itemsPerPage, 10);
    if (numProfiles % itemsPerPage !== 0) {
      numPages++;
    }
  }

  const getFilteredProfiles = () => {
    const startIndex = (+currentPage * +itemsPerPage) - +itemsPerPage;
    const endIndex = +startIndex + +itemsPerPage;
    let ret;
    if (endIndex < numProfiles) {
      ret = filteredProfiles.slice(startIndex, endIndex);
    } else {
      ret = filteredProfiles.slice(startIndex, numProfiles);
    }
    return ret;
  };

  // Pagination stuff
  const getItemsPerPage = () => {
    const selection = document.getElementById('pagination-items-per-page').value;
    setItemsPerPage(+selection);
    setCurrentPage(1);
    document.getElementById('pagination-select-page').value = 1;
  };
  const getItemsInPage = () => {
    const selection = document.getElementById('pagination-select-page').value;
    setCurrentPage(+selection);
  };
  const goToFirstPage = () => {
    document.getElementById('pagination-select-page').value = 1;
    setCurrentPage(1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) {
      document.getElementById('pagination-select-page').value = currentPage - 1;
      setCurrentPage(+currentPage - 1);
    }
  };
  const goToLastPage = () => {
    document.getElementById('pagination-select-page').value = numPages;
    setCurrentPage(numPages);
  };
  const goToNextPage = () => {
    if (currentPage !== numPages) {
      document.getElementById('pagination-select-page').value = currentPage + 1;
      setCurrentPage(+currentPage + 1);
    }
  };
  const handleSearch = (e) => {
    if (e.type === 'keyup' && e.code !== 'Enter') {
      return;
    }
    document.getElementById('pagination-select-page').value = 1;
    setCurrentPage(1);
    setSearch(document.getElementById('account-list-search').value);
  };

  return ready ? (
    <Container id={PAGE_IDS.ACCOUNT_PAGE} className="py-3">
      <h1>User Accounts</h1>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item className="p-4">
            <InputGroup>
              <InputGroup.Text style={{ border: 'none' }}><Search /></InputGroup.Text>
              <Form.Control
                id="account-list-search"
                type="search"
                placeholder="Search"
                style={{ backgroundColor: '#e9ecef', border: 'none' }}
                autoComplete="off"
                onKeyUp={(e) => handleSearch(e)}
              />
              <Button variant="dark" type="button" style={{ marginLeft: '2em' }} onClick={(e) => handleSearch(e)}>Search User</Button>
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
              {getFilteredProfiles().map((account, index) => <AccountListItem key={index} eventKey={index} account={account} />)}
            </Accordion>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row className="d-flex flex-row-reverse">
              <Button variant="outline-light" style={{ width: '50px', color: 'black' }} onClick={goToLastPage}>
                <ChevronDoubleRight />
              </Button>
              <Button variant="outline-light" style={{ width: '50px', color: 'black' }} onClick={goToNextPage}>
                <ChevronRight />
              </Button>
              <Form.Select id="pagination-select-page" style={{ width: '90px' }} onChange={getItemsInPage}>
                {[...Array(numPages)].map((e, i) => <option value={i + 1} key={i}>{i + 1}</option>)}
              </Form.Select>
              <Button variant="outline-light" style={{ width: '50px', color: 'black' }} onClick={goToPrevPage}>
                <ChevronLeft />
              </Button>
              <Button variant="outline-light" style={{ width: '50px', color: 'black' }} onClick={goToFirstPage}>
                <ChevronDoubleLeft />
              </Button>
              <Form.Select id="pagination-items-per-page" style={{ width: '80px', marginRight: '3em' }} onChange={getItemsPerPage}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Form.Select>
              <Form.Label style={{ width: 'fit-content', marginTop: '0.5em', color: 'gray' }}>Items Per Page:</Form.Label>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  ) : <LoadingSpinner message="Loading Accounts" />;
};

export default AccountList;
