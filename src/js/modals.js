/* Getting the elements */
const register = document.querySelector('#bt-modal-cadastro');
const registerNext = document.querySelector('#bt-confirmar');

const login = document.querySelector('#bt-modal-entrar');
const recovery = document.querySelector('#bt-modal-recuperacao');

/* Listeners */
register.addEventListener('click', () => iniciaModal('modal-register'));
registerNext.addEventListener('click', () => iniciaModal('modal-choices'));

login.addEventListener('click', () => iniciaModal('modal-login'));
recovery.addEventListener('click', () => iniciaModal('modal-recovery'));

function iniciaModal(modalID) {
    const modal = document.getElementById(modalID);
    if(modal) {
        modal.classList.add('show');
        modal.addEventListener('click', (e) => {
            if(e.target.id == modalID || e.target.id == 'bt-modal-recuperacao' || e.target.id == 'modal-close' || e.target.id == 'bt-modal-cadastro2') {
                modal.classList.remove('show');
            }
        });
    }
}
