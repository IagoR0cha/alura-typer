var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();
//var tempoInicial = atualizaTempoInicial()


$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();

    $("#bt-reiniciar").click(reiniciaJogo);

  
    campo.on("input", confereDigitacao);

    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });

    $(".tooltip").tooltipster({
        trigger: "custom"
    });
});





function atualizaTamanhoFrase(){
    let frase = $(".frase").text();

    let numPalavras = frase.split(/\S+/).length - 1;

    let tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}



function inicializaContadores(){
    campo.on("input", function(){
        let conteudo = campo.val()
        let qtdPalavra = conteudo.split(/\S+/).length - 1;
        let qtdCaracteres = conteudo.length;
        $("#contador-palavras").text(qtdPalavra);
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro(){
    campo.one("focus", function(){
        let tempoDigitacao = $("#tempo-digitacao");
        let tempoRestante = tempoDigitacao.text();

        let btReinicia = $("#bt-reiniciar");
        btReinicia.attr("disabled", true);
        let cronometroId = setInterval(function(){
                tempoRestante--;
                tempoDigitacao.text(tempoRestante);

                if (tempoRestante < 1){
                    clearInterval(cronometroId);
                    finalizaJogo();
                }
            }, 1000);
    });
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text(0);
    $("#contador-caracteres").text(0);
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-correta");
    campo.removeClass("borda-errada");
}


function confereDigitacao(){
    // let digitado = campo.val();
    // let comparavel = frase.substr(0, digitado.length);
    // if(digitado == comparavel){
    //     campo.removeClass("borda-errada")
    //     campo.addClass("borda-correta");
    // }else{
    //     campo.removeClass("borda-correta")
    //     campo.addClass("borda-errada");
    // }
    
    var frase = $(".frase").text();
    let digitado = campo.val();
    let digitouCorreto = frase.startsWith(digitado);
    
    campo.toggleClass("borda-correta", digitouCorreto);
    campo.toggleClass("borda-errada", !digitouCorreto);
}

function finalizaJogo(){
    $("bt-reiniciar").removeAttr("disabled");
    campo.toggleClass("campo-desativado");
    campo.attr("disabled", true);

    inserePlacar();
}




