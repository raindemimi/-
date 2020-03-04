<template>
  <div>
    <el-button
      type="info"
      @click="exit"
    >
      退出
    </el-button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    exit () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang=""></style>
