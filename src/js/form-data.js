const btsLanding = document.querySelectorAll(".buttons-landing button");
const btCadastro = document.getElementById("bt-modal-cadastro");
const btFinalizaCadastro = document.getElementById("enviar-formulario-interesses");
const btEntrar = document.getElementById("bt-modal-entrar");
const btConfirmarEntrada = document.getElementById("bt-confirma-entrada");

var resultadoButton = "";

for (var i = 0; i < btsLanding.length; i++) {
  btsLanding[i].addEventListener("click", function (e) {
    resultadoButton = this.innerHTML;
    return resultadoButton;
  })
}    

const getForm = () => {
  var form = resultadoButton;
  
  if(form == "Entrar"){
    form = document.getElementById("form-entrar");
    return form;
  }else{
    form = document.getElementById("form-cadastro");
    return form;
  }
}

const getFormData = () => {
  const form = getForm();
  return new FormData(form);
}

const getInterest = () =>{
  let frmCheck = document.getElementById('form-interesses').elements;
  let resultado = ""
  for(i = 0; i < frmCheck.length; i++){
    if(frmCheck[i].checked){
      resultado = resultado + frmCheck[i].value + " ";
      console.log(resultado)
    }
  }
}

const toJson = function(event) {
  const formData = getFormData();
  const formCheck = getInterest();
  event.preventDefault();

  let object = {};
  formData.forEach((value, key) => {
    if (!Reflect.has(object, key)){
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])){
      object[key] = [object[key]];
    }
    object[key].push(value);
  });

  let json = JSON.stringify(Object.fromEntries(formData, formCheck));
  console.log(json);

  const options = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    body: json,
  }

  fetch('http://localhost:8000/', options)
};

btFinalizaCadastro.addEventListener("click", toJson);
btConfirmarEntrada.addEventListener("click", toJson);