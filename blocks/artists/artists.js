const pageUrl = `/artists.json`;

async function getArtistsList() {
  const response = await fetch(`${pageUrl}`);
  const results = await response.json();
  const data = results.data;

  return data;
}

function renderResult(block, result){
  block.innerHTML="";
  if (result.length) {
    const ulElement = document.createElement("ul");
    result.forEach(({ image_url, name, tags }) => {
      tags = tags.split(",").join(" | ");
      const listElement = document.createElement("li");
      listElement.className = "artist-name-wrapper";
      // Set the innerHTML of the div to include the JSON data
      listElement.innerHTML = `
        <div class="artist-image">
          <picture>
            <source type="image/webp" srcset="${image_url}">
            <img loading="lazy" alt="${name}" src="${image_url}" />
          </picture>
        </div>
        <div class="artist-info-body">
          <h3 class="artist-name">${name}</h3>
          <p>${tags}</p>
        </div>
      `;

      // Append the new div element to an existing element in the DOM
      ulElement.appendChild(listElement);
    });
    block.appendChild(ulElement);
  }
}

export default async function decorate(block) {
  const result = await getArtistsList();
  renderResult(block, result);
}