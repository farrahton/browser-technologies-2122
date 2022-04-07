// input select en textarea zijn belangrijk
// let form = document... ('form') staat voor alle elementen in de formulier var kan ook met let 
// var form = document.querySelector('form')
// var form = document.forms
// for (var el in form.elements) {

// }


// document.images 
// document.forms
// document.forms[0].elements
// document.links dit waren vroeger het enige wat je kon gebruiken links kon je alleen uitlzen niet vervangen (denkt ppk) 

// document.querySelectorAll('input, select, textarea') werkt alleen in nieuwere versies 

// const card = document.querySelector('card')
// // card.classList.add('cardAnimation')
// card.style.display = "none";
// document.getElementsByClassName('card').classList.add('active');

// document.getElementsByClassName('card').style.display = "none";


const multiStepForm = document.querySelector("[data-multi-step")
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
const formButtons = [...multiStepForm.querySelectorAll("button")]

console.log(formSteps);

// a loop so every fieldset is displayed underneath each other when javascript is disabled as opposed to having display:none
formSteps.forEach(element => {
    element.classList.add('is-default-hidden');
})

formButtons.forEach(element => {
    element.classList.remove('pe-buttons');
})

// check the array to give the classlist to the one that's active and make that one have display: block
let currentStep = formSteps.findIndex(step => {
    return step.classList.add("active")
})

if (currentStep < 0) {
    currentStep = 0
    showCurrentStep()
}

// incrementor is used for the validation of required input types. the click eventListener is used so the button works and makes it go to the next array
multiStepForm.addEventListener("click", e => {
    let incrementor
    if (e.target.matches("[data-next]")) {
        incrementor = 1
    } else if (e.target.matches("[data-previous]")) {
        incrementor = -1
    }

    if (incrementor == null) return

    const inputs = [...formSteps[currentStep].querySelectorAll("input")]
    const allValid = inputs.every(input => input.reportValidity())
    if (allValid) {
        currentStep += incrementor
        showCurrentStep()
    }
})

function showCurrentStep() {
    formSteps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep)
    })
}



