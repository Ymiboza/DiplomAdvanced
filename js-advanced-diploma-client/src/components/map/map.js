import { initYandexMap } from "./yandexMap";

export const Map = () => {
  const mapContainer = document.createElement("div");
  const mapTitle = document.createElement("h1");
  const mapContentContainer = document.createElement("div");

  mapContainer.className = "mapContainer";
  mapTitle.className = "mapTitle";
  mapContentContainer.className = "mapContentContainer skeleton";
  mapContentContainer.id = "map";

  mapTitle.textContent = "Карта банкоматов";

  mapContainer.append(mapTitle, mapContentContainer);

  requestAnimationFrame(() => {
    initYandexMap();
  });

  return mapContainer;
};
