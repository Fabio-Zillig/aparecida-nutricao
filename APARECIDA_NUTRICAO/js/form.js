

var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");

    var paciente = obtemPacienteDoForm(form);

    var pacienteTr = montaTr(paciente);

    var erros = validaPaciente(paciente);

    if(erros.length > 0){
        exibeMensegemDeErro(erros);
        return;
    } 
   
    adicionaPacienteNaTabela(paciente);

    form.reset();
    var ulErros = document.querySelector("#mensagem-erro");
    ulErros.innerHTML = "";
});

function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var  tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function exibeMensegemDeErro(erros){
    var ul = document.querySelector("#mensagem-erro");
    ul.innerHTML = "";

    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    })
}

function obtemPacienteDoForm(form) {

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    
    return paciente;
}

function montaTr(paciente){
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd("info-nome", paciente.nome));
    pacienteTr.appendChild(montaTd("info-peso", paciente.peso));
    pacienteTr.appendChild(montaTd("info-altura", paciente.altura));
    pacienteTr.appendChild(montaTd("info-gordura", paciente.gordura));
    pacienteTr.appendChild(montaTd("info-imc", paciente.imc));

    return pacienteTr;
}

function montaTd(classe, dado){

    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = dado;

    return td;

}

function validaPaciente(paciente){

    var erros = [];

    if (!validaPeso(paciente.peso)) erros.push("Peso é invalida!");
    if(!validaAltura(paciente.altura)) erros.push("Altura é invalida!");

    if(paciente.nome.length == 0) erros.push("O nome do paciente não foi preenchido!");
    if(paciente.peso.length == 0) erros.push("O peso do paciente não foi preenchido!");
    if(paciente.altura.length == 0) erros.push("A altura do paciente não foi preenchida!");
    if(paciente.gordura.length == 0) erros.push("A gordura do paciente não foi preenchida!");

    return erros;
}