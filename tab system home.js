
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addTabButton').addEventListener('click', addTab);
    document.getElementById('searchButton').addEventListener('click', function() {
        let url = document.getElementById('urlInput').value;
        loadURLInActiveTab(url);
    });
    document.getElementById('backButton').addEventListener('click', goBackInActiveTab);
    document.getElementById('forwardButton').addEventListener('click', goForwardInActiveTab);
    document.querySelector('.tablinks').click();  // Open the first tab by default
});

function openTab(evt, tabName) {
    let tabcontent, tablinks;

    tabcontent = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove('active');
    }

    tablinks = document.getElementsByClassName('tablinks');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove('active');
    }

    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');

    let activeTab = document.querySelector('.tabcontent.active iframe');
    if (activeTab) {
        document.getElementById('urlInput').value = activeTab.src;
    }
}

function closeTab(evt, tabName) {
    evt.stopPropagation();
    let tab = document.getElementById(tabName);
    tab.parentElement.removeChild(tab);
    evt.currentTarget.parentElement.remove();
    
    let tablinks = document.getElementsByClassName('tablinks');
    if (tablinks.length > 0) {
        tablinks[0].click();
    }
}

let tabCount = 1;

function addTab() {
    tabCount++;
    let newTabName = `Tab${tabCount}`;
    
    let tabButton = document.createElement('button');
    tabButton.className = 'tablinks';
    tabButton.innerHTML = `${newTabName} <span class="close" onclick="closeTab(event, '${newTabName}')">x</span>`;
    tabButton.onclick = function(event) {
        openTab(event, newTabName);
    };
    document.querySelector('.tab').insertBefore(tabButton, document.getElementById('addTabButton'));

    let tabContent = document.createElement('div');
    tabContent.id = newTabName;
    tabContent.className = 'tabcontent';
    tabContent.innerHTML = `<iframe src="https://indra-fastest-web-browser.tiiny.site/#gsc.tab=0" frameborder="0"></iframe>`;
    document.body.appendChild(tabContent);
}

function loadURLInActiveTab(url) {
    let activeTab = document.querySelector('.tabcontent.active iframe');
    if (activeTab) {
        activeTab.src = url.startsWith('http') ? url : `http://${url}`;
        document.getElementById('urlInput').value = activeTab.src;
        activeTab.src = url.startsWith('http') ? url : `https://www.google.com/search?client=indra-b-d&q=${url}`;
        document.getElementById('urlInput').value = activeTab.src;
    }
}

function goBackInActiveTab() {
    let activeTab = document.querySelector('.tabcontent.active iframe');
    if (activeTab && activeTab.contentWindow.history.length > 1) {
        activeTab.contentWindow.history.back();
        setTimeout(() => {
            document.getElementById('urlInput').value = activeTab.contentWindow.location.href;
        }, 100);
    }
}

function goForwardInActiveTab() {
    let activeTab = document.querySelector('.tabcontent.active iframe');
    if (activeTab && activeTab.contentWindow.history.length > 1) {
        activeTab.contentWindow.history.forward();
        setTimeout(() => {
            document.getElementById('urlInput').value = activeTab.contentWindow.location.href;
        }, 100);
    }
}