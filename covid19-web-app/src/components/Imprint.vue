<template>
    <div>

    <v-container>
    <b-card-group deck>
        <b-card class="black-content" text-variant="white"  title="References">
            References Placeholder<br/>
            Data sources:<br/>
            Image sources:<br/>
        </b-card>

        <b-card class="black-content" text-variant="white"  title="Team">
            Authors Placeholder
        </b-card>
    </b-card-group>
    </v-container>

    <v-footer padless>
        <v-col
        class="text-center"
        cols="12"
        >
        {{ new Date().getFullYear() }} — <strong>Cartography Lab</strong>
        </v-col>
    </v-footer>

    </div>
</template>
<script>
  export default {
    data: () => ({
     
    }),
  }
</script>
<style scoped>
.black-content{
    background-color: #5e5e5e;
}
</style>