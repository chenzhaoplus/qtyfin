<template>
    <div>
        <el-row>
            <el-col>
                <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="startQuery()">
                    <el-form-item label="股票名称：" >
                        <el-input v-model="dataForm['stockName']" placeholder="股票名称" clearable/>
                    </el-form-item>
                    <el-form-item label="股票代码：">
                        <el-input v-model="dataForm['stockCode']" placeholder="股票代码" clearable/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="startQuery()">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="clear" icon="el-icon-refresh" >重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-table ref="multipleTable" :data="dataList" height="650" tooltip-effect="dark" style="width: 100%"
                    @selection-change="handleSelectionChange" @sort-change="changeTableSort">
                    <el-table-column type="selection" width="50">
                    </el-table-column>
                    <el-table-column prop="股票代码" label="股票代码" sortable="true" width="100" >
                    </el-table-column>
                    <el-table-column prop="股票名称" label="股票名称" >
                    </el-table-column>
                    <el-table-column prop="股票类型" label="股票类型" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="最新价" label="最新价" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="总市值" label="总市值" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="每股收益" label="每股收益" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="净资产收益率-ROE" label="ROE" sortable="true" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="成交量-手" label="成交量(手)" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="市盈率-动态" label="市盈率(动)" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="总资产" label="总资产" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="总负债" label="总负债" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="股东权益合计" label="股东权益合计" width="100" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="净利润同比" label="净利润同比" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="营收同比率" label="营收同比" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="总营收" label="总营收" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="总利润" label="总利润" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="净利润" label="净利润" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="流动比率" label="流动比率" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="速动比率" label="速动比率" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="公司内在价值-净利润" label="公司内在价值(净)" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="公司内在价值-营收" label="公司内在价值(营)" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="block">
                    <el-pagination
                        @size-change="pageSizeChangeHandle"
                        @current-change="pageCurrentChangeHandle"
                        :current-page="pageNum"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
const axios = require('axios')
export default {
    name: 'stocklist',
    data () {
      return {
        radio: '2',
        checked: true,
        input: '',
        dataList: [],
        dataListLoading: false,     // 数据列表，loading状态
        total: 0,                   // 总条数
        order: '',                  // 排序，asc／desc
        orderField: '',             // 排序，字段
        pageNum: 1,                    // 当前页码
        limit: 10,                  // 每页数
        multipleSelection: [],
        dataForm: {
          stockName:'',
          stockCode:'',
        },
      }
    },
    created: function () { 
        console.log('from stocklist')
        this.getDataList()
    },
    methods: {
        startQuery () {
            this.pageNum = 1
            this.getDataList()
        },
        clear () {
            this.dataForm = {
                stockName:'',
                stockCode:'',
            }
            this.startQuery()
        },
        getDataList () {
            this.dataListLoading = true
            axios({
                url: '/findStockBySql',
                method: 'post',
                data: {
                    order: this.order,
                    sort: this.orderField,
                    pageNum: this.pageNum,
                    pageSize: this.limit,
                    ...this.dataForm,
                },
                headers: { 'content-type': 'application/json' }
            }).then(res => {
                this.dataListLoading = false
                this.dataList = res.data.content
                this.total = res.data.totalElements
            }).catch(() => {
                this.dataList = []
                this.total = 0
                this.dataListLoading = false
            })
        },
        pageSizeChangeHandle(val) {
            console.log(`每页 ${val} 条`);
            this.pageNum = 1
            this.limit = val
            this.getDataList()
        },
        pageCurrentChangeHandle(val) {
            console.log(`当前页: ${val}`);
            this.pageNum = val
            this.getDataList()
        },
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        changeTableSort(column) {
            console.log(column)
            if(column.order==='ascending'){
                this.order = 'asc'
                this.orderField = '`'+column.prop+'`'
            } else if(column.order==='descending'){
                this.order = 'desc'
                this.orderField = '`'+column.prop+'`'
            } else {
                this.order = ''
                this.orderField = ''
            }
            this.getDataList()
        }
    },
}
</script>

<style lang="less" scoped>
.el-row {
margin-bottom: 20px;
&:last-child {
    margin-bottom: 0;
}
}
.el-col {
border-radius: 4px;
}
.bg-purple-dark {
background: #99a9bf;
}
.bg-purple {
background: #d3dce6;
}
.bg-purple-light {
background: #e5e9f2;
}
.grid-content {
border-radius: 4px;
min-height: 36px;
}
.row-bg {
padding: 10px 0;
background-color: #f9fafc;
}
</style>