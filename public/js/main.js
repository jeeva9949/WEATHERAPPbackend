const submitbtn = document.getElementById("submitBTN");
const cityname = document.getElementById("cityname");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");
const temp_val = document.getElementById("temp_val");
const temp_info = document.getElementById("temp_info");
const day = document.getElementById("day");
const today_date = document.getElementById("today_date");

const getCurrentDay = () => {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let currentDay = new Date();
  let day = weekday[currentDay.getDay()];
  return day;
};
day.innerText = getCurrentDay();

const getcurrenttime = () => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var now = new Date();
  var month = months[now.getMonth()];
  /* console.log(months[now.getMonth()])*/
  var date = now.getDate();
  return `${date} ${month}`;
};

today_date.innerText = getcurrenttime();

const GetInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityname.value;
  if (cityVal === "") {
    city_name.innerText = "please enter city name before you search";
  } else {
    try {
      let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=15fb6e47c0af468a9f190f5a5b430e46`;
      const response = await fetch(URL);
      const data = await response.json();
      city_name.innerText = `${data.name},${data.sys.country}`;
      temp_info.classList.add("output");
      temp_val.innerText = (data.main.temp - 273).toFixed(2);

      const tempmood = data.weather[0].main;

      if (tempmood == "Clear") {
        temp_status.innerHTML = `<i class='fas fa-sun' style= 'color:#eccc68'></i>`;
      } else if (tempmood == "Clouds") {
        temp_status.innerHTML = `<i class='fas fa-cloud' style= 'color:#f1f2f6'></i>`;
      } else if (tempmood == "Rain") {
        temp_status.innerHTML = `<i class='fas fa-rain' style= 'color:#a4b0be'></i>`;
      } else {
        temp_status.innerHTML = `<i class='fas fa-sun' style= 'color:#eccc68'></i>`;
      }
      //   console.log(tempmood);
    } catch (error) {
      city_name.innerText = "please enter city name properly";
      temp_info.classList.remove("output");
    }
  }
};
submitbtn.addEventListener("click", GetInfo);
