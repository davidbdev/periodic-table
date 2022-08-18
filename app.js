// init global vars
const orderMap = new Map();
const currentYear =  new Date().getFullYear();
let elementsArray = [];

// ---- initialize page ----
function initPage() {
  fetchTableMap();
  fetchPeriodicTable();
}
initPage();

// append and order elements
function fetchTableMap() {
  fetch('table-map.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    createOrderMap(data);
  })
  .catch(function (err) {
    console.log(err);
  });
}

function fetchPeriodicTable() {
  fetch('periodic-table.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    elementsArray = data;
    console.log(elementsArray);
    appendElements(data);
  })
  .catch(function (err) {
    console.log(err);
  });
}

// create order map

function createOrderMap(data){
  for (let i = 0; i < data.length; i++) {
    orderMap.set(data[i].id, data[i].order);
  }
}

// append elements from JSON
function appendElements(data) {
  const elementsContainer = document.getElementById("periodic-table-of-elements");
  for (let i = 0; i < data.length; i++) {
    let elemDiv = document.createElement("div");
    elemDiv.className += "element-tile";

    let atomNum = document.createElement("p");
    atomNum.className += "atomic-number";
    let atomNumId = data[i].id;
    atomNum.innerHTML = atomNumId;
    elemDiv.style.order = orderMap.get(atomNumId);    

    let elemSymbol = document.createElement("p");
    elemSymbol.className += "element-symbol";
    elemSymbol.innerHTML = data[i].elementSymbol;

    let elemName = document.createElement("p");
    elemName.className += "element-name";
    elemName.innerHTML = data[i].elementName;

    let atomMass = document.createElement("p");
    atomMass.className += "atomic-mass";
    atomMass.innerHTML = data[i].atomicMass;

    //give proper background color and font color
    switch(data[i].chemicalGroup) {
      case "Alkali Metal":
        elemDiv.style.backgroundColor = "#E7370D";
        elemDiv.style.color = "#edf6f9";
        break;
      case "Alkaline Earth Metal":
        elemDiv.style.backgroundColor = "#e76f51";
        break;
      case "Transition Metal":
        elemDiv.style.backgroundColor = "#f4a261";
        break;
      case "Post-transition Metal":
        elemDiv.style.backgroundColor = "#e9c46a";
        break;
      case "Metalloid":
        elemDiv.style.backgroundColor = "#efd593";
        break;
      case "Nonmetal":
        elemDiv.style.backgroundColor = "#a8dadc";
        break;
      case "Halogen":
        elemDiv.style.backgroundColor = "#3eccbb";
        break;
      case "Noble Gas":
        elemDiv.style.backgroundColor = "#1d3557";
        elemDiv.style.color = "#edf6f9";
        break;
      case "Lanthanide":
        elemDiv.style.backgroundColor = "#2a9d8f";
        break;
      case "Actinide":
        elemDiv.style.backgroundColor = "#264653";
        elemDiv.style.color = "#edf6f9";
        break;
    }

    // append
    elemDiv.appendChild(atomNum);
    elemDiv.appendChild(elemSymbol);
    elemDiv.appendChild(elemName);
    elemDiv.appendChild(atomMass);

    elemDiv.addEventListener('click', displayElementDetails);
    elementsContainer.appendChild(elemDiv);
  }
}

// display details on click
function displayElementDetails() {
  let dtlAtomNumber = document.querySelector("#dtl-atomic-number");
  let dtlElemSymbol = document.querySelector("#dtl-element-symbol");
  let dtlElemName = document.querySelector("#dtl-element-name");
  let dtlAtomMass = document.querySelector("#dtl-atomic-mass");
  let dtlChemGrp = document.querySelector("#detail-chemical-group");
  let dtlStndState = document.querySelector("#detail-standard-state");
  let dtlElecConfig = document.querySelector("#detail-electron-configuration");
  let dtlOxState = document.querySelector("#detail-oxidation-states");
  let dtlElectroneg = document.querySelector("#detail-electronegativity");
  let dtlAtomRad = document.querySelector("#detail-atomic-radius");
  let dtlIonEnergy = document.querySelector("#detail-ionization-energy");
  let dtlElecAffin = document.querySelector("#detail-electronic-affinity");
  let dtlMeltPt = document.querySelector("#detail-melting-point");
  let dtlBoilPt = document.querySelector("#detail-boiling-point");
  let dtlDens = document.querySelector("#detail-density");
  let dtlYearDisc = document.querySelector("#detail-year-discovered");
  let id = this.querySelector(".atomic-number").innerText;
  let elementArrayPos = id - 1;

  dtlAtomNumber.innerHTML = elementsArray[elementArrayPos].id;
  dtlElemSymbol.innerHTML = elementsArray[elementArrayPos].elementSymbol;
  dtlElemName.innerHTML = elementsArray[elementArrayPos].elementName;
  dtlAtomMass.innerHTML = elementsArray[elementArrayPos].atomicMass;
  dtlChemGrp.innerHTML = elementsArray[elementArrayPos].chemicalGroup;
  dtlStndState.innerHTML = elementsArray[elementArrayPos].standardState;
  dtlElecConfig.innerHTML = elementsArray[elementArrayPos].electronConfiguration;
  dtlOxState.innerHTML = elementsArray[elementArrayPos].oxidationStates;
  dtlElectroneg.innerHTML = elementsArray[elementArrayPos].electronegativity;
  dtlAtomRad.innerHTML = elementsArray[elementArrayPos].atomicRadius;
  dtlIonEnergy.innerHTML = elementsArray[elementArrayPos].ionizationEnergy;
  dtlElecAffin.innerHTML = elementsArray[elementArrayPos].electronAffinity;
  dtlMeltPt.innerHTML = elementsArray[elementArrayPos].meltingPoint;
  dtlBoilPt.innerHTML = elementsArray[elementArrayPos].boilingPoint;
  dtlDens.innerHTML = elementsArray[elementArrayPos].density;
  dtlYearDisc.innerHTML = elementsArray[elementArrayPos].yearDiscovered;
}

// color elements by chemical group
function colorElementTiles() {
  
}

// set current year in footer
function setCurrentYear(currentYear) {
  const footerYear = document.getElementById("footer-year");
  footerYear.innerHTML = currentYear;
}
setCurrentYear(currentYear);
