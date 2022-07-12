import { record } from "rrweb";

let events = [];

export const useRecordActions = () => {
  record({
    emit(event) {
      events.push(event);
    },
  });
};
