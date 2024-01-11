<template>
  <slot v-if="displayValue.length > 0" name="prefix" />
  <span>{{ displayValue }}</span>
  <SvgIcon v-if="!props.disabled && displayValue.length > 0" :name="show ? 'basic-eye_close' : 'basic-eye_open'" @click="toggleEnable" />
</template>

<script lang="ts">
enum DisplayMode {
  fixLength = 'fix-length',
  followContent = 'follow-content',
}

enum DesensitiveType {
  all = 'all',
  part = 'part',
}

enum DesensitiveMode {
  startEnd = 'start-end',
  middle = 'middle',
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';

const props = defineProps({
  /**
   * 原始文本（脱敏前）
   */
  raw: {
    type: String,
    required: true,
  },

  /**
   * 替换字符。
   *
   * 默认值："*"
   */
  replace: {
    type: String,
    required: false,
    default: '*',
  },

  /**
   * 显示模式。可选值["fix-length", "follow-content"]。
   *
   * 默认值："follow-content"
   */
  displayMode: {
    type: String,
    required: false,
    defalt: DisplayMode.followContent,
    validator(value: string) {
      switch (value) {
        case DisplayMode.fixLength:
        case DisplayMode.followContent:
          return true;
      }
      return false;
    },
  },

  /**
   * 显示长度
   *
   * 当displayMode="fix-length"，需要设置
   */
  displayLength: {
    type: Number,
    required: false,
    default: 10,
  },

  /**
   * 脱敏类型。可选值["all", "part"]。
   *
   * 默认值："all"
   */
  type: {
    type: String,
    required: false,
    default: DesensitiveType.all,
    validator(value: string) {
      switch (value) {
        case DesensitiveType.all:
        case DesensitiveType.part:
          return true;
      }
      return false;
    },
  },

  /**
   * 脱敏模式。可选值["start-end", "middle"]。
   *
   * 默认值："start-end"
   */
  mode: {
    type: String,
    required: false,
    default: DesensitiveMode.startEnd,
    validator(value: string) {
      switch (value) {
        case DesensitiveMode.startEnd:
        case DesensitiveMode.middle:
          return true;
      }
      return false;
    },
  },

  /**
   * 长度（首部）
   *
   * 默认值："2"
   */
  start: {
    type: Number,
    required: false,
    default: 2,
  },

  /**
   * 长度（尾部）
   *
   * 默认值："2"
   */
  end: {
    type: Number,
    required: false,
    default: 2,
  },

  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const displayValue = ref('');
const show = ref(props.disabled);

watch(
  () => [props.raw, props.replace, props.displayMode, props.displayLength, props.type, props.mode, props.start, props.end, props.disabled],
  () => {
    show.value = !props.disabled;
    onInput();
  },
);

function toggleEnable() {
  show.value = !show.value;
  onInput();
}

function onInput() {
  let result = '';
  if (props.raw.length <= 0) {
    displayValue.value = result;
    return;
  }

  if (props.disabled || !show.value) {
    displayValue.value = props.raw;
    return;
  }

  switch (props.displayMode) {
    case DisplayMode.followContent:
      result = fixContent();
      break;
    case DisplayMode.fixLength:
      result = fixLength();
      break;
  }

  displayValue.value = result;
}

function fixLength(): string {
  switch (props.type) {
    case DesensitiveType.all:
      return fixLength_all();
    case DesensitiveType.part:
      return fixLength_part();
  }
  return '';
}

function fixContent(): string {
  switch (props.type) {
    case DesensitiveType.all:
      return fixContent_all();
    case DesensitiveType.part:
      return fixContent_part();
  }
  return '';
}

function fixLength_all(): string {
  return props.replace.repeat(props.displayLength);
}

function fixLength_part(): string {
  switch (props.mode) {
    case DesensitiveMode.startEnd:
      // 优先start，不足补*
      if (props.displayLength <= props.raw.length) {
        if (props.displayLength <= props.start) {
          return props.replace.repeat(props.displayLength);
        } else {
          if (props.displayLength <= props.start + props.end) {
            return props.replace.repeat(props.start).concat(props.raw.substring(props.start, props.displayLength));
          } else {
            return props.replace
              .repeat(props.start)
              .concat(props.raw.substring(props.start, props.displayLength - props.end))
              .concat(props.replace.repeat(props.end));
          }
        }
      } else {
        if (props.start >= props.raw.length) {
          return props.replace.repeat(props.displayLength);
        } else {
          return props.replace
            .repeat(props.start)
            .concat(props.raw.substring(props.start))
            .concat(props.replace.repeat(props.displayLength - props.raw.length));
        }
      }

    case DesensitiveMode.middle:
      // 优先start，不足补*
      if (props.displayLength <= props.raw.length) {
        if (props.displayLength <= props.start) {
          return props.raw.substring(0, props.displayLength);
        } else {
          if (props.displayLength <= props.start + props.end) {
            return props.raw.substring(0, props.start).concat(props.replace.repeat(props.displayLength - props.start));
          } else {
            return props.raw
              .substring(0, props.start)
              .concat(props.replace.repeat(props.displayLength - props.start - props.end))
              .concat(props.raw.substring(props.displayLength - props.end, props.displayLength));
          }
        }
      } else {
        if (props.start > props.raw.length) {
          return props.raw.concat(props.replace.repeat(props.displayLength - props.raw.length));
        } else {
          return props.raw.substring(0, props.start).concat(props.replace.repeat(props.displayLength - props.start));
        }
      }
  }

  return '';
}

function fixContent_all(): string {
  return props.raw
    .split('')
    .map(() => {
      return props.replace;
    })
    .join('');
}

function fixContent_part(): string {
  switch (props.mode) {
    case DesensitiveMode.startEnd:
      if (props.raw.length <= props.start + props.end) {
        return props.replace.repeat(props.raw.length);
      } else {
        return props.replace
          .repeat(props.start)
          .concat(props.raw.substring(props.start, props.raw.length - props.end))
          .concat(props.replace.repeat(props.end));
      }
    case DesensitiveMode.middle:
      if (props.raw.length <= props.start + props.end) {
        return props.raw;
      } else {
        return props.raw
          .substring(0, props.start)
          .concat(props.replace.repeat(props.raw.length - (props.start + props.end)))
          .concat(props.raw.substring(props.raw.length - props.end));
      }
  }

  return '';
}
</script>

<style lang="scss" scoped>
.svg-icon {
  cursor: pointer;
  margin-left: 4px;
}
</style>
