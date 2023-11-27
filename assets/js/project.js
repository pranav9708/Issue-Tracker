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


function addComment(issueId){

    const commentText=document.getElementById('issue-comment').value;

    const requestBody={
        commentText:commentText
    };

    fetch(`/issue/comment/${issueId}`,{
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
