export const getCurrWeek = () => {
  const currWeek = getWeek(new Date());
  return currWeek;
};

const getWeek = (date) => {
  const curr1 = new Date(date.getTime());
  const curr2 = new Date(date.getTime());
  const first = date.getDate() - date.getDay();
  const last = first + 7;
  const start = new Date(curr1.setDate(first));
  const end = new Date(curr2.setDate(last));
  return { start, end };
};

export const getRunStats = (arr) => {
  const temp = arr.reduce(
    (x, y) => ({
      distance: x.distance + y.distance,
      duration: x.duration + y.duration,
    }),
    {
      distance: 0,
      duration: 0,
    }
  );
  temp.runs = arr.length;
  temp.longest = arr
    .map((item) => item.distance)
    .reduce((x, y) => Math.max(x, y), 0);

  return temp;
};

export const withinPeriod = (date, period) => {
  const curr = date.getTime()
  const end = period.end.seconds * 1000
  const start = period.start.seconds * 1000
  return (curr > start && curr <= end)
}

export const getStats = (arr) => {
  const temp = arr.reduce(
    (x, y) => ({
      calories: x.calories + y.calories,
      duration: x.duration + y.duration,
    }),
    {
      calories: 0,
      duration: 0,
    }
  );
  temp.sets = arr
    .map((workout) =>
      workout.exercises
        .map((exercise) => exercise.sets.length)
        .reduce((x, y) => x + y, 0)
    )
    .reduce((x, y) => x + y, 0);
  temp.workouts = arr.length;
  return temp;
};

export const reloadPeriod = (period, hist) => {
  return getStats(
    hist
      .map((doc) => doc.data)
      .filter(
        (doc) =>
          doc.date.seconds * 1000 < Date.parse(period.end) &&
          doc.date.seconds * 1000 >= Date.parse(period.start)
      )
  );
};

export const reloadRunPeriod = (period, hist) => {
  return getRunStats(
    hist
      .map((doc) => doc.data)
      .filter(
        (doc) =>
          doc.date.seconds * 1000 < Date.parse(period.end) &&
          doc.date.seconds * 1000 >= Date.parse(period.start)
      )
  );
};

//reduce stats
