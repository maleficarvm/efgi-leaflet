<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section class="map-container">
      <l-map ref="map" style="height: 885px" :zoom="zoom" :center="center">
        <l-tile-layer
          v-for="baseProvider in baseProviders"
          :key="baseProvider.name"
          :name="baseProvider.name"
          :visible="baseProvider.visible"
          :url="baseProvider.url"
          :attribution="baseProvider.attribution"
        />
        <l-wms-tile-layer
          v-for="baseLayer in baseLayers"
          :key="baseLayer.name"
          :base-url="thirdUrl"
          :layers="baseLayer.baseLayers"
          :visible="baseLayer.visible"
          :name="baseLayer.name"
          :format="baseLayer.format"
          :transparent="baseLayer.transparent"
        />
        <l-tile-layer
          v-for="tileProvider in tileProviders"
          :key="tileProvider.name"
          :name="tileProvider.name"
          :visible="tileProvider.visible"
          :url="tileProvider.url"
          :attribution="tileProvider.attribution"
          layer-type="base"
        />
        <l-control-layers position="topright" />
        <l-wms-tile-layer
          v-for="layer in layers"
          :key="layer.name"
          :base-url="firstUrl"
          :layers="layer.layers"
          :visible="layer.visible"
          :name="layer.name"
          layer-type="base"
        />
        <l-wms-tile-layer
          v-for="customLayer in customLayers"
          :key="customLayer.name"
          :base-url="secondUrl"
          :layers="customLayer.customLayers"
          :visible="customLayer.visible"
          :name="customLayer.name"
          layer-type="base"
        />
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

        <v-geosearch :options="geosearchOptions" />
        <l-geo-json
          v-if="show"
          :geojson="geojson"
          :options="features"
          :options-style="styleFunction"
        />
      </l-map>
    </section>
  </div>
</template>

<script>
import axios from "axios";
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
  LMarker,
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
    LMarker,
    LGeoJson,
    "l-wms-tile-layer": LWMSTileLayer,
  },
  data() {
    return {
      zoom: 4,
      center: [64.7556, 96.7766],
      show: true,
      geojson: null,
      fillColor: "#b8a358",
      baseProviders: [
        {
          name: "ЕЭКО",
          visible: true,
          url:
            "https://pkk.rosreestr.ru/arcgis/rest/services/BaseMaps/BaseMap/MapServer/tile/{z}/{y}/{x}",
          attribution:
            '&copy; <a target="_blank" href="https://rosreestr.ru/site/">Росреестр</a> 2010, ЕЭКО',
        },
        {
          name: "ЕЭКО_Аннотации",
          visible: true,
          url:
            "https://pkk.rosreestr.ru/arcgis/rest/services/BaseMaps/Anno/MapServer/tile/{z}/{y}/{x}",
        },
      ],
      tileProviders: [
        {
          name: "OpenTopoMap",
          visible: false,
          url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
          attribution:
            'Map data: &copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a target="_blank" href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
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
      firstUrl: "http://wms.vsegei.ru/VSEGEI_Bedrock_geology/wms?",
      secondUrl: "http://wms.vsegei.ru/VSEGEI_Bedrock_geology2/wms?",
      thirdUrl: "http://kastor.tsnigri.ru:8585/geoserver/NET/wms?",
      layers: [
        {
          name: "ГГК ВСЕГЕИ 1:1 000 000",
          visible: false,
          format: "image/png",
          layers: "RUSSIA_VSEGEI_1M_BLS",
          transparent: false,
        },
      ],
      customLayers: [
        {
          name: "ГГК ВСЕГЕИ 1:200 000",
          visible: false,
          format: "image/png",
          customLayers: "CIS_VSEGEI_200K_BLS",
          transparent: false,
        },
      ],
      baseLayers: [
        {
          name: "Субъекты_РФ",
          visible: true,
          format: "image/png",
          baseLayers: "NET:adm_federalsubject",
          transparent: true,
        },
        {
          name: "Границы_РФ",
          visible: true,
          format: "image/png",
          baseLayers: "NET:adm_rfborders",
          transparent: true,
        },
      ],
      layer: new L.TileLayer(
        "https://sat01.maps.yandex.net/tiles?l=sat&v=3.379.0&x={x}&y={y}&z={z}"
      ),
      options: {
        position: "bottomright",
        width: 300,
        height: 150,
        collapsedWidth: 25,
        collapsedHeight: 25,
        toggleDisplay: true,
        zoomAnimation: true,
        zoomLevelOffset: -3,
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
  computed: {
    features() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    styleFunction() {
      const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 1,
          color: "#3d3a2f",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 0.2,
        };
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        layer.bindPopup(
          "<tr><td><b>Название: </b></td>" +
            feature.properties.f1 +
            "<br><br><div><b>Автор (авторы): </b>" +
            feature.properties.f2 +
            "</div><br><div><b>Год составления объекта учета: </b>" +
            feature.properties.f3 +
            "</div><br><div><b>Инвентарные номера в каталогах учета: </b>" +
            feature.properties.f4 +
            "</div><br><div><b>Вид работ: </b>" +
            feature.properties.f5 +
            '</div><br><div><b>Ссылка: </b><a href="' +
            feature.properties.f6 +
            '"> перейти к файлу </div></div>',
          { permanent: false, sticky: true }
        );
      };
    },
  },
  created() {
    axios
      .get(`http://127.0.0.1:3000/api/geojson`)
      .then((response) => {
        console.log(response.data);
        this.error = null;
        this.geojson = response.data;
      })
      .catch((err) => {
        console.log(err);
        this.geojson = null;
        this.error = "Can`t find this Json";
      });
    this.$on("changeButton", (value) => {
      console.log(this.value);
    });
  },
  methods: {},
};
</script>

<style>
@import "~leaflet-minimap/dist/Control.MiniMap.min.css";

.map-container {
  padding: 0px;
  margin-top: 30px;
  z-index: 0;
}
</style>
