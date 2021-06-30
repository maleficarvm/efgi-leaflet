<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section class="map-container">
      <l-map
        @click="addMarker(this)"
        ref="myMap"
        style="height: 885px"
        :zoom="zoom"
        :center="center"
      >
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
          :subdomains="tileProvider.subdomains"
          :attribution="tileProvider.attribution"
          layer-type="base"
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
          layer-type="overlay"
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
          layer-type="overlay"
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
          layer-type="overlay"
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
        <l-control :position="'bottomright'">
          <img src="@/img/tsnigri_horizontal.png" class="vertical-logo-img" />
        </l-control>
        <v-geosearch :options="geosearchOptions" />
        <l-geo-json
          name="Материалы ГГК 1:1 000 000"
          :visible="false"
          :geojson="layout1B"
          :options="layouts"
          :options-style="styleLayoutFunction"
          layer-type="overlay"
        />
        <l-geo-json
          name="Материалы ГГК 1:200 000"
          :visible="false"
          :geojson="layout200K"
          :options="layouts"
          :options-style="styleLayoutFunction"
          layer-type="overlay"
        />
        <l-geo-json
          name="ЦТК и ЦМР 1:100 000"
          :visible="false"
          :geojson="layout100K"
          :options="layouts"
          :options-style="styleLayoutFunction"
          layer-type="overlay"
        />
        <l-geo-json
          name="Все фондовые материалы"
          :visible="true"
          :geojson="geojson"
          :options="features"
          :options-style="styleFunction"
          layer-type="overlay"
        />
        <l-geo-json
          name="Научно-методические работы"
          :visible="false"
          :geojson="method"
          :options="features"
          :options-style="{
            weight: 2,
            color: 'crimson',
            opacity: 1,
            fillColor: 'crimson',
            fillOpacity: 0.03,
          }"
          layer-type="overlay"
        />
        <l-geo-json
          name="Региональные работы"
          :visible="false"
          :geojson="region"
          :options="features"
          :options-style="{
            weight: 2,
            color: 'Indigo',
            opacity: 1,
            fillColor: 'Indigo',
            fillOpacity: 0.2,
          }"
          layer-type="overlay"
        />
        <l-geo-json
          name="Оценочные работы"
          :visible="false"
          :geojson="appraisal"
          :options="features"
          :options-style="{
            weight: 1,
            color: 'OrangeRed',
            opacity: 1,
            fillColor: 'OrangeRed',
            fillOpacity: 0.1,
          }"
          layer-type="overlay"
        />
        <l-geo-json
          name="Поисково-оценочные работы"
          :visible="false"
          :geojson="searchAppraisal"
          :options="features"
          :options-style="{
            weight: 1,
            color: 'red',
            opacity: 1,
            fillColor: red,
            fillOpacity: 0.01,
          }"
          layer-type="overlay"
        />
        <l-geo-json
          name="Поисковые работы"
          :visible="false"
          :geojson="search"
          :options="features"
          :options-style="{
            weight: 1,
            color: 'Navy',
            opacity: 1,
            fillColor: 'Navy',
            fillOpacity: 0.1,
          }"
          layer-type="overlay"
        />
        <l-geo-json
          name="Прогнозно-поисковые работы"
          :visible="false"
          :geojson="forecastSearch"
          :options="features"
          :options-style="{
            weight: 0.6,
            color: 'red',
            opacity: 1,
            fillColor: fillColor,
            fillOpacity: 0.07,
          }"
          layer-type="overlay"
        />
        <l-geo-json
          name="Освоение"
          :visible="false"
          :geojson="develop"
          :options="features"
          :options-style="{
            weight: 2,
            color: 'red',
            opacity: 1,
            fillColor: 'red',
            fillOpacity: 0.07,
          }"
          layer-type="overlay"
        />
        <l-geo-json
          name="Геофизические исследования"
          :visible="false"
          :geojson="geophys"
          :options="features"
          :options-style="{
            weight: 2,
            color: 'SaddleBrown',
            opacity: 1,
            fillColor: 'SaddleBrown',
            fillOpacity: 0.1,
          }"
          layer-type="overlay"
        />
        <l-geo-json
          name="Геохимические исследования"
          :visible="false"
          :geojson="geochem"
          :options="features"
          :options-style="{
            weight: 2,
            color: 'Maroon',
            opacity: 1,
            fillColor: Maroon,
            fillOpacity: 0.07,
          }"
          layer-type="overlay"
        />
        <l-geo-json
          name="Минералогические исследования"
          :visible="false"
          :geojson="mineral"
          :options="features"
          :options-style="{
            weight: 1,
            color: 'red',
            opacity: 1,
            fillColor: 'Turquoise',
            fillOpacity: red,
          }"
          layer-type="overlay"
        />
        <l-geo-json
          name="Научно-технологические исследования"
          :visible="false"
          :geojson="tech"
          :options="features"
          :options-style="{
            weight: 1,
            color: 'black',
            opacity: 1,
            fillColor: 'Turquoise',
            fillOpacity: 0.1,
          }"
          layer-type="overlay"
        />
        <l-geo-json
          name="Апробация прогнозных ресурсов"
          :visible="false"
          :geojson="cadastre"
          :options="features"
          :options-style="{
            weight: 0.6,
            color: 'black',
            opacity: 1,
            fillColor: 'yellow',
            fillOpacity: 0.07,
          }"
          layer-type="overlay"
        />
      </l-map>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { CRS, latlng } from "leaflet";
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
  LControl,
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
    LControl,
    latlng,
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
      geophys: null,
      region: null,
      method: null,
      mineral: null,
      tech: null,
      forecast: null,
      cadastre: null,
      forecastSearch: null,
      develop: null,
      layout1B: null,
      layout200K: null,
      layout100K: null,
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
          name: "ЕЭКО Аннотации",
          visible: true,
          url:
            "https://pkk.rosreestr.ru/arcgis/rest/services/BaseMaps/Anno/MapServer/tile/{z}/{y}/{x}",
        },
      ],
      tileProviders: [
        {
          name: "OpenStreetMap",
          visible: false,
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          attribution:
            '&copy; Участники<a href="http://osm.org/copyright">OpenStreetMap</a> ',
        },
        {
          name: "OpenTopoMap",
          visible: false,
          url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
          attribution:
            'Map data: &copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a target="_blank" href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        },
        {
          name: "Яндекс Спутник",
          visible: false,
          url:
            "https://core-sat.maps.yandex.net/tiles?l=sat&v=3.564.0&x={x}&y={y}&z={z}&scale=1&lang=ru_RU",
          attribution: '&copy; <a href="http://yandex.ru/copyright">Yandex</a>',
          crs: CRS.EPSG3857,
        },
        {
          name: "Mapbox Спутник",
          visible: false,
          url:
            "https://a.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.jpg?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA",
          attribution:
            '&copy; <a target="_blank" href="https://www.mapbox.com/about/maps/">Mapbox </a>&copy; <a target="_blank" href="https://www.maxar.com/">Maxar</a>',
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
          name: "Границы субъектов РФ",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:ne_10m_adm_regions_line",
          transparent: true,
        },
        {
          name: "Государственная граница РФ",
          format: "image/png",
          baseLayers: "NET2:ne_10m_admrf_line",
          transparent: true,
        },
      ],
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
    layouts() {
      return {
        onEachFeature: this.onEachLayoutFunction,
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
    styleLayoutFunction() {
      return () => {
        return {
          weight: 0.6,
          color: "gray",
          opacity: 1,
          fillColor: "black",
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
    onEachLayoutFunction() {
      return (feature, layer) => {
        layer.bindPopup(
          "<tr><td><b>Номенклатурный лист: </b></td>" +
            feature.properties.f1 +
            '</div><br><br><div><b>Ссылка: </b><a href="' +
            feature.properties.f2 +
            '"> перейти к материалам </div></div>',
          { permanent: false, sticky: true }
        );
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.myMap.mapObject.ANY_LEAFLET_MAP_METHOD();
    });
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
        axios.get("http://localhost:3000/api/geophys"),
        axios.get("http://localhost:3000/api/forecastSearch"),
        axios.get("http://localhost:3000/api/develop"),
        axios.get("http://localhost:3000/api/layout1B"),
        axios.get("http://localhost:3000/api/layout200K"),
        axios.get("http://localhost:3000/api/layout100K"),
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
          resArr[10].data,
          resArr[11].data,
          resArr[12].data,
          resArr[13].data,
          resArr[14].data,
          resArr[15].data,
          resArr[16].data
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
        this.geophys = resArr[11].data;
        this.forecastSearch = resArr[12].data;
        this.develop = resArr[13].data;
        this.layout1B = resArr[14].data;
        this.layout200K = resArr[15].data;
        this.layout100K = resArr[16].data;
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
  methods: {
    addMarker(event) {
      this.markers.push(event.latlng);
    },
  },
};
</script>

<style>
@import "~leaflet-minimap/dist/Control.MiniMap.min.css";

span {
  font-size: 12px;
}
.leaflet-container {
  font: 12px/1.5 "Montserrat", Arial, Helvetica, sans-serif;
}
.map-container {
  padding: 0px;
  margin-top: 30px;
  z-index: 0;
}
.leaflet-control-layers-list {
  padding: 0px;
  max-height: 700px;
}
.leaflet-control-layers-selector {
  margin: 0px;
}
.vertical-logo-img {
  width: 150px;
  margin-left: 50px;
}
</style>
