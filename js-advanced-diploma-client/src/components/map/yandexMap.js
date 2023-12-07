import { getMapMark } from "../../network";

export const initYandexMap = async () => {
  const mapID = document.getElementById("map");
  if (!mapID) {
    console.error(`${mapID} (map) container not found`);
    return;
  }

  if (window.ymaps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/2.1/?apikey=09b91073-e33f-4dd0-9b80-f097a4d38b9d&lang=ru_RU";
    script.onload = () => {
      initMap();
    };

    document.body.append(script);
  }

  async function initMap() {
    const data = await getMapMark();
    ymaps.ready(() => {
      let myMap = new ymaps.Map(mapID, {
        center: [55.755819, 37.617644],
        zoom: 11,
      });
      for (const key in data.payload) {
        const item = data.payload[key];
        let myPlacemark = new ymaps.Placemark(
          [item.lat, item.lon],
          {},
          {
            iconImageSize: [30, 42],
            iconImageOffset: [-3, -42],
          }
        );
        myMap.geoObjects.add(myPlacemark);
      }
    });
  }
};
