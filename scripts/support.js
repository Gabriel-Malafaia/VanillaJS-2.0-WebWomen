const updateStorage = (array) => {
  const arrayToJson = JSON.stringify(array);
  return localStorage.setItem("@KenzieWebWoman", arrayToJson);
};

const getStorage = () => {
  const getArrayInStorage = JSON.parse(localStorage.getItem("@KenzieWebWoman"));

  return getArrayInStorage || [];
};

const alreadyCandidature = (id) => {
  const isAlready = arrayCandidatures.some(({ id: idData }) => idData == id);
  return isAlready ? "Remover candidatura" : "Candidatar";
};

const createElement = (element) => document.createElement(element);
const querySelector = (element) => document.querySelector(element);
