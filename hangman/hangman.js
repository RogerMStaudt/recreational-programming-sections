const regionWord = document.getElementById('region-word');
const hiddenWord = document.getElementById('hidden-word');

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
    hiddenWord.value = word;

    regionWord.replaceChildren();

    console.log(word)

    for (let i = 0; i < word.length; i++) {
        const letter = document.createElement("p");
        letter.setAttribute("id", "letter-" + i);

        regionWord.appendChild(letter);
    }
}

function keyClick(key, element) {
    const rightWord = hiddenWord.value;
    
    if (rightWord.includes(key)) {
        for (let i = 0; i < rightWord.length; i++) {
            if (key == rightWord[i]) {
                const correctLetter = document.getElementById("letter-" + i);
                correctLetter.innerText = key;

                element.disabled = true;
            }
        }
    }
}