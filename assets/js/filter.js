// Ensure the DOM is fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const filterModal = new bootstrap.Modal(document.getElementById('filterModal'));
    const openFilterButton = document.getElementById('openFilterModal');
    // Access the projectId from the data attribute
    const projectId = openFilterButton.dataset.projectId;



    if (openFilterButton) {
        openFilterButton.addEventListener('click', () => {
            filterModal.show();
        });
    }

    const filterForm = document.getElementById('filterForm');
    const newLabelInput = document.getElementById('newLabel');
    const addLabelButton = document.getElementById('addLabel');
    const selectedLabelsDiv = document.getElementById('selectedLabels');
    let selectedLabels = [];

    const filterButton = document.getElementById('filterButton');
    if (filterButton) {
        filterButton.addEventListener('click', async () => {
            // Extracting form data
            const formData = new FormData(filterForm);
            const authorName = formData.get('authorName');
            const status = formData.get('status');
            
            // Creating an array from the selected labels
            const labels = [...selectedLabels];

            const filterData = {
                authorName,
                status,
                labels,
            };

            filterModal.hide();

            try {
                const response = await fetch(`/issue/filter-issue/${projectId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(filterData),
                });

                if (response.ok) {
                    const data = await response.json();
                    window.location.href = `/project/project-details/${projectId}?issues=${JSON.stringify(data)}`;
                } else {
                    throw new Error('Filtering failed');
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle error scenarios
            }
        });
    }

    if (addLabelButton) {
        addLabelButton.addEventListener('click', () => {
            const newLabel = newLabelInput.value.trim();
            if (newLabel) {
                selectedLabels.push(newLabel);
                newLabelInput.value = '';
                displaySelectedLabels();
            }
        });
    }

    function displaySelectedLabels() {
        selectedLabelsDiv.innerHTML = selectedLabels
            .map((label, index) => `
                <span class="selected-label">${label}
                    <button class="remove-label btn btn-danger" data-index="${index}">Remove</button>
                </span>
            `)
            .join('');

        // Attach event listeners for remove buttons
        const removeButtons = document.querySelectorAll('.remove-label');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                selectedLabels.splice(index, 1);
                displaySelectedLabels();
            });
        });
    }
});
