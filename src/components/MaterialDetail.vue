<template>
  <div class="material-detail">
    <div class="material-detail__content"></div>
    <div class="material-detail__meta">
      <div class="block-basic">
        <h2>sss</h2>
        <div class="block-action">
          <el-button type="primary" round size="mini">默认按钮</el-button>
          <el-button type="primary" round size="mini">默认按钮</el-button>
        </div>
      </div>
      <div class="block-meta">
        <h2>使用区块</h2>
        <div class="block-use-code">
          <p># 命令行方式</p>
          <p>$ fe add xxx</p>
        </div>
        <h2>基本信息</h2>
        <div class="block-tags">
          <div class="tag-label">所属分类</div>
          <div class="block-tag">
            <el-tag size="medium">中等标签</el-tag>
            <el-tag size="medium">中等标签</el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MaterialDetail'
}
</script>
<style lang="less" scoped>
.material-detail {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 20px 80px;

  &__content {
    flex: 1 1 auto;
    width: 70%;
    height: 100px;
  }

  &__meta {
    flex: 0 0 auto;
    width: 30%;
    text-align: left;

    h2 {
      margin: 30px 0 10px;
    }

    .block-basic {
      border-bottom: 1px solid #ccc;

      .block-action {
        display: flex;
        padding-bottom: 20px;
      }
    }

    .block-use-code {
      color: rgb(102, 102, 102);
      background: rgb(238, 238, 238);
      padding: 10px;
      p {
        margin: 0;
        padding: 5px 0;
        font-family: 'Fira Code' ,'Source Han Sans HW SC';
      }
    }

    .block-tags {
      display: flex;
      align-items: center;
      .tag-label {
        flex: 0 0 25%;
        width: 25%;
      }
      .block-tag {
        flex: 1;
        > span {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
