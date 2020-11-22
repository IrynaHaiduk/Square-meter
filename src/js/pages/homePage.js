import filter from "./../filter/filterController.js";
import listing from "./../listing/listingController.js";

export default async function (state) {
    document.querySelector("#app").innerHTML = "";
    await filter(state);
    listing(state);
}