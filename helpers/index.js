import moment from "moment";

export function setRandomColor() {
  let rgb = [];
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor(Math.random() * 151 + 105);
  }
  let randomCol = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  console.log(randomCol);
  return randomCol;
}

export function timestampToDate(timestamp) {
  var date = new Date(timestamp * 1000);
  var formattedTime = moment(date).format("MMMM Do YYYY, h:mm ");
  return formattedTime;
}

export const workoutImages = {
  exercise: {
    Run: require("../assets/Run.jpeg"),
    Boxing: require("../assets/boxing.jpeg"),
    Pilates: require("../assets/Pilates.jpeg"),
  },
};

export const deleteFromArray = (array, item) => {
  const data = [...array];
  const index = array.indexOf(item);
  data.splice(index, 1);
  return data;
};

export const getCurrWeek = () => {
  const curr = new Date();
  const first = curr.getDate() - curr.getDay();
  const last = first + 6;
  const start = new Date(curr.setDate(first));
  const end = new Date(curr.setDate(last));
  return { start, end };
};

export const getCurrMonth = () => {
  const date = new Date();
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), start.getMonth() + 1, 0);
  return { start, end };
};

export const changeMonth = (month, direction) => {
  let start
  if (direction === "next") {
    start = moment(month.start).add(1, "month").toDate();
  } else {
    start = moment(month.start).subtract(1, "month").toDate();
  }
  const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
  return { start, end };
};

export const changeWeek = (week, direction) => {
  
  if (direction === "next") {
    return {start: moment(week.start).add(1, 'week').toDate(), end: moment(week.end).add(1, 'week').toDate()}
  } else {
    return {start: moment(week.start).subtract(1, 'week').toDate(), end: moment(week.end).subtract(1, 'week').toDate()} 
  }
}

export const getStats = (arr) => {
  const temp = arr.reduce(
    (x, y) => ({
      calories: x.calories + y.calories,
      duration: x.duration + y.duration,
      distance: x.distance + y.distance,
    }),
    {
      calories: 0,
      duration: 0,
      distance: 0,
    }
  );
  temp.workouts = arr.length;
  return temp;
};


console.log(getCurrMonth());
console.log(changeMonth(getCurrMonth(), 'increase'));
