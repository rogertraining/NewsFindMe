function iniciaModal(modalID) {
    const modal = document.getElementById(modalID);
    if(modal) {
        modal.classList.add('mostrar');
        modal.addEventListener('click', (e) => {
            if(e.target.id == modalID || e.target.id == 'bt-modal-recuperacao' || e.target.id == 'bt-fechar' || e.target.id == 'bt-modal-cadastro2') {
                modal.classList.remove('mostrar');
            }
        });
    }
}

const cadastro = document.querySelector('#bt-modal-cadastro');
cadastro.addEventListener('click', () => iniciaModal('cadastro'));

const entrar = document.querySelector('#bt-modal-entrar');
entrar.addEventListener('click', () => iniciaModal('entrar'));

const cadastro2 = document.querySelector('#bt-modal-cadastro2');
cadastro2.addEventListener('click', () => iniciaModal('cadastro'));

const recuperacao = document.querySelector('#bt-modal-recuperacao');
recuperacao.addEventListener('click', () => iniciaModal('recuperacao'));