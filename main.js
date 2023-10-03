let inpu = document.getElementsByTagName("input");
var sty;
for (let i = 0; i < inpu.length; i++) {
  sty = inpu[i].style;
  inpu[i].addEventListener("focus", inputclick, false);
  inpu[i].addEventListener("blur", inputout, true);
}
function check() {
  let cnt = 0;
  for (let i = 0; i < inpu.length; i++) {
    if (inpu[i].value !== "" && parseInt(inpu[i].value, 10) !== NaN) {
      cnt++;
    }
  }
  if (cnt === 3) {
    return true;
  }
  return false;
}
function inputclick(e) {
  this.value = "";
}
function inputout(e) {
  var txt;
  if (this.value != "" && this.className === "day") {
    if (parseInt(this.value, 10) > 31 || parseInt(this.value, 10) < 1) {
      txt = "must be a valid day";
      error(this, txt);
    } else {
      defaul(this);
    }
  }
  if (this.value != "" && this.className === "month") {
    if (parseInt(this.value, 10) > 13 || parseInt(this.value, 10) < 1) {
      txt = "must be a valid month";
      this.classList.remove("error");
      error(this, txt);
    } else {
      defaul(this);
    }
  }
  if (this.value != "" && this.className === "year") {
    if (parseInt(this.value, 10) > 2023) {
      txt = "must be in the past";
      this.classList.remove("error");
      error(this, txt);
    } else {
      defaul(this);
    }
  }
  this.style = sty;
  if (check() === true) {
    var dat = "";
    dat += inpu[2].value;
    dat += "-";
    if (inpu[1].value.length === 1) {
      dat += "0";
    }
    dat += inpu[1].value;
    dat += "-";
    if (inpu[0].value.length === 1) {
      dat += "0";
    }
    dat += inpu[0].value;
    var sty1;
    var h4 = document.getElementsByTagName("h4");
    sty1 = h4[0].style;
    if (dat[0] != "Y") {
      if (isValidDate(dat) === false) {
        txt = "the date must be valid";
        error(inpu[0], txt);
        for (let i = 0; i < h4.length; i++) {
          h4[i].style.color = "red";
        }
      } else {
        for (let i = 0; i < h4.length; i++) {
          h4[i].style.color = sty1;
        }

        var img = document.getElementsByClassName("img");
        img[0].style.cursor = "pointer";
        img[0].addEventListener(
          "click",
          () => {
            calc(dat);
          },
          true
        );
      }
    }
  }
}
function calc(dat) {
  month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var birth_date="";
  var birth_month="";
  var birth_year="";
  let i=0
  for(;i<dat.length;i++){
    if(dat[i]!='-'){
        birth_year+=dat[i];
    }
    else{
        break;
    }
  }
  i++;
  for(;i<dat.length;i++){
    if(dat[i]!='-'){
        birth_month+=dat[i];
    }
    else{
        break;
    }
  }
  i++;
  for(;i<dat.length;i++){
    if(dat[i]!='-'){
        birth_date+=dat[i];
    }
    else{
        break;
    }
  }
  parseInt(birth_date,10);
  parseInt(birth_month,10);
  parseInt(birth_year,10);
  var date=new Date();
  var current_date=date.getDate();
  var current_month=date.getMonth();
  current_month++;
  var current_year=date.getFullYear();

  console.log(birth_date);
  console.log(birth_month);
  console.log(birth_year);
  console.log(current_date);
  console.log(current_month);
  console.log(current_year);

  if (birth_date > current_date) {
    current_date = current_date + month[birth_month - 1];
    current_month = current_month - 1;
  }

  if (birth_month > current_month) {
    current_year = current_year - 1;
    current_month = current_month + 12;
  }

  var calculated_date = current_date - birth_date;
  var calculated_month = current_month - birth_month;
  var calculated_year = current_year - birth_year;
  console.log(calculated_date);
  console.log(calculated_month);
  console.log(calculated_year);
  var cac=document.getElementsByClassName('calc');
  cac[0].innerText=calculated_year;
  cac[1].innerText=calculated_month;
  cac[2].innerText=calculated_date;

}
function error(element, text) {
  var para = document.createElement("p");
  para.className = "inserted";
  para.innerText = text;
  para.style.fontSize = "xx-small";
  para.style.fontWeight = "700";
  para.style.color = "red";
  var ele = document.getElementsByClassName(element.className);
  ele[0].style.color = "red";
  ele[0].style.borderColor = "red";
  ele[0].parentElement.appendChild(para);
  ele[0].parentElement.firstElementChild.style.color = "red";
}
function defaul(element) {
  var ele = document.getElementsByClassName(element.className);
  ele[0].style.color = "black";
  ele[0].parentElement.firstElementChild.style.color = "rgba(0, 0, 0, 0.386)";
  if (ele[0].parentElement.lastElementChild.className === "inserted") {
    ele[0].parentElement.lastElementChild.remove();
  }
}
function isValidDate(date) {
  var datePattern = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  var matchArray = date.match(datePattern);
  if (matchArray == null) {
    return false;
  }
  var dateString = date.replace(/\D/g, "");
  var year = parseInt(dateString.substr(0, 4));
  var month = parseInt(dateString.substr(4, 2));
  var day = parseInt(dateString.substr(6, 2));
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    daysInMonth[1] = 29;
  }
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
    return false;
  }
  return true;
}
