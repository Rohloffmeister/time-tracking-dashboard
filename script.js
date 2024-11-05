const selectTime = document.getElementById("select-time");
const dailyBtn = document.getElementById("daily-btn");
const weeklyBtn = document.getElementById("weekly-btn");
const monthlyBtn = document.getElementById("monthly-btn");
const times = document.getElementsByClassName("times");
const timeButtons = [dailyBtn, weeklyBtn, monthlyBtn];
let userData = null;



fetch("./data.json").
then((response) => {
  if (!response.ok) {
    throw new Error("Oops! Etwas ist schiefgelaufen.");
  }
  return response.json();
}).
then((data) => {
  userData = data;
  // Initialisiere die Anzeige mit täglichen Daten
  populate("daily");
}).
catch((error) => {
  console.error("Fehler beim Laden der Daten:", error);
});

function getHours(itemid, time, searchValue) {
  for (const e of userData) {
    if (e["title"] == itemid) {
      return e["timeframes"][time][searchValue];
    }
  }
  return "Null";
}

function populate(time) {
  if (!(time == "daily" || time == "weekly" || time == "monthly")) {
    console.error("Wrong time");
    return null;
  }
  Array.from(times).forEach((item) => {
    item.getElementsByClassName("current")[0].innerHTML =
    getHours(item.id, time, "current") + "hr";
    item.getElementsByClassName("previous")[0].innerHTML =
    "Previous - " + getHours(item.id, time, "previous") + "hr";
  });
}

function handleSelectTime(e) {
  clickedButton = e.target;
  if (
  clickedButton.tagName === "A" &&
  !clickedButton.classList.contains("active"))
  {
    timeButtons.forEach((btn) => btn.classList.remove("active"));
    clickedButton.classList.add("active");
    populate(clickedButton.id.replace("-btn", ""));
  }
}

selectTime.addEventListener("click", handleSelectTime);