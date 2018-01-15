const createAttendee = user => ({ user, timestamp: Date.now() });
const checkAttendees = (user, movie) =>
  movie.members.filter(member => member.user === user).length > 0;
const getAttendee = (user, movie) =>
  movie.members.filter(member => member.user === user);

module.exports = {
  createAttendee,
  checkAttendees,
  getAttendee
};
