const form = document.querySelector('#register')
const tabs = document.querySelectorAll('.tab')
const buttonPrev = document.querySelector('#bt-prev')
const buttonNext = document.querySelector('#bt-next')

let currentTab = 0
showTab(currentTab)

function showTab(tab){
    tabs[tab].style.display = 'block'

    if(tab == 0) buttonPrev.style.display = 'none'
    else buttonPrev.style.display = 'inline'

    if(tab == tabs.length-1) buttonNext.innerHTML = 'Enviar'
    else buttonNext.innerHTML = 'Próximo'
}

function nextPrev(step){
    tabs[currentTab].style.display = 'none'
    currentTab += step;
    if(currentTab >= tabs.length){
        form.submit()
        return false
    }
    
    showTab(currentTab)
}