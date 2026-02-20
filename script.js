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
        explanation: "De tre bælgfruger, flest danskere har prøvet, er edamamebønner (60 %), kikærter (55 %) og kidneybønner (53 %), mens under 5 % har prøvet ingridærter og gråærter",
        options: [
            { name: "Komælk", true: false, img: "./images/Edamame_bean.png" },
            { name: "Rugbrød", true: true, img: "./images/Chickpea.png" },
            { name: "Havdredrik", true: true, img: "./images/Green_lentil.png" },
            { name: "Hakket oksekød", true: false, img: "./images/Red_lentil.png"},
            { name: "Spegepølse", true: true, img: "./images/Kidney_bean.png" },
            { name: "Æg", true: false, img: "./images/Pea.png" },
            { name: "Havregryn", true: false, img: "./images/Edamame_bean.png" },
        ]
    },
    {
        text: "Hvilke af nedenstående fødevarer er ultraforarbejdede?",
        explanation: "Fødevarestyrelsen anbefaler, at spise mindre kød, mere fisk og flere bælgfrugter. De anbefaler, at man spiser 100 gram bælgfrugter om dagen. Bælgfrugterne er både en god kilde til protein og andre næringsstoffer og er samtidig blandt de fødevarer, der har det laveste klimaaftryk.",
        options: [
            { name: "Plantepølse", true: true, img: "./images/27.png" },
            { name: "Vaniljeskyr", true: true, img: "./images/17.png" },
            { name: "Cheddar", true: false, img: "./images/4.png" },
            { name: "Bacon", true: false, img: "./images/15.png"},
            { name: "Havrefras", true: true, img: "./images/17.png" },
            { name: "Kyllingebryst", true: false, img: "./images/4.png" },
            { name: "Beef jerky", true: false, img: "./images/15.png"},
        ]
    },
    {
        text: "Hvilke af nedenstående fødevarer er ultraforarbejdede?",
        explanation: "I Region Hovedstaden er det over halvdelen (52 %), der spiser bælgfrugter ugentligt. I Region Midtjylland og Region Syddanmark er det 42 %, i Region Sjælland 37 % og i Region Nordjylland 32 %.",
        options: [
            { name: "Frysepizza", true: true, img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Map_DK_Region_Hovedstaden.png" },
            { name: "Linser på dåse", true: false, img: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Map_DK_Region_Midtjylland.png" },
            { name: "Kimchi", true: true, img: "https://upload.wikimedia.org/wikipedia/commons/3/38/Map_DK_Region_Syddanmark.png" },
            { name: "Smør", true: false, img: "https://upload.wikimedia.org/wikipedia/commons/8/83/Map_DK_Region_Nordjylland.png"},
            { name: "Græsk yoghurt", true: false, img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Map_DK_Region_Hovedstaden.png" },
            { name: "Fuldkornstortilla", true: true, img: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Map_DK_Region_Midtjylland.png" },
            { name: "Kartofler", true: false, img: "https://upload.wikimedia.org/wikipedia/commons/3/38/Map_DK_Region_Syddanmark.png" },
            { name: "Frosne Jordbær", true: false, img: "https://upload.wikimedia.org/wikipedia/commons/8/83/Map_DK_Region_Nordjylland.png"},
        ]
    },
    {
        text: "Hvilke af nedenstående fødevarer er ultraforarbejdede?",
        explanation: "Mens 14 % af dem, der træner mindre end fire gange om ugen, har erstattet kød med bælgfrugter inden for den seneste uge, gælder det hele 26 % af de mere fysisk aktive.",
        options: [
            { name: "Saltede nødder", true: false, img: "./images/up.png" },
            { name: "Figenstænger", true: true, img: "./images/down.png" },
            { name: "Drikkeyoghurt", true: true, img: "./images/equal.png" },
            { name: "Vingummi", true: true, img: "./images/up.png" },
            { name: "Proteinshake", true: true, img: "./images/down.png" },
            { name: "Tørret mango", true: false, img: "./images/equal.png" },
            { name: "Rosiner", true: false, img: "./images/up.png" },
            { name: "Knækbrød", true: true, img: "./images/up.png" },
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
            <img src="${option.img}" alt="${option.name}">
            <div>
                <strong>${option.name}</strong>
            </div>
            <input type="checkbox" class="option-checkbox" data-index="${index}">
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