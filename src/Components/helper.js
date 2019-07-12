export function groupByMonth(lists) {
  const months = [];
  const jan = [];
  const feb = [];
  const march = [];
  const april = [];
  const may = [];
  const june = [];
  const july = [];
  const aug = [];
  const sept = [];
  const oct = [];
  const nov = [];
  const dec = [];

  for (let i = 0; i < lists.length; i++) {
    const month = new Date(lists[i].createdAt).getMonth();
    if (month === 0) {
      jan.push(lists[i]);
    } else if (month === 1) {
      feb.push(lists[i]);
    } else if (month === 2) {
      march.push(lists[i]);
    } else if (month === 3) {
      april.push(lists[i]);
    } else if (month === 4) {
      may.push(lists[i]);
    } else if (month === 5) {
      june.push(lists[i]);
    } else if (month === 6) {
      july.push(lists[i]);
    } else if (month === 7) {
      aug.push(lists[i]);
    } else if (month === 8) {
      sept.push(lists[i]);
    } else if (month === 9) {
      oct.push(lists[i]);
    } else if (month === 10) {
      nov.push(lists[i]);
    } else {
      dec.push(lists[i]);
    }
  }

  months.push({ month: "January", pullRequests: jan });
  months.push({ month: "February", pullRequests: feb });
  months.push({ month: "March", pullRequests: march });
  months.push({ month: "April", pullRequests: april });
  months.push({ month: "May", pullRequests: may });
  months.push({ month: "June", pullRequests: june });
  months.push({ month: "July", pullRequests: july });
  months.push({ month: "August", pullRequests: aug });
  months.push({ month: "September", pullRequests: sept });
  months.push({ month: "October", pullRequests: oct });
  months.push({ month: "November", pullRequests: nov });
  months.push({ month: "December", pullRequests: dec });

  months.sort(function(a, b) {
    if (a.pullRequests.length === 0 || b.pullRequests.length === 0) {
      return 0;
    } else {
      const aDate = a.pullRequests[0].createdAt;
      const bDate = b.pullRequests[0].createdAt;
      if (aDate > bDate) {
        return 1;
      } else if (aDate < bDate) {
        return -1;
      } else {
        return 0;
      }
    }
  });
  //   console.log(months);
  return months.reverse();
}
