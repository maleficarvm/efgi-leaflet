<template>
  <div class="wrapper-content wrapper-content--fixed">
    <div class="wrapper-table" data-app>
      <v-card>
        <v-card-title>
          <p>
            Лаборатория ЕБГИ. Сводная таблица объектов учета фондовых материалов
            до 2016 года
          </p>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск по ЕБГИ..."
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="items"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="oid"
          show-expand
          class="elevation-1"
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 50, 100],
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus',
            'items-per-page-text': 'Объектов на странице: ',
          }"
          :items-per-page="10"
          :search="search"
          :sort-desc="[false, true]"
          multi-sort
          :header-props="{ sortIcon: null }"
          :loading="loadTable"
          loading-text="Загрузка... Подождите"
        >
          <template v-slot:expanded-item="{ item }">
            <td></td>
            <td>
              <tr>
                <b>№п/п: </b
                >{{
                  item.oid
                }}
              </tr>
              <tr>
                <b>Дата передачи: </b>
                {{
                  item.stor_date
                }}
              </tr>
            </td>

            <td>
              <b>Инициатор, причина передачи: </b>
              {{ item.stor_reason }}
            </td>
            <td>
              <tr>
                <b>Физическое место хранения:</b>
                {{
                  item.stor_phys
                }}
              </tr>
              <tr>
                <b>Подразделение:</b>
                {{
                  item.stor_dept
                }}
              </tr>
            </td>

            <td>
              <b>Составители: </b>
              {{ item.stor_person }}
            </td>
            <td>
              <tr>
                <b>Уникальный номер ЕБГИ: </b>
                {{
                  item.uniq_id
                }}
              </tr>
              <tr>
                <b>Группа ПИ: </b>
                {{
                  item.obj_group_min
                }}
              </tr>
            </td>

            <td>
              <b>Права на материалы: </b>
              {{ item.obj_rights }}
            </td>
          </template>
          <template v-slot:[`item.path_cloud`]="{ value }">
            <a target="_blank" :href="value">
              Перейти к материалам
            </a>
          </template>
          <template v-slot:[`item.oid`]="{ value }">
            <v-btn class="mx-1" fab dark x-small @click="onButtonClick(value)">
              <v-icon dark>mdi-television</v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.obj_year`]="{ item }">
            <v-chip :color="getColor(item.obj_year)" dark>{{
              item.obj_year
            }}</v-chip>
          </template>
        </v-data-table>
        <div class="text-center">
          <v-btn color="btn btnDefault" dark @click="downloadExcel">
            Скачать Excel
          </v-btn>
          <v-btn color="btn btnDefault" dark @click="downloadShp">
            Скачать .shp
          </v-btn>
          <v-btn color="btn btnDefault" dark @click="downloadForm">
            Скачать форму заявки
          </v-btn>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      expanded: [],
      singleExpand: false,
      loadTable: true,
      options: {},
      search: "",
      headers: [
        { text: "Показать на карте", value: "oid", sortable: false },

        { text: "Название объекта", value: "obj_name", width: "400" },
        { text: "Автор (авторы)", value: "obj_authors", width: "300" },
        { text: "Год составления объекта", value: "obj_year" },
        {
          text: "Инвентарные номера в каталогах учета",
          value: "obj_assoc_inv_nums",
          width: "300",
        },
        { text: "Полезные ископаемые основные", value: "obj_main_min" },
        {
          text: "Сведения о привязке в рамках АТД и АТЕ",
          value: "spat_atd_ate",
          width: "200",
        },
        { text: "Вид работ", value: "type_of_work" },
        { text: "Вид объекта учета", value: "obj_type" },
        {
          text: "Единицы хранения документа",
          value: "stor_units",
          width: "200",
        },
        { text: "Форматы материалов, типы файлов", value: "stor_fmts" },
        { text: "Организация (организации)", value: "obj_orgs" },
        {
          text: "Геологические объекты, ассоциируемые с объектом учета",
          value: "obj_assoc_geol",
          width: "300",
        },
        { text: "Местоположение", value: "spat_loc", width: "400" },
        {
          text: "Номенклатуры листов НД",
          value: "spat_num_grid",
          width: "200",
        },
        {
          text: "Дополнительные сведения о местоположении",
          value: "spat_toponim",
        },
        { text: "Дополнительные сведения", value: "stor_desc", width: "200" },
        {
          text: "Папка хранения цифровых данных",
          value: "stor_folder",
          width: "160",
        },
        {
          text: "Инициатор, причина передачи",
          value: "stor_reason",
          width: "500",
        },
        { text: "Дата передачи", value: "stor_date" },
        {
          text: "Условное название каталога учета",
          value: "obj_sub_type",
          width: "200",
        },
        {
          text: "Физическое место хранения",
          value: "stor_phys",
        },
        {
          text: "Подразделение, внесшее информацию",
          value: "stor_dept",
          width: "150",
        },
        {
          text: "Составитель (составители)",
          value: "stor_person",
          width: "150",
        },
        { text: "Права на материалы объекта", value: "obj_rights" },
        {
          text: "Ключевые слова, характеристики",
          value: "obj_terms",
          width: "400",
        },
        {
          text: "Ссылка на объект учета Nextcloud",
          value: "path_cloud",
          width: "400",
        },
      ],
      items: [],
    };
  },
  created() {
    axios
      .get("http://127.0.0.1:3000/api/json", {})
      .then((res) => {
        this.items = res.data;
        this.loadTable = false;
      })
      .catch((error) => {
        console.log(error.response);
        this.loadTable = true;
      });
  },
  methods: {
    onButtonClick(value) {
      console.log("click on " + value + " item");
      this.$router.push("/");
      this.$emit("on-click", value);
    },
    getColor(obj_year) {
      if (obj_year > 1934) return "orange";
      else if (obj_year > 1950) return "red";
      else return "grey";
    },
    downloadExcel() {
      const url = "#";
      window.location.href = url;
    },
    downloadShp() {
      const url = "#";
      window.location.href = url;
    },
    downloadForm() {
      const url = "#";
      window.location.href = url;
    },
  },
};
</script>

<style lang="scss">
input,
textarea,
select,
button {
  border: 0px !important;
}
.wrapper-table {
  margin: 40px 10px;
}
.v-select__slot {
  height: 25px;
}
.v-text-field__slot {
  padding-top: 30px;
  height: 30px;
}
.btnDefault {
  margin: 0px 10px 10px 0;
}
.text-center {
  text-align: left;
  margin-left: 10px;
}
//.v-data-table-header th {
//  white-space: nowrap;
//}
</style>
