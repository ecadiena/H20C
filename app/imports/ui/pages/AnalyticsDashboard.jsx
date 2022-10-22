import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { UserProfiles } from '../../api/user/UserProfileCollection';

const AnalyticsDashBoard = () => {
  const { ready, profiles } = useTracker(() => {
    const userSubscription = UserProfiles.subscribe();
    const rdy = userSubscription.ready();

    const users = UserProfiles.find({}, { sort: { username: 1 } }).fetch();
    return {
      ready: rdy,
      profiles: users,
    };
  }, []);
  console.log(profiles);

  return (ready ? (
    <>
    </>
  ) : (
    <>
    </>
  )
  );
};

export default AnalyticsDashBoard;
