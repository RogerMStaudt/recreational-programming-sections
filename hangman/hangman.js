const regionWord      = document.getElementById('region-word');
const answer          = document.getElementById('answer');
const keyboardButtons = document.querySelectorAll(".key");

async function generate() {
    try {
        var url = "https://random-word-api.herokuapp.com/word";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        
        var word = result[0];

        refresh(word)
    } catch (error) {
        console.error(error.message);
    }
}

function refresh(word) {
    word = word.toUpperCase();
    answer.value = word;

    enableKeyboard();

    regionWord.replaceChildren();

    console.log(word)

    for (let i = 0; i < word.length; i++) {
        const letter = document.createElement("p");
        letter.setAttribute("id", "letter-" + i);

        regionWord.appendChild(letter);
    }
}

function keyClick(element) {
    const key = element.innerText;
    
    if (answer.value.includes(key)) {
        for (let i = 0; i < answer.value.length; i++) {
            if (key == answer.value[i]) {
                const correctLetter = document.getElementById("letter-" + i);
                correctLetter.innerText = key;

                element.disabled = true;
            }
        }
    }
}

document.addEventListener("keypress", (event) => {
    let keyTyped = event.key.toUpperCase();

    if (answer.value.includes(keyTyped)) {
        for (let i = 0; i < answer.value.length; i++) {
            if (keyTyped == answer.value[i]) {
                const correctLetter = document.getElementById("letter-" + i);
                correctLetter.innerText = keyTyped;

                keyboardButtons.forEach(button => {
                    if (keyTyped == button.innerText) {
                        button.disabled = true;
                    }
                });
            }
        }
    }
})

function enableKeyboard() {
    keyboardButtons.forEach(button => {
        button.disabled = false;
    });
}