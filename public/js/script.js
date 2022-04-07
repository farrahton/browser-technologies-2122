const multiStepForm = document.querySelector("[data-multi-step")
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
const formButtons = [...multiStepForm.querySelectorAll("button")]

console.log(formSteps);

// a loop so every fieldset is displayed underneath each other when javascript is disabled as opposed to having display:none
formSteps.forEach(element => {
    element.classList.add('is-default-hidden');
})

// a loop to remove the classlist with display:none, because with this PE we do want to see the buttons
formButtons.forEach(element => {
    element.classList.remove('pe-buttons');
})

// executes 'step' once for every index in the array until it finds the one that returns a value that's true and adds the classlist to make it show
let currentStep = formSteps.findIndex(step => {
    return step.classList.add("active")
})

if (currentStep < 0) {
    currentStep = 0
    showCurrentStep()
}

multiStepForm.addEventListener("click", e => {
    let incrementor
    // the click eventListener is used so the button works and makes it go to the next array
    // if you click the button put the incrementor to 1 
    if (e.target.matches("[data-next]")) {
        incrementor = 1
    } else if (e.target.matches("[data-previous]")) {
        incrementor = -1
    }

    if (incrementor == null) return
    // checks if all inputs are filled in, because only then it will add a step and make the next array active
    const inputs = [...formSteps[currentStep].querySelectorAll("input")]
    const allValid = inputs.every(input => input.reportValidity())
    if (allValid) {
        currentStep += incrementor
        showCurrentStep()
    }
})

// when you click on the button it scrolls to the top
formButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        window.scrollTo(0, 0);
    })
})

function showCurrentStep() {
    formSteps.forEach((step, index) => {
        // add the active class if our index is equal to the currentstep
        step.classList.toggle("active", index === currentStep)
    })
}



