
let movies = [];
const catalogGrid = document.getElementById('catalog-grid');
const modal = document.getElementById('movie-modal');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-modal');
function createCard(item) {
    return `
        <div data-id="${item.id}" class="movie-card bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex flex-col justify-between shadow-lg hover:border-red-600/50 transition cursor-pointer">

            <img src="${item.image || 'https://via.placeholder.com/300x400'}"
                 alt="${item.title}"
                 class="w-full h-64 object-cover">

            <div class="p-4 flex flex-col justify-between flex-1">
                <div>
                    <span class="text-xs font-semibold uppercase tracking-wider text-red-500">
                        ${item.type === 'movie' ? 'Film' : 'Série'}
                    </span>

                    <h3 class="text-lg font-bold truncate mt-1">
                        ${item.title}
                    </h3>

                    <p class="text-slate-400 text-sm mt-1">
                        Année : ${item.releaseYear}
                    </p>
                </div>
            </div>
        </div>
    `;
}
export function renderCatalog(items) {
    if (!catalogGrid) return;
    movies = items;
    if (!items || items.length === 0) {
        catalogGrid.innerHTML = `
            <div class="col-span-full text-center py-12 text-red-500 font-semibold">
                <i class="fa-solid fa-triangle-exclamation text-3xl mb-2"></i>
                <p>Impossible de charger les données ou aucun résultat trouvé.</p>
            </div>
        `;
        return;
    }
    catalogGrid.innerHTML = items.map(createCard).join("");
}

export function openModal(id, items) {
    const item = items.find(i => String(i.id) === String(id));
    if (!item) return;
    modalContent.innerHTML = `
        <div class="flex flex-col m:flex-row gap-4 items-start">
            <img src="${item.image || 'https://via.placeholder.com/300x400'}"
                 alt="${item.title}"
                 class="w-full sm:w-32 h-48 object-cover rounded-lg border border-slate-700">
            <div>
                <span class="text-xs font-semibold uppercase text-red-500">
                    ${item.type === 'movie' ? 'Film' : 'Série'} (${item.releaseYear})
                </span>
                <h2 class="text-2xl font-bold mt-1">
                    ${item.title}
                </h2>
                <p class="text-slate-300 text-sm mt-3 leading-relaxed">
                    ${item.description || 'Aucune description disponible.'}
                </p>
                ${item.duration ? `
                    <p class="text-slate-400 text-xs mt-3">
                        <i class="fa-solid fa-clock"></i>
                        Durée : ${item.duration} min
                    </p>
                ` : ''}
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
}
//Fermer la Modal
export function closeModal() {
    if (modal) {
        modal.classList.add('hidden');
    }
}
if (catalogGrid) {
    catalogGrid.addEventListener("click", function(e) {
        const card = e.target.closest(".movie-card");
        if (card) {
            const id = card.dataset.id;
            openModal(id, movies);
        }

    });
}
// Fermer avec le bouton X
if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
}
// 7. Fermer en cliquant sur le fond noir
if (modal) {

    modal.addEventListener("click", function(e) {

        if (e.target === modal) {
            closeModal();
        }

    });

}
