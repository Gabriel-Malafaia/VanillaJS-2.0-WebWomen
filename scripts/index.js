// Selections
const asideList = querySelector(".aside__list");
const mainList = querySelector(".main__container--list");
const noItemList = querySelector(".aside__notVacancy");

// Arrays
const arrayCandidatures = getStorage();

// Render functions
const listArray = (array, listAppend, renderFunction) => {
  if (!array[0]) {
    renderFunction(null);
  }

  listAppend.innerHTML = "";

  array.forEach((element) => {
    const response = renderFunction(element);
    listAppend.appendChild(response);
  });
};

const renderCards = (data) => {
  const { id, title, enterprise, location, description, modalities } = data;

  const mainCard = createElement("li");
  const cardTitle = createElement("h2");
  const cardInfoDiv = createElement("div");
  const cardInfoLocation = createElement("span");
  const cardInfoEnterprise = createElement("span");
  const cardDescription = createElement("p");
  const cardButtonsDiv = createElement("div");
  const cardButtonModalities = createElement("button");
  const cardButtonAssign = createElement("button");

  mainCard.className = "main__container--card";
  cardButtonsDiv.className = "main__container--buttons";
  cardButtonModalities.className = "button__style--grey";
  cardButtonAssign.className = "button__style--purple";

  cardButtonAssign.id = id;

  cardTitle.innerText = title;
  cardInfoLocation.innerText = location;
  cardInfoEnterprise.innerText = enterprise;
  cardDescription.innerText = description;
  cardButtonModalities.innerText = modalities;
  cardButtonAssign.innerText = alreadyCandidature(id);

  mainCard.append(cardTitle, cardInfoDiv, cardDescription, cardButtonsDiv);
  cardInfoDiv.append(cardInfoEnterprise, cardInfoLocation);
  cardButtonsDiv.append(cardButtonModalities, cardButtonAssign);

  cardButtonAssign.addEventListener("click", setCandidatures);

  return mainCard;
};

const renderCandidatures = (data) => {
  if (!data) {
    noItemList.classList.remove("hidden");
    asideList.classList.add("hidden");
    return;
  }

  asideList.classList.remove("hidden");
  noItemList.classList.add("hidden");

  const { id, title, enterprise, location } = data;

  const asideCard = createElement("li");
  const asideCardTop = createElement("div");
  const asideCardH2 = createElement("h2");
  const asideCardImg = createElement("img");
  const asideCardBottom = createElement("div");
  const asideCardEnterprise = createElement("p");
  const asideCardLocation = createElement("p");

  asideCard.className = "aside__card";
  asideCardTop.className = "aside__card--top";
  asideCardImg.className = "button__trash";
  asideCardBottom.className = "aside__card--bottom";

  asideCardImg.src = "./assets/img/trash.png";
  asideCardImg.alt = "Trash picture for remove candidature itens.";
  asideCardImg.id = id;

  asideCardH2.innerText = title;
  asideCardEnterprise.innerText = enterprise;
  asideCardLocation.innerText = location;

  asideCard.append(asideCardTop, asideCardBottom);
  asideCardTop.append(asideCardH2, asideCardImg);
  asideCardBottom.append(asideCardEnterprise, asideCardLocation);

  asideCardImg.addEventListener("click", setCandidatures);

  return asideCard;
};

// Events

const setCandidatures = (event) => {
  const elementClicked = event.target;
  const isTrash = elementClicked.tagName == "IMG";
  const cardId = event.target.id;
  const findElement = jobsData.find((elem) => elem.id == cardId);
  const findElementIndex = arrayCandidatures.findIndex(
    (elem) => elem.id == cardId
  );

  const isAssign = elementClicked.textContent == "Candidatar";

  if (isAssign && !isTrash) {
    arrayCandidatures.push(findElement);
    elementClicked.innerText = "Remover candidatura";
  } else {
    arrayCandidatures.splice(findElementIndex, 1);
    elementClicked.innerText = "Candidatar";
  }

  updateStorage(arrayCandidatures);
  listArray(jobsData, mainList, renderCards);
  listArray(arrayCandidatures, asideList, renderCandidatures);
};

listArray(jobsData, mainList, renderCards);
listArray(arrayCandidatures, asideList, renderCandidatures);
