<template>
  <div id="app">
    <v-app id="inspire">
          <div>
              <v-app-bar
                  color="green darken-4"
                  dark
              >
                <v-app-bar-nav-icon 
                  color="blue-grey lighten-5"
                  @click.stop="drawer = !drawer"
                ></v-app-bar-nav-icon>

                <v-toolbar-title>
                  <v-icon>mdi-virus</v-icon>
                  COVID-2021</v-toolbar-title>

                <v-spacer></v-spacer>

                <a href="https://koronavirusinfo.az/az" target="_blank">
                  <v-btn
                      icon
                  >
                    <v-icon>mdi-allergy</v-icon>
                  </v-btn>
                </a>

                

                <v-menu
                  left
                  bottom
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                      v-for="country in countries"
                      :key="country"
                      @click="() => {}"
                      :to="'/country/' + country"
                    >
                      <v-list-item-title
                          @click="updateCountry(country)"
                      >{{ country }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-app-bar>
                  <v-navigation-drawer
                    v-model="drawer"
                    absolute
                    left
                    temporary
              >
                <v-list
                  nav
                  dense
                >
                  <v-list-item-group
                    v-model="group"
                    active-class="deep-purple--text text--accent-4"
                  >
                    <v-list-item 
                    v-for="item in items"
                    :key="item.title"
                    link
                    :to="item.link"
                    >
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-navigation-drawer>
          </div>
            <v-content>
              <v-container fluid>
                <router-view/>
              </v-container>
            </v-content>

            <v-footer app>

            </v-footer>
    </v-app>
  </div>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
      items: [
        { title: 'World summary', icon: 'mdi-earth', link: '/' },
        // { title: 'Countries', icon: 'mdi-flag', link: '/countries' },
        { title: 'Aze Turk', icon: 'mdi-newspaper', link: '/azerb' }
      ]
    }),
    mounted () {
      this.$store.dispatch('updateTopCountries')
    },
    methods: {
      updateCountry (country) {
        this.$store.dispatch('newCountryName', country)
      }
    },
    computed: {
      countries () {
        return this.$store.getters.topCountries
      }
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>

<style>
a {
  text-decoration: none;
}

</style>
