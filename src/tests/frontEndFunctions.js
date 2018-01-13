const timeStamp = mongooseTimestamp => `${mongooseTimestamp.slice(0, mongooseTimestamp.indexOf("T"))} ${mongooseTimestamp.slice(mongooseTimestamp.indexOf("T") + 1, mongooseTimestamp.lastIndexOf(":"))}`;

const dateStamp = mongooseTimestamp => `${mongooseTimestamp.slice(0, mongooseTimestamp.indexOf("T"))}`;

const getDateDB = today => {
  let date = new Date();
  let dd = today
    ? date.getDate()
    : date.getDate() + 1;
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  dd = dd < 10
    ? `0${dd}`
    : dd;
  mm = mm < 10
    ? `0${mm}`
    : mm;
  return `${yyyy}-${mm}-${dd}`;
};

const filmIDFinder = (arr, film) => {
  const found = arr.filter(f => f.movie === film);
  if (found.length > 0) {
    return found[0]._id;
  }
  return;
}

const eventFinderById = (arr, eventId) => {
  const found = arr.filter(f => f._id === eventId);
  return found[0];
}

const tokenChecker = () => {
  return localStorage.getItem("localToken") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("email")
    ? true
    : false;
};

module.exports = {
  timeStamp,
  dateStamp,
  getDateDB,
  filmIDFinder,
  eventFinderById,
  tokenChecker
}
