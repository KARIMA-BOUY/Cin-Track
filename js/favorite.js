
let favs = JSON.parse(localStorage.getItem("favorites")) || [];
function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favs));
}
export function isFavorite(id) {
    return favs.some(function(item) {
        return String(item.id) === String(id);
    });
}
export function addFavorite(id, movies) {
    const item = movies.find(function(movie) {
        return String(movie.id) === String(id);
    });
    if (!item) return;
    if (isFavorite(id)) return;
    favs.push(item);
    saveFavorites();
    displayFavorites();
}
function removeFavorite(id) {

    favs = favs.filter(function(item) {
        return String(item.id) !== String(id);
    });

    saveFavorites();
    displayFavorites();

    const buttons = document.querySelectorAll(".favorite-btn");
    buttons.forEach(function(button) {
        if (String(button.dataset.id) === String(id)) {
            button.innerHTML = '<i class="fa-regular fa-heart"></i>';
        }
    });
}
export function displayFavorites() {
    const favoritesList = document.getElementById("favorites-list");
    if (!favoritesList) return;
    if (favs.length === 0) {
        favoritesList.innerHTML = `
            <p class="text-slate-400 text-sm">
                Aucun favori pour le moment.
            </p>
        `;
    } else {
        favoritesList.innerHTML = favs.map(function(item) {
            return `
                <div class="flex items-center gap-3 bg-slate-950 border border-slate-700 rounded-xl p-3 mb-3">
                <img src="${item.image || 'https://via.placeholder.com/60x80'}" alt="${item.title}" class="w-12 h-16 object-cover rounded-lg ">
                <div class="flex-1 min-w-0">
                <h3 class="font-bold text-sm truncate">${item.title}</h3>
                <p class="text-slate-400 text-xs mt-1">${item.type==="movie"? "Film" : "serie"} ${item.releaseYear} </p>
                </div>
              
                    <button
                        class="remove-favorite text-red-500 hover:text-red-400"
                        data-id="${item.id}">
                        <i class="fa-solid fa-xmark"></i> 
                    </button>
                </div>
            `;
        }).join("");
    }
        const counts = favs.reduce(function(acc, item) {
        if (item.type === "movie") {
            acc.movies++;
        }
        if (item.type === "series") {
            acc.series++;
        }
        return acc;
    }, { movies: 0, series: 0 });
    document.getElementById("favorite-movies").textContent = counts.movies;
    document.getElementById("favorite-series").textContent = counts.series;
}
document.addEventListener("click", function(e) {
    const button = e.target.closest(".remove-favorite");
    if (button) {
        const id = button.dataset.id;
        removeFavorite(id);
    }
});
displayFavorites();
