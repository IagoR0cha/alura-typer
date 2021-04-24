var linkServidorFrases = "http://localhost:3000/frases";

$(function(){
    $("#bt-frase").click(fraseAleatoria);
    $("#bt-frase-id").click(buscaFrase);
   

});

function fraseAleatoria(){
    let spinner = $("#spinner");
    spinner.toggle();

    $.get(linkServidorFrases, trocaFraseAleatoria).fail(function(){
        let erro = $("erro");
        erro.toggle();        
        setTimeout(function(){erro.toggle()},1500);
    }).always(function(){spinner.toggle()});
}

function trocaFraseAleatoria(data){
    let frase = $(".frase");
    let numAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numAleatorio].tempo);
    
}

function buscaFrase(){
    let fraseId = $("#frase-id").val();
    let dados = {id: fraseId};

    let spinner = $("#spinner");
    spinner.toggle();

    $.get(linkServidorFrases, dados, trocaFrase)
    .fail(function(){
        let erro = $("erro");
        erro.toggle();        
        setTimeout(function(){erro.toggle()},1500);
    })
    .always(function(){
        spinner.toggle();
    })
    ;
}

function trocaFrase(data){
    let frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}



