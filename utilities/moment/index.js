import moment from "moment";

// Add new formats here & use them instead of passing strings
// Key naming convention "{dateSeparator_dateFormat}"
const dateFormats = {
  colon_HH_mm: "HH:mm",
  YYYYMMDD: "YYYYMMDD",
  YYYYMMDDHHmmss: "YYYYMMDDHHmmss",
  hyphen_DD_MMM_YYYY: "DD-MMM-YYYY",
  hyphen_DD_MMM_YYYY_HH_mm_ss: "DD-MMM-YYYY HH:mm:ss",
};

// Creates moment object using the existingFormat specified & returns date in newFormat
const formatDate = (date, existingFormat, newFormat) => {
  try {
    if (!existingFormat) {
      return moment.parseZone(date).format(newFormat);
    }
    return moment(date, existingFormat).format(newFormat);
  } catch (err) {
    return date.toString();
  }
};

const isValidDate = (date, format) => {
  return moment(date, format, true).isValid();
};

const isStartDateBeforeEndDate = (startDate, endDate, format) => {
  startDate = moment(startDate, format);
  endDate = moment(endDate, format);
  return startDate.isBefore(endDate);
};

const subtractDate = (date, value, unit, dateFormat) => {
  const newDate = moment(date, dateFormat)
    .subtract(value, unit)
    .format(dateFormat);
  return newDate;
};

export {
  dateFormats,
  formatDate,
  isValidDate,
  isStartDateBeforeEndDate,
  subtractDate,
};
