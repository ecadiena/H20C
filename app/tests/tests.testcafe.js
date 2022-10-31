// import { Selector, t } from 'testcafe';
// import { addStuffPage, listStuffAdminPage, listStuffPage, editStuffPage, /* manageDatabasePage, */ signOutPage } from './simple.page';
// import { signInPage } from './signin.page';
// import { signUpPage } from './signup.page';
// import { navBar } from './navbar.component';
// import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';
import { landingPage } from './landing.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
// const credentials = { username: 'john@foo.com', password: 'changeme' };
// const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
// const newCredentials = { username: 'jane@foo.com', password: 'changeme' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});
