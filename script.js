let terms = [];

fetch('terms.json')
  .then(res => res.json())
  .then(data => {
    terms = data;
    const searchInput = document.getElementById('search');
    const resultsDiv = document.getElementById('results');

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      resultsDiv.innerHTML = terms
        .filter(item => item.term.toLowerCase().includes(query))
        .map(item => `
          <div class="result-item">
            <h3>${item.term}</h3>
            <p>${item.short}</p>
            <div class="long">
              <p>${item.long}</p>
              <pre>${item.example}</pre>
            </div>
          </div>
        `).join('');

      // Voeg klik-event toe voor "lees meer"
      document.querySelectorAll('.result-item h3').forEach((h3, index) => {
        h3.addEventListener('click', () => {
          const longDiv = document.querySelectorAll('.long')[index];
          longDiv.style.display = longDiv.style.display === 'block' ? 'none' : 'block';
        });
      });
    });
  });
