<template>
    <div>
        <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="startQuery()">
            <el-row style="text-align: left;">
                <el-col>
                    <el-form-item label="股票名称：" >
                        <el-input v-model="dataForm['gpmc']" placeholder="股票名称" clearable/>
                    </el-form-item>
                    <el-form-item label="股票代码：">
                        <el-input v-model="dataForm['gpdm']" placeholder="股票代码" clearable/>
                    </el-form-item>
                    <el-form-item label="股票类型：">
                        <el-select v-model="dataForm['gplx']" 
                            filterable 
                            placeholder="请输入股票类型" 
                            remote
                            clearable
                            @change="currentSel"
                            reserve-keyword
                            :remote-method="searchGplx">
                            <el-option
                                v-for="item in gplxList"
                                :key="item.gplx"
                                :label="item.gplx"
                                :value="item.gplx">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="股票报表：">
                        <el-select v-model="dataForm['gp_report']" 
                            filterable 
                            placeholder="请输入股票报表日期" 
                            remote
                            clearable
                            @change="currentSel"
                            reserve-keyword
                            :remote-method="searchGpReport">
                            <el-option
                                v-for="item in reportList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="股价：">
                        <el-input-number v-model="dataForm['zxjLow']" 
                            :max="dataForm['zxjHigh']" 
                            :controls="false" 
                            style="width: 5rem;"></el-input-number>
                        <span >~</span>
                        <el-input-number v-model="dataForm['zxjHigh']" 
                            :min="dataForm['zxjLow']"
                            :controls="false"
                            style="width: 5rem;" ></el-input-number>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="text-align: left;">
                <el-col>
                    <el-form-item label="总市值(亿)：">
                        <el-input-number v-model="dataForm['zszLow']" 
                            :max="dataForm['zszHigh']" 
                            :controls="false" 
                            style="width: 5rem;"></el-input-number>
                        <span >~</span>
                        <el-input-number v-model="dataForm['zszHigh']" 
                            :min="dataForm['zszLow']"
                            :controls="false"
                            style="width: 5rem;" ></el-input-number>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="startQuery()">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="clear" icon="el-icon-refresh" >重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col>
                <el-table ref="multipleTable" :data="dataList" height="635" tooltip-effect="dark" style="width: 100%"
                    v-loading="dataListLoading" @selection-change="handleSelectionChange" @sort-change="changeTableSort">
                    <el-table-column type="selection" width="50">
                    </el-table-column>
                    <el-table-column prop="gpdm" label="股票代码" sortable="true" width="100" >
                    </el-table-column>
                    <el-table-column prop="gpmc" label="股票名称" >
                    </el-table-column>
                    <el-table-column prop="gplx" label="股票类型" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="zxj" label="股价" sortable="true" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="zsz" label="总市值" sortable="true" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="mgsy" label="每股收益" sortable="true"  width="100" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="roe" label="ROE" sortable="true" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="cjl_hand" label="成交量(手)" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="syl_dynamic" label="市盈率(动)" sortable="true" width="100" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="zzc" label="总资产" sortable="true" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="zfz" label="总负债" sortable="true" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="gdqyhj" label="股东权益合计" sortable="true" width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="jlrtb" label="净利润同比" sortable="true" width="110" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="ystbl" label="营收同比" sortable="true" width="100" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="zys" label="总营收" sortable="true" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="zlr" label="总利润" sortable="true" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="jlr" label="净利润" sortable="true" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="ldbl" label="流动比率" sortable="true" width="100" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sdbl" label="速动比率" sortable="true" width="100" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="gsnzjz_jlr" label="公司内在价值(净)" sortable="true" width="140" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="gsnzjz_ys" label="公司内在价值(营)" sortable="true" width="140" show-overflow-tooltip>
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
const dataFormInit = {
    gpmc:'',
    gpdm:'',
    gplx:'',
    zxjLow: 0,
    zxjHigh: 30,
    zszLow: 300,
    zszHigh: undefined,
    gp_report: '2021_07_31',
}
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
        dataForm: dataFormInit,
        gplxList: [],
        reportList: [],
      }
    },
    created: function () { 
        console.log('from stocklist')
        this.searchGplx('')
        this.searchGpReport('')
    },
    methods: {
        currentSel(selVal) {
            this.selectid=selVal
        },
        searchGplx(query){
            this.dataListLoading = true
            axios({
                url: this.$global.apiUrl.BasicInfoApi + '/findGplxAll',
                method: 'post',
                data: {
                    gplx: query
                },
                headers: { 'content-type': 'application/json' }
            }).then(res => {
                this.gplxList = res.data
                this.dataListLoading = false
            }).catch(() => {
                this.gplxList = []
                this.dataListLoading = false
            })
        },
        searchGpReport(query){
            this.dataListLoading = true
            axios({
                url: this.$global.apiUrl.BasicInfoApi + '/findStockTable',
                method: 'post',
                data: {
                    keyword: query
                },
                headers: { 'content-type': 'application/json' }
            }).then(res => {
                this.reportList = res.data
                this.dataForm['gp_report'] = res.data[0]
                this.getDataList()
                this.dataListLoading = false
            }).catch(() => {
                this.reportList = []
                this.dataListLoading = false
            })
        },
        startQuery () {
            this.pageNum = 1
            this.getDataList()
        },
        clear () {
            this.dataForm = dataFormInit
            this.startQuery()
        },
        getDataList () {
            this.dataListLoading = true
            axios({
                url: this.$global.apiUrl.BasicInfoApi + '/findStockBySql',
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
                this.orderField = column.prop
            } else if(column.order==='descending'){
                this.order = 'desc'
                this.orderField = column.prop
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