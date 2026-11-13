import { Movies } from "./api.js";
import { renderCatalog } from "./ui.js";

async function init() {
    const data = await Movies();
    renderCatalog(data);

}
init();