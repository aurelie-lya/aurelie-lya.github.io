/* == Animation des textes de la page d'accueil == */
// Initialise une nouvelle instance de Typed pour animer le texte
var typed = new Typed(".typing", {
  // Définit les chaînes de texte à animer
  strings: [
    "",
    "Directrice Artistique",
    "Graphiste",
    "Webdesigner",
    "Créative",
  ],
  // Définit la vitesse de frappe
  typeSpeed: 100,
  // Définit la vitesse de suppression
  BackSpeed: 60,
  // Active la répétition de l'animation en boucle
  loop: true,
});

/* == Animation de la barre de navigation latérale == */
// Sélectionne l'élément de la barre de navigation
var nav = document.querySelector(".nav"),
    // Sélectionne tous les éléments 'li' de la barre de navigation
    navList = nav.querySelectorAll("li"),
    // Compte le nombre total d'éléments 'li'
    totalNavList = navList.length,
    // Sélectionne toutes les sections de la page
    allSection = document.querySelectorAll(".section"),
    // Compte le nombre total de sections
    totalSection = allSection.length;

// Fonction pour supprimer la classe 'back-section' de toutes les sections
function removeBackSection() {
  for (var i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("back-section");
  }
}

// Fonction pour ajouter la classe 'back-section' à une section spécifique
function addBackSection(num) {
  allSection[num].classList.add("back-section");
}

// Fonction pour afficher la section liée à l'élément cliqué
function showSection(element) {
  for (var i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active");
  }
  var target = element.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
}

// Fonction pour mettre à jour la barre de navigation en fonction de la section active
function updateNav(element) {
  for (var i = 0; i < totalNavList; i++) {
    navList[i].querySelector("a").classList.remove("active");
    var target = element.getAttribute("href").split("#")[1];
    if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
      navList[i].querySelector("a").classList.add("active");
    }
  }
}

// Boucle sur chaque élément de la barre de navigation pour ajouter un gestionnaire d'événements
for (var i = 0; i < totalNavList; i++) {
  (function(i) {
    var a = navList[i].querySelector("a");
    a.addEventListener("click", function() {
      removeBackSection();
      for (var j = 0; j < totalNavList; j++) {
        if (navList[j].querySelector("a").classList.contains("active")) {
          addBackSection(j);
        }
        navList[j].querySelector("a").classList.remove("active");
      }
      this.classList.add("active");
      showSection(this);
      if (window.innerWidth < 1200) {
        asideSectionTogglerBtn();
      }
    });
  })(i);
}

/* = Animation au clic sur le bouton 'Embauchez-moi'= */
// Ajoute un gestionnaire d'événements au bouton 'Embauchez-moi'
document.querySelector(".hire-me").addEventListener("click", function() {
  // Récupère l'index de la section à partir de l'attribut 'data-section-index'
  var sectionIndex = this.getAttribute("data-section-index");
  // Affiche la section correspondante
  showSection(this);
  // Met à jour la barre de navigation pour refléter la section active
  updateNav(this);
  // Supprime la classe 'back-section' de toutes les sections
  removeBackSection();
  // Ajoute la classe 'back-section' à la section spécifiée
  addBackSection(sectionIndex);
});

// Sélectionne le bouton de basculement de la barre de navigation
var navTogglerBtn = document.querySelector(".nav-toggler"),
    // Sélectionne l'élément 'aside'
    aside = document.querySelector(".aside");

// Ajoute un gestionnaire d'événements au bouton de basculement
navTogglerBtn.addEventListener("click", function() {
  // Bascule l'affichage de la section et du bouton
  asideSectionTogglerBtn();
});

// Fonction pour basculer l'affichage de la barre latérale et des sections
function asideSectionTogglerBtn() {
  // Bascule la classe 'open' sur l'élément 'aside'
  aside.classList.toggle("open");
  // Bascule la classe 'open' sur le bouton de basculement
  navTogglerBtn.classList.toggle("open");
  for (var i = 0; i < totalSection; i++) {
    // Bascule la classe 'open' sur chaque section
    allSection[i].classList.toggle("open");
  }
}

/*Agrandir les images des projets au clic sur l'image*/
// Écoute l'événement 'DOMContentLoaded'
document.addEventListener("DOMContentLoaded", function() {
  // Crée un nouvel élément 'div' pour le modal
  var modal = document.createElement("div");
  // Attribue la classe 'modal' au nouvel élément
  modal.className = "modal";

  // Crée un nouvel élément 'img' pour l'image dans le modal
  var modalImg = document.createElement("img");
  // Attribue la classe 'modal-content' à l'élément 'img'
  modalImg.className = "modal-content";
  // Ajoute l'élément 'img' au modal
  modal.appendChild(modalImg);

  // Crée un nouvel élément 'span' pour le bouton de fermeture
  var span = document.createElement("span");
  // Attribue la classe 'close' à l'élément 'span'
  span.className = "close";
  // Ajoute le caractère 'x' comme contenu du 'span'
  span.innerHTML = "&times;";
  // Ajoute l'élément 'span' au modal
  modal.appendChild(span);

  // Ajoute le modal au corps de la page
  document.body.appendChild(modal);

  // Sélectionne toutes les images dans la section 'portfolio-img'
  var images = document.querySelectorAll(".portfolio-img img");
  // Boucle sur chaque image pour ajouter un gestionnaire d'événements
  images.forEach(function(img) {
    // Change le curseur en pointeur pour chaque image
    img.style.cursor = "pointer";
    // Ajoute un gestionnaire d'événements au clic sur chaque image
    img.onclick = function() {
      // Affiche le modal
      modal.style.display = "block";
      // Définit la source de l'image dans le modal à celle de l'image cliquée
      modalImg.src = this.src;
    };
  });

  // Ajoute un gestionnaire d'événements au clic sur le bouton de fermeture
  span.onclick = function() {
    // Cache le modal
    modal.style.display = "none";
  };
});
