const questions = [
    {
        question: "which programming language is not oops language?",
        answers:[
            {text: "C++", correct: false},
            {text: "C", correct: true},
            {text: "JAVA", correct: false},
            {text: "Python", correct: false}
        ]
    },
    {
        question: "which is not belongs to oops concept?",
        answers:[
            {text: "Function", correct: true},
            {text: "Abstraction", correct: false},
            {text: "Inheritence", correct: false},
            {text: "Polymorphism", correct: false}
        ]
    },
    {
        question: "Data and method binds together in ",
        answers:[
            {text: "Abstraction", correct: false},
            {text: "Inheritence", correct: false},
            {text: "Polymorphism", correct: false},
            {text: "Encapsulation", correct: true}
        ]
    },
    {
        question: "Identify the incorrect constructor type?",
        answers:[
            {text: "Default", correct: false},
            {text: "Friend", correct: true},
            {text: "Parameterized", correct: false},
            {text: "Copy", correct: false}
        ]
    },
    {
        question: "which is not a member of the class?",
        answers:[
            {text: "Friend", correct: false},
            {text: "Static", correct: false},
            {text: "Virtual", correct: true},
            {text: "Const", correct: false}
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;


function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();