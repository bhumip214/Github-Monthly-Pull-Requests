import _ from "lodash";

function formatMonth(date) {
  const year = date.substr(0, 4);
  let month = "";

  switch (date.substr(5, 7)) {
    case "01":
      month = "January";
      break;
    case "02":
      month = "February";
      break;
    case "03":
      month = "March";
      break;
    case "04":
      month = "April";
      break;
    case "05":
      month = "May";
      break;
    case "06":
      month = "June";
      break;
    case "07":
      month = "July";
      break;
    case "08":
      month = "August";
      break;
    case "09":
      month = "September";
      break;
    case "10":
      month = "October";
      break;
    case "11":
      month = "November";
      break;
    case "12":
      month = "December";
      break;
  }

  return `${month} ${year}`;
}

/**

PR = {
  id: string
  title: string
  number: number
  repository: object
  createdAt: string
}

Input:
lists = PR[]

Output:
[
  {
    month: string
    pullRequests: PR[]
  }
]
 */

export function groupByMonth(lists) {
  const grouped = _.groupBy(lists, item => {
    return item.createdAt.substr(0, 7);
  });

  return Object.entries(grouped).map(entry => {
    return {
      month: formatMonth(entry[0]),
      pullRequests: entry[1]
    };
  });
}
