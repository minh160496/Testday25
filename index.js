const api = "https://dog.ceo/api/breeds/list/all";

async function getApi() {
  return fetch(api)
    .then((respon) => respon.json())
    .then((data) => data);
}

async function render() {
  const data = await getApi();
  const { message } = data;
  const messageKeys = [];
  for (let type in message) {
    messageKeys.push(type);
  }
  const app = document.querySelector(".app");
  const output = htmls`
                    <div class="list">
                        <div class="list__title">
                            <h1>Breads Lists</h1>
                        </div>

                        <div class="list__body--wrap">    
                            <select class="list__body" 
                              onchange="getSub(this.value)"
                            >
                            ${messageKeys.map(
                              (type) => htmls`
                                            <option value="${type}" class="list__body__item">
                                                <h3>${type}</h3>
                                            </option>
                            `
                            )}
                            </select>
                            <button 
                            onclick="show()"
                            >Get sub List</button>  
                        </div>
                    </div>
    `;

  app.innerHTML = output;

  function htmls([first, ...strings], ...values) {
    return values
      .reduce((acc, curr) => acc.concat(curr, strings.shift()), [first])
      .filter((x) => (x && x !== true) || x === 0)
      .join("");
  }

  const sublist = document.querySelector(".sublist");
  const img = document.querySelector(".image img");

  let output2 = `
        <h1>Sublist</h1>
        <ul>
              <li><a>Không có</a></li> 
        </ul>
  `;
  sublist.innerHTML = output2;

  window.getSub = function getSub(value) {
    sublist.classList.remove("active");
    img.src = "";
    output2 = htmls`
          <h1>Sublist</h1>
          <ul>
            ${
              (message[value].length > 0 &&
                message[value].map(
                  (animal) => htmls`
                <li><a
                  onclick="showRandom()"
                href="#">${animal}</a></li>
            `
                )) ||
              (message[value].length === 0 && `<li>Không có</li>`)
            }
          </ul>
    `;

    sublist.innerHTML = output2;
  };

  window.show = function () {
    sublist.classList.add("active");
  };

  window.showRandom = async function () {
    const images = await fetch("https://dog.ceo/api/breed/hound/afghan/images")
      .then((respon) => respon.json())
      .then((data) => data);

    const random = Math.floor(Math.random() * 50);
    img.src = images.message[random];
  };
}

render();
