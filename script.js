const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const iniciarOuPausarBt = document.querySelector('#start-pause span'); // assim vou pegar o span dentro do container start-pause
const imgPlayPause = document.querySelector('#start-pause img');
const tempoNaTela = document.querySelector('#timer');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true; //assim o audio que dura 6 min vai tocar infinitamente

const musicaIniciar = new Audio('/sons/play.wav');
const musicaPause = new Audio('/sons/pause.mp3');
const musicaFim = new Audio('/sons/game.mp3');
const startPauseBt = document.querySelector('#start-pause');
let tempoDecorridoEmSegundos = 3000;
let intervaloId = null


musicaFocoInput.addEventListener('change',()=>{
    //change comun em checkbox para alterar true or false
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})



focoBt.addEventListener("click",() =>{
    tempoDecorridoEmSegundos = 3000
    alterarContexto("foco");
    focoBt.classList.add("active");        
} )

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto("descanso-curto");
    curtoBt.classList.add("active");

})

longoBt.addEventListener("click",() =>{
    tempoDecorridoEmSegundos = 2400
    alterarContexto("descanso-longo")
    longoBt.classList.add("active");     
} )

function alterarContexto(contexto){
    mostrarTempo();
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    switch (contexto){
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
            case "descanso-curto":
                titulo.innerHTML = `
                Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `
                break;
                case "descanso-longo":
                    titulo.innerHTML = `
                    Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
                    `
                    default:
                        break;
    }
    //como os atributos dos 3 sao basicamente iguais, so muda uma parte para diferenciar
}



const contagemRegressiva = () => {
    tempoDecorridoEmSegundos -= 1;
    if(tempoDecorridoEmSegundos <= -1){
        musicaFim.play();
        zerar();
        return; //pra interromper o codigo
    }
    mostrarTempo()
}

function iniciarouPausar() {
    if(intervaloId){ //se o intervalid tiver algum valor, vai interromper 
        musicaPause.play();
        zerar();
        return
    }

    intervaloId = setInterval(contagemRegressiva, 1000)
    musicaIniciar.play();
    iniciarOuPausarBt.textContent = 'Pausar'
    imgPlayPause.setAttribute('src', '/imagens/pause.png');
}

startPauseBt.addEventListener('click', iniciarouPausar);


function zerar(){
    clearInterval(intervaloId)
    intervaloId = null
    iniciarOuPausarBt.textContent = 'Começar'
    imgPlayPause.setAttribute('src', '/imagens/play_arrow.png');
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)//1000 milissegundos
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()// deixar em scopo global pra sempre ta mostrando na tela
