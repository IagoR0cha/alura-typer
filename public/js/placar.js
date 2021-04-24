var linkServidorPlacar = "http://localhost:3000/placar";

$(function(){
    var btPlacar = $("#bt-placar");
    btPlacar.click(mostraPlacar);

    $("#bt-sync").click(sincronizaPlacar);
    atualizaPlacar();
});

//---------------------JavaScript puro----------------------

// function montaTd(conteudo){
//     let td = document.createElement("td");
//     td.textContent = conteudo;

//     return td;
// }

// function montaTdIcone(conteudo){
//     let td = document.createElement("td");
//     td.innerHTML = conteudo;
//     td.classList.add(".botao-remover");

//     return td;
// }

// function montaTr(nome, pontos){
//     let tr = document.createElement("tr");
    
//     let btRemover = `<a href="#"><i class="small material-icons">delete</i></a>`;

//     let nomeTd = montaTd(nome);
//     let pontosTd = montaTd(pontos);
//     let btRemoverTd = montaTdIcone(btRemover);
    
//     tr.append(nomeTd);
//     tr.append(pontosTd);
//     tr.append(btRemoverTd);

//     return tr;
// }

//---------------------JavaScript puro----------------------





function novaLinha(nome, nPalavras){
    let linha = $("<tr>");
    let nomeTd = $("<td>").text(nome);
    let pontosTd = $("<td>").text(nPalavras);
    let btRemoverTd = $("<td>");

    let link = $("<a>").addClass("botao-remover").attr("href", "#");
    let icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    linha.append(nomeTd).append(pontosTd).append(btRemoverTd.append(link.append(icone)));

    return linha;
}


function inserePlacar(){
    let corpoTabela = $(".placar").find("tbody");
    let numPalavras = $("#contador-palavras").text();
    let nome = $("#usuarios").val();
    
    let linhaPlacar = novaLinha(nome,numPalavras);
    linhaPlacar.find(".botao-remover").click(removeLinha);
   
    //---------------------JavaScript puro----------------------
    //let linhaPlacar = montaTr(nome, numPalavras);
    //---------------------JavaScript puro----------------------


    corpoTabela.append(linhaPlacar);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar(){
    let posicaoPlacar = $(".placar").offset().top;
    $("body").animate({
        scrollTop: posicaoPlacar+"px"
    },1000);

}

function removeLinha(){
    event.preventDefault();
    
    let linha = $(this).parent().parent();
    linha.fadeOut();
    setTimeout(function(){
        linha.remove();
    }, 400);
}

function mostraPlacar(){
    let placar = $(".placar");
    //placar.toggle();
    placar.stop().slideToggle(600); // .stop() faz com que se interrompa uma animação que está acontecendo para que a proxima se inicie
                                    // Isso faz com que a animação nao fique se repetido várias vezes, se o usuario der o comando para
                                    // ela acontecer várias vezes.
}

function sincronizaPlacar(){
    let placar = [];
    let linha = $("tbody>tr");

    linha.each(function(){
        let nome = $(this).find("td:nth-child(1)").text();
        let pontos = $(this).find("td:nth-child(2)").text();
        
        var score = {
            usuario: nome,
            pontos: pontos
        };

        placar.push(score);
    });

    console.log(placar);

    var dados = {
        placar: placar
    };
    
    $.post(linkServidorPlacar, dados, function(){
        $(".tooltip").tooltipster("open").tooltipster("content","Sucesso ao sincronizar!");
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content","Falha ao sincronizar!");
    })
    .always(function(){ 
        setTimeout(function(){
            $(".tooltip").tooltipster("close");
        }, 1200);
    });

}

function atualizaPlacar(){
    $.get(linkServidorPlacar, function(retorno){
        $(retorno).each(function(i){
            let linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        })
    });
}