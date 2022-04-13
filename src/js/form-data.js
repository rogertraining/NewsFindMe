const btsLanding = document.querySelectorAll("#bts-landing button");
const btCadastro = document.getElementById("bt-modal-cadastro");
const btProximo = document.getElementById("bt-confirmar");
const btFinalizaCadastro = document.getElementById("enviar-formulario-interesses");
const btEntrar = document.getElementById("bt-modal-entrar");
const btConfirmarEntrada = document.getElementById("bt-confirma-entrada");

var resultado = "";

for (var i = 0; i < btsLanding.length; i++) {
  btsLanding[i].addEventListener("click", function (e) {
    resultado = this.innerHTML;
    return resultado;
  })
}    

const getForm = () => {
  var form = resultado;

  if(form == "Cadastre-se"){
    form = document.getElementById("form-cadastro");
    return form;
  }else{
    form = document.getElementById("form-entrar");
    return form;
  }
}

const getFormData = () => {
  const form = getForm();
  return new FormData(form);
}

const toJson = function(event) {
  const formData = getFormData();
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

  let json = JSON.stringify(Object.fromEntries(formData));
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

btProximo.addEventListener("click", toJson);
btConfirmarEntrada.addEventListener("click", toJson);