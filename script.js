var formulario = document.querySelector('form')

formulario.addEventListener('submit', function (e) {
  // bloqueia o refresh automático da página
  e.preventDefault()

  // url da pesquisa
  let urlForm = 'https://pokeapi.co/api/v2/pokemon/'

  //valor do input name
  let nome = document.getElementById('name')

  //Concatena a url com input name
  urlForm = urlForm + this.name.value

  // transforma os valores em minúsculas
  urlForm = urlForm.toLocaleLowerCase()

  // ID contents
  let resposta = document.getElementById('content')

  //ID imgPokemon
  let imagem = document.getElementById('imgPokemon')

  // resposta em HTML
  let html = ''

  //puxando os dados
  fetch(urlForm)
    .then(resposta => resposta.json())
    .then(function (data) {
      console.log(data)
      html = 'Nome: ' + maiuscula(data.name) + '<br>'
      html = html + 'Type: ' + maiuscula(data.types[0].type.name)
      resposta.innerHTML = html

      imagem.innerHTML =
        "<img src='" +
        data.sprites.front_default +
        "'><img src='" +
        data.sprites.back_default +
        "'>"
    })

    //tratamento de erro
    .catch(function (err) {
      if (err == 'SyntaxError: Unexpected token N in JSON at position 0') {
        html = 'Pokemon não encontrado 😢'
      } else {
        html = 'Erro:' + err
      }
      resposta.innerHTML = html
    })
})

function maiuscula(val) {
  return val[0].toUpperCase() + val.substr(1)
}
