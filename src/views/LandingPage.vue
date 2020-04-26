<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="primary"
    >
      <b-navbar-brand href="#">Home</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item href="/blog-overview">Dashboard</b-nav-item>

        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown
            text="Lang"
            right
          >
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="/user-profile-lite">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div :style="{ backgroundImage: 'url(' + image + ')' }">
      <b-container>
        <b-jumbotron
          lead="Bootstrap v4 Components for Vue.js 2"
          :style="{ backgroundColor: 'transparent', color: 'white' }"
          class="white"
        >
          <p>For more information visit website</p>
          <b-button
            variant="white"
            href="#"
          >More Info</b-button>
        </b-jumbotron>
      </b-container>
    </div>
    <b-container>
      <b-row fluid>
        <!-- Content here -->
        <b-card
          title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="m-4"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>

          <b-button
            href="#"
            variant="primary"
          >Go somewhere</b-button>
        </b-card>
        <b-card
          title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="m-4"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>

          <b-button
            href="#"
            variant="primary"
          >Go somewhere</b-button>
        </b-card>
        <b-card
          title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="m-4"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>

          <b-button
            href="#"
            variant="primary"
          >Go somewhere</b-button>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image:
        "https://images.unsplash.com/photo-1550645612-83f5d594b671?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    };
  }
};
</script>

