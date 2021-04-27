<template>
  <div class="wrapper-content wrapper-content--fixed">
    <div class="wrapper-table" data-app>
      <v-card>
        <v-card-title>
          <p>Сводная таблица объектов учета ЕБГИ</p>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск..."
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="items"
          :single-select="singleSelect"
          item-key="oid"
          show-select
          class="elevation-1"
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50],
          }"
          :items-per-page="20"
          :search="search"
          :sort-desc="[false, true]"
          multi-sort
          loading
          loading-text="Загрузка... Подождите"
          ><template v-slot:top>
            <v-switch
              v-model="singleSelect"
              label="Одиночная выборка"
              class="pa-3"
            ></v-switch>
          </template>
          <template v-slot:[`item.path_cloud`]="{ value }">
            <a target="_blank" :href="value">
              {{ value }}
            </a>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      singleSelect: false,
      selected: [],
      loading: true,
      options: {},
      search: "",
      headers: [
        {
          text: "№ п.п.",
          align: "start",
          sortable: false,
          value: "oid",
        },
        { text: "Название объекта", value: "obj_name", width: "400" },
        { text: "Автор (авторы)", value: "obj_authors", width: "300" },
        { text: "Год составления объекта учета", value: "obj_year" },
        {
          text: "Инвентарные номера в каталогах учета",
          value: "obj_assoc_inv_nums",
          width: "300",
        },
        { text: "Группа полезных ископаемых", value: "obj_group_min" },
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
        { text: "Ссылка на объект учета", value: "path_cloud", width: "400" },
        //{ text: "Наименование регламентирующего документа (наименование работ)", value: "obj_rdoc_name", width: "400" },
        //{ text: "Number31", value: "obj_supl_min" },
        //{ text: "Number37", value: "spat_coords_source" },
        //{ text: "Number1", value: "uniq_id" },
        //{ text: "Number28", value: "obj_sources" },
        //{ text: "Number29", value: "obj_supl_info" },
        //{ text: "Number39", value: "spat_link" },
        //{ text: "Number40", value: "spat_json" },
        //{ text: "Number41", value: "inf_type" },
        //{ text: "Number42", value: "inf_media" },
        //{ text: "Number43", value: "path_local", width: "300" },
        //{ text: "Number45", value: "path_others" },
        //{ text: "Number46", value: "linked_objs" },
        //{ text: "Number47", value: "verified" },
        //{ text: "Number48", value: "status" },
        //{ text: "Number49", value: "timecode" },
        //{ text: "Number18", value: "obj_date" },
        //{ text: "Number22", value: "obj_restrict" },
        //{ text: "Номер регламентирующего документа (иной индентификатор)", value: "obj_rdoc_num" },
      ],
      items: [],
    };
  },
  watch: {
    options: {
      handler() {
        this.readDataFromAPI();
      },
    },
    deep: true,
  },
  created() {
    axios
      .get("http://127.0.0.1:3000/api/json", {})
      .then((response) => {
        this.items = response.data;
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
  //this will trigger in the onReady State
  mounted() {
    this.readDataFromAPI();
  },
};
</script>

<style lang="scss">
.wrapper-table {
  margin: 40px 10px;
}
</style>
