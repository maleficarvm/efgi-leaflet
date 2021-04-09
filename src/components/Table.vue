<template>
  <div class="wrapper-content wrapper-content--fixed">
    <div class="wrapper-table">
      <v-card>
        <v-card-title>
          <p>Сводная таблица объектов</p>
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
          :headers="headers"
          :items="items"
          :single-select="singleSelect"
          :footer-props="{
            'items-per-page-options': [20, 30, 40, 50],
          }"
          :items-per-page="20"
          :search="search"
          :sort-by="['calories', 'fat']"
          :sort-desc="[false, true]"
          multi-sort
          item-key="name"
          show-select
          class="elevation-1"
          loading
          loading-text="Загрузка... Подождите"
          ><template v-slot:top>
            <v-switch
              v-model="singleSelect"
              label="Single select"
              class="pa-3"
            ></v-switch>
          </template>
          <template v-slot:[`item.calories`]="{ item }">
            <v-chip :color="getColor(item.calories)" dark>
              {{ item.calories }}
            </v-chip>
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
      loading: true,
      options: {},
      search: "",
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "oid",
        },
        { text: "Number1", value: "uniq_id" },
        { text: "Number2", value: "stor_folder" },
        { text: "Number3", value: "stor_phys" },
        { text: "Number4", value: "stor_reason" },
        { text: "Number5", value: "stor_date" },
        { text: "Number6", value: "stor_dept" },
        { text: "Number7", value: "stor_person" },
        { text: "Number8", value: "stor_desc" },
        { text: "Number9", value: "stor_fmts" },
        { text: "Number10", value: "stor_units" },
        { text: "Number11", value: "obj_name" },
        { text: "Number12", value: "obj_synopsis" },
        { text: "Number13", value: "obj_main_group" },
        { text: "Number14", value: "obj_sub_group" },
        { text: "Number15", value: "obj_type" },
        { text: "Number16", value: "obj_sub_type" },
        { text: "Number17", value: "obj_assoc_inv_nums" },
        { text: "Number18", value: "obj_date" },
        { text: "Number19", value: "obj_year" },
        { text: "Number20", value: "obj_authors" },
        { text: "Number21", value: "obj_orgs" },
        { text: "Number22", value: "obj_restrict" },
        { text: "Number23", value: "obj_rights" },
        { text: "Number24", value: "obj_rdoc_name" },
        { text: "Number25", value: "obj_rdoc_num" },
        { text: "Number26", value: "obj_rdoc_id" },
        { text: "Number27", value: "obj_terms" },
        { text: "Number28", value: "obj_sources" },
        { text: "Number29", value: "obj_supl_info" },
        { text: "Number30", value: "obj_main_min" },
        { text: "Number31", value: "obj_supl_min" },
        { text: "Number32", value: "obj_group_min" },
        { text: "Number33", value: "obj_assoc_geol" },
        { text: "Number34", value: "spat_atd_ate" },
        { text: "Number35", value: "spat_loc" },
        { text: "Number36", value: "spat_num_grid" },
        { text: "Number37", value: "spat_coords_source" },
        { text: "Number38", value: "spat_toponim" },
        { text: "Number39", value: "spat_link" },
        { text: "Number40", value: "spat_json" },
        { text: "Number41", value: "inf_type" },
        { text: "Number42", value: "inf_media" },
        { text: "Number43", value: "path_local" },
        { text: "Number44", value: "path_cloud" },
        { text: "Number45", value: "path_others" },
        { text: "Number46", value: "linked_objs" },
        { text: "Number47", value: "verified" },
        { text: "Number48", value: "status" },
        { text: "Number49", value: "timecode" },
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
  methods: {
    getColor(calories) {
      if (calories > 400) return "red";
      else if (calories > 200) return "orange";
      else return "green";
    },
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
