//Used to dynamically load a page into an iframe.
function loadPage(pageUrl) {
    //Getting URL paramaters
    const urlParams = new URLSearchParams(window.location.search);
    //Getting Iframe for each page 
    const iframe = document.getElementById('pageFrame');
    //Loading and displaying them
    iframe.src = `${pageUrl}?${urlParams.toString()}`;
    iframe.style.display = 'block';
  }
// Adds an event listener that runs when the page is shown with back/forward navigation.
  window.addEventListener("pageshow", function (event) {
    //These detect if the user used the back button.
      if (event.persisted || window.performance.navigation.type === 2) {
        window.location.href = "login.html"; 
      }
    });
//On clicking logout it redirects to login.html while clearing all the local and session storage.
  function logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "login.html";
  }