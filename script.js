
let points = 0;
let currentQuestion = 0;
let showingExplanation = false;
let lastSelectedOption = null;

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
        text: "Hvilke bælgfrugter har flest danskere prøvet at spise?",
        explanation: "De tre bælgfruger, flest danskere har prøvet, er edamamebønner (60 %), kikærter (55 %) og kidneybønner (53 %), mens under 5 % har prøvet ingridærter og gråærter",
        options: [
            { name: "Edamamebønner", true: true, img: "./images/Edamame_bean.png" },
            { name: "Kikærter", true: false, img: "./images/Chickpea.png" },
            { name: "Grønne linser", true: false, img: "./images/Green_lentil.png" },
            { name: "Røde linser", true: false, img: "./images/Red_lentil.png"}
        ]
    },
    {
        text: "Hvor mange danskere kender Fødevarestyrelsens officielle anbefalinger om, at man bør spise 100 gram bælgfrugter om dagen?",
        explanation: "Fødevarestyrelsen anbefaler, at spise mindre kød, mere fisk og flere bælgfrugter. De anbefaler, at man spiser 100 gram bælgfrugter om dagen. Bælgfrugterne er både en god kilde til protein og andre næringsstoffer og er samtidig blandt de fødevarer, der har det laveste klimaaftryk.",
        options: [
            { name: "27 % af befolkningen", true: false, img: "./images/27.png" },
            { name: "17 % af befolkningen", true: false, img: "./images/17.png" },
            { name: "4 % af befolkningen", true: true, img: "./images/4.png" },
            { name: "1,5 % af befolkningen", true: false, img: "./images/15.png"}
        ]
    },
    {
        text: "Hvor i Danmark er der flest, der spiser bælgfrugter?",
        explanation: "I Region Hovedstaden er det over halvdelen (52 %), der spiser bælgfrugter ugentligt. I Region Midtjylland og Region Syddanmark er det 42 %, i Region Sjælland 37 % og i Region Nordjylland 32 %.",
        options: [
            { name: "Region Hovedstaden", true: true, img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Map_DK_Region_Hovedstaden.png" },
            { name: "Region Midtjylland", true: false, img: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Map_DK_Region_Midtjylland.png" },
            { name: "Region Syddanmark", true: false, img: "https://upload.wikimedia.org/wikipedia/commons/3/38/Map_DK_Region_Syddanmark.png" },
            { name: "Region Nordjylland", true: false, img: "https://upload.wikimedia.org/wikipedia/commons/8/83/Map_DK_Region_Nordjylland.png"}
        ]
    },
    {
        text: "Spiser danskere, der træner mindst fire gange om ugen, bælgfrugter oftere eller sjældnere end andre?",
        explanation: "Mens 14 % af dem, der træner mindre end fire gange om ugen, har erstattet kød med bælgfrugter inden for den seneste uge, gælder det hele 26 % af de mere fysisk aktive.",
        options: [
            { name: "Oftere", true: true, img: "./images/up.png" },
            { name: "Sjældnere", true: false, img: "./images/down.png" },
            { name: "Det samme", true: false, img: "./images/equal.png" },
            //{ name: "D", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
        ]
    },
    {
        text: "Hvilke kantiner inspirerer bedst til at spise bælgfrugter?",
        explanation: "Blandt danskere med adgang til kantine oplever 4 ud af 10, at den inspirerer til flere bælgfrugter. Offentligt ansatte bliver især inspireret: 46 % mod 37 % i den private sektor. <br> <br> Har du selv oplevet at blive inspireret af kantinen på arbejde?",
        options: [
            { name: "Private", true: false, img: "./images/private.png" },
            { name: "Offentlige", true: true, img: "./images/public.png" },
            //{ name: "C", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            //{ name: "D", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
        ]
    },
    {
        text: "Hvad motiverer danskerne mest til at spise flere bælgfrugter?",
        explanation: "Sundhed er den største motivation for at spise flere bælgfrugter – 88 % angiver det som den vigtigste årsag. Herefter følger mæthed (61 %) og klimafordele (58 %). Bælgfrugterne er rige på fiber, protein, jern, zink, folsyre og kalium, hvilket gavner både fordøjelsen og tarmfloraen.",
        options: [
            { name: "Bælgfrugter er bedre for klimaet", true: false, img: "./images/climate.png" },
            { name: "Bælgfrugter er sunde", true: true, img: "./images/healthy.png" },
            { name: "Bælgfrugter mætter godt", true: false, img: "./images/full.png" },
            { name: "Bælgfrugter er billigere", true: false, img: "./images/money.png"}
        ]
    },
    {
        text: "Er danskerne bange for at få for lidt protein, hvis de skifter kødet ud med bælgfrugter?",
        explanation: "53 % af danskerne svarer, at de er uenige i, at de er bange for ikke at få nok protein, hvis de i nogle måltider erstatter kød med bælgfrugter. Bælgfrugterne har også et højt proteinindhold i tørret vægt: kikærter indeholder 20 %, røde linser 27 % og sojabønner hele 36 % protein.",
        options: [
            { name: "Flertallet er bange", true: false, img: "https://images.unsplash.com/photo-1583264277139-3d9682e44b03?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA %3D %3D" },
            { name: "Flertallet er ikke bange", true: true, img: "https://images.unsplash.com/photo-1713947505435-b79c33c6c91a?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA %3D %3D" },
            //{ name: "C", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            //{ name: "D", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
        ]
    },
];


function renderQuestion() {
    questionArea.innerHTML = "";
    endScreen.classList.add("hidden");
    startScreen.classList.add("hidden");

    if (currentQuestion >= questions.length) {
        showEndScreen();
        return;
    }

    const q = questions[currentQuestion];
    const title = document.createElement('h2');
    title.textContent = q.text;
    questionArea.appendChild(title);

    q.options.forEach(option => {
        const div = document.createElement('div');
        div.className = "option";

        div.innerHTML = `
      <img src="${option.img}" alt="${option.name}">
      <div>
        <strong>${option.name}</strong><br>
      </div>
    `;

        div.addEventListener('click', () => selectOption(option));
        questionArea.appendChild(div);
    });
}

function selectOption(option) {
    if(option.true){
        points++;
    }
    lastSelectedOption = option;
    showingExplanation = true;
    renderExplanation();
}

function renderExplanation() {
    questionArea.innerHTML = "";

    const q = questions[currentQuestion];
    const correctOption = q.options.find(opt => opt.true);

    const div = document.createElement('div');
    div.className = "explanation";

    const resultText = lastSelectedOption.true
        ? "<mark style='background-color: #32CD32;'>Korrekt! Godt klaret.</mark>"
        : `<mark style='background-color: red;'>Forkert.</mark> Det rigtige svar er <strong>${correctOption.name}</strong>.`;

    const lastQuestion = currentQuestion === questions.length - 1;
    const nextButtonText = lastQuestion ? "Se resultat" : "Næste spørgsmål";
    div.innerHTML = `
      <p>${resultText}</p>
      <p>${q.explanation || ""}</p>
      <button id="next-btn">${nextButtonText}</button>
    `;

    questionArea.appendChild(div);

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
    if(points === questions.length){
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
