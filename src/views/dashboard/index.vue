<template>
  <div class="dashboard-container">
    <div class="context">
      WELCOME!
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
<style>
  .context{
    position: fixed;
    width: 400px;
    height: 400px;
    text-align: left;
    top: 20%;
    left: 0;
    right: 0;
    margin: 0 auto;
    font-size: 150px;
    font-style: bold;
    color: #ddd;
  }
</style>
