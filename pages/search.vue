<template>
  <div>
    Results for: {{ label }} <br />
    <div style="height:400px;width:400px;float:right;" ref="map"></div>
    <div v-if="homes.length > 0">
      <HomeRow
        v-for="home in homes"
        :key="home.objectID"
        :home="home"
      ></HomeRow>
    </div>
    <div v-else>No results found</div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: `Homes around ${this.label}`,
    };
  },
  mounted() {
    this.updateMap();
  },
  methods: {
    updateMap() {
      this.$maps.showMap(this.$refs.map, this.lat, this.lng);
    },
  },
  //  watchQuery: ["lat"],
  async beforeRouteUpdate(to, from, next) {
    const data = await this.$dataApi.getHomesByLocation(
      to.query.lat,
      to.query.lng
    );
    this.homes = data.json.hits;
    this.label = to.query.label;
    this.lat = to.query.lat;
    this.lng = to.query.lng;
    this.updateMap();
    next();
  },
  async asyncData({ query, $dataApi }) {
    const data = await $dataApi.getHomesByLocation(query.lat, query.lng);
    return {
      homes: data.json.hits,
      label: query.label,
      lat: query.lat,
      lng: query.lng,
    };
  },
};
</script>
