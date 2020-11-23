<template>
  <div id="app">
    <router-view :key="$route.path" />
  </div>
</template>

<style lang="scss" scoped>
.text {
  font-size: 17px;
  color: $primary-text-color;
}
</style>
