<template>
<v-container>
  <v-row class="text-center pa-0 pt-8">
    <v-col cols="2" class="pa-0 pt-3 pr-0">
      <v-select height="57" v-model="searchType" :items="searchTypes" outlined chips hide-details></v-select>
    </v-col>
    <v-col class="pl-0">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="searchTxt" @input="handleSearch" v-on="on" outlined placeholder="Search by title or imdbId"></v-text-field>

        </template>

        <v-card background="purple" z-index="999">
          <ul v-if="searchResults.length > 0">
            <li v-for="result in searchResults" :key="result.id" @click="selectResult(result)">
              {{ searchType==="Title"?result.Title : result.imdbID }}
            </li>
          </ul>
          <ul v-if="searchResults.length === 0 && searchTermResults.length > 0">
            <li v-for="result in searchTermResults" :key="result.id" @click="selectResult(result)">
              {{ searchType==="Title"?result.Title : result.imdbID }}
            </li>
          </ul>
        </v-card>
      </v-menu>
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
      searchTypes: ["Title", "IMDBIds"],
      searchResults: [],
      searchTermResults: []
    }
  },
  methods: {
    search(result) {
      this.$emit('search', {
        searchTxt: this.searchType === "Title" ? result.Title : result.imdbID,
        type: this.searchType
      });
    },
    getUrl(val) {
      let url = "http://www.omdbapi.com/?apikey=d3ff6b3d";
      switch (val.type) {
        case "Title":
          url += `&t=${val.searchTxt}`;
          break;
        case "IMDBIds":
          url += `&i=${val.searchTxt}`
      }
      return url;
    },
    onSearch(val, calledFrom) {
      this.favMovieList = [];
      fetch(this.getUrl(val))
        .then((r) => r.json())
        .then((resp) => {
          if (calledFrom === 'term') this.searchTermResults.push(resp);
          else this.searchResults.push(resp);
        })
    },
    handleSearch() {
      if (this.searchTxt.length >= 3) {
        this.onSearch({
          searchTxt: this.searchTxt,
          type: this.searchType
        });
      } else {
        this.searchResults = [];
      }
    },
    selectResult(result) {
      this.search(result);
    }
  },
  watch: {
    searchTxt() {
      if (this.searchTxt.length < 3) {
        this.onSearch({
          searchTxt: this.searchTxt,
          type: this.searchType
        }, 'term');
      } else {
        this.searchTermResults = [];
      }
    }
  }
}
</script>
