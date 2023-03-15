<template>
<v-app>
  <v-app-bar app color="primary" dark>
    <SearchBox @search="onSearch" />
    <v-spacer />
    <v-tooltip bottom>
      <template v-slot:activator="{ on  }">
        <v-btn icon @click="showFav" v-on="on">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </template>
      <span>Show Favourite</span>
    </v-tooltip>
  </v-app-bar>

  <v-main>
    <movie-card :movie-details="movieDetails" v-if="movieDetails.imdbID && favMovieList.length === 0" />
    <div v-else-if="favMovieList.length > 0" v-for="(movie,i) in favMovieList" :key="i">
      <movie-card :movie-details="movie" :key="i"></movie-card>
    </div>
  </v-main>
</v-app>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue';
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'App',
  components: {
    SearchBox,
    MovieCard
  },
  data() {
    return {
      movieDetails: {},
      favMovieList: [],
    }
  },
  methods: {
    showFav() {
      this.favMovieList = this.$store.getters.getFavMovies;
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
    onSearch(val) {
      this.favMovieList = [];
      fetch(this.getUrl(val))
        .then((r) => r.json())
        .then((resp) => {
          this.movieDetails = resp;
        })
    }
  }
};
</script>
