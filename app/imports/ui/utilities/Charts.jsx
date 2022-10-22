import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { _ } from 'meteor/underscore';

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
