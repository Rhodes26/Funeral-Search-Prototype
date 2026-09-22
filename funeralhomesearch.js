//JAVASCRIPT
    // deconstruct later
    
    let funeralData = [];
    const input = document.getElementById('searchInput');
    const autocompleteBox = document.getElementById('autocomplete');

    // Search form handler  section 
    document.addEventListener('DOMContentLoaded', function () {
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');

        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `funeralhomesearch.html?q=${encodeURIComponent(query)}`;
            }
        });

        // Autocomplete functionality section not listneting? need to find error. 
        input.addEventListener('input', function () {
            const query = input.value.trim();
            if (!query) {
                autocompleteBox.style.display = 'none';
                return;
            }
             //Misspelling error
            const results = funeralData.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);

            autocompleteBox.innerHTML = results.map(result => {
                const item = result;
                return `
                    <div class="suggestion-item" onclick="selectSuggestion('${item.name.replace(/'/g, "\\'")}')">
                        <strong>${item.name}</strong><br><small>${item.location || 'Unknown location'}</small>
                    </div>
                `;
            }).join('');
            autocompleteBox.style.display = 'block';
        });
    });

    // Selcting the sugggestion inputs
    function selectSuggestion(value) {
        input.value = value;
        autocompleteBox.style.display = 'none';
    }

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!document.querySelector('.search-input-container').contains(e.target)) {
            autocompleteBox.style.display = 'none';
        }
    });
   //Notfication box  section 
    document.addEventListener('DOMContentLoaded', function(){
        const popup = document.getElementById('notificationPopup'); 
        const closeButton = document.getElementById('close-popup'); //fix close button :( 

        // timeout
        setTimeout(function(){
            popup.classList.remove('popup-hidden'); 
        }, 3000);
        //close button
        closeButton.addEventListener('click', function(event) {
            event.preventDefault(); //isolate eventlister 
            event.stopPropagation();   
            popup.classList.add('popup-hidden');
            console.log("Notification closed");
        });
        //click outside to close popup
        popup.addEventListener('click', function(event){
            if(event.target === popup) {
                popup.classList.add('popup-hidden'); 
            }
        });
    });


//The Search Functionality for actual search/ claim and unlcaimed profiles
//have to deconstruct and refactor, if demo is sucessful 
    window.onload = async function() {
        try {
            // Initialize funeral data for autocomplete
            const response = await fetch('/api/funeralHomes');
            funeralData = await response.json();
            
            
            // Handle search results display and errors
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('q');

            if (query) {
                const searchResponse = await fetch(`/api/funeralHomes?q=${encodeURIComponent(query)}`);
                const data = await searchResponse.json();
                const container = document.getElementById('resultsContainer');

                if (!container) {
                    console.error('Container not found!');
                    return;
                }

                if (data.length === 0) {
                    container.innerHTML = '<p>No results found.</p>';
                    return;
                }
                //search results display
                data.forEach(home => {
                    const div = document.createElement('div');
                    div.className = 'result-item';
                    div.dataset.id = home.id;
                    
                    const html = `
                        <div class="profile-header">
                            <h3>${home.name}</h3>
                        </div>
                        <div class="profile-details">
                            <p><strong>Location:</strong> ${home.location}</p>
                            <p><strong>Phone:</strong> ${home.phone || 'N/A'}</p>
                            <p><strong>Website:</strong> 
                                <a href="${home.website}" target="_blank" class="website-link">${home.website}</a>
                            </p>
                        </div>
                    `;
                    
                    div.innerHTML = html;
                    container.appendChild(div);  

                  
                });
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('resultsContainer').innerHTML = '<p>Error loading results.</p>';
        }
    };




