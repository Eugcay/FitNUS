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

  var hours = date.getHours();

  var minutes = "0" + date.getMinutes();
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  
  var formattedTime = moment(date).format("MMMM Do YYYY, h:mm ");
  

  return formattedTime;
}

export const workoutImages = {
    exercise: {
       'Run': require('../assets/Run.jpeg'),
       'Boxing': require('../assets/boxing.jpeg'),
       'Pilates': require('../assets/Pilates.jpeg')
    }
}