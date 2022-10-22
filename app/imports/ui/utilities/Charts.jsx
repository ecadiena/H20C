import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { _ } from 'meteor/underscore';
import moment from 'moment';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChartSetup = (labels, title, data) => {
  const template = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
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

export const staticGenerator = (users, type, title) => {
  const usersType = _.countBy(users, type);
  const keys = _.keys(usersType);
  const values = _.values(usersType);
  const result = [keys, title, values];
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
  const monthlyGrowthRate = monthlyGrowth ? (((currentTotalUsers - lastTotalUsers) / lastTotalUsers) * 100) : (((lastTotalUsers - currentTotalUsers) / currentTotalUsers) * 100);
  // return [# total users, # users for this month, true/false growth better than previous month, percentage growth]
  return [users.length, currentMonthData.length, monthlyGrowth, monthlyGrowthRate];
};
