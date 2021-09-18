import moment from 'moment';

export default function generateTimeOptions() {
  function round(date, duration, method) {
    return moment(Math[method]((+date) / (+duration)) * (+duration));

  }

  var options = [
    {
      name: "ASAP (15-20 minutes)",
      value: "ASAP (15-20 minutes)"
    }
  ];

  var date = moment().add(5, 'minutes');
  var roundedDate = round(date, moment.duration(15, "minutes"), "ceil");

  while (roundedDate.isBefore(moment().hours(19).minutes(45))) {
    roundedDate = roundedDate.add(10, 'minutes');
    options.push({
      value: roundedDate.format('h:mm A'),
      name: roundedDate.format('h:mm A')
    });
  }

  return options;
}