function addLabel() {
    const labelInput = document.getElementById('label-input');
    const labelValue = labelInput.value.trim();

    if (labelValue !== '') {
        const labelList = document.getElementById('label-list');

        // Create a new li element for the label item
        const labelItem = document.createElement('li');
        labelItem.className = 'list-group-item';
        labelItem.innerText = labelValue;

        // Create a button to remove the label item
        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger btn-sm float-end label-btn';
        removeButton.innerText = 'X';

        // Add a click event listener to remove the label item
        removeButton.addEventListener('click', function () {
            labelItem.remove();
            labelResult();
        });

        // Append the remove button to the label item
        labelItem.appendChild(removeButton);

        // Append the label item to the label list
        labelList.appendChild(labelItem);

        labelInput.value = '';
        
    }
}

function labelResult() {
    const labelList = document.getElementById('label-list');
    const labelItems = labelList.querySelectorAll('li');

    const labelArray = [];
    labelItems.forEach(function (labelItem) {
        labelArray.push(labelItem.innerText.replace(/\nX$/, ''));
    });

    return labelArray;
}


function createIssue() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const author = document.getElementById('author').value;
    const projectId = document.getElementById('project-id').value;
    const status=document.getElementById('status').value;

    const labels = labelResult();
  
    const requestBody = {
      title: title,
      description: description,
      author: author,
      labels: labels,
      status: status,
      project: projectId
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };
    fetch('/issue/create-issue',requestOptions)
    .then(()=>{
        return window.location.href="/home";
    }).catch((error)=>{
        console.error('Error:',error);
    })
  }
  