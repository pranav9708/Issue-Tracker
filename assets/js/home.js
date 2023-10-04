
function redirectToProject(){
    window.location.href="/project/view";
}

function createNewProject(){
    window.location.href="/project/create";
}

function toggleStar(projectId,event){
    event.stopPropagation();
    fetch(`/project/star/${projectId}`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
    }).then((response)=>response.json())
    .then((data)=>{
        if(data.success){
            const starElement=document.getElementById('star-project');
            if(data.starred){
                starElement.innerHTML=``
            }else{

            }
        }else{
            console.error('Error:',data.message);
        }
    }).catch((error)=>{
        console.error('Error:',error);
    })
}

function showTab(tabId, tabLinkId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    const activeTab = document.getElementById(tabId);
    activeTab.style.display = 'block';

    const tabLinks = document.querySelectorAll('.list-group-item');
    tabLinks.forEach(link => {
        link.classList.remove('active');
    });

    const activeTabLink = document.getElementById(tabLinkId);
    activeTabLink.classList.add('active');
}
