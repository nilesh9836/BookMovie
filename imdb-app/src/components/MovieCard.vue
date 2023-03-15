<template>
<v-card class="mx-auto my-12">
  <v-card-title>{{ movieDetails.Title}}</v-card-title>

  <v-card-subtitle>
    <span class="me-1 pl-1">{{ movieDetails.Type }}</span>
    <span class="me-1 pl-2">{{ movieDetails.Released }}</span>
    <span class="me-1 pl-2">{{ movieDetails.Runtime }}</span>

    <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
  </v-card-subtitle>

  <v-card-text class="pt-0">
    <div class="pa-1"><strong>Ratings</strong></div>
    <v-row class="ma-0 pa-1" v-for="(rating,i) in movieDetails.Ratings" :key="i">
      <div class="text-grey">
        {{rating.Source}}
      </div>
      <div class="text-grey ms-4">
        ({{rating.Value}})
      </div>
    </v-row>

  </v-card-text>
  <v-img cover height="400" :src="movieDetails.Poster"></v-img>
  <v-divider class="mx-4 mb-1"></v-divider>

  <div class="px-4">
    <v-chip-group v-model="selection">
      <v-chip v-for="(genre,i) in movieDetails.Genre.split(',')" :key="i">{{ genre }}</v-chip>
    </v-chip-group>
  </div>
  <div class="pa-2 pl-5"> {{ movieDetails.Plot}}</div>
  <v-divider />
  <div class="pa-2 pl-5"> <strong>Creators</strong> {{ movieDetails.Director}}</div>
  <v-divider />
  <div class="pa-2 pl-5"> <strong>Stars</strong> {{ movieDetails.Actors}}</div>
  <v-divider />
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-tooltip bottom>
      <template v-slot:activator="{ on  }">
        <v-btn icon @click="markAsFavourite" v-on="on">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </template>
      <span>Mark As Favourite</span>
    </v-tooltip>

  </v-card-actions>  
</v-card>
</template>

<script>
export default {
  name: 'MovieCard',

  data() {
    return {
      reveal: false,
      loading: false,
      selection: 1,
    }
  },
  props: {
    movieDetails: {
      type: Object
    }
  },
  methods: {
    markAsFavourite() {
      this.$store.dispatch('markAsFav', this.movieDetails)
    }
  }
}
</script>
