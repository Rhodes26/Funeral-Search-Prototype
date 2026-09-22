
 document.addEventListener('DOMContentLoaded', function () {
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        searchForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const query = searchInput.value.trim();
        if (query) {
            const redirectUrl = `funeralhomesearch.html?q=${encodeURIComponent(query)}`;
            console.log('Redirecting to:', redirectUrl);
            window.location.href = redirectUrl;
        } else {
            console.warn("Search input is empty.");
        }
    });
});

  // NOTE: destruct array's when finsh. 
  //Fuse  used to display more results then one
  //NOTE: Due to low number of funeral homes  it still shows only 1 funeral home when fully typed the name but if i used one letter like the letter L and press search then it shows more then one fuenral home.
  //Since dealing with small data, change into a filter system for search or directory instead of fuse.
    //let fuse;
    let funeralData = [];
    const input = document.getElementById('searchInput');
    const autocompleteBox = document.getElementById('autocomplete'); //Note: autcomplete call.


    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', function (e) {
        e.preventDefault();
        const query = document.getElementById('searchInput').value.trim();
        if (query) {
            window.location.href = `funeralhomesearch.html?q=${encodeURIComponent(query)}`;
        }
    });
    const searchForm = document.getElementById('searchForm');
    const resultsContainer = document.getElementById('resultsContainer');
    //api call for funeral homes onload
    window.onload = async () => {
       
    };
    // Autocomplete functionality 
input.addEventListener('input', function ()  {
    const query = input.value.trim();
    if (!query) {
        autocompleteBox.style.display = 'none';
        return;
    }

    // Filter funeralData based on query
    const results = funeralData.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    
     autocompleteBox.innerHTML = results.map(result => {
            const item = result.item;
            return `
                <div class="suggestion-item" onclick="selectSuggestion('${item.name.replace(/'/g, "\\'")}')">
                    <strong>${item.name}</strong><br><small>${item.location || 'Unknown location'}</small>
                </div>
            `;
        }).join('');
        autocompleteBox.style.display = 'block';
    });

    // Fill input when clicked
    function selectSuggestion(value) {
        input.value = value;
        autocompleteBox.style.display = 'none';
    }

    // Hide if clicking outside
    document.addEventListener('click', (e) => {
        if (!document.querySelector('.search-input-container').contains(e.target)) {
            autocompleteBox.style.display = 'none';
        }
    });
    

