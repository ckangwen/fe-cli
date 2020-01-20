<template>
<div class="meterials">
  <div class="title">
    <h1>{{ title }}</h1>
  </div>
  <div class="content">
    <template v-for="(item, index) in list.data">
      <material-item
        :key="index"
        :snapshot="item.snapshot"
        :title="item.name"
      />
    </template>
  </div>
</div>
</template>
<script>
import MaterialItem from '@/components/MaterialItem'
import { getRepoInfo } from '@/api'
// import axios from 'axios'
export default {
  components: {
    MaterialItem
  },
  beforeRouteUpdate (to, from, next) {
    const { category, type } = to.params
    this.category = category
    this.type = type
    getRepoInfo({
      category: this.category,
      type: this.type
    }).then(res => {
      console.log(res)
      this.list = res
    })
    next()
  },
  data () {
    return {
      category: '',
      type: '',
      list: []
    }
  },
  computed: {
    title () {
      console.log(this.type)
      return ['react', 'vue', 'others'].indexOf(this.type) >= 0 ? (this.type).toUpperCase() : 'All'
    }
  },
  methods: {
  },
  mounted () {
    this.category = this.$route.params.category
    this.type = this.$route.params.type
    getRepoInfo({
      category: this.category,
      type: this.type
    }).then(res => {
      console.log(res)
      this.list = res
    })
  }

}
</script>
<style>
.title {
  text-align: left;
  padding-left: 30px;
  height: fit-content;
  border-bottom: 1px solid orangered;
}
.content {
  display: flex;
  flex-wrap: wrap;
}
</style>
