<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Vue Js 3</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Contacts</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create" class="nav-link">Add</router-link>
        </li>
      </div>
    </nav>
    <!-- <div class="container mt-3">
      <router-view />
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Navbar",
  components: {
    // HelloWorld,
  },
};
</script>
