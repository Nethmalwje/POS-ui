import dayjs from "dayjs";

export const generateHourRange = (date) => {
  const hourArray = [];
  let currentHour = dayjs(date).startOf("day");

  for (let i = 0; i < 24; i++) {
    hourArray.push(currentHour.format("YYYY-MM-DD HH:mm"));
    currentHour = currentHour.add(1, "hour");
  }

  return hourArray;
};
