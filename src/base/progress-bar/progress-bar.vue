<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {prefixStyle} from '@/api/dom'
const transform = prefixStyle('transform')
const progressBtnWidth = 16
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent (newPercent) {
      if (newPercent >= 0) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const offsetWidth = newPercent * barWidth
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      }
    }
  }
}
</script>
<style scoped>
  .progress {
    width:0;
    height:6px;
    margin:2px 3px;
    /*box-shadow: 0 0 8px #0066e5;*/
    background-color: #54adff;
    border-radius: 3px;
  }
  .progress-btn-wrapper{
    position: absolute;
    left:-8px;
    top:-3px;
    width:16px;
    height:16px;
    border-radius: 8px;
    background-color: #eaeaea;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 5px #0018ff;
  }
  .progress-btn{
    width:10px;
    height:10px;
    background-color: #ef1c21;
    border-radius: 6px;
  }
</style>
