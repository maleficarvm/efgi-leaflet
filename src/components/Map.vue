<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section class="map-container">
      <l-map
        ref="myMap"
        style="height: 915px"
        :zoom="zoom"
        :minZoom="minZoom"
        :center="center"
        :options="{ attributionControl: false }"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
      >
        <l-choropleth-layer
          :data="objectData"
          titleKey="type_name"
          idKey="type_id"
          :value="value"
          :extraValues="extraValues"
          geojsonIdKey="id"
          :geojson="geojson"
          :colorScale="colorScale"
        >
        </l-choropleth-layer>

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
        <l-control-attribution
          position="bottomright"
          :prefix="
            `<span>CRS: WGS-84 EPSG: 3857 Коорд. центра: ` +
              center.lat +
              `&nbsp;С.Ш. &nbsp;` +
              center.lng +
              `&nbsp;В.Д. &nbsp;Zoom: ` +
              zoom +
              `&nbsp; Vue2Leaflet</span>`
          "
        ></l-control-attribution>
        <l-control position="bottomright">
          <v-btn color="btn btnDefault" dark @click="clickHandler">
            Скачать форму заявки
          </v-btn>
        </l-control>
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
          name="Материалы ГГК 1:1 000 000 и ЦМР"
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
          name="ЦТК 1:100 000"
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
  LControlAttribution,
} from "vue2-leaflet";
import { InfoControl, ReferenceChart, ChoroplethLayer } from "vue-choropleth";

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
    CRS,
    LControlAttribution,
    "l-wms-tile-layer": LWMSTileLayer,
    "l-info-control": InfoControl,
    "l-reference-chart": ReferenceChart,
    "l-choropleth-layer": ChoroplethLayer,
  },
  data() {
    return {
      zoom: 4,
      minZoom: 3,
      center: [63.7556, 101.7766],
      show: true,
      objectData: null,
      geojson: null,
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
        {
          name: "Граница АЗРФ",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:azrf",
          transparent: true,
        },
        {
          name: "Действующие ООПТ",
          visible: false,
          format: "image/png",
          baseLayers: "NET2:oopt_active",
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
      return (feature) => {
        if (feature.properties.f4 === "Научно-методические работы") {
          return {
            weight: 1,
            color: "#FF0000",
            opacity: 1,
            fillColor: "#FFA500",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f4 === "Региональные работы") {
          return {
            weight: 1,
            color: "#800080",
            opacity: 1,
            fillColor: "#800080",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f4 === "Поисковые работы") {
          return {
            weight: 1,
            color: "#800000",
            opacity: 1,
            fillColor: "#800000",
            fillOpacity: 0.07,
          };
        } else if (
          feature.properties.f4 === "Научно-технологические исследования"
        ) {
          return {
            weight: 1,
            color: "#FF00FF",
            opacity: 1,
            fillColor: "#FF00FF",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f4 === "Оценочные работы") {
          return {
            weight: 1,
            color: "#C71585",
            opacity: 1,
            fillColor: "#C71585",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f4 === "Поисково-оценочные работы") {
          return {
            weight: 1,
            color: "#008000",
            opacity: 1,
            fillColor: "#008000",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f4 === "Геохимические исследования") {
          return {
            weight: 1,
            color: "#008080",
            opacity: 1,
            fillColor: "#008080",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f4 === "Освоение") {
          return {
            weight: 1,
            color: "#008080",
            opacity: 1,
            fillColor: "#008080",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f4 === "Минералогические исследования") {
          return {
            weight: 1,
            color: "#8B4513",
            opacity: 1,
            fillColor: "#8B4513",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f4 === "Геофизические исследования") {
          return {
            weight: 1,
            color: "#B8860B",
            opacity: 1,
            fillColor: "#B8860B",
            fillOpacity: 0.07,
          };
        } else if (feature.properties.f4 === "Прогнозно-поисковые работы") {
          return {
            weight: 1,
            color: "#000",
            opacity: 1,
            fillColor: "#000",
            fillOpacity: 0.07,
          };
        }
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
          "<tr><td><b>Объект: </b></td>" +
            feature.properties.f10 +
            "<br><br><div><b>Название: </b>" +
            feature.properties.f1 +
            "<br><br><div><b>Автор (авторы): </b>" +
            feature.properties.f2 +
            "</div><br><div><b>Год составления объекта учета: </b>" +
            feature.properties.f3 +
            "</div><br><div><b>Вид работ: </b>" +
            feature.properties.f4 +
            "</div><br><div><b>Инвентарные номера в каталогах учета: </b>" +
            feature.properties.f5 +
            "</div><br><div><b>Директория хранения: </b>" +
            feature.properties.f9 +
            '</div><br><div><b>Ссылка: </b><a href="' +
            feature.properties.f6 +
            '" target ="_blank"> перейти к файлу </div></div>',
          { permanent: false, sticky: true }
        );
        layer.bindTooltip(
          "<p><b>Объект: </b>" + feature.properties.f10 + "</p>",
          {
            permanent: false,
            sticky: true,
            offset: [10, 0],
          }
        );
        layer.on("mouseover", function() {
          this.setStyle({
            weight: 3.5,
            color: "#505050",
          });
        });
        layer.on("mouseout", function() {
          this.setStyle({
            weight: 1,
            color: "#000",
            dashArray: "10, 5",
            dashOffset: "0",
          });
        });
        layer.on("click", function() {
          this.$refs.map.fitBounds(getBounds());
        });
      };
    },
    onEachLayoutFunction() {
      return (feature, layer) => {
        layer.bindPopup(
          "<tr><td><b>Номенклатурный лист: </b></td>" +
            feature.properties.f1 +
            '</div><br><br><div><b>Ссылка: </b><a href="' +
            feature.properties.f2 +
            '" target ="_blank"> перейти к материалам </div></div>',
          { permanent: false, sticky: true }
        );
        layer.bindTooltip(feature.properties.f1);
      };
    },
  },
  created() {
    axios
      .all([
        axios.get("http://localhost:3000/api/geojson"),
        axios.get("http://localhost:3000/api/layout1B"),
        axios.get("http://localhost:3000/api/layout200K"),
        axios.get("http://localhost:3000/api/layout100K"),
      ])
      .then((resArr) => {
        console.log(
          resArr[0].data,
          resArr[1].data,
          resArr[2].data,
          resArr[3].data
        );
        this.error = null;
        this.geojson = resArr[0].data;
        this.layout1B = resArr[1].data;
        this.layout200K = resArr[2].data;
        this.layout100K = resArr[3].data;
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
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
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
</style>
