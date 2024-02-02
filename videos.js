/*---------------------      navbar      ---------------------*/

const links = document.querySelectorAll("nav ul li a");

const currentURL = window.location.href;

for (const link of links) {
    if (link.href === currentURL) {
        link.classList.add("current");
    }
}

/*---------------------   end   navbar   end   ---------------------*/

