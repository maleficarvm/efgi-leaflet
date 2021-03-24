<template>
  <l-map style="height: 96em" :zoom="zoom" :center="center">
    <l-control-layers position="topright" />
    <l-control-fullscreen
      position="topleft"
      :options="{ title: { false: 'Go big!', true: 'Be regular' } }"
    />
    <l-control-scale position="bottomleft" :imperial="false" :metric="true" />
    <vue-leaflet-minimap :layer="layer" :options="options" />
    <l-tile-layer
      v-for="tileProvider in tileProviders"
      :key="tileProvider.name"
      :name="tileProvider.name"
      :visible="tileProvider.visible"
      :url="tileProvider.url"
      :attribution="tileProvider.attribution"
      layer-type="base"
    />
    <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
    <v-geosearch :options="geosearchOptions" />
  </l-map>
</template>

<script>
import "../assets/css/leaflet.css";
import "../assets/css/geosearch.css";
import LControlFullscreen from "vue2-leaflet-fullscreen";
import VueLeafletMinimap from "vue-leaflet-minimap";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import VGeosearch from "vue2-leaflet-geosearch";
import { LMap, LTileLayer, LControlLayers, LControlScale } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    LControlScale,
    LControlFullscreen,
    VueLeafletMinimap,
    VGeosearch,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 4,
      center: [64.7556, 96.7766],
      tileProviders: [
        {
          name: "ЕЭКО",
          visible: true,
          url:
            "https://pkk.rosreestr.ru/arcgis/rest/services/BaseMaps/BaseMap/MapServer/tile/{z}/{y}/{x}",
          attribution:
            '&copy; <a target="_blank" href="https://rosreestr.ru/site/">Росреестр</a> 2010, ЕЭКО',
        },
        {
          name: "ЕЭКО",
          visible: true,
          url:
            "https://pkk.rosreestr.ru/arcgis/rest/services/BaseMaps/Anno/MapServer/tile/{z}/{y}/{x}",
        },
        {
          name: "OpenTopoMap",
          visible: false,
          url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
          attribution:
            'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        },
        {
          name: "Яндекс.Спутник",
          visible: false,
          url:
            "https://sat01.maps.yandex.net/tiles?l=sat&v=3.379.0&x={x}&y={y}&z={z}",
          attribution:
            '&copy; <a target="_blank" href="https://yandex.ru/legal/maps_termsofuse/?lang=ru">Яндекс</a>',
        },
      ],
      layer: new L.TileLayer(
        "https://pkk.rosreestr.ru/arcgis/rest/services/BaseMaps/BaseMap/MapServer/tile/{z}/{y}/{x}"
      ),
      options: {
        position: "bottomright",
        width: 400,
        height: 200,
        collapsedWidth: 35,
        collapsedHeight: 35,
        toggleDisplay: true,
        zoomAnimation: true,
        zoomLevelOffset: -5,
      },
      geosearchOptions: {
        provider: new OpenStreetMapProvider(),
        style: "bar",
        animateZoom: true,
        searchLabel: "Поиск",
        showMarker: false,
        showPopup: true,
      },
    };
  },
};
</script>

<style>
@import "~leaflet-minimap/dist/Control.MiniMap.min.css";
</style>
