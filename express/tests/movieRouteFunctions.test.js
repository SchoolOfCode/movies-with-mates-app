const createAttendee = require("../functions/movieRoutesFunctions")
  .createAttendee;
const checkAttendees = require("../functions/movieRoutesFunctions")
  .checkAttendees;
const getAttendee = require("../functions/movieRoutesFunctions").getAttendee;

const now = Date.now();
Date.now = jest.genMockFunction().mockReturnValue(now);

test("takes in a user id and returns an object containing the key user and their id and a timestamp", () => {
  expect(createAttendee("123456789")).toMatchObject({
    user: "123456789",
    timestamp: Date.now()
  });
});
test("takes a user id and a movie object and return whether or not they're attending", () => {
  expect(
    checkAttendees("123456789", {
      members: [{ user: "123456789", timestamp: Date.now() }]
    })
  ).toBeTruthy();
});
test("takes in a user id and a movie object and returns an array of that id", () => {
  expect(
    getAttendee("123456789", {
      members: [{ user: "123456789", timestamp: Date.now() }]
    })
  ).toMatchObject([{ user: "123456789", timestamp: Date.now() }]);
});
