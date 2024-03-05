function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle( "open" );
    icon.classList.toggle( "open" );
}
window.addEventListener("load", function() {
    var loadingContainer = document.querySelector(".loading-container");
    loadingContainer.style.display = "none"; // Hide the loading animation
});