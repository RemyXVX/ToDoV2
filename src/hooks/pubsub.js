const events = {};

export const subscribe = (event, callback) => {
  if (!events[event]) {
    events[event] = [];
  }
  events[event].push(callback);
};

export const publish = (event, data) => {
  if (events[event]) {
    events[event].forEach(callback => callback(data));
  }
};