const dayOfWeek = moment().format("dddd MMM Do YYYY"); 
const inputRefList = []; 
const events = []; 


// current day
$("#currentDay").append("<div class=>" + dayOfWeek + "</div>");

function init() {
  const savedEvents = JSON.parse(localStorage.getItem("events"));
  for (var i = 9; i < 18; i++) {
    let newEvent;
    if (!savedEvents) {
      newEvent = {
        time: moment().hour(i).format("HH") + ":00",
        event: "",
        hour: parseInt(moment().hour(i).format("H")),
      };
    } else {
      newEvent = savedEvents[i - 9];
      console.log("newEvent: ", newEvent);
    }
    events.push(newEvent);
  }
  console.log(events);
  events.forEach((elem) => {
    addElementToDayPlanner(elem);
  });
}

function addElementToDayPlanner(elem) {
  const time = elem.time;
  const currHour = parseInt(moment().format("H"));

  console.log("future?", elem.hour > currHour);

  const divWrapper = $("<div>");
  const planner = $("#day-planner");
  const label = $("<label>");
  const input = $("<input>");
  const button = $("<button>");

  let timeClass = "past";
  if (elem.hour >= currHour) {
    if (elem.hour === currHour) {
      timeClass = "present";
    } else {
      timeClass = "future";
    }
  }

  label.html(time);
  input.attr("type", "textarea");
  input.attr("data-index", time);
  input.attr("value", getEventByTime(time));
  button.html("+");
  button.attr("data-index", time);

  input.addClass(timeClass);
  input.addClass("grow");
  label.addClass("hour");
  button.addClass("saveBtn");
  divWrapper.addClass("time-block");
  divWrapper.addClass("row");

  divWrapper.append(label);
  divWrapper.append(input);
  divWrapper.append(button);
  divWrapper.on("click", "button", handleButtonClick);
  planner.append(divWrapper);

  inputRefList.push(input);
}

function handleButtonClick(e) {
  const ds = e.currentTarget.dataset.index;
  inputRefList.forEach((elem) => {
    const dsCheck = elem[0].dataset.index;
    if (ds === dsCheck) {
      //local storage
      const saveThisValue = elem[0].value;
      addNewEvet(ds, saveThisValue);
    }
  });
}

function addNewEvet(time, eventString) {
  const index = getItemIndexByTime(time);
  events[index].event = eventString;
  localStorage.setItem("events", JSON.stringify(events));
}

function getItemIndexByTime(time) {
  for (let x = 0; x < events.length; x += 1) {
    if (events[x].time === time) return x;
  }
}
function getEventByTime(time) {
  const index = getItemIndexByTime(time);
  return events[index].event;
}
init();