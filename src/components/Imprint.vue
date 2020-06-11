<template>
    <div>

    <v-container>
    <b-card-group deck>
        <b-card class="black-content" text-variant="white"  header="Sources">
            <b>References</b><br/>
            <v-row class="source" >
            [1] “China's mass transit in high gear as Spring Festival travel rush starts,” 10-Jan-2020.
            </v-row>
            <br/>
            <b>Data sources</b><br/>
            <v-row>
            <b-button class="source" variant="dark" href="https://github.com/BlankerL/DXY-COVID-19-Data" >
            COVID-19/2019-nCoV Infection Time Series Data Warehouse
            </b-button>
            </v-row>
            <v-row>
            <b-button class="source" variant="dark" href="https://www.chinadaily.com.cn/a/202001/10/WS5e17de37a310cf3e35583b07.html">
            News on China Daily
            </b-button>
            </v-row>
            <br/>
            <b>Image sources</b><br/>
            <v-row>
            <b-button class="source" variant="dark" href="https://www.google.com/search?q=virus+icon+png+rounded&tbm=isch&ved=2ahUKEwj98o-x4unpAhUXMRoKHT5wA84Q2-cCegQIABAA&oq=virus+icon+png+rounded&gs_lcp=CgNpbWcQAzoGCAAQCBAeUIicIFjfpSBgi6ggaABwAHgAgAHIBogBhA6SAQczLTMuNi0xmAEAoAEBqgELZ3dzLXdpei1pbWc&sclient=img&ei=zMDZXv3cLJfiaL7gjfAM&bih=798&biw=1387#imgrc=vV9hQoyVxxqWkM" >
            Icon of Virus
            </b-button>
            </v-row>
            <v-row>
            <b-button class="source" variant="dark" href="https://www.google.com/search?q=wuhan+huanan+market&sxsrf=ALeKk01rbok8TltNZg0UyRvQUDqdGIlqQQ:1591330387102&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj95sXT5-npAhUKDuwKHXb1AdEQ_AUoAXoECBUQAw&biw=1387&bih=798#imgrc=bKBhC7tnbnfZuM" >
            Image of Huanan Market
            </b-button>
            </v-row>
        </b-card>

        <b-card class="black-content" text-variant="white"  header="Team">
            <b class="source"> Yuchang Jiang, Tianyu Wu</b>
            <br/><br/>
            <v-row class="source">
            Institute of Cartography and Geoinformation (IKG)
            <br/><br/>
            ETH Zürich
            <br/><br/>
            Cartography Lab
            <br/><br/>
            Spring Semester 2020
            </v-row>
        </b-card>
    </b-card-group>
    </v-container>

    <v-footer padless>
        <v-col
        class="text-center"
        cols="12"
        >
        {{ new Date().getFullYear() }} — <strong>Cartography Lab </strong> ETH Zurich
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
.source{
    color: white;
    margin-left:8px;
    margin-bottom: 2px;
}
.black-content{
    background-color: #5e5e5e;
}
</style>