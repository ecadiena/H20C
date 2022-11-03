import { _ } from 'meteor/underscore';
import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartSetup = (data) => {
  const template = {
    labels: data[0],
    datasets: [
      {
        label: data[1],
        data: data[2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ] };

  return template;
};

export const BarOptions = {
  indexAxis: 'y',
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const genderLineGraphSetup = (data) => {
  const template = {
    labels: months,
    datasets: [
      {
        label: 'Male',
        data: data[0],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Female',
        data: data[1],
        fill: false,
        borderColor: 'rgba(2, 2, 86, 1)',
      },
      {
        label: 'Transgender',
        data: data[2],
        fill: false,
        borderColor: 'rgba(255, 159, 64, 1)',
      },
      {
        label: 'Non-binary',
        data: data[3],
        fill: false,
        borderColor: 'rgba(255, 0, 64, 1)',
      },
      {
        label: 'Prefer not to say',
        data: data[4],
        fill: false,
        borderColor: 'rgba(75, 122, 49, 1)',
      },
    ],
  };

  return template;
};

// 'Grade K - 6', 'Grade 7 - 8', 'High School', 'Some College', 'College'
export const educationLineGraphSetup = (data) => {
  const template = {
    labels: months,
    datasets: [
      {
        label: 'Grade K - 6',
        data: data[0],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Grade 7 - 8',
        data: data[1],
        fill: false,
        borderColor: 'rgba(2, 2, 86, 1)',
      },
      {
        label: 'High School',
        data: data[2],
        fill: false,
        borderColor: 'rgba(255, 159, 64, 1)',
      },
      {
        label: 'Some College',
        data: data[3],
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
      },
      {
        label: 'College',
        data: data[4],
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  return template;
};

export const staticGenerator = (users, type, title) => {
  const usersType = _.countBy(users, type);
  const keys = _.keys(usersType);
  const values = _.values(usersType);
  const result = [keys, title, values];
  return result;
};

export const ageGroupGenerator = (users, title) => {
  const keys = ['<18', '18-24', '25-34', '35-44', '44-54', '55+'];
  const values = [0, 0, 0, 0, 0, 0];
  const usersType = _.countBy(users, 'age');
  _.each(usersType, (key, value) => {
    if (value < 18) {
      values[0]++;
    } else if (value > 18 && value <= 24) {
      values[1]++;
    } else if (value > 25 && value <= 34) {
      values[2]++;
    } else if (value > 34 && value <= 44) {
      values[3]++;
    } else if (value > 44 && value <= 54) {
      values[4]++;
    } else {
      values[5]++;
    }
  });
  const result = [keys, title, values];
  return result;
};

export const lineStartUp = (users) => {
  const usersList = users.map(user => ({ ...user, joined: moment(user.joined).month() + 1 }));
  const usersType = _.groupBy(usersList, 'joined');
  return usersType;
};

export const genderLineGenerator = (users) => {
  const usersType = lineStartUp(users);
  const maleTemplate = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 };
  const femaleTemplate = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 };
  const transgenderTemplate = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 };
  const nonBinaryTemplate = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 };
  const preferNotToSayTemplate = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 };
  _.each(transgenderTemplate, (key, value) => {
    if (usersType[value] !== undefined) {
      const temp = _.countBy(usersType[value], 'gender');
      if (_.contains(_.keys(temp), 'Male')) {
        maleTemplate[value] = temp.Male;
      }
      if (_.contains(_.keys(temp), 'Female')) {
        femaleTemplate[value] = temp.Female;
      }
      if (_.contains(_.keys(temp), 'Transgender')) {
        transgenderTemplate[value] = temp.Transgender;
      }
      if (_.contains(_.keys(temp), 'Non-binary')) {
        nonBinaryTemplate[value] = temp['Non-binary'];
      }
      if (_.contains(_.keys(temp), 'Prefer not to say')) {
        // eslint-disable-next-line no-undef
        preferNotToSayTemplate[value] = temp['Prefer not to say'];
      }
    }
  });
  const result = [_.values(maleTemplate), _.values(femaleTemplate), _.values(transgenderTemplate), _.values(nonBinaryTemplate), _.values(preferNotToSayTemplate)];
  return result;
};

// 'Grade K - 6', 'Grade 7 - 8', 'High School', 'Some College', 'College'
export const educationLineGenerator = (users) => {
  const usersType = lineStartUp(users);
  const elementaryTemplate = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 };
  const middleTemplate = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 };
  const highTemplate = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 };
  const someCollegeTemplate = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 };
  const CollegeTemplate = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 };
  _.each(elementaryTemplate, (key, value) => {
    if (usersType[value] !== undefined) {
      const temp = _.countBy(usersType[value], 'education');
      if (_.contains(_.keys(temp), 'Grade K - 6')) {
        elementaryTemplate[value] = temp['Grade K - 6'];
      }
      if (_.contains(_.keys(temp), 'Grade 7 - 8')) {
        middleTemplate[value] = temp['Grade 7 - 8'];
      }
      if (_.contains(_.keys(temp), 'High School')) {
        highTemplate[value] = temp['High School'];
      }
      if (_.contains(_.keys(temp), 'Some College')) {
        someCollegeTemplate[value] = temp['Some College'];
      }
      if (_.contains(_.keys(temp), 'College')) {
        CollegeTemplate[value] = temp.College;
      }
    }
  });
  const result = [_.values(elementaryTemplate), _.values(middleTemplate), _.values(highTemplate), _.values(someCollegeTemplate), _.values(CollegeTemplate)];
  return result;
};

export const userAccGenerator = (users) => {
  const currentDate = new Date();
  // month is base 0
  const currentMonth = moment(currentDate).month() + 1;
  const lastMonth = currentMonth === 12 ? 1 : moment(currentDate).month();
  const currentMonthData = _.filter(users, (user) => moment(user.joined).month() + 1 === currentMonth);
  const lastMonthData = _.filter(users, (user) => moment(user.joined).month() + 1 === lastMonth);
  const currentTotalUsers = currentMonthData.length;
  const lastTotalUsers = lastMonthData.length;
  const monthlyGrowth = currentTotalUsers > lastTotalUsers;
  const rate = monthlyGrowth ? (((currentTotalUsers - lastTotalUsers) / lastTotalUsers) * 100) : (((lastTotalUsers - currentTotalUsers) / currentTotalUsers) * 100);
  const monthlyGrowthRate = rate === Infinity ? 0 : rate;
  // return [# total users, # users for this month, true/false growth better than previous month, percentage growth
  const result = [users.length, currentMonthData.length, monthlyGrowth, monthlyGrowthRate];
  return result;
};

export const surveyMultiSelectGroupGenerator = (surveys, type, title) => {
  let keys = [];
  let values = [];
  if (type === 'difficulty') {
    keys = ['Safety & Security', 'Uncertainty / Ambiguity', 'Data Protection', 'Reliable Connectivity', 'Difficulty Accessing/Inaccessible Resources', 'Cost'];
    values = [0, 0, 0, 0, 0, 0];
  }
  if (type === 'devices') {
    keys = ['Personal Smartphone(s)', 'Personal Tablet(s)', 'Personal Laptop(s)', 'Public/Work Devices', 'Other'];
    values = [0, 0, 0, 0, 0];
  }
  const surveyType = _.pluck(surveys, type);
  surveyType.forEach(item => {
    item.forEach(x => {
      const index = keys.indexOf(x);
      values[index]++;
    });
  });
  return [keys, title, values];
};
