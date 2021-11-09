<template>
  <div class="wrapper-content wrapper-content--fixed">
    <v-overlay :value="overlay" z-index="99">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <section class="map-container">
      <l-map
        ref="map"
        style="height: 92vh"
        :zoom="zoom"
        :minZoom="minZoom"
        :center="center"
        :options="{ attributionControl: false }"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
      >
        <l-control-layers position="topright" :collapsed="false" />
        <l-tile-layer :name="pane.name" :url="pane.url" layer-type="base" />
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
        <v-geosearch :options="geosearchOptions" />
        <l-control-polyline-measure
          :options="{ showUnitControl: true }"
          position="topleft"
        />
        <l-control-attribution
          position="bottomright"
          :prefix="
            `<span>CRS: WGS-84 EPSG: 3857 Коорд. центра: ` +
              center.lat +
              `&nbsp;С.Ш. &nbsp;` +
              center.lng +
              `&nbsp;В.Д. &nbsp;Zoom: ` +
              zoom +
              `&nbsp; Leaflet</span> `
          "
        ></l-control-attribution>
        <l-control-scale position="bottomleft" :imperial="false" />
        <l-control position="bottomright">
          <v-btn class="ma-2 btn__default" dark href="Application.docx">
            Скачать форму заявки
          </v-btn>
        </l-control>
        <l-control :position="'bottomright'">
          <img src="@/img/tsnigri_horizontal.png" class="vertical-logo-img" />
        </l-control>

        <l-geo-json
          name="Прогнозные ресурсы"
          :visible="false"
          :geojson="geojson"
          :options="features"
          :options-style="styleFunction"
          layer-type="overlay"
        />
        <l-geo-json
          name="Протоколы"
          :visible="true"
          :geojson="protocols"
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
import { CRS, latlng } from "leaflet";
import "../assets/css/leaflet.css";
import "../assets/css/geosearch.css";
import VGeosearch from "vue2-leaflet-geosearch";
import LControlFullscreen from "vue2-leaflet-fullscreen";
import VueLeafletMinimap from "vue-leaflet-minimap";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import LControlPolylineMeasure from "vue2-leaflet-polyline-measure";
import { mapGetters } from "vuex";
import {
  LMap,
  LTileLayer,
  LControlLayers,
  LControlScale,
  LWMSTileLayer,
  LMarker,
  LGeoJson,
  LControl,
  LControlAttribution,
} from "vue2-leaflet";

export default {
  name: "Resources",
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
    CRS,
    LControlAttribution,
    LControlPolylineMeasure,
    "l-wms-tile-layer": LWMSTileLayer,
  },
  data() {
    return {
      zoom: 4,
      minZoom: 3,
      center: [64.7556, 96.7766],
      bounds: [
        [55.63901028125873, 37.3677978515625],
        [55.348763181988105, 37.3787841796875],
      ],
      show: true,
      overlay: true,
      geojson: null,
      protocols: null,
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
            '&copy; Участники <a href="http://osm.org/copyright">OpenStreetMap</a> ',
        },
        {
          name: "OpenTopoMap",
          visible: false,
          url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
          attribution:
            'Map data: &copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a target="_blank" href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
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
      pane: {
        name: "ЕЭКО",
        visible: true,
        url:
          "https://pkk.rosreestr.ru/arcgis/rest/services/BaseMaps/Anno/MapServer/tile/{z}/{y}/{x}",
      },
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
          name: "Границы субъектов",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:ne_10m_adm_regions_line",
          transparent: true,
        },
        {
          name: "Государственная граница",
          format: "image/png",
          baseLayers: "NET2:ne_10m_admrf_line",
          transparent: true,
        },
        {
          name: "Граница АЗРФ",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:azrf",
          transparent: true,
        },
        {
          name: "Действующие ООПТ",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:oopt_active",
          transparent: true,
        },
        {
          name: "Автодороги федеральные",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:roads_main_RU",
          transparent: true,
        },
        {
          name: "Железные дороги",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:rails_main_RU",
          transparent: true,
        },
        {
          name: "Аэропорты",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:dor_airports_RF",
          transparent: true,
        },
        {
          name: "Морские и речные порты",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:hyd_seaport",
          transparent: true,
        },
        {
          name: "ГОК и ЗИФ",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:obr_gokzif",
          transparent: true,
        },
        {
          name: "Электростанции",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:eng_powerstation",
          transparent: true,
        },
        {
          name: "Электроподстанции",
          visible: false,
          format: "image/png",
          baseLayers: "NET2:eng_powersub",
          transparent: true,
        },
      ],
      geosearchOptions: {
        provider: new OpenStreetMapProvider(),
        style: "button",
        animateZoom: true,
        autoClose: true,
        searchLabel: "Поиск",
      },
    };
  },
  computed: {
    ...mapGetters(["valueApr"]),
    features() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    styleFunction() {
      return (feature) => {
        if (feature.properties.f3 === "Апробировано") {
          return {
            weight: 1.5,
            color: "#D2691E",
            opacity: 1,
            fillColor: "#D2691E",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f3 === "Сняты") {
          return {
            weight: 1.5,
            color: "#800080",
            opacity: 1,
            fillColor: "#800080",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f3 === "Отклонено") {
          return {
            weight: 1.5,
            color: "#800000",
            opacity: 1,
            fillColor: "#800000",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f3 === "Некондиция") {
          return {
            weight: 1.5,
            color: "#FF00FF",
            opacity: 1,
            fillColor: "#FF00FF",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f3 === "Внутренний учет ЦНИГРИ") {
          return {
            weight: 1.5,
            color: "#C71585",
            opacity: 1,
            fillColor: "#C71585",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f3 === "Переоценены, другие координаты") {
          return {
            weight: 1.5,
            color: "#008000",
            opacity: 1,
            fillColor: "#008000",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f3 === "Не апробировано") {
          return {
            weight: 1.5,
            color: "#008080",
            opacity: 1,
            fillColor: "#008080",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f3 === "Исключены") {
          return {
            weight: 1.5,
            color: "#000",
            opacity: 1,
            fillColor: "#000",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f3 === "Площадь работ") {
          return {
            weight: 1.5,
            color: "#8B4513",
            opacity: 1,
            fillColor: "#8B4513",
            fillOpacity: 0.07,
          };
        } else {
          return {
            weight: 1.5,
            color: "#FF0000",
            opacity: 1,
            fillColor: "#FF0000",
            fillOpacity: 0.07,
          }
        }
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        layer.bindPopup(
          '<div style="max-width: 350px;"><div><h3>' +
            feature.properties.f1 +
            "</h3></div>" +
            "<table class='table'>" +
            "</td></tr><br>" +
            "<tr><th>ПИ</th><td>" +
            feature.properties.f5 +
            "</td></tr>" +
            "<tr><th>Статус</th><td>" +
            feature.properties.f3 +
            "</td></tr>" +
            "<tr><th>Категория ресурсов</th><td>" +
            feature.properties.f7 +
            "</td></tr>" +
            "<tr><th>Примечание</th><td>" +
            feature.properties.f6 +
            "</td></tr>" +
            '<tr><th>Ссылка</th><td><a href="' +
            feature.properties.f2 +
            '" target ="_blank">перейти к материалам</td></tr>',
          "</table></div>",
          { permanent: false, sticky: true }
        );
        layer.bindTooltip(
          "<p><b>Объект: </b>" + feature.properties.f1 + "</p>",
          {
            permanent: false,
            sticky: true,
            offset: [10, 0],
          }
        );
        layer.on("mouseover", function() {
          this.setStyle({
            weight: 5,
            color: "#505050",
          });
        });
        layer.on("mouseout", function() {
          this.setStyle({
            weight: 1.5,
            color: "#FF0000",
            opacity: 1,
            fillOpacity: 0.07,
          });
        });
      };
    },
  },
  created() {
    axios
      .all([
        axios.get("http://localhost:3000/api/aprgeojson"),
        axios.get("http://localhost:3000/api/prgeojson"),
      ])
      .then((resArr) => {
        console.log(resArr[0].data);
        this.error = null;
        this.geojson = resArr[0].data;
        this.protocols = resArr[1].data;
        this.overlay = false;
      })
      .catch((err) => {
        console.log(err);
        this.geojson = null;
        this.protocols = null;
        this.error = "Can`t find this Json";
      });
    this.$on("changeButton", (value) => {
      console.log(this.value);
    });
  },
  mounted() {
    console.log("version 2.3 beta");
    console.log("Get value apr >>> " + this.valueApr + " <<<");
    if (this.valueApr != "") {
      this.$refs.map.mapObject.fitBounds(this.bounds);
    }
  },
  methods: {
    clickHandler() {
      const url = "/assets/files/Application.docx";
      window.location.href = url;
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
  },
};
</script>

<style lang="scss">
@import "~leaflet-minimap/dist/Control.MiniMap.min.css";

span {
  font-size: 12px;
}

input[type="checkbox"],
input[type="radio"] {
  padding: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  margin: 3px 0.5ex;
  border-radius: 0px;
}

table,
th,
td {
  border-collapse: collapse;
  text-align: center;
  padding: 7px;
  td {
    text-align: justify;
  }
}
.table tr:nth-child(odd) {
  background: #fff;
}
.table tr:nth-child(even) {
  background: #f3f3f3;
}

label {
  text-align: left !important;
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
}
.leaflet-control-layers-selector {
  margin: 0px;
}
.vertical-logo-img {
  width: 150px;
  margin-left: 50px;
}
.example-custom-control {
  background: #fff;
  padding: 0 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.1em;
}
.custom-control-watermark {
  font-size: 200%;
  font-weight: bolder;
  color: #aaa;
  text-shadow: #555;
}
.btn__default {
  margin: 0px !important;
}

.leaflet-popup-content-wrapper {
  width: 340px !important;
}

.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  background-clip: padding-box;
}

.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
  -webkit-box-shadow: 0px 0px 7px 4px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 7px 4px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 7px 4px rgba(34, 60, 80, 0.2);
}
</style>
