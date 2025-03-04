function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", function () {
    const originalText = "I'm a creative designer and seelopr who loves turning ideas into betuifully functional digittal experiences."; // Contains intentional typos
    const correctedText = "I’m a creative designer and developer who loves turning ideas into beautifully functional digital experiences"; // Corrected version
    const mistakes = [
        { wrong: "seelopr", correct: "developer", position: 28 },
        { wrong: "betuifully", correct: "beautifully", position: 65 },
        { wrong: "digittal", correct: "digital", position: 87}
    ];

    const speed = 30; // Normal typing speed (ms)
    const backspaceSpeed = 20; // Faster backspace speed
    const pauseBeforeBackspace = 200; // Pause before correcting mistake
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
        let mistake = mistakes[currentMistake]; //index of current mistake
        let correct = mistake.correct; //
        let correctIndex = 0;

        function typeCorrection() {
            if (correctIndex < correct.length) {
                typingText.innerHTML += correct.charAt(correctIndex);
                correctIndex++;
                setTimeout(typeCorrection, speed);
            } else {
                index+=mistake.wrong.length;
                currentMistake++;
                type(); // Resume typing the sentence
            }
        }

        typeCorrection();
    }

    type(); // Start the typing effect
});

document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission
  
    // Gather form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Create a data object to send to the backend
    const formData = {
      name: name,
      email: email,
      message: message
    };
  
    try {
      // Send the form data to the backend (your server on Render or wherever it's hosted)
      const response = await fetch('https://contact-form-backend-g87x.onrender.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        alert('Message sent successfully!');
        // Optionally, clear the form after submission
        document.getElementById('contact-form').reset();
      } else {
        alert('There was an issue sending your message-1.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an issue sending your message-2.');
    }
  });
  