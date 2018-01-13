const timeStamp = require("./frontEndFunctions").timeStamp;
const dateStamp = require("./frontEndFunctions").dateStamp;
const getDateDB = require("./frontEndFunctions").getDateDB;
const filmIDFinder = require("./frontEndFunctions").filmIDFinder;
const eventFinderById = require("./frontEndFunctions").eventFinderById;

test('takes a mongoose timestamp and returns a timestamp to you', ()=>{
  expect(timeStamp("2018-01-13T00:00:00.000Z")).toBe("2018-01-13 00:00")
})

test('takes a mongoose timestamp and returns a date to you', ()=>{
  expect(dateStamp("2018-01-13T00:00:00.000Z")).toBe("2018-01-13")
})

test('takes in boolean (true is today, false is tomorrow) and returns a yyyy-mm-dd to send to the back end', ()=>{
  let today = new Date();
  expect(getDateDB(true)).toBe(dateStamp(today.toISOString()))
})

test('filmIDFinder takes in an array of films and a film title and returns that film title and returns the id of that film', ()=>{
  expect(filmIDFinder([{_id: "1234", movie: "Sing"}, {_id: "2345", movie: "Film"}],"Sing")).toBe("1234")
})

test('eventFinderById takes in a movieID and returns the film that has that id', () => {
  expect(eventFinderById([{_id: "1234", movie: "Sing"}, {_id: "2345", movie: "Film"}], "1234")).toMatchObject({_id: "1234", movie: "Sing"})
})
