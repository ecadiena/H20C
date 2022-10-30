import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Container, Row, Col, Card, ListGroup, Form, Button, InputGroup, Accordion } from 'react-bootstrap';
import { Search, ChevronRight, ChevronDoubleRight, ChevronLeft, ChevronDoubleLeft, Person } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import AccountListItem from '../components/accountList/AccountListItem';
import { SubmittedQuizzes } from '../../api/submittedQuiz/SubmittedQuizCollection';
import { Lessons } from '../../api/lesson/LessonCollection';
import { Sessions } from '../../api/session/SessionCollection';

const AccountList = () => {
  const [search, setSearch] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { ready, accounts, sessions, submittedQuizzes, lessons } = useTracker(() => {
    const userProfileSubscription = UserProfiles.subscribe();
    const adminProfileSubscription = AdminProfiles.subscribe();
    const sessionsSubscription = Sessions.subscribeSession();
    const submittedQuizSubscription = SubmittedQuizzes.subscribeSubmittedQuizAdmin();
    const lessonsSubscription = Lessons.subscribeLesson();
    const rdy = userProfileSubscription.ready() && adminProfileSubscription.ready() && sessionsSubscription.ready() && submittedQuizSubscription.ready() && lessonsSubscription.ready();

    const user = UserProfiles.find({}, { sort: { username: 1 } }).fetch();
    const admin = AdminProfiles.find({}, { sort: { username: 1 } }).fetch();
    const sessionss = Sessions.find({ type: 'Course' }, {}).fetch();
    const submittedQuiz = SubmittedQuizzes.find({}, {}).fetch();
    const lssns = Lessons.find({}, {}).fetch();

    const users = _.sortBy(user.concat(admin), (obj) => obj.lastName);
    return {
      accounts: users,
      sessions: sessionss,
      submittedQuizzes: submittedQuiz,
      lessons: lssns,
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
      <h1><Person style={{ marginRight: '1em' }} />User Accounts</h1>
      <Card className="my-4">
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
              <Button variant="dark" type="button" style={{ marginLeft: '2em' }} onClick={(e) => handleSearch(e)} alt="Search User">Search User</Button>
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
              {getFilteredProfiles().map((account, index) => {
                const completed = { courses: 0, lessons: 0, quizPercentage: 0 };
                const userFirstSubmittedQuizzes = _.where(submittedQuizzes, { owner: account.email, firstAttempt: true });
                const allSubmittedQuizzes = _.where(submittedQuizzes, { owner: account.email });
                const groupSubmittedQuizzes = _.groupBy(allSubmittedQuizzes, quiz => quiz.lessonID);
                const bestSubmittedQuizzes = [];
                _.each(groupSubmittedQuizzes, lessonGroup => {
                  const bestQuiz = _.max(lessonGroup, quiz => quiz.numCorrect);
                  bestSubmittedQuizzes.push(bestQuiz);
                });
                sessions.forEach(session => {
                  const thisLessons = _.where(lessons, { sessionID: session._id });
                  let thisLessonsCompleted = 0;
                  thisLessons.forEach(lesson => {
                    const completedLesson = _.where(userFirstSubmittedQuizzes, { lessonID: lesson._id });
                    if (completedLesson.length > 0) {
                      thisLessonsCompleted++;
                    }
                  });
                  if (thisLessons.length === thisLessonsCompleted) {
                    completed.courses++;
                  }
                  completed.lessons += thisLessonsCompleted;
                });
                bestSubmittedQuizzes.forEach(quiz => {
                  completed.quizPercentage += (quiz.numCorrect / quiz.answers.length) * 100;
                });
                completed.quizPercentage /= bestSubmittedQuizzes.length;
                return <AccountListItem key={index} eventKey={`${index}`} account={account} completed={completed} />;
              })}
            </Accordion>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row className="d-flex flex-row-reverse">

              <Button variant="outline-light" style={{ width: '50px', color: 'black' }} onClick={goToLastPage} alt="Go to Last Page">
                <ChevronDoubleRight />
              </Button>
              <Button variant="outline-light" style={{ width: '50px', color: 'black' }} onClick={goToNextPage} alt="Go to Next Page">
                <ChevronRight />
              </Button>
              <Form.Select id="pagination-select-page" style={{ width: '90px' }} onChange={getItemsInPage}>
                {[...Array(numPages)].map((e, i) => <option value={i + 1} key={i}>{i + 1}</option>)}
              </Form.Select>
              <Button variant="outline-light" style={{ width: '50px', color: 'black' }} onClick={goToPrevPage} alt="Go to Previous Page">
                <ChevronLeft />
              </Button>
              <Button variant="outline-light" style={{ width: '50px', color: 'black' }} onClick={goToFirstPage} alt="Go to First Page">
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
