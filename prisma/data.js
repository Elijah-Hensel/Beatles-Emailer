const { Prisma } = require('@prisma/client');

const users = [
  {
    name: 'Carl',
    email: 'carl@example.com'
  },
  {
    name: 'Jen',
    email: 'jen@example.com'
  },
  {
    name: 'Oliver',
    email: 'oliver@example.com'
  },
];

const messages = [
  {
    message: "Hey Jude, don't make it bad",
  },
  {
    message: "Lucy in the sky with diamonds",
  },
  {
    message: "In the town where I was born, lived a man...",
  },
  {
    message: "Eleanor Rigby, picks up the rice In the church where a wedding has beend",
  },
  {
    message: "Ah, look at all the lonely people",
  },
  {
    message: "I am the walrus...coo coo kachoo",
  },
  {
    message: "We all live in a yellow submarine",
  },
  {
    message: "Isn't anyone going to listen to my story",
  },
  {
    message: "It's been a hard day's night",
  },
  {
    message: "Strawberry fields forever",
  },
];

module.exports = {
  users,
  messages,
};
