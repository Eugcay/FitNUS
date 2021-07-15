export const returnAccruedTemp = (
  distanceGoal,
  durationGoal,
  runStats,
  workoutStats
) => {
  //runStats - Weekly
  const averagePace = runStats.duration / 60 / (runStats.duration * 1000);
  const distance = runStats.distance;
  console.log(distanceGoal)
  const metDistanceGoal = distanceGoal ? distance >= distanceGoal : false;

  //workoutStats - Weekly
  const duration = workoutStats.duration / 60;
  const metDurationGoal = durationGoal ? duration >= durationGoal : false;
  const workouts = workoutStats.workouts;

  //jioStats - weekly

  const rawAccruedList = [
    //Run - 100
    {
      id: 101,
      title: "Go-getter!",
      description: "Met distance goal this week!",
      criteria: metDistanceGoal,
      cat: "run",
    },
    {
      id: 102,
      title: "Competetive Runner",
      description:
        "Scored an average pace of 4:15 min/Km, the average pace for marathon runners.",
      criteria: averagePace <= 4.25,
      cat: "run",
    },
    {
      id: 103,
      title: "Joie de vivre",
      description: "Scored an averge pace of the average Parisian: 5:33 min/Km",
      criteria: averagePace <= 5.55,
      cat: "run",
    },
    {
      id: 104,
      title: "You be bussin' fam",
      description:
        "Scored an averge pace of the average Londonder: 5:36 min/Km",
      criteria: averagePace <= 5.6,
      cat: "run",
    },
    {
      id: 105,
      title: "Juten Tach! ",
      description:
        "Scored an avergae pace of the average Berliner: 5:42 min/Km",
      criteria: averagePace <= 5.7,
      cat: "run",
    },
    //Workout - 200
    {
      id: 201,
      title: "Hustler!",
      description: "Met your workout goal this week!",
      criteria: metDurationGoal,
      cat: "workout",
    },
    {
      id: 202,
      title: "Rest days? Pssh",
      description: "Worked out 7 times in a week",
      criteria: workouts >= 7,
      cat: "workout",
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

export const returnSingleTemp = (runStats, workoutStats) => {
  const workoutDuration = workoutStats.duration / 60;
  const runDuration = runStats.duration / 60;
  const workoutSets = workoutStats.sets;
  const workoutNo = workoutStats.workouts;
  const runNo = runStats.runs;

  const rawSingleList = [
    //runs - 100
    {
      id: 101,
      title: "Around the world in 90 days",
      description: "Spent 90 days running so far...",
      cat: "run",
      criteria: runDuration >= 129600,
    },
    {
      id: 102,
      title: "Trekker",
      description: "Ran a distance equivalent to the width of Singapore",
      cat: "run",
      criteria: runStats.distance >= 27,
    },
    {
      id: 103,
      title: "Traveller",
      description: "Ran a distance equivalent to the length of Singapore",
      cat: "run",
      criteria: runStats.distance >= 50,
    },
    {
      id: 104,
      title: "Explorer",
      description:
        "Ran a distance equivalent to the length of Singapore's coastline",
      cat: "run",
      criteria: runStats.distance >= 193,
    },

    //Workouts - 200
    {
      id: 201,
      title: "Amatuer lifter",
      description: "Performed 100 sets",
      cat: "workout",
      criteria: workoutSets >= 100,
    },
    {
      id: 202,
      title: "Baby steps",
      description: "Logged 10 workouts so far",
      cat: "workout",
      criteria: workoutNo >= 10,
    },
    //Jio - 300
  ];
  
  const cleanedSingleList = rawSingleList.filter((doc) => {
    return doc.criteria;
  });
  return cleanedSingleList;
};
