<template>
    <div class="overflow-h">
            <el-row :gutter="10">
              <el-col :span="6">
                <el-select v-if="initCity.province" v-model="province" @change="getCity" placeholder="省份">
                  <el-option
                    v-for="province in provinceData"
                    :key="province.id"
                    :label="province.name"
                    :value="province.name"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-if="initCity.city" v-model="city" @change="getArea" placeholder="省份">
                  <el-option
                    v-for="city in cityData"
                    :key="city.id"
                    :label="city.name"
                    :value="city.name"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-if="initCity.area" v-model="area" @change="getStreat" placeholder="省份">
                  <el-option
                    v-for="area in areaData"
                    :key="area.id"
                    :label="area.name"
                    :value="area.name"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-if="initCity.streat" v-model="streat" placeholder="省份">
                  <el-option
                    v-for="streat in streatData"
                    :key="streat.id"
                    :label="streat.name"
                    :value="streat.name"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
</template>
<script>
import {loadingcity} from "@/api/city.js";
export default {
    name:"cityPick",
    data() {
        return {
            provinceData:[],
            cityData:[],
            areaData:[],
            streatData:[],
            province:"",
            city:"",
            area:"",
            streat:"",
            addressResp:{},
            initCity:{
                province: false,
                city: false,
                area: false,
                streat: false,
            }
        }
        
    },
    methods:{
        getProvince() {
            console.log(111111111);
            this.clearCityData({"type":"city"});
            this.provinceData = [{'id':1, 'name':'zhangsan'}];
            loadingcity({}).then(response => {
                this.provinceData = response.data;
            }).catch(error => {

            })

        },
        getCity(val) {
            this.clearCityData({"type":"area"});
            loadingcity({val}).then(response => {
                this.cityData = response.data;
            }).catch(error => {

            })
        },
        getArea(val) {
            this.clearCityData({"type":"streat"});
            loadingcity({val}).then(response => {
                this.areaData = response.data;
            }).catch(error => {

            })
        },
        getStreat(val) {
            loadingcity({val}).then(response => {
                this.streatData = response.data;
            }).catch(error => {

            })
        },
        clearCityData(param) {
            const valueJson = {
                city:["city", "area", "streat"],
                area:["area", "streat"],
                streat:["streat"],
            }
            const arrObj = valueJson[param.type];
            arrObj.forEach(element => {
               this[element] = ""; 
            });
        },
        initPickComponet() {
            const initData = this.cityPickLevel;
            if(initData.length == 0) {
                for(let key in this.initCity) {
                    this.initCity[key] = true;
                }
            } else {
                initData.forEach(item => this.initCity[item] = true);
            }
        }
    },
    computed:{
        address() {
            const{province, city, area, streat} = this;
            return {
                province,
                city,
                area,
                streat,
            }
        }
    },
    watch:{
        address(val) {
            this.addressResp = val;
            console.log(this.addressResp);
            this.$emit('update:cityPickData', this.addressResp);
        }
    },
    props:{
        cityPickLevel:{
            type: Array,
            default:() =>[]
        },
        cityPickData:{
            type: Object,
            default:() =>{}
        }
    },
    beforeMount() {
        this.getProvince();
        this.initPickComponet();
    }
    
}
</script>
<style scoped lang="scss">

</style>