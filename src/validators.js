function isValidDate(dateString) {
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    const parts = dateString.split("/");
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[2], 10);

    const actual_date = new Date()

    
    // Check the ranges of month and year and if is after actual date
    if(
        year < 2005 || 
        year > actual_date.getFullYear() || 
        month == 0 || 
        month > 12 ||
        (
            year == actual_date.getFullYear() && 
            (month - 1) > actual_date.getMonth()
        ) ||
        (
            year == actual_date.getFullYear() && 
            (month - 1) == actual_date.getMonth() &&
            day > actual_date.getUTCDate()
        )
    ) {
        return false;
    }

    const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

module.exports = {
    isValidDate
};