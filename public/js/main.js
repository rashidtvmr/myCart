let model = document.querySelector(".model");
let sideBar = document.querySelector(".sidebar");
let backdrop = document.querySelector(".backdrop");
//Typed......
typeIt = (text, element, speed) => {
  let c = 0;
  let txt = text;

  let con = setInterval(() => {
    let txtlen = txt.length;
    c++;
    element.innerHTML = txt.substr(0, c) + "|";
    // element.innerHTML = txt.substr(0, c) + '/';
    if (c == txtlen) {
      element.innerHTML = txt.substr(0, c);
      stop();
    }
  }, speed);
  stop = () => {
    clearInterval(con);
  };
};
//Typed......
let isSidebarShowing = false;
//sidebar
showSidebar = () => {
  if (isSidebarShowing) {
    backdrop.style.display = "none";
    sideBar.style.display = "none";
    isSidebarShowing = !isSidebarShowing;
  } else {
    backdrop.style.display = "block";
    sideBar.style.display = "block";
    isSidebarShowing = !isSidebarShowing;
  }
};
//

//Validation methods
showAlert = (Box, Alert, formName) => {
  Alert.style.display = "block";
  Box.style.border = "1px solid red";
  document[formName].submit.disabled = true;
};
hideAlert = (validator, Box, Alert) => {
  if (validator) {
    Box.style.border = "none";
    Alert.style.display = "none";
  }
};
validate = (isValid, formName) => {
  if (isValid) {
    document[formName].submit.disabled = false;
  }
};
// OKClicked = () => {
//   model.style.display = "none";
// };
cancelClicked = () => {
  backdrop.style.display = "none";
  model.style.display = "none";
};
