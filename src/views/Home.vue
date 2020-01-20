<template>
  <div class="container">
    <div class="left">
      <el-menu
       default-active="2"
        unique-opened
        class="el-menu-vertical-demo"
        router="router"
        background-color="#000"
        text-color="#fff"
        active-text-color="#808080"
         >
        <template v-for="(item, key) in routers">
          <template v-if="item.children">
            <el-submenu :index="`0-${key}`" :key="key">
              <template slot="title">
                <span>{{ item.title }}</span>
              </template>
              <template v-for="(route, index) in item.children">
                <el-menu-item :key="index" :index="`${key}-${index}`" :route="route.link">{{ route.title }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :key="key" :index="`0-${key}`" :route="item.link">{{ item.title  }}</el-menu-item>
          </template>
        </template>
      </el-menu>
      <div class="update" @click="update">Update</div>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// import MaterialItem from '@/components/MaterialItem'
// import MaterialDetail from '@/components/MaterialDetail'
export default {
  name: 'eHome',
  components: {
    // MaterialDetail
  },
  data () {
    return {
      routers: [
        {
          title: 'Components',
          children: [
            {
              title: 'Vue',
              link: '/materials/components/vue'
            },
            {
              title: 'React',
              link: '/materials/components/react'
            },
            {
              title: 'Others',
              link: '/materials/components/others'
            }
          ]
        },
        {
          title: 'Pages',
          children: [
            {
              title: 'Vue',
              link: '/materials/pages/vue'
            },
            {
              title: 'React',
              link: '/materials/pages/react'
            },
            {
              title: 'Others',
              link: '/materials/pages/others'
            }
          ]
        },
        {
          title: 'Templates',
          children: [
            {
              title: 'Vue',
              link: '/materials/templates/vue'
            },
            {
              title: 'React',
              link: '/materials/templates/react'
            },
            {
              title: 'Others',
              link: '/materials/templates/others'
            }
          ]
        },
        {
          title: 'Functions',
          link: '/materials/functions'
        }
      ]
    }
  },
  methods: {
    update () {

    }
  }
}
</script>
<style>
.container,
.body {
  width: 100%;
  height: 100%;
}
.container {
  display: flex;
}
.left {
  width: 200px;
  background: #fff;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
}
.body {
  flex: 1 1 auto;
}

.el-menu {
  position: relative;

  text-align: left;
  /* height: 100%; */
  flex: 1 1 auto;
}
.update {
  flex: 0 0 auto;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border: 1px solid #4fc08d;
  box-sizing: border-box;
  background: #4fc08d;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
