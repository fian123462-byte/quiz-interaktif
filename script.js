// ========================================
// DATA SOAL REKAYASA PERANGKAT LUNAK DASAR
// ========================================

const questions = [
    {
        question: "Apa kepanjangan dari RPL?",
        options: [
            "Rekayasa Perangkat Lunak",
            "Rancangan Program Lanjutan",
            "Rekayasa Program Komputer",
            "Rancangan Perangkat Digital"
        ],
        answer: 0,
        icon: "💻"
    },
    {
        question: "Apa fungsi utama HTML dalam pembuatan website?",
        options: [
            "Mengatur database",
            "Membuat struktur halaman web",
            "Mengatur keamanan komputer",
            "Mengedit gambar"
        ],
        answer: 1,
        icon: "🌐"
    },
    {
        question: "Bahasa yang digunakan untuk mengatur tampilan website adalah?",
        options: [
            "PHP",
            "Python",
            "CSS",
            "SQL"
        ],
        answer: 2,
        icon: "🎨"
    },
    {
        question: "Apa fungsi JavaScript dalam website?",
        options: [
            "Membuat website menjadi interaktif",
            "Mengganti sistem operasi",
            "Memperbaiki perangkat keras",
            "Membuat kabel jaringan"
        ],
        answer: 0,
        icon: "⚙️"
    },
    {
        question: "Apa yang dimaksud dengan algoritma?",
        options: [
            "Bahasa untuk mendesain gambar",
            "Urutan langkah untuk menyelesaikan masalah",
            "Perangkat untuk menyimpan data",
            "Aplikasi untuk mengetik"
        ],
        answer: 1,
        icon: "📋"
    },
    {
        question: "Aplikasi apa yang umum digunakan untuk menulis kode program?",
        options: [
            "Microsoft Word",
            "Microsoft Excel",
            "Visual Studio Code",
            "Microsoft PowerPoint"
        ],
        answer: 2,
        icon: "⌨️"
    },
    {
        question: "Apa fungsi database dalam sebuah aplikasi?",
        options: [
            "Mengatur warna tampilan",
            "Menyimpan dan mengelola data",
            "Mengedit video",
            "Mempercepat koneksi listrik"
        ],
        answer: 1,
        icon: "🗄️"
    },
    {
        question: "Apa kepanjangan dari PHP?",
        options: [
            "Personal Home Page",
            "Programming Hyper Processor",
            "Personal Hardware Program",
            "Program Hosting Platform"
        ],
        answer: 0,
        icon: "🐘"
    },
    {
        question: "Apa kegunaan Git dalam pengembangan perangkat lunak?",
        options: [
            "Membuat desain poster",
            "Mengelola versi kode program",
            "Menghapus database secara otomatis",
            "Mengatur kecerahan layar"
        ],
        answer: 1,
        icon: "🔧"
    },
    {
        question: "Apa tujuan utama pengujian perangkat lunak (software testing)?",
        options: [
            "Mengganti semua kode program",
            "Memperbesar ukuran aplikasi",
            "Menemukan kesalahan dan memeriksa fungsi aplikasi",
            "Mengubah bahasa komputer"
        ],
        answer: 2,
        icon: "🧪"
    }
];


// ========================================
// MENGAMBIL ELEMEN HTML
// ========================================

const scoreElement = document.getElementById("score");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const questionList = document.getElementById("questionList");

const questionLabel = document.getElementById("questionLabel");
const questionElement = document.getElementById("question");
const questionDescription = document.getElementById("questionDescription");
const illustration = document.getElementById("illustration");

const answerContainer = document.getElementById("answerContainer");
const feedback = document.getElementById("feedback");

const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");

const timerElement = document.getElementById("timer");
const stepFill = document.getElementById("stepFill");

const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");


// ========================================
// VARIABEL QUIZ
// ========================================

let currentQuestion = 0;
let userAnswers = Array(questions.length).fill(null);

let timeLeft = 300;
let timerInterval = null;
let quizFinished = false;


// ========================================
// MEMBUAT DAFTAR NOMOR SOAL
// ========================================

function createQuestionList() {
    questionList.innerHTML = "";

    questions.forEach((question, index) => {
        const button = document.createElement("button");

        button.className = "question-number";
        button.textContent = index + 1;

        const dot = document.createElement("span");
        dot.className = "status-dot";

        button.appendChild(dot);

        button.addEventListener("click", () => {
            if (quizFinished) return;

            currentQuestion = index;
            renderQuestion();
        });

        questionList.appendChild(button);
    });
}


// ========================================
// MENGHITUNG SKOR
// ========================================

function calculateScore() {
    let correct = 0;

    userAnswers.forEach((answer, index) => {
        if (answer === questions[index].answer) {
            correct++;
        }
    });

    return correct * 100;
}


// ========================================
// MENAMPILKAN PERTANYAAN
// ========================================

function renderQuestion() {
    const question = questions[currentQuestion];
    const selectedAnswer = userAnswers[currentQuestion];

    questionLabel.textContent =
        `Soal ${currentQuestion + 1} dari ${questions.length}`;

    questionElement.textContent = question.question;

    questionDescription.textContent =
        "Pilih satu jawaban yang menurutmu benar.";

    illustration.textContent = question.icon;

    answerContainer.innerHTML = "";
    feedback.textContent = "";
    feedback.className = "feedback";

    question.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "answer-option";

        const letter = document.createElement("span");
        letter.className = "answer-letter";
        letter.textContent = String.fromCharCode(65 + index);

        const text = document.createElement("span");
        text.textContent = option;

        button.appendChild(letter);
        button.appendChild(text);

        if (selectedAnswer !== null) {
            button.disabled = true;

            if (index === question.answer) {
                button.classList.add("correct");
            }

            if (
                index === selectedAnswer &&
                selectedAnswer !== question.answer
            ) {
                button.classList.add("wrong");
            }
        }

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        answerContainer.appendChild(button);
    });

    if (selectedAnswer !== null) {
        if (selectedAnswer === question.answer) {
            feedback.textContent = "Benar! Jawaban kamu tepat.";
            feedback.classList.add("success");
        } else {
            feedback.textContent =
                `Belum tepat. Jawaban benar: ${question.options[question.answer]}`;

            feedback.classList.add("error");
        }
    }

    previousButton.disabled = currentQuestion === 0;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Lihat Hasil"
            : "Selanjutnya";

    updateProgress();
}


// ========================================
// MEMILIH JAWABAN
// ========================================

function selectAnswer(index) {
    if (quizFinished || userAnswers[currentQuestion] !== null) {
        return;
    }

    userAnswers[currentQuestion] = index;

    renderQuestion();
}


// ========================================
// MEMPERBARUI PROGRESS DAN SKOR
// ========================================

function updateProgress() {
    const answeredCount = userAnswers.filter(
        answer => answer !== null
    ).length;

    const progress =
        (answeredCount / questions.length) * 100;

    progressText.textContent =
        `${answeredCount} / ${questions.length}`;

    progressFill.style.width = `${progress}%`;

    stepFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    scoreElement.textContent = calculateScore();

    const numberButtons =
        questionList.querySelectorAll(".question-number");

    numberButtons.forEach((button, index) => {
        button.classList.toggle(
            "active",
            index === currentQuestion
        );

        button.classList.toggle(
            "answered",
            userAnswers[index] !== null
        );

        const dot = button.querySelector(".status-dot");

        if (userAnswers[index] !== null) {
            dot.textContent = "✓";
            dot.style.color = "#ffffff";
            dot.style.display = "flex";
            dot.style.alignItems = "center";
            dot.style.justifyContent = "center";
            dot.style.width = "20px";
            dot.style.height = "20px";
        } else {
            dot.textContent = "";
            dot.style.width = "10px";
            dot.style.height = "10px";
        }
    });
}


// ========================================
// TOMBOL SEBELUMNYA
// ========================================

previousButton.addEventListener("click", () => {
    if (currentQuestion > 0 && !quizFinished) {
        currentQuestion--;
        renderQuestion();
    }
});


// ========================================
// TOMBOL SELANJUTNYA
// ========================================

nextButton.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        finishQuiz();
    }
});


// ========================================
// TIMER HITUNG MUNDUR
// ========================================

function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (quizFinished) {
            clearInterval(timerInterval);
            return;
        }

        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerElement.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft <= 30) {
            timerElement.style.color = "#d94352";
        }

        if (timeLeft <= 0) {
            finishQuiz();
        }
    }, 1000);
}


// ========================================
// MENAMPILKAN HASIL AKHIR
// ========================================

function finishQuiz() {
    if (quizFinished) return;

    quizFinished = true;

    clearInterval(timerInterval);

    const correct = userAnswers.filter(
        (answer, index) => answer === questions[index].answer
    ).length;

    const wrong = questions.length - correct;
    const score = correct * 100;

    quizCard.classList.add("hidden");
    resultCard.classList.remove("hidden");

    document.getElementById("finalScore").textContent = score;
    document.getElementById("correctCount").textContent = correct;
    document.getElementById("wrongCount").textContent = wrong;

    let message = "";

    if (score === 1000) {
        message = "Sempurna! Kamu menguasai semua materi RPL.";
    } else if (score >= 700) {
        message = "Hebat! Pemahaman dasar RPL kamu sudah bagus.";
    } else if (score >= 400) {
        message = "Bagus! Terus tingkatkan kemampuan RPL kamu.";
    } else {
        message = "Terus belajar dan coba kerjakan quiz lagi.";
    }

    document.getElementById("resultMessage").textContent = message;
}


// ========================================
// MENGULANG QUIZ
// ========================================

function restartQuiz() {
    currentQuestion = 0;

    userAnswers = Array(questions.length).fill(null);

    timeLeft = 300;
    quizFinished = false;

    timerElement.style.color = "";
    timerElement.textContent = "05:00";

    quizCard.classList.remove("hidden");
    resultCard.classList.add("hidden");

    createQuestionList();
    renderQuestion();
    startTimer();
}

restartButton.addEventListener("click", restartQuiz);

document.getElementById("playAgainButton").addEventListener(
    "click",
    restartQuiz
);


// ========================================
// MENJALANKAN QUIZ
// ========================================

createQuestionList();
renderQuestion();
startTimer();