//create map
const map = L.map('mapid').setView([-27.222633, -49.6455874], 16);
//versão para sua localização atual no mapa - mais fácil para localização
//const map = L.map('mapid').locate({ setView: true, maxZoom: 16 });

//create and add tilelayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//create icon
const icon = L.icon({
  iconUrl: './public/images/map-marker.svg',
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

//create and add marker
map.on('click', (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector('[name=lat]').value = lat;
  document.querySelector('[name=lng]').value = lng;

  marker && map.removeLayer(marker);

  marker = L.marker([lat, lng], { icon }).addTo(map);
});

/*add o campo de fotos*/
function addPhotoField() {
  //pega o container de fotos #images
  const container = document.querySelector('#images');
  //pega o containerpara duplicar .new-upload
  const fieldsContainer = document.querySelectorAll('.new-upload');
  //realizar o clone da última imagem adicionada
  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);
  //verifica se o campo está vazio. Se sim,não adiciona ao container de imagens
  const input = newFieldContainer.children[0];

  if (input.value == '') {
    return;
  }
  //limpar os campos
  newFieldContainer.children[0].value = '';
  //adicionar o clone ao container de imagem
  container.appendChild(newFieldContainer);
}

function deleteField(event) {
  const span = event.currentTarget;

  const fieldsContainer = document.querySelectorAll('.new-upload');

  if (fieldsContainer.length <= 1) {
    //limpa o campo caso tenha somente o primeiro
    span.parentNode.children[0].value = '';

    return;
  }
  //deleta os campos adicionais
  span.parentNode.remove();
}

//select yes or no
function toggleSelect(event) {
  //retirar a classe .active (dos botões)
  document.querySelectorAll('.button-select button').forEach((button) => {
    button.classList.remove('active');
  });
  //colocar a classe .active no botão clicado
  const button = event.currentTarget;
  button.classList.add('active');
  //atualizar meu input hidden com o valor selecionado
  const input = document.querySelector('[name="open_on_weekends"]');
  //verificar se sim ou não
  input.value = button.dataset.value;
}
