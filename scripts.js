let key;

if (typeof window === 'undefined') {
    // Ambiente Node.js (GitHub Actions)
    require('dotenv').config();
    key = process.env.API_KEY;
} else {
    // Ambiente do navegador (GitHub Pages)
    key = "4a78c2e634f80be066c1026e2e911ef4";
}

async function colocarDadosNaTela(dados) {
    console.log(dados);
    document.querySelector(".cidade").innerHTML = "Clima em " + dados.name;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = dados.main.humidity + "%";
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

async function buscarCidade(cidade, key) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`;
    try {
        const response = await fetch(url);
        const dados = await response.json();
        colocarDadosNaTela(dados);
    } catch (error) {
        console.error("Erro ao buscar dados da cidade:", error);
    }
}

function cliqueNoBotao() {
    const cidade = document.querySelector(".input-cidade").value;
    buscarCidade(cidade, key);
}
