const chaptersContainer = document.getElementById('chapters-container');
const versesSection = document.getElementById('verses-section');
const versesList = document.getElementById('verses-list');
const chapterTitle = document.getElementById('chapter-title');
const backBtn = document.getElementById('back-btn');

function fetchChapters() {
  fetch('/api/chapters')
    .then(res => res.json())
    .then(data => {
      data.forEach(ch => {
        const card = document.createElement('div');
        card.className = 'chapter-card';
        card.innerHTML = `
          <h3>📘 Chapter ${ch.chapter_number}: ${ch.name_translated}</h3>
          <p><strong>Sanskrit:</strong> ${ch.name}</p>
          <p>${ch.chapter_summary.replace(/<[^>]+>/g, '').slice(0, 100)}...</p>
          <p><strong>Total Verses:</strong> ${ch.verses_count}</p>
        `;
        card.onclick = () => loadVerses(ch.chapter_number, ch.name_translated);
        chaptersContainer.appendChild(card);
      });
    })
    .catch(() => {
      chaptersContainer.innerHTML = '<p>⚠️ Failed to load chapters</p>';
    });
}

function loadVerses(chNum, chTitle) {
  chaptersContainer.classList.add('hidden');
  versesSection.classList.remove('hidden');
  chapterTitle.innerHTML = `<h2>📖 Chapter ${chNum}: ${chTitle}</h2>`;
  versesList.innerHTML = "Loading verses...";

  fetch(`/api/chapters/${chNum}/verses`)
    .then(res => res.json())
    .then(data => {
      versesList.innerHTML = "";
      data.forEach(v => {
        const vDiv = document.createElement('div');
        vDiv.className = 'verse';
        vDiv.innerHTML = `
          <h4>Verse ${v.verse_number}</h4>
          <p><strong>Sanskrit:</strong> ${v.text}</p>
          <p><strong>Hindi:</strong> ${v.translations[1]?.description || "N/A"}</p>
          <p><strong>English:</strong> ${v.translations[0]?.description || "N/A"}</p>
        `;
        versesList.appendChild(vDiv);
      });
    })
    .catch(() => {
      versesList.innerHTML = '<p>⚠️ Failed to load verses</p>';
    });
}

backBtn.onclick = () => {
  chaptersContainer.classList.remove('hidden');
  versesSection.classList.add('hidden');
};

fetchChapters();
