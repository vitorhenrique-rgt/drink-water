let water = [];

//READ
function read() {
  const storedData = localStorage.getItem("waterData");
  water = storedData ? JSON.parse(storedData) : [];
  return water;
}

//CREATE
function create(id, content, date, hour) {
  const data = { id, content, date, hour };
  read();
  water.push(data);
  localStorage.setItem("waterData", JSON.stringify(water));
  today();
}

//CURRENT DATE
function currentDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
//CURRENT HOUR
function currentHour(date) {
  const hour = date.toLocaleTimeString();
  return `${hour}`;
}

//FILTER
function today() {
  read();
  let chartContainer = document.querySelector(".chart-container");
  chartContainer.innerHTML = "";
  const today = currentDate(new Date());
  const filter = water.filter((item) => item.date === today);
  const listHours = [...new Set(filter.map((item) => item.hour.split(":")[0]))];
  const hourFilterResult = listHours.map((hour) => ({
    hour,
    soma: filter
      .filter((item) => item.hour.startsWith(hour))
      .reduce((soma, item) => soma + item.content, 0),
  }));
  let maximumValue = 0;
  for (let index = 0; index < hourFilterResult.length; index++) {
    if (maximumValue <= hourFilterResult[index].soma) {
      maximumValue = hourFilterResult[index].soma;
    }
  }

  for (let index = 0; index < hourFilterResult.length; index++) {
    let somaResult = (hourFilterResult[index].soma / maximumValue) * 100;
    const bar = document.createElement("div");
    bar.className = "bar";
    if (somaResult == 0) {
      bar.style.height = `1px`;
    } else {
      bar.style.height = `${somaResult}%`;
    }
    bar.setAttribute("data-value", hourFilterResult[index].soma / 1000);

    const labelValue = document.createElement("span");
    labelValue.className = "label-value";
    if (hourFilterResult[index].soma >= 1000) {
      labelValue.innerHTML = `${hourFilterResult[index].soma / 1000}L`;
    } else {
      labelValue.innerHTML = `${hourFilterResult[index].soma}ml`;
    }
    bar.appendChild(labelValue);

    const labelDate = document.createElement("span");
    labelDate.innerHTML = `${hourFilterResult[index].hour}h`;
    labelDate.className = "label-date";

    bar.appendChild(labelDate);
    chartContainer.appendChild(bar);
  }
}

function lastWeek() {
  read();
  let lastWeek = 6;
  let dataFilterResult = [];
  let chartContainer = document.querySelector(".chart-container");
  chartContainer.innerHTML = "";
  while (lastWeek >= 0) {
    let date = new Date();
    date.setDate(date.getDate() - lastWeek);
    const lastDate = currentDate(date);

    const dateFilter = water.filter((value) => {
      const dateFilterItem = value.date == lastDate;
      return dateFilterItem;
    });

    let soma = 0;
    for (let index = 0; index < dateFilter.length; index++) {
      soma += dateFilter[index].content;
    }
    dataFilterResult.push({ date: lastDate, soma: soma });
    lastWeek--;
  }
  let maximumValue = 0;
  for (let index = 0; index < dataFilterResult.length; index++) {
    if (maximumValue <= dataFilterResult[index].soma) {
      maximumValue = dataFilterResult[index].soma;
    }
  }

  for (let index = 0; index < dataFilterResult.length; index++) {
    let somaResult = (dataFilterResult[index].soma / maximumValue) * 100;

    const bar = document.createElement("div");
    bar.className = "bar";
    if (somaResult == 0) {
      bar.style.height = `1px`;
    } else {
      bar.style.height = `${somaResult}%`;
    }
    bar.setAttribute("data-value", dataFilterResult[index].soma / 1000);

    const labelValue = document.createElement("span");
    labelValue.className = "label-value";
    if (dataFilterResult[index].soma >= 1000) {
      labelValue.innerHTML = `${dataFilterResult[index].soma / 1000}L`;
    } else {
      labelValue.innerHTML = `${dataFilterResult[index].soma}ml`;
    }
    bar.appendChild(labelValue);

    const convertedDate = new Date(`${dataFilterResult[index].date}T00:00:00`);
    const ddd = convertedDate.getDay();
    const daysOfTheWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    const labelDate = document.createElement("span");
    labelDate.innerHTML = daysOfTheWeek[ddd];
    labelDate.className = "label-date";

    bar.appendChild(labelDate);
    chartContainer.appendChild(bar);
  }
}

function lastMonth() {
  read();
  let lastMonth = 0;
  let dataFilterResult = [];
  let chartContainer = document.querySelector(".chart-container");
  chartContainer.innerHTML = "";
  while (lastMonth <= 30) {
    let date = new Date();
    date.setDate(date.getDate() - lastMonth);
    const lastDate = currentDate(date);

    const dateFilter = water.filter((value) => {
      const dateFilterItem = value.date == lastDate;
      return dateFilterItem;
    });

    let soma = 0;
    for (let index = 0; index < dateFilter.length; index++) {
      soma += dateFilter[index].content;
    }
    dataFilterResult.push({ date: lastDate, soma: soma });
    lastMonth++;
  }
  console.log(dataFilterResult);
  let maximumValue = 0;
  for (let index = 0; index < dataFilterResult.length; index++) {
    if (maximumValue <= dataFilterResult[index].soma) {
      maximumValue = dataFilterResult[index].soma;
    }
  }
  console.log(maximumValue);

  for (let index = 0; index < dataFilterResult.length; index++) {
    let somaResult = (dataFilterResult[index].soma / maximumValue) * 100;

    const bar = document.createElement("div");
    bar.className = "bar";
    if (somaResult == 0) {
      bar.style.height = `1px`;
    } else {
      bar.style.height = `${somaResult}%`;
    }
    bar.setAttribute("data-value", dataFilterResult[index].soma / 1000);

    const labelValue = document.createElement("span");
    labelValue.className = "label-value";
    if (dataFilterResult[index].soma >= 1000) {
      labelValue.innerHTML = `${dataFilterResult[index].soma / 1000}L`;
    } else {
      labelValue.innerHTML = `${dataFilterResult[index].soma}ml`;
    }
    bar.appendChild(labelValue);

    const convertedDate = new Date(`${dataFilterResult[index].date}T00:00:00`);
    const dd = convertedDate.getDate();
    const options = { month: "short" };
    const mmm = convertedDate.toLocaleDateString("pt-BR", { month: "short" });
    const labelDate = document.createElement("span");
    labelDate.innerHTML = `${dd}/${mmm}`;
    labelDate.className = "label-date";
    bar.appendChild(labelDate);

    chartContainer.appendChild(bar);
  }
}

//LIST WATER
function displayList() {
  const button = document.querySelector("#water-list");
  button.classList.toggle("visible");
}

function selectValue(element) {
  const waterValue = Number(element.dataset.value);
  displayList();
  const dateNow = new Date();
  const formattedCurrentHour = currentHour(dateNow);
  const formattedCurrentDate = currentDate(dateNow);
  const randomId = generateRandomId();
  create(randomId, waterValue, formattedCurrentDate, formattedCurrentHour);
}

function generateRandomId() {
  const randomNumber = Math.random();
  const randomId = Math.floor(randomNumber * 0xffffffffffffffff).toString(16);
  return randomId;
}

function activateTab(clickedElement) {
  let menuItems = document.querySelectorAll(".navigation li");
  menuItems.forEach(function (item) {
    item.classList.remove("active");
  });
  clickedElement.classList.add("active");
}
