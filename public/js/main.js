const cityName = document.getElementById("cityName");
const City_name = document.getElementById("City_name");
const submitBtn = document.getElementById("submitBtn");

const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");

const day = document.getElementById('day');
const today_date = document.getElementById('today_date');

const datahide = document.getElementById("data_hide");

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;
  if (cityVal === "") {
    City_name.innerText = `Enter city name first`;
    datahide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=9769e6c750c055c09f3f34f5219b83ff`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];

      City_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

      temp.innerText = arrData[0].main.temp;



      const tempMood = arrData[0]?.weather[0]?.main; // Optional chaining to prevent errors if data is missing

      if (tempMood) {
        if (tempMood === "Clear") {
          temp_status.innerHTML =
            "<i class='fas fa-sun' style='color: #eccc68'></i>";
        } else if (tempMood === "Clouds") {
          temp_status.innerHTML =
            "<i class='fas fa-cloud' style='color: #dfe4ea;'></i>";
        } else if (tempMood === "Rain") {
          temp_status.innerHTML =
            "<i class='fas fa-cloud-rain' style='color: #2989d8;'></i>";
        } else {
          temp_status.innerHTML =
            "<i class='fas fa-cloud' style='color: #dfe4ea;'></i>";
        }

        // datahide.classList.remove('data_hide');
      }

      const getCurrentDay = () => {
        const weekday = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        let currentTime = new Date();
        let day = weekday[currentTime.getDay()];
        return day;
      };

      const getCurrentTime = () => {
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
        var date = now.getDate();

        let hours = now.getHours();
        let mins = now.getMinutes();

        let period = "AM";
        if (hours > 11) {
          period = "PM";
          if (hours > 12) hours -= 12;
        }

        if (mins < 10) {
          mins = "0" + mins;
        }

        return `${month} ${date} | ${hours}:${mins} ${period}`;
      };

      day.innerText = getCurrentDay();
      today_date.innerText=getCurrentTime();


  
  
      

    } catch {
      City_name.innerText = `Plz enter city name properly`;
      datahide.classList.add("data_hide");
    }
  }
};

submitBtn.addEventListener("click", getInfo);
