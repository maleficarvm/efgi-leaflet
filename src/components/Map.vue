<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section class="map-container">
      <l-map ref="map" style="height: 885px" :zoom="zoom" :center="center">
        <l-control-layers position="topright" :collapsed="false" />
        <l-tile-layer
          v-for="baseProvider in baseProviders"
          :key="baseProvider.name"
          :name="baseProvider.name"
          :visible="baseProvider.visible"
          :url="baseProvider.url"
          :attribution="baseProvider.attribution"
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
        <l-wms-tile-layer
          v-for="layer in layers"
          :key="layer.name"
          :base-url="firstUrl"
          :layers="layer.layers"
          :visible="layer.visible"
          :name="layer.name"
          :format="layer.format"
          :transparent="layer.transparent"
          layer-type="base"
        />
        <l-wms-tile-layer
          v-for="customLayer in customLayers"
          :key="customLayer.name"
          :base-url="secondUrl"
          :layers="customLayer.customLayers"
          :visible="customLayer.visible"
          :name="customLayer.name"
          :format="customLayer.format"
          :transparent="customLayer.transparent"
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
          v-for="geojsonLayer in geojsonLayers"
          :key="geojsonLayer.name"
          :visible="geojsonLayer.visible"
          :name="geojsonLayer.name"
          :geojson="geojson"
          :options="features"
          :options-style="styleFunction"
          layer-type="overlay"
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
      appraisal: null,
      searchAppraisal: null,
      search: null,
      geochem: null,
      region: null,
      method: null,
      mineral: null,
      tech: null,
      forecast: null,
      cadastre: null,
      fillColor: "orange",
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
            "https://sat03.maps.yandex.net/tiles?l=sat&v=3.379.0&x={x}&y={y}&z={z}",
          attribution:
            '&copy; <a target="_blank" href="https://yandex.ru/legal/maps_termsofuse/?lang=ru">Яндекс</a>',
        },
      ],
      firstUrl: "http://wms.vsegei.ru/VSEGEI_Bedrock_geology/wms?",
      secondUrl: "http://wms.vsegei.ru/VSEGEI_Bedrock_geology2/wms?",
      thirdUrl: "http://kastor.tsnigri.ru:8585/geoserver/NET2/wms?",
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
          baseLayers: "NET2:ne_10m_adm_regions_line",
          transparent: true,
        },
        {
          name: "Границы_РФ",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:ne_10m_admrf_line",
          transparent: true,
        },
      ],
      geojsonLayers: [
        {
          name: "Все фондовые материалы",
          visible: true,
          geojson: this.geojson,
        },
        {
          name: "Оценочные работы",
          visible: false,
          geojson: this.geojson,
        },
        {
          name: "Поисково-оценочные работы",
          visible: false,
          geojson: this.geojson,
        },
        {
          name: "Поисковые работы",
          visible: false,
          geojson: this.geojson,
        },
        {
          name: "Геохимические работы",
          visible: false,
          geojson: this.geojson,
        },
        {
          name: "Региональные работы",
          visible: false,
          geojson: this.geojson,
        },
        {
          name: "Научно-методические работы",
          visible: false,
          geojson: this.geojson,
        },
        {
          name: "Минералогические исследования",
          visible: false,
          geojson: this.geojson,
        },
        {
          name: "Научно-технологические исследования",
          visible: false,
          geojson: this.geojson,
        },
        {
          name: "Апробация прогнозных ресурсов",
          visible: false,
          geojson: this.geojson,
        },
        {
          name: "Государственный кадастр месторождений",
          visible: false,
          geojson: this.geojson,
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
          weight: 0.6,
          color: "red",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 0.07,
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
            "</div><br><div><b>Вид работ: </b>" +
            feature.properties.f4 +
            "</div><br><div><b>Инвентарные номера в каталогах учета: </b>" +
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
      .all([
        axios.get("http://localhost:3000/api/geojson"),
        axios.get("http://localhost:3000/api/appraisal"),
        axios.get("http://localhost:3000/api/searchAppraisal"),
        axios.get("http://localhost:3000/api/search"),
        axios.get("http://localhost:3000/api/geochem"),
        axios.get("http://localhost:3000/api/region"),
        axios.get("http://localhost:3000/api/method"),
        axios.get("http://localhost:3000/api/mineral"),
        axios.get("http://localhost:3000/api/tech"),
        axios.get("http://localhost:3000/api/forecast"),
        axios.get("http://localhost:3000/api/cadastre"),
      ])
      .then((resArr) => {
        console.log(
          resArr[0].data,
          resArr[1].data,
          resArr[2].data,
          resArr[3].data,
          resArr[4].data,
          resArr[5].data,
          resArr[6].data,
          resArr[7].data,
          resArr[8].data,
          resArr[9].data,
          resArr[10].data
        );
        this.error = null;
        this.geojson = resArr[0].data;
        this.appraisal = resArr[1].data;
        this.searchAppraisal = resArr[2].data;
        this.search = resArr[3].data;
        this.geochem = resArr[4].data;
        this.region = resArr[5].data;
        this.method = resArr[6].data;
        this.mineral = resArr[7].data;
        this.tech = resArr[8].data;
        this.forecast = resArr[9].data;
        this.cadastre = resArr[10].data;
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
.leaflet-control-layers-list {
  padding: 0px;
}
.leaflet-control-layers-selector {
  margin: 0px;
}
</style>
