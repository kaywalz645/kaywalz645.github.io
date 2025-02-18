function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", function () {
    const originalText = "This is an exmple of a senence with errrs."; // Contains intentional typos
    const correctedText = "This is an example of a sentence with errors."; // Corrected version
    const mistakes = [
        { wrong: "exmple", correct: "example", position: 11 },
        { wrong: "senence", correct: "sentence", position: 24 },
        { wrong: "errrs", correct: "errors", position: 37 }
    ];

    const speed = 100; // Normal typing speed (ms)
    const backspaceSpeed = 50; // Faster backspace speed
    const pauseBeforeBackspace = 500; // Pause before correcting mistake
    let index = 0;
    let currentMistake = 0;
    let typingText = document.getElementById("typing-text");

    function type() {
        if (index < originalText.length) {
            typingText.innerHTML += originalText.charAt(index);
            index++;

            // Check if we hit a mistake position
            if (currentMistake < mistakes.length && index === mistakes[currentMistake].position + mistakes[currentMistake].wrong.length) {
                setTimeout(erase, pauseBeforeBackspace); // Pause before correcting
            } else {
                setTimeout(type, speed);
            }
        }
    }

    function erase() {
        let mistake = mistakes[currentMistake];
        if (index > mistake.position) {
            typingText.innerHTML = typingText.innerHTML.slice(0, -1);
            index--;
            setTimeout(erase, backspaceSpeed);
        } else {
            setTimeout(retype, 300);
        }
    }

    function retype() {
        let mistake = mistakes[currentMistake];
        let correct = mistake.correct;
        let correctIndex = 0;

        function typeCorrection() {
            if (correctIndex < correct.length) {
                typingText.innerHTML += correct.charAt(correctIndex);
                correctIndex++;
                setTimeout(typeCorrection, speed);
            } else {
                currentMistake++;
                type(); // Resume typing the sentence
            }
        }

        typeCorrection();
    }

    type(); // Start the typing effect
});
