const Url = "https://randomuser.me/api";
const aside = document.querySelector(".aside");
const persons = document.querySelector(".persons");
const add = document.getElementById("add");
const double = document.getElementById("double");
const show = document.getElementById("show");
const sort = document.getElementById("sort");
const result = document.getElementById("result");

let data = [];
///Functionallity
async function getUser(URL) {
  const {
    results: [
      {
        name: { first, last, title },
      },
    ],
  } = await fetch(URL).then((data) => data.json());

  displayUser(first + " " + last + " " + title, true);
}

//////////

function displayUser(name, add = false, num) {
  const div = document.createElement("div");
  let rndNumber = rndNum();
  div.classList.add("person");
  div.innerHTML = `
      <h4>${name}</h4>
              <span>${num ? num : rndNumber} </span>
      `;
  if (add) {
    data.push({ name, number: rndNumber });
  }

  persons.appendChild(div);
}

function rndNum() {
  let rndNumber = Math.round(Math.random() * 1_000_000);

  return format(rndNumber);
}

function format(nmb) {
  return nmb.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
///Event Listener
add.addEventListener("click", () => {
  getUser(Url);

  removeH2();
});
show.addEventListener("click", () => {
  let milionaire = data.filter((num) => formatToNumber(num.number) > 1_000_000);
  persons.innerHTML = "";
  milionaire.forEach((person) =>
    displayUser(person.name, false, person.number)
  );
  removeH2();
  if (!milionaire.length) {
    persons.innerHTML = "";
    let h2 = document.createElement("h2");
    h2.innerText = "No Millionaire Availaible";
    persons.appendChild(h2);
    setTimeout(() => {
      persons.removeChild(h2);
      data.forEach((person) => displayUser(person.name, false, person.number));
    }, 2000);
  }
  console.log(milionaire);
});
sort.addEventListener("click", () => {
  //   data = data.sort((a, b) => b.number - a.number);
  removeH2();
  data = data.sort((a, b) => {
    if (a.number > b.number) {
      return -1;
    } else if (formatToNumber(a.number) < formatToNumber(b.number)) {
      return 1;
    } else {
      return 0;
    }
  });
  console.log(data);
  persons.innerHTML = "";
  data.forEach((person) => displayUser(person.name, false, person.number));
});
double.addEventListener("click", () => {
  const numberHtml = document.querySelectorAll(".person span");
  numberHtml.forEach((numHtml, i) => {
    let numb = formatToNumber(data[i].number);
    data[i].number = format(numb * 2);
    numHtml.innerText = `${data[i].number}`;
  });
});
function formatToNumber(num) {
  return +num.replace(/[",",$]/gi, "");
}
result.addEventListener("click", () => {
  let some = data.reduce((values, acc) => {
    console.log(acc);
    values += formatToNumber(acc.number);

    return values;
  }, 0);
  let h2 = document.createElement("h2");
  h2.innerHTML = `Result <strong>${format(some)} </strong>`;
  persons.innerHTML = "";
  data.forEach((person) => displayUser(person.name, false, person.number));
  persons.appendChild(h2);
});
///Callls
getUser(Url);

function removeH2() {
  let h2 = document.querySelector("h2");
  let h3 = document.querySelector("h3");
  if (h2) {
    persons.removeChild(h2);
  }
  if (h3) {
    persons.removeChild(h3);
  }
}
