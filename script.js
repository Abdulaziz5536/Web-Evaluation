const quizData = [
    {
        question: "Who is often referred to as the 'father of modern computer science'?",
        options: ["Alan Turing", "Bill Gates", "Steve Jobs", "Tim Berners-Lee"],
        answerIndex: 0 // Alan Turing
    },
    {
        question: "What does 'IDE' stand for in the context of software development?",
        options: ["Integrated Development Environment", "Interactive Development Engine", "Intelligent Development Environment", "Interface Development Engine"],
        answerIndex: 0 // Integrated Development Environment
    },
    {
        question: "Which programming language was created by Guido van Rossum and is known for its readability and simplicity?",
        options: ["Java", "C++", "Python", "JavaScript"],
        answerIndex: 2 // Python
    },
    
   
    {
        question: "Which version control system was created by Linus Torvalds and is widely used for managing source code?",
        options: ["Subversion (SVN)", "Git", "Mercurial", "Perforce"],
        answerIndex: 1 // Git
    },
    {
        question: "In software development, what does the acronym 'API' stand for?",
        options: ["Advanced Programming Interface", "Application Programming Interface", "Automated Programming Interface", "Accessible Programming Interface"],
        answerIndex: 1 // Application Programming Interface
    },
    {
        question: "Which software development methodology emphasizes iterative development, collaboration, and customer feedback?",
        options: ["Waterfall", "Agile", "Lean", "DevOps"],
        answerIndex: 1 // Agile
    },
    {
        question: "What is the term used to describe the process of finding and fixing errors or defects in a software program?",
        options: ["Debugging", "Testing", "Optimization", "Validation"],
        answerIndex: 0 // Debugging
    },
    {
        question: "Which popular JavaScript framework is commonly used for building user interfaces for web applications?",
        options: ["Angular", "React", "Vue.js", "Ember.js"],
        answerIndex: 1 // React
    },
    {
        question: "Which programming language, created by James Gosling at Sun Microsystems, is commonly used for building mobile applications and enterprise software?",
        options: ["C#", "Swift", "Java", "Kotlin"],
        answerIndex: 2 // Java
    },
    {
        question: "Which popular version control hosting platform is commonly used for hosting open-source projects?",
        options: ["Bitbucket", "GitLab", "SourceForge", "GitHub"],
        answerIndex: 3 // GitHub
    },
   
    // Add more questions here
];

const questionContainer = document.getElementById('question-container');
const nextPageButton = document.getElementById('next-page-btn');

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let isSummaryDisplayed = false;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    const questionElement = document.createElement('div');
    questionElement.classList.add('question-container');
    questionElement.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        <ul>
            ${currentQuestion.options.map((option, index) => `<li class="option" onclick="checkAnswer(${index})">${option}</li>`).join('')}
        </ul>
    `;
    questionContainer.innerHTML = '';
    questionContainer.appendChild(questionElement);
}

function checkAnswer(selectedOptionIndex) {
    if (isSummaryDisplayed) return; // Prevents checking answer after summary is displayed
    
    const currentQuestion = quizData[currentQuestionIndex];
    const correctOptionIndex = currentQuestion.answerIndex;

    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        if (index === selectedOptionIndex) {
            if (index === correctOptionIndex) {
                option.classList.add('correct');
                correctAnswers++;
            } else {
                option.classList.add('incorrect');
                incorrectAnswers++;
            }
        } else if (index === correctOptionIndex) {
            option.classList.add('correct');
        }
    });

   
    
    if (!isSummaryDisplayed) {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showSummary();
        }
    }
}

function showSummary() {
    isSummaryDisplayed = true;
    const totalQuestions = quizData.length;
    const totalAttempts = correctAnswers + incorrectAnswers;
    const percentage = (correctAnswers / totalQuestions) * 100;

    const summaryElement = document.createElement('div');
    summaryElement.classList.add('summary-container');
    summaryElement.innerHTML = `
        <h2>Quiz Summary</h2>
        <p>Number of questions: ${totalQuestions}</p>
        <p>Correct answers: ${correctAnswers}</p>
        <p>Incorrect answers: ${incorrectAnswers}</p>
        <p>Percentage: ${percentage.toFixed(2)}%</p>
        <button onclick="checkAnswers()">Check Answers</button>
        <ul id="answers-list"></ul>
    `;
    questionContainer.innerHTML = '';
    questionContainer.appendChild(summaryElement);

    
}

function checkAnswers() {
   
  // Display all questions and answers
    const answersList = document.getElementById('answers-list');
    quizData.forEach((question, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${index + 1}. ${question.question}</strong>
            <br>
            <em>Correct Answer:</em> ${question.options[question.answerIndex]}
            
        `;
        answersList.appendChild(listItem);
    });

    
}

// Load the first question when the page loads
loadQuestion();
