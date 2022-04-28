const form = document.querySelector('#register')
const textFields = [...form.querySelectorAll('[name]')]
const checkboxFields = form.querySelectorAll('input[type="checkbox"]')

console.log(document.getElementById('interests').elements)

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
        getData()
        return false
    }
    
    showTab(currentTab)
}

function getData(){
    let data = {}
    textFields.forEach(field => {
        data[field.name] = field.value
    })
    
    let checked = {}
    checkboxFields.forEach(field => {
        if(field.checked) checked[field.value] = field.value
    })

    data['interests'] = checked
    console.log(data)
}

function sendData(data){

}