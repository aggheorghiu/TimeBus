function checkAnswers() {
    const correctAnswers = {
        q1: "a",
        q2: "5",
        q3: "michael jackson",
        q4: "off the wall",
        q5: "c",
        q6: "d",
        q7: "a",
        q8: "b",
        q9: "b",
        q10: "3",
        q11: "a",
        q12: ["a", "d"],
        q13: ["a", "c", "d"],
        q14: ["a", "c"],
        q15: "b",
        q16: "d"
    };

    let score = 0;
    const questionNames = Object.keys(correctAnswers);

    for (const questionName of questionNames) {
        const answerInputs = document.getElementsByName(questionName);
        let correctCount = 0;

        for (const input of answerInputs) {
            if ((input.type === "radio" && input.checked && input.value === correctAnswers[questionName]) ||
                (input.type === "checkbox" && input.checked && correctAnswers[questionName].includes(input.value)) ||
                (input.type === "select-one" && input.value === correctAnswers[questionName]) ||
                (input.type === "text" && input.value.toLowerCase() === correctAnswers[questionName])
                ) { correctCount++; }
        }
        if (correctCount > 0) { score++; }
    }
    alert("Você acertou " + score + " de " + questionNames.length + " perguntas.");
}

function start() {

    const questions = document.querySelectorAll('.question');
    const progressDiv = document.getElementById('progress')
    for (let i = 0; i < questions.length; i++) {
        progressDiv.innerHTML += "<div class='progressSquare' id='sq" + i + "'>Q" + (i + 1) + "</div>"
    }
    for (let i = 0; i < questions.length; i++) {
        document.getElementById("sq" + i).addEventListener('click', () => {
            const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
            questions[currentQuestionIndex].style.display = 'none';
            questions[i].style.display = 'block';
            update()
        })
    }
    update()
}

function updateAnsweredViewer() {
    let squareDivs = []
    for (let i = 0; i < document.querySelectorAll('.question').length; i++) {
        squareDivs[i] = document.getElementById("sq" + i)
        if (document.querySelectorAll('.question')[i].classList.contains('answered')) { squareDivs[i].style.background = "green"; }
        else squareDivs[i].style.background = "#9f9f9f";
    }
}

function updateCounter() {
    const questions = document.querySelectorAll('.question');
    const counter = document.querySelector('.question-counter');
    const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
    counter.innerText = `Pergunta: ${currentQuestionIndex + 1} / ${questions.length}`;
}

function updateNextBackButtons() {
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    const questions = document.querySelectorAll('.question')
    const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
    if (currentQuestionIndex == 0) backBtn.style.backgroundColor = "Grey";
    else backBtn.style.backgroundColor = "#021c50"
    if (currentQuestionIndex == questions.length - 1) nextBtn.style.backgroundColor = "Grey";
    else nextBtn.style.backgroundColor = "#021c50"
}

function updateCurrentQuestionBorder() {
    let squareDivs = []
    const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');

    for (let i = 0; i < document.querySelectorAll('.question').length; i++) {
        squareDivs[i] = document.getElementById("sq" + i)
    }
    squareDivs.forEach(squareDiv => {
        squareDiv.style.border = "";
    })
    squareDivs[currentQuestionIndex].style.border = "2px dashed red";
}

function validateInput(input, value) {
    if (value && value.trim() !== "") { // Check if value is not undefined and not an empty string
        const regexPattern = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
        const isValid = regexPattern.test(value.trim());
  
    if (!isValid) {
        input.style.backgroundColor = 'red'; // Set red background color for invalid input
    } else {
        input.style.backgroundColor = 'green'; // Remove the background color if input is valid
        }
    }
}

function validateInput(input, value) {

    if (value && value.trim() !== "") { // Check if value is not undefined and not an empty string
    const regexPattern = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    const isValid = regexPattern.test(value.trim());

    if (!isValid) {
        input.style.backgroundColor = 'red'; // Set red background color for invalid input
    } else {
        input.style.backgroundColor = 'green'; // Remove the background color if input is valid
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    for (let i = 1; i < questions.length; i++) {
        questions[i].style.display = 'none';
    }

    const radios = document.querySelectorAll('input[type="radio"]');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const selections = document.querySelectorAll('select');
    const inputs = document.querySelectorAll('input[type="text"]');
    const sliders = document.querySelectorAll('input[type="range"]');
    const submitBtn = document.getElementById('submit-btn');
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');

    radios.forEach(radio => {
        radio.addEventListener('click', () => {
            const currentQuestion = radio.parentNode.parentNode;
            const nextQuestion = currentQuestion.nextElementSibling;
            currentQuestion.classList.add('answered');
            if (nextQuestion !== null) { currentQuestion.style.display = 'none'; nextQuestion.style.display = 'block'; }
            update();
        });
    });

    checkboxes.forEach(cb => {
        cb.addEventListener('click', () => {
            const currentQuestion = cb.parentNode.parentNode;
            const nextQuestion = currentQuestion.nextElementSibling;
            const checkboxesInCurrentQuestion = currentQuestion.querySelectorAll('input[type="checkbox"]');

            // Check if any checkboxes in the current question are checked
            let anyChecked = Array.from(checkboxesInCurrentQuestion).some(checkbox => checkbox.checked);

            // If at least one checkbox is checked, add the 'answered' class
            // Otherwise, remove the 'answered' class
            if (anyChecked) { currentQuestion.classList.add('answered'); }
            else { currentQuestion.classList.remove('answered'); }
            update();
        });
    });

    selections.forEach(dropdown => {
        dropdown.addEventListener('change', () => {
            let currentQuestion = dropdown.parentNode;
            while (!currentQuestion.classList.contains('question')) {
                currentQuestion = currentQuestion.parentNode;
            }
            currentQuestion.classList.add('answered');
            update();
        });
    });

    inputs.forEach(input => {
        input.addEventListener('input', () => {
          const currentQuestion = input.parentNode.parentNode;
          const value = input.value.trim();
          const isValid = validateInput(input, value);
      
          if (isValid && !currentQuestion.classList.contains('answered')) {
            currentQuestion.classList.add('answered');
            input.style.backgroundColor = ''; // Remove the background color if input is valid
            const questionIndex = Array.from(document.querySelectorAll('.question')).indexOf(currentQuestion);
            const progressSquare = document.getElementById("sq" + questionIndex);
            progressSquare.style.background = "green"; // Update the progress square color to green
          } else if (!isValid && currentQuestion.classList.contains('answered')) {
            currentQuestion.classList.remove('answered');
            input.style.backgroundColor = 'red'; // Set red background color for invalid input
            const questionIndex = Array.from(document.querySelectorAll('.question')).indexOf(currentQuestion);
            const progressSquare = document.getElementById("sq" + questionIndex);
            progressSquare.style.background = "#9f9f9f"; // Reset the progress square color to default
          }
          update();
        });
      });

    sliders.forEach(slider => {
        const sliderValue = slider.parentElement.querySelector('.slider-value');
        slider.addEventListener('input', () => {
            sliderValue.textContent = slider.value;
            let currentQuestion = slider.parentNode;
            while (!currentQuestion.classList.contains('question')) {
                currentQuestion = currentQuestion.parentNode;
            }
            currentQuestion.classList.add('answered');
            update();
        });
    });

    submitBtn.addEventListener('click', () => {
        questions.forEach(question => {
            question.style.display = 'none';
        });
        submitBtn.style.display = 'none';
        document.querySelector('.question-counter').style.display = 'none';
    });

    backBtn.addEventListener('click', () => {
        const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
        if (currentQuestionIndex > 0) {
            questions[currentQuestionIndex].style.display = 'none'
            questions[currentQuestionIndex - 1].style.display = 'block'
        }
        update();
    });

    nextBtn.addEventListener('click', () => {
        const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
        if (currentQuestionIndex < questions.length - 1) {
            questions[currentQuestionIndex].style.display = 'none'
            questions[currentQuestionIndex + 1].style.display = 'block'
        }
        update();
    });
});

function update() {
    updateCurrentQuestionBorder();
    updateCounter();
    updateAnsweredViewer();
    updateNextBackButtons();
    validateInput();
}

function refreshPage() {
    window.location.reload();
}
