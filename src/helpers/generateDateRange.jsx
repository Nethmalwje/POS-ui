import dayjs from "dayjs";

export const generateDateRange = (startDate, endDate) => {
  const dateArray = [];
  let currentDate = dayjs(startDate);

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, "day")) {
    dateArray.push(currentDate.format("YYYY-MM-DD"));
    currentDate = currentDate.add(1, "day");
  }

  return dateArray;
};
