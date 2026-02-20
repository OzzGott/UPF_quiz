let currentQuestion = 0;
let showingExplanation = false;
let selectedOptions = [];
let questionScores = [];
let allSelectedEverything = true; //hehe

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

    if (selectedOptions.length !== q.options.length) {
        allSelectedEverything = false;
    }

    // Calculate score: +1 for each correct selection, -1 for each wrong/missed
    let raw = 0;
    q.options.forEach((option, index) => {
        const wasSelected = selectedOptions.includes(index);
        if (option.true && wasSelected) raw++;
    });

    const correctCount = q.options.filter(opt => opt.true).length;
    const score = correctCount === 0 ? 1 : Math.max(0, raw) / correctCount;
    questionScores.push(score);

    const wrongCount = q.options.filter((opt, i) => !opt.true && selectedOptions.includes(i)).length;
    const wrongPart = wrongCount === 0 ? '' : wrongCount === 1 ? ` Men du valgte ${wrongCount} forkert.` : ` Men du valgte ${wrongCount} forkerte.`;

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

    const questionPct = Math.round(score * 100);
    const lastQuestion = currentQuestion === questions.length - 1;
    const nextButtonText = lastQuestion ? "Se resultat" : "Næste spørgsmål";

    explanationDiv.innerHTML = `
        <p>Du fik <strong>${questionPct}%</strong> på dette spørgsmål. ${wrongPart}</p>
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

    const avgScore = questionScores.reduce((a, b) => a + b, 0) / questionScores.length;
    const pct = Math.round(avgScore * 100);

    finalScore.textContent = `${pct}%`;

    if (allSelectedEverything) {
        scoreComment.textContent = "Valgte du bare alle mulighederne hver gang? Den holder vel ikke helt, vel?";
        return;
    }

    let comment = "";
    if (pct === 100) {
        comment = "Fantastisk! Du kender dine ultraforarbejdede fødevarer perfekt!";
    } else if (pct >= 75) {
        comment = "Godt klaret! Du har en god forståelse for ultraforarbejdede fødevarer.";
    } else if (pct >= 50) {
        comment = "Ikke dårligt! Der er dog stadig noget at lære.";
    } else {
        comment = "Øv, du kan prøve igen og lære mere om ultraforarbejdede fødevarer.";
    }
    scoreComment.textContent = comment;
}

function showStartScreen() {
    questionArea.innerHTML = "";
    endScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
}

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    questionScores = [];
    allSelectedEverything = true;
    renderQuestion();
});

startButton.addEventListener('click', () => {
    currentQuestion = 0;
    questionScores = [];
    allSelectedEverything = true;
    renderQuestion();
});

// Initialize
showStartScreen();