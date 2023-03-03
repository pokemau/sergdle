import "./style.css";

const API_URL =
  "http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json";

async function getData() {
  const res = await fetch(API_URL);
  const champData = await res.json();

  return champData.data;
}

async function display() {
  const data = await getData();

  console.log(data);
}

display();
