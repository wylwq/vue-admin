import {loadingTable} from "@/api/requesturl.js";
let tableLoadData = {
    data() {
       return {
           
       }
    },
    created() {

    },
    mounted() {
        this.loadingData();
    },
    methods: {
        loadingData() {
            const req = this.tableConfig.req;
            const requestData = {
                url: req.url,
                method: req.method,
                data: req.data
            }
            this.loading = true;
            loadingTable(requestData).then(response =>{
                this.tableData = response.data;
                this.totalPage = response.total;
                this.loading = false;
            }).catch(error => {
                this.loading = false;
            })
        },
        loadingDataParams(params) {
            const req = this.tableConfig.req;
            const requestData = {
                url: req.url,
                method: req.method,
                data: req.data
            }
            requestData.data.userPhone = params.userPhone;
            requestData.data.address = params.address;
            requestData.data.sex = params.sex;
            requestData.data.userName = params.userName;
            this.loading = true;
            loadingTable(requestData).then(response =>{
                this.tableData = response.data;
                this.totalPage = response.total;
                this.loading = false;
            }).catch(error => {
                this.loading = false;
            })
        }
    }
}
export default tableLoadData;