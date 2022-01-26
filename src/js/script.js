let seuVotoPara = document.querySelector('.p-header span');
let cargo = document.querySelector('.p-section-1 span');
let desc = document.querySelector('.p-footer');
let aviso = document.querySelector('.p2');
let lateral = document.querySelector('.p1-right');
let numeros = document.querySelector('.p-section-2');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapar() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i = 0; i<etapa.numeros; i++) {
        if( i === 0){
            numeroHtml += '<div class="numero pisc"></div>';
        }else{
            numeroHtml += '<div class="numero"></div>';

        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    desc.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizarInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        desc.innerHTML = `Nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="image small"><img src="${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }else{
                fotosHtml += `<div class="image"><img src="${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosHtml;
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        desc.innerHTML = '<div class="pisc" style="font-size: 40px; font-weight: bold; text-align: center; margin-top: 10px;">VOTO NULO</div>';
    }
}

function clicou(n){
    let elNumero = document.querySelector('.numero.pisc');
    if(elNumero != null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`

        elNumero.classList.remove('pisc');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisc');
        }else{
            atualizarInterface();
        }
    }
}

function branco(){
    if(numero === ''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        desc.innerHTML = '<div class="pisc" style="font-size: 40px; font-weight: bold; text-align: center; margin-top: 10px;">VOTO EM BRANCO</div>';
    }
}

function corrige(){
    comecarEtapar();
}

function confirmar(){
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;


    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        });
    }else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapar();
        }else{
           document.querySelector('.screen').innerHTML = '<div style="font-size: 60px; font-weight: bold; text-align: center; margin-top: 25%;">FIM</div>';
           console.log(votos);
        }
    }
}

comecarEtapar();