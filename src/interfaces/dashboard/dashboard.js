let show = true

const menuSection = document.querySelector('.toggle-section')
const menuToggler = menuSection.querySelector('.toggle-menu')

menuToggler.addEventListener('click', () => {
    document.body.style.overflow = show ? 'hidden' : 'initial'
    menuSection.classList.toggle('-on', show)
    show = !show
})