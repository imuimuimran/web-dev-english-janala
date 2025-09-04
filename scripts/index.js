const loadLessions = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((lessonData) => displayLessons(lessonData.data));
};


const removeActive = () => {
    const lessonButton = document.querySelectorAll(".btn-lesson")
    // console.log(lessonButton);
    lessonButton.forEach((btn) => btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((levelData) => {
        removeActive();
        const btnClick = document.getElementById(`btn-lesson-${id}`);
        
        btnClick.classList.add("active");
        displayLevelWord(levelData.data)
    });
};

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const wordDetail = await res.json();
    displayWordDetails(wordDetail.data);
    document.getElementById("word_modal").showModal();
}

const displayWordDetails = (word) => {
    console.log(word);
    const wordDetailContainer = document.getElementById("word-detail-container");
    wordDetailContainer.innerHTML = `
            <div>
                <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone"></i>:${word.pronunciation})</h2>
            </div>
            <div>
                <h2 class="font-bold">Meaning</h2>
                <p>${word.meaning}</p>
            </div>
            <div>
                <h2 class="font-bold">Example</h2>
                <p>${word.sentence}</p>
            </div>
            <div>
                <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
                <span class="btn">syn 1</span>
                <span class="btn">syn 1</span>
                <span class="btn">syn 1</span>
            </div>
    `;
}

const displayLevelWord = (words) => {
    // 1. get the container and empty it
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if(words.length === 0){
        wordContainer.innerHTML = `
        <div class=".font-bangla text-center col-span-full rounded-xl py-10 space-y-6">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-lg font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-semibold text-2xl md:text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
        `
    }

    // 2. get into every lessons
    words.forEach(word => {
        //     3. create Element
        console.log(word);
        const wordCard = document.createElement("div");
        wordCard.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning / Pronounciation</p>

            <div class="text-2xl font-medium font-bangla">
                "${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"
            </div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></i></button>
            </div>
        </div>
        `
        //     4. append into container
        wordContainer.append(wordCard);
    });
}

const displayLessons = (lessons) => {
    // 1. get the container and empty it
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 2. get into every lessons
    for(let lesson of lessons){

        //     3. create Element
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="btn-lesson-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary btn-lesson"> 
            <i class="fa-solid fa-book-open"></i></i>Lesson - ${lesson.level_no}
            </button>
        `

        //     4. append into container
        levelContainer.append(btnDiv);
    }


};

loadLessions();