<template>
  <div class="tw-dock" :class="$style.root">
    <div class="tw-dock__search" :class="$style.search">
      <div v-if="showSearchWapper" :class="$style.search__content">
        <slot name="search" />
      </div>
      <span
        :class="[$style.search__action, { [$style['search__action_show']]: showSearchWapper }, { [$style['search__action_hide']]: !showSearchWapper }]"
        @click="toggleSearchWapper"
      >
        <el-icon :color="scss.sidebarTextcolor">
          <ArrowDownBold v-if="!showSearchWapper" />
          <ArrowUpBold v-else />
        </el-icon>
      </span>
    </div>

    <div class="tw-dock__content">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
const showSearchWapper = ref(false);

function toggleSearchWapper(): void {
  showSearchWapper.value = !showSearchWapper.value;
}
</script>

<style lang="scss" scoped></style>

<style lang="scss" module>
.root {
  .search {
    position: relative;

    .search__action {
      z-index: 1000;
      width: 60px;
      height: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $layout__maincontent__backgrount_color;
      box-shadow: $dark_backgrount_color_secondary 0px 0px 2px;
      border-radius: 8px;
      position: absolute;
      left: 50%;
      margin-left: -30px;
      cursor: pointer;
    }

    .search__action_show {
      bottom: -8px;
    }

    .search__action_hide {
      top: -12px;
    }
  }
}
</style>
