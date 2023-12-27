///-------------------------------------------------------------------

function generateRandomId() {
  return Math.random().toString(36).substring(7);
}

function getRandomContent() {
  const contentOptions = [100, 200, 500, 1000];
  const randomIndex = Math.floor(Math.random() * contentOptions.length);
  return contentOptions[randomIndex];
}

function getRandomDate() {
  const currentDate = new Date();
  const randomDay = Math.floor(Math.random() * 20); // Últimos 20 dias
  currentDate.setDate(currentDate.getDate() - randomDay);
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getRandomHour() {
  const randomHour = Math.floor(Math.random() * 11) + 9; // Entre 9h e 19h
  const randomMinute = Math.floor(Math.random() * 60);
  const randomSecond = Math.floor(Math.random() * 60);
  return `${randomHour.toString().padStart(2, "0")}:${randomMinute
    .toString()
    .padStart(2, "0")}:${randomSecond.toString().padStart(2, "0")}`;
}

function generateData() {
  const data = [];
  for (let i = 0; i < 100; i++) {
    const id = generateRandomId();
    const content = getRandomContent();
    const date = getRandomDate();
    const hour = getRandomHour();
    data.push({ id, content, date, hour });
  }
  return data;
}

function start() {
  const generatedData = generateData();
  console.log(generatedData);
}

start();

///-------------------------------------------------------------------
