let pagination = {
    data() {
       return {
           currentPage:1,
           pageSize:10,
           totalPage:0,
           pageSizes:[10, 20, 50, 100]
       }
    },
    created() {

    },
    mounted() {
        
    },
    methods: {
        handleSizeChange(val) {
            this.page.pageSize = val;
            console.log(`每页 ${val} 条`);
            this.tableConfig.req.data.pageSize = val;
            this.loadingData();
        },
        handleCurrentChange(val) {
            this.page.pageNumber = val;
            console.log(`当前页: ${val}`);
            this.tableConfig.req.data.pageNumber = val;
            this.loadingData();
        }
    }
}
export default pagination;