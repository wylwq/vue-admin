<template>
  <div>
      <h3 style="text-align:center;">订单销量每周统计报表</h3>
      <div class="total-class" id="myChart" :style="{width: '100%', height: '400px'}"></div>
  </div>
</template>
<script>
import {statisticsOrder} from '@/api/order.js';
export default {
    data() {
      return {
        option: {},
        xAxisData: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
        seriesData: [5, 20, 36, 10, 10, 20]
      }
    },
    methods: {
      drwaLine() {
        //绘制图表
        statisticsOrder().then(response => {
          let data = response.data;
          let keys = Object.keys(data);
          this.xAxisData = keys;
          let values = Object.values(data);
          this.seriesData = values;
          let myChart = this.$echarts.init(
          document.getElementById('myChart')
          )
          this.option = {
            color:['#46A3FF'],
            tooltip: {trigger: 'axis'},
            legend: {
                data:['销量']
            },
            toolbox: {
              show : true,
              feature : {
                      mark : {show: true},
                      dataView : {show: true, readOnly: false},
                      magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                      restore : {show: true},
                      saveAsImage : {show: true}
              }
            },
            calculable : true,
            xAxis: [
              {
                type: 'category',
                boundaryGap:false,
                data: this.xAxisData
              }
            ],
            yAxis: [{
              type:'value'
            }],
            series: [{
                name: '销量',
                smooth:true,
                type: 'line',
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: this.seriesData
            }]
          }
          myChart.setOption(this.option);
        }).catch(error => {

        })

      }
    },
    mounted() {
      this.drwaLine();
    }
}
</script>
<style lang='scss' scoped>
</style>