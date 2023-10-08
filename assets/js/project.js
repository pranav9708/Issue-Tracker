function addFilter() {
    const filterInput = document.getElementById('filter-input');
    const filterValue = filterInput.value.trim();

    if (filterValue !== '') {
        const filterList = document.getElementById('filter-list');

        // Create a new li element for the filter item
        const filterItem = document.createElement('li');
        filterItem.className = 'list-group-item';
        filterItem.innerText = filterValue;

        // Create a button to remove the filter item
        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger btn-sm float-end filter-btn';
        removeButton.innerText = 'X';

        // Add a click event listener to remove the filter item
        removeButton.addEventListener('click', function () {
            filterItem.remove();
            filterResult();
        });

        // Append the remove button to the filter item
        filterItem.appendChild(removeButton);

        // Append the filter item to the filter list
        filterList.appendChild(filterItem);

        filterInput.value = '';

        filterResult();
    }
}



function filterResult() {
    const filterList = document.getElementById('filter-list');
    const filterItems = filterList.querySelectorAll('li');

    const filterArray = [];
    filterItems.forEach(function (filterItem) {
        filterArray.push(filterItem.innerText.replace(/\nX$/, ''));
    });

    console.log(filterArray);
}


function updateIssueStatus(issueId){

    const status=document.getElementById('issue-status').value;
    const requestBody={
        status:status
    }

    fetch(`/issue/updateStatus/${issueId}`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(requestBody)
    }).then((response)=>response.json())
    .then((ProjectId)=>{
        return window.location.href=`/project/project-details/${ProjectId}`;
    })


}

function deleteIssue(issueId){
    fetch(`/issue/delete-issue/${issueId}`,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
        }
    }).then((response)=>response.json())
    .then((ProjectId)=>{
        return window.location.href=`/project/project-details/${ProjectId}`;
    })
}

function deleteProject(projectId){
    fetch(`/project/delete-project/${projectId}`,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
        }
    }).then(()=>{
        return window.location.href=`/home`;
    })
}

