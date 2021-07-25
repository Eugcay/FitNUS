import moment from "moment";
import firebase from "firebase";

export function setRandomColor() {
  let rgb = [];
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor(Math.random() * 151 + 105);
  }
  let randomCol = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  return randomCol;
}

export function timestampToDate(timestamp) {
  var formattedTime = moment(timestamp).format("MMMM Do YYYY, h:mm ");
  return formattedTime;
}

export const deleteFromArray = (array, item) => {
  const data = [...array];
  const index = array.indexOf(item);
  data.splice(index, 1);
  return data;
};

export const concatWithoutDupe = (arr, inputArr) => {
  return arr.length === 0 ? inputArr : arr.concat(inputArr.filter((item) => !arr.includes(item)));
};

export const getCat = (cat) => {
  switch (cat) {
    case 8:
      return "Arms";
    case 9:
      return "Legs";
    case 10:
      return "Abs";
    case 11:
      return "Chest";
    case 12:
      return "Back";
    case 13:
      return "Shoulders";
    case 14:
      return "Calves";
  }
  exCats.find((item) => item.id === cat);
  console.log(cat);
};


export function getWorkouts() {
  return firebase.firestore().collection("Workouts");
}

export const secondsToDuration = (seconds) => {
  return (
    (seconds >= 3600 ? Math.floor(seconds / 3600) + "h " : "") +
    Math.floor((seconds % 3600) / 60) +
    "m " +
    (seconds < 3600 ? Math.floor(seconds % 60) + "s" : "")
  );
};