<template>
  <div class="material-item">
    <div class="material-item__snapshot">
      <img :src="snapshot" />
    </div>
    <div class="material-item__title">
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MaterialItem',
  props: {
    title: {
      type: String
    },
    snapshot: {
      type: String
    }
  }
}
</script>
<style lang="less" scoped>
.material-item {
  box-sizing: border-box;
  margin: 20px 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
  cursor: pointer;
  flex: 0 0 22%;
  // float: left;
  &__snapshot {
    height: 200px;
    display: flex;
    justify-content: center;
    align-content: center;
    img {
      max-width: 100%;
      max-height: 100%;
      display: block;
    }
  }
  &__title {
    margin: 0;
    padding: 10px;
    color: #333;
    border-top: 1px solid rgba(245, 245, 245, 0.555);
    text-align: center;

    h3 {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
