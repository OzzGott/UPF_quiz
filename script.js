let points = 0;
let currentQuestion = 0;
let showingExplanation = false;
let selectedOptions = [];

const totalQuestionsSpan = document.getElementById('total-questions');
const questionArea = document.getElementById('question-area');
const endScreen = document.getElementById('end-screen');
const startScreen = document.getElementById('start-screen');
const finalScore = document.getElementById('final-score');
const scoreComment = document.getElementById('score-comment');
const restartBtn = document.getElementById('restart-btn');
const startButton = document.getElementById('start-game-btn');

const questions = [
    {
        text: "Hvilke af nedenstående fødevarer er ultraforarbejdede?",
        explanation: "Forklaring?",
        options: [
            { name: "Komælk", true: false},
            { name: "Rugbrød", true: true },
            { name: "Havdredrik", true: true },
            { name: "Hakket oksekød", true: false},
            { name: "Spegepølse", true: true },
            { name: "Æg", true: false },
            { name: "Havregryn", true: false },
        ]
    },
    {
        text: "Hvilke af nedenstående fødevarer er ultraforarbejdede?",
        explanation: "Forklaring?",
        options: [
            { name: "Plantepølse", true: true },
            { name: "Vaniljeskyr", true: true },
            { name: "Cheddar", true: false },
            { name: "Bacon", true: false},
            { name: "Havrefras", true: true },
            { name: "Kyllingebryst", true: false },
            { name: "Beef jerky", true: false},
        ]
    },
    {
        text: "Hvilke af nedenstående fødevarer er ultraforarbejdede?",
        explanation: "Forklaring?",
        options: [
            { name: "Frysepizza", true: true },
            { name: "Linser på dåse", true: false },
            { name: "Kimchi", true: true },
            { name: "Smør", true: false},
            { name: "Græsk yoghurt", true: false },
            { name: "Fuldkornstortilla", true: true },
            { name: "Kartofler", true: false },
            { name: "Frosne Jordbær", true: false},
        ]
    },
    {
        text: "Hvilke af nedenstående fødevarer er ultraforarbejdede?",
        explanation: "Forklaring?",
        options: [
            { name: "Saltede nødder", true: false },
            { name: "Figenstænger", true: true },
            { name: "Drikkeyoghurt", true: true },
            { name: "Vingummi", true: true },
            { name: "Proteinshake", true: true },
            { name: "Tørret mango", true: false },
            { name: "Rosiner", true: false },
            { name: "Knækbrød", true: true },
        ]
    },
];


function renderQuestion() {
    questionArea.innerHTML = "";
    endScreen.classList.add("hidden");
    startScreen.classList.add("hidden");
    selectedOptions = [];

    if (currentQuestion >= questions.length) {
        showEndScreen();
        return;
    }

    const q = questions[currentQuestion];

    const title = document.createElement('h2');
    title.textContent = q.text;
    questionArea.appendChild(title);

    q.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = "option";
        div.dataset.index = index;

        div.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; justify-content: flex-start;">
                <input type="checkbox" class="option-checkbox" data-index="${index}">
                <div>
                    <strong>${option.name}</strong>
                </div>
            </div>
        `;

        div.addEventListener('click', () => toggleOption(div, option, index));
        questionArea.appendChild(div);
    });

    const submitBtn = document.createElement('button');
    submitBtn.id = "submit-btn";
    submitBtn.textContent = "Tjek svar";
    submitBtn.addEventListener('click', submitAnswer);
    questionArea.appendChild(submitBtn);
}

function toggleOption(div, option, index) {
    const checkbox = div.querySelector('.option-checkbox');
    const alreadySelected = selectedOptions.includes(index);

    if (alreadySelected) {
        selectedOptions = selectedOptions.filter(i => i !== index);
        checkbox.checked = false;
        div.classList.remove('selected');
    } else {
        selectedOptions.push(index);
        checkbox.checked = true;
        div.classList.add('selected');
    }
}

function submitAnswer() {
    const q = questions[currentQuestion];

    // Score: only award a point if selected options exactly match correct options
    const correctIndices = q.options
        .map((opt, i) => opt.true ? i : null)
        .filter(i => i !== null);

    const isFullyCorrect =
        selectedOptions.length === correctIndices.length &&
        correctIndices.every(i => selectedOptions.includes(i));

    if (isFullyCorrect) points++;

    // Color-code each option
    q.options.forEach((option, index) => {
        const div = questionArea.querySelector(`.option[data-index="${index}"]`);
        const wasSelected = selectedOptions.includes(index);

        if (option.true && wasSelected) {
            div.classList.add('correct');
        } else if (option.true && !wasSelected) {
            div.classList.add('missed');
        } else if (!option.true && wasSelected) {
            div.classList.add('wrong');
        }
        div.style.pointerEvents = 'none';
    });

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.remove();

    const explanationDiv = document.createElement('div');
    explanationDiv.className = "explanation";

    const lastQuestion = currentQuestion === questions.length - 1;
    const nextButtonText = lastQuestion ? "Se resultat" : "Næste spørgsmål";

    explanationDiv.innerHTML = `
        <p>${isFullyCorrect
            ? "<mark style='background-color: #32CD32;'>Korrekt! Godt klaret.</mark>"
            : "<mark style='background-color: red;'>Ikke helt rigtigt.</mark>"
        }</p>
        <p>${q.explanation || ""}</p>
        <button id="next-btn">${nextButtonText}</button>
    `;

    questionArea.appendChild(explanationDiv);

    document.getElementById('next-btn').addEventListener('click', () => {
        currentQuestion++;
        showingExplanation = false;
        renderQuestion();
    });
}

function showEndScreen() {
    questionArea.innerHTML = "";
    endScreen.classList.remove("hidden");
    startScreen.classList.add("hidden");
    finalScore.textContent = points;
    totalQuestionsSpan.textContent = questions.length;

    let comment = "";
    if (points === questions.length) {
        comment = "Fantastisk! Du kender dine bælgfrugter!";
    } else if (points >= questions.length / 2) {
        comment = "Godt klaret! Du har en fin forståelse for bælgfrugter.";
    } else {
        comment = "Øv, du kan prøve igen og lære mere om bælgfrugter.";
    }
    scoreComment.textContent = comment;
}

function showStartScreen() {
    questionArea.innerHTML = "";
    endScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
}

restartBtn.addEventListener('click', () => {
    points = 0;
    currentQuestion = 0;
    renderQuestion();
});

startButton.addEventListener('click', () => {
    points = 0;
    currentQuestion = 0;
    renderQuestion();
});

// Initialize
showStartScreen();