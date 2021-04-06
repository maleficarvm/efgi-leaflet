<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section class="map-container">
      <l-map style="height: 94em" :zoom="zoom" :center="center">
        <l-wms-tile-layer
          v-for="layer in layers"
          :key="layer.name"
          :base-url="baseUrl"
          :layers="layer.layers"
          :visible="layer.visible"
          :name="layer.name"
          layer-type="base"
        >
        </l-wms-tile-layer>
        <l-control-layers position="topright" />
        <l-control-fullscreen
          position="topleft"
          :options="{ title: { false: 'На весь экран', true: 'Свернуть' } }"
        />
        <l-control-scale
          position="bottomleft"
          :imperial="false"
          :metric="true"
        />
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
        <l-geo-json :geojson="geojson" />
      </l-map>
    </section>
  </div>
</template>

<script>
import "../assets/css/leaflet.css";
import "../assets/css/geosearch.css";
import VGeosearch from "vue2-leaflet-geosearch";
import LControlFullscreen from "vue2-leaflet-fullscreen";
import VueLeafletMinimap from "vue-leaflet-minimap";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import {
  LMap,
  LTileLayer,
  LControlLayers,
  LControlScale,
  LWMSTileLayer,
  LGeoJson,
} from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    LControlScale,
    LControlFullscreen,
    VueLeafletMinimap,
    VGeosearch,
    LGeoJson,
    "l-wms-tile-layer": LWMSTileLayer,
  },
  data() {
    return {
      zoom: 4,
      center: [64.7556, 96.7766],
      geojson: null,
      tileProviders: [
        {
          name: "ЕЭКО",
          visible: true,
          url:
            "https://pkk.rosreestr.ru/arcgis/rest/services/BaseMaps/BaseMap/MapServer/tile/{z}/{y}/{x}",
          attribution:
            '&copy; <a target="_blank" href="https://rosreestr.ru/site/">Росреестр</a> 2010, ЕЭКО',
        },
        //{
        //  name: "ЕЭКО",
        //  visible: true,
        //  url:
        //    "https://pkk.rosreestr.ru/arcgis/rest/services/BaseMaps/Anno/MapServer/tile/{z}/{y}/{x}",
        //},
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
      baseUrl: "http://wms.vsegei.ru/VSEGEI_Bedrock_geology/wms?",
      layers: [
        {
          name: "ГГК ВСЕГЕИ 1:200 000",
          visible: true,
          format: "image/png",
          layers: "RUSSIA_VSEGEI_1M_BLS",
          transparent: true,
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
  //async created() {
  //  const response = await fetch(
  //    "https://datahub.io/core/geo-ne-admin1/r/0.geojson"
  //  );
  //  this.geojson = await response.json();
  //},
};
</script>

<style>
@import "~leaflet-minimap/dist/Control.MiniMap.min.css";

.map-container {
  padding: 0px;
  margin-top: 55px;
  z-index: 0;
}
</style>
