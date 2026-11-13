
import { addFavorite, isFavorite } from "./favorite.js";
let movies = [];

const catalogGrid = document.getElementById("catalog-grid");
const modal = document.getElementById("movie-modal");
const modalContent = document.getElementById("modal-content");
const closeModalBtn = document.getElementById("close-modal");

let currentPage = 1;
let itemsPerPage = 8;
let currentType = "all";
let currentQuery = "";

const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");
const paginationContainer = document.getElementById("pagination-container");

function createCard(item) {
    return `
        <div data-id="${item.id}"
            class="movie-card relative group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex flex-col justify-end h-96 shadow-lg  transition cursor-pointer">

            <img src="${item.image || 'https://via.placeholder.com/300x400'}"
                alt="${item.title}"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <button
                class="favorite-btn absolute top-3 right-3 text-red bg-black/40 hover:bg-black/60 backdrop-blur-md w-9 h-9 rounded-full flex items-center justify-center text-lg transition z-10"
                data-id="${item.id}">
                <i class="${isFavorite(item.id) ? 'fa-solid text-red-500' : 'fa-regular'} fa-heart"></i>
            </button>
            <div class="relative p-4 z-10 flex flex-col items-start gap-1">
                <span class="text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded shadow">
                    ${item.type === "movie" ? "FILM" : "SÉRIE"}
                </span>
                <h3 class="text-base font-bold truncate w-full text-white mt-1">
                    ${item.title}
                </h3>
                <p class="text-slate-300 text-xs">
                    Année : ${item.releaseYear}
                </p>
            </div>
        </div>
    `;
}
export function renderCatalog(items) {
    if (!catalogGrid) return;
    movies = items || [];
    currentPage = 1;
    if (movies.length === 0) {
        catalogGrid.innerHTML = `
            <div class="col-span-full text-center py-12 text-red-500">
                Impossible de charger les données.
            </div>
        `;
        renderPagination(0);
        return;
    }
    updateCatalog();
}
function updateCatalog() {
    let result = movies.filter(function(item) {
        return item.title.toLowerCase().includes(currentQuery);
    });
    if (currentType !== "all") {
        result = result.filter(function(item) {
            return item.type === currentType;
        });
    }
    let totalPages = Math.ceil(result.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const pageItems = result.slice(start, end);
    if (result.length === 0) {
        catalogGrid.innerHTML = `
            <div class="col-span-full text-center py-12 text-red-500">
                Aucun résultat trouvé.
            </div>
        `;
    } else {
        catalogGrid.innerHTML = pageItems.map(createCard).join("");
    }
    renderPagination(totalPages);
}
function renderPagination(totalPages) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = "";
    
    for (let i = 1; i <= totalPages; i++) {
        paginationContainer.innerHTML += `
            <button data-page="${i}"class="${i === currentPage ? 'bg-red-600' : 'bg-slate-800'} px-4 py-2 rounded-lg">${i}
            </button>
        `;
    }
}
if (searchInput) {
    searchInput.addEventListener("input", function(e) {
        currentQuery = e.target.value.toLowerCase();
        currentPage = 1;
        updateCatalog();
    });
}
filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        currentType = button.dataset.filter;
        currentPage = 1;
        updateCatalog();
    });
});
if (paginationContainer) {
    paginationContainer.addEventListener("click", function(e) {
        if (e.target.tagName === "BUTTON") {
            currentPage = Number(e.target.dataset.page);
            updateCatalog();
        }
    });
}
export function openModal(id, items) {
    const item = items.find(function(i) {
        return String(i.id) === String(id);
    });
    if (!item) return;
    modalContent.innerHTML = `
        <div class="flex flex-col sm:flex-row gap-4 items-start">
            <img src="${item.image || 'https://via.placeholder.com/300x400'}"
                alt="${item.title}"
                class="w-full sm:w-32 h-48 object-cover rounded-lg border border-slate-700">
            <div>
                <span class="text-xs font-semibold uppercase text-red-500">
                    ${item.type === "movie" ? "Film" : "Série"} (${item.releaseYear})
                </span>
                <h2 class="text-2xl font-bold mt-1">
                    ${item.title}
                </h2>
                <p class="text-slate-300 text-sm mt-3 leading-relaxed">
                    ${item.description || "Aucune description disponible."}
                </p>
                ${item.duration ? `
                    <p class="text-slate-400 text-xs mt-3">
                        <i class="fa-solid fa-clock"></i>
                        Durée : ${item.duration} min
                    </p>
                ` : ""}
                ${item.seasons ? `<p class="text-slate-400 text-xs mt-3">
                    <i class="fa-solid fa-video"></i> realisation :${item.directors.join(", ")} </p> `: "" }
            </div>
        </div>
    `;
    modal.classList.remove("hidden");
}
export function closeModal() {
    if (modal) {
        modal.classList.add("hidden");
    }
}
if (catalogGrid) {
    catalogGrid.addEventListener("click", function(e) {
        const favoriteBtn = e.target.closest(".favorite-btn");
        if (favoriteBtn) {
            const id = favoriteBtn.dataset.id;
            addFavorite(id, movies);
            if (isFavorite(id)) {
                favoriteBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
            }
            return;
        }
        const card = e.target.closest(".movie-card");
        if (card) {
            const id = card.dataset.id;
            openModal(id, movies);
        }
    });
}
if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
}
if (modal) {
    modal.addEventListener("click", function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}
