function filter(){
  read()
  let lastWeek = 6
  let dataFilterResult =[]
  let chartContainer = document.querySelector('.chart-container')
  chartContainer.innerHTML=''
  while(lastWeek >= 0){
    let date =new Date()
    date.setDate(date.getDate() - lastWeek)
    const lastDate = currentDate(date)

    const dateFilter =water.filter((value)=>{
      const dateFilterItem = value.date == lastDate
        return dateFilterItem
    })
    
    let soma= 0
    for (let index = 0; index < dateFilter.length; index++) { 
      soma += dateFilter[index].content;
    }
    dataFilterResult.push({date:lastDate, soma:soma})
    lastWeek--
  }
  console.log(dataFilterResult)
  let maximumValue = 0
    for (let index = 0; index < dataFilterResult.length; index++) {
      if (maximumValue <= dataFilterResult[index].soma) {
        maximumValue = dataFilterResult[index].soma
      }
    }
    console.log(maximumValue)

  for (let index = 0; index < dataFilterResult.length; index++) {
    let somaResult = (dataFilterResult[index].soma/maximumValue)*100

    const bar = document.createElement('div');
    bar.className = 'bar';
    if (somaResult == 0) {
      bar.style.height = `1px`;  
    }else{
      bar.style.height = `${somaResult}%`; 
    }
    bar.setAttribute('data-value', dataFilterResult[index].soma/1000);

    const labelValue = document.createElement('span')
    labelValue.className = "label-value"
    if (dataFilterResult[index].soma >=1000) {
      labelValue.innerHTML=`${dataFilterResult[index].soma/1000}L`
    }else{
      labelValue.innerHTML= `${dataFilterResult[index].soma}ml`
    }
    bar.appendChild(labelValue)

    const convertedDate = new Date(`${dataFilterResult[index].date}T00:00:00`)
    const ddd = convertedDate.getDay()
    const daysOfTheWeek = ['Dom','Seg', 'Ter', 'Qua', 'Qui','Sex', 'Sab'];
    const labelDate = document.createElement('span')
    labelDate.innerHTML = daysOfTheWeek[ddd]
    labelDate.className = "label-date"

    bar.appendChild(labelDate)
    chartContainer.appendChild(bar);
  }
}