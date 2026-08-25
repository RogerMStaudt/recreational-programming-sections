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
    const regionWord = document.getElementById('region-word');

    regionWord.replaceChildren();

    for (let i = 0; i < word.length; i++) {
        const letter = document.createElement("p");
        letter.innerText = word[i];

        regionWord.appendChild(letter);
    }
}