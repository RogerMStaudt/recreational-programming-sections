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
    word = word.toUpperCase()
    hiddenWord.value = word;
    console.log('word = ' + word)

    regionWord.replaceChildren();

    for (let i = 0; i < word.length; i++) {
        const letter = document.createElement("p");
        letter.setAttribute("id", "letter-" + i);

        regionWord.appendChild(letter);
    }
}

function keyClick(key) {
    const myword = hiddenWord.value;
    //myword.includes(key)
    if (myword.indexOf(key) !== -1) {
        for (let i = 0; i < hiddenWord.length; i++) {
            if (key == hiddenWord[i]) {
                const correctLetter = document.getElementById("letter-" + i);
                correctLetter.innerText = key;
            }
        }
    }
}