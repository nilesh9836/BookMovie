<template>
<v-container>
  <v-row class="text-center pa-0 pt-8">
    <v-col cols="2" class="pa-0 pt-3 pr-0">
      <v-select height="57" v-model="searchType" :items="searchTypes" outlined chips hide-details></v-select>
    </v-col>
    <v-col class="pl-0">
      <v-text-field v-model="searchTxt" @change="onSearch" outlined placeholder="Search by title or imdbId"></v-text-field>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: 'searchBox',

  data() {
    return {
      searchTxt: "",
      searchType: "Title",
      searchTypes: ["Title", "IMDBIds"]
    }
  },
  methods: {
    onSearch() {
      this.$emit('search', {
        searchTxt: this.searchTxt,
        type: this.searchType
      });
    }
  }
}
</script>
