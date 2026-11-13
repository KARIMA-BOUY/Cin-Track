#  CinéTrack

**CinéTrack** est une application web moderne permettant de rechercher, filtrer et explorer des films et séries TV, avec une gestion complète des favoris et une interface responsive.

 **Démo en ligne :** https://cinetrack-green.vercel.app/

---

##  Fonctionnalités

- **Recherche instantanée :** Trouvez rapidement un film ou une série par titre.
- **Filtres & Pagination :** Navigation fluide à travers le catalogue avec système de filtrage et pagination.
- **Modale de détails :** Affichage des informations complètes (durée, nombre de saisons, réalisateur, synopsis, etc.).
- **Gestion des favoris :** Ajoutez ou retirez vos titres préférés dans une liste dédiée (sauvegardée localement)[cite: 1].
- **Design Responsive :** Interface adaptée aux mobiles, tablettes et ordinateurs.

---

##  Technologies utilisées

- **HTML5**
- **Tailwind CSS** (Styling & Design responsive)
- **JavaScript (ES6+)** (Modules JS, Manipulation du DOM, Fetch API)
- **API Externe** (Récupération dynamique des données films/séries)

---

##  Structure du projet

```text
CinéTrack/
├── index.html          # Page principale
├── js/
│   ├── main.js         # Point d'entrée et logique principale
│   ├── api.js          # Appels API et récupération des données
│   ├── ui.js           # Rendu de l'interface et gestion des modales
│   └── favorite.js     # Gestion de la liste des favoris
└── README.md           # Documentation du projet