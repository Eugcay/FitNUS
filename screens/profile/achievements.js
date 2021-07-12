import { duration } from "moment";

export const returnAccruedTemp = (
  distanceGoal,
  durationGoal,
  runStats,
  workoutStats,
  userAchivements
) => {
  //runStats - Weekly
  const averagePace = runStats.duration / 60 / (runStats.duration * 1000);
  const distance = runStats.distance;
  const metDistanceGoal = distance >= distanceGoal;

  //workoutStats - Weekly
  const duration = workoutStats.duration / 60;
  const metDurationGoal = duration >= durationGoal;
  const workouts = workoutStats.workouts;

  //jioStats - weekly

  const rawAccruedList = [
    //Run - 100
    {
      id: 101,
      title: "Go-getter!",
      description: "Met distance goal this week!",
      criteria: metDistanceGoal,
    },
    {
      id: 102,
      title: "Competetive Runner",
      description:
        "Scored an average pace of 4:15 min/Km, the average pace for marathon runners.",
      criteria: averagePace <= 4.25,
    },
    {
      id: 103,
      title: "Joie de vivre",
      description: "Scored an averge pace of the average Parisian: 5:33 min/Km",
      criteria: averagePace <= 5.55,
    },
    {
      id: 104,
      title: "You be bussin' fam",
      description:
        "Scored an averge pace of the average Londonder: 5:36 min/Km",
      criteria: averagePace <= 5.6,
    },
    {
      id: 105,
      title: "Juten Tach! ",
      description:
        "Scored an avergae pace of the average Berliner: 5:42 min/Km",
      criteria: averagePace <= 5.7,
    },
    //Workout - 200
    {
      id: 201,
      title: "Hustler!",
      description: "Met your workout goal this week!",
      criteria: metDurationGoal,
    },
    {
      id: 202,
      title: "Rest days? Pssh",
      description: "Worked out 7 times in a week",
      criteria: workouts >= 7,
    },
    //Jio - 300
  ];

  //criterias hit
  const cleanedAccruedList = rawAccruedList.filter((doc) => {
    return doc.criteria;
  });
  //now check if periodNow is available in the User's achivement list

  return cleanedAccruedList;
};

const cleanAccruedList = (cleanedAccruedList, userAchievements) => {
    if (userAchievements === null) {
        return cleanedAccruedList;
    } else {
        cleanedAccruedList.forEach((temp) => {
            if (!(userAchievements.idList.includes(temp.id))) {
                //add in idList

            }
        })
    }
}

export const returnSingleTemp = (goals) => {
  return goals;
};


