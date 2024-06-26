//this would be the object shape for storing the questions  
 //you can change the questions to your own taste or even add more questions..
const questions = [
    {
        question: "(Introdução à biologia) Qual destas opções a Biologia NÃO estuda? ",
        optionA: "Evolução",
        optionB: "Os seres vivos",
        optionC: "Genética",
        optionD: "Cosmologia",
        correctOption: "optionD"
    },

    {
        question: "(Teorias de Surgimento da Vida) Qual cientista é conhecido por seus experimentos que apoiaram a teoria da sopa primordial sobre a origem da vida?",
        optionA: "Louis Pasteur",
        optionB: "Stanley Miller",
        optionC: "Charles Darwin",
        optionD: "Isaac Newton",
        correctOption: "optionB"
    },

    {
        question: "(Relações entre os Seres Vivos) Qual é a relação ecológica que ocorre entre as abelhas e as flores que elas polinizam?",
        optionA: "Competição",
        optionB: "Predação",
        optionC: "Comensalismo",
        optionD: "Mutualismo",
        correctOption: "optionD"
    },

    {
        question: "(Organelas Citoplasmáticas) Qual organela é responsável pela produção de energia na célula e por que ela é chamada de a usina de energia da célula?",
        optionA: "Ribossomo, porque sintetiza proteínas",
        optionB: "Lisossomo, porque digere partículas alimentares",
        optionC: "Mitocôndria, porque converte energia em ATP",
        optionD: "Complexo de Golgi, porque processa e distribui proteínas",
        correctOption: "optionC"
    },

    {
        question: "(Transporte Através da Membrana) Como é chamado o processo pelo qual as moléculas de água atravessam a membrana plasmática?",
        optionA: "Difusão",
        optionB: "Osmose",
        optionC: "Endocitose",
        optionD: "Exocitose",
        correctOption: "optionB"
    },

    {
        question: "(Composição Química da Célula) Qual é o principal componente químico das membranas celulares e por que ele é crucial para a função da membrana?",
        optionA: "Fosfolipídios, porque formam uma barreira semipermeável.",
        optionB: "Carboidratos, porque fornecem energia.",
        optionC: "Proteínas, porque catalisam reações.",
        optionD: "Ácidos nucleicos, porque armazenam informações genéticas.",
        correctOption: "optionA"
    }
]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 5) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 5) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 2) {
        remark = "Bem Ruim, Continue praticando."
        remarkColor = "red"
    }
    else if (playerScore >= 3 && playerScore < 4) {
        remark = "Mediano, Você consegue fazer melhor."
        remarkColor = "orange"
    }
    else if (playerScore >= 5) {
        remark = "Excelente, Continue estudando e se esforçando."
        remarkColor = "lightgreen"
    }
    const playerGrade = (playerScore / 6) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}