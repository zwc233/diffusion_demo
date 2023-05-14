<template>
    <div>
        <navMenu />
        <div class="centered-content">
            <h1 class="centered-title"> Result </h1>
            <p class="centered-text">
                Depending on the sceond Scheme, we try to insert a external image classifier to guide the diffusion model.
                At each time_step,
                we put our noisy image into a imageNet 1k classifer and get a length 1k tensor which stand to the
                probability score of each class.
                then we get the gradient of this tensor and use it to change the mean value of the next sample noisy image.
                We mentioned before that the
                external classifier cant work well on the heavy noisy image, so we apply the external classifier on the
                sample image on the last 100 or 200 time step
                of the totally 1000 denoise step. And we have try many classifer in different scale images, and get the
                result as below shows
            </p>
            <h2>64 * 64 image</h2>
            <el-collapse style="width: 1200px;" v-model="activeNames1">
                <el-collapse-item title="Data" name="1">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>64 * 64 ImageNet 1k</span>
                        </div>
                        <el-table :data="tableData1" stripe style="width: 100%">
                            <el-table-column prop="classifier" label="分类器" width="180">
                            </el-table-column>
                            <el-table-column prop="steps" label="加入步骤" width="180">
                            </el-table-column>
                            <el-table-column prop="ISScore" label="IS score">
                            </el-table-column>
                            <el-table-column prop="FID" label="FID">
                            </el-table-column>
                            <el-table-column prop="sFID" label="sFID">
                            </el-table-column>
                            <el-table-column prop="precision" label="precision">
                            </el-table-column>
                            <el-table-column prop="recall" label="recall">
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-collapse-item>
                <el-collapse-item title="Chart" name="2">
                    <el-button @click="handleChartChange('chart1')">切换</el-button>
                    <div class="echart" id="chart1" :style="myChartStyle"></div>
                </el-collapse-item>
            </el-collapse>
            <h2>128 * 128 image</h2>
            <el-collapse style="width: 1200px;" v-model="activeNames2">
                <el-collapse-item title="Data" name="1">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>128 * 128 ImageNet 1k</span>
                            <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
                        </div>
                        <el-table :data="tableData2" stripe style="width: 100%">
                            <el-table-column prop="classifier" label="分类器" width="180">
                            </el-table-column>
                            <el-table-column prop="steps" label="加入步骤" width="180">
                            </el-table-column>
                            <el-table-column prop="ISScore" label="IS score">
                            </el-table-column>
                            <el-table-column prop="FID" label="FID">
                            </el-table-column>
                            <el-table-column prop="sFID" label="sFID">
                            </el-table-column>
                            <el-table-column prop="precision" label="precision">
                            </el-table-column>
                            <el-table-column prop="recall" label="recall">
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-collapse-item>
                <el-collapse-item title="Chart" name="2">
                    <div class="echart" id="chart2" :style="myChartStyle"></div>
                </el-collapse-item>
            </el-collapse>
            <h2>256 * 256 image</h2>
            <el-collapse style="width: 1200px;" v-model="activeNames3">
                <el-collapse-item title="Data" name="1">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>256 * 256 ImageNet 1k</span>
                            <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
                        </div>
                        <div v-for="o in 4" :key="o" class="text item">
                            {{ '列表内容 ' + o }}
                        </div>
                    </el-card>
                </el-collapse-item>
                <el-collapse-item title="Chart" name="2">
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
import navMenu from "../components/NavMenu.vue"
// import * as echarts from 'echarts'
import * as echarts from "echarts"
export default {
    name: 'resultPage',
    methods: {
        handleChartChange(key) {
            if (key == 'chart1') {
                this.activeTab1 += 1
                this.initEcharts(this.tabs[this.activeTab1 % 4], 'chart1')
            } else if (key == 'chart2') {
                this.activeTab2 += 1
                this.initEcharts(this.tabs[this.activeTab2 % 4], 'chart2')
            }
        },
        initEcharts(key, chartName) {
            const xData = []
            const yData = []
            const tableData = this[this.chartTable[chartName]]
            for (let i = 0; i < tableData.length; i++) {
                xData.push(tableData[i]['classifier'] + '-' + tableData[i]['steps'])
                yData.push(tableData[i][key])
            }
            const option = {
                xAxis: {
                    data: xData
                },
                yAxis: {},
                series: [
                    {
                        type: "bar", //形状为柱状图
                        data: yData
                    }
                ],
                grid: {
                    top: "20%",
                    left: "20%",
                    right: "0",
                    bottom: "20%"
                },
                title: {
                    text: `classifer-${key} chart`,
                },
            };
            if (!this.charts[chartName]) {
                this.charts[chartName] = echarts.init(document.getElementById(chartName))
            }
            this.charts[chartName].clear()
            this.charts[chartName].setOption(option, true)
            this.charts[chartName].resize()
        }
    },
    mounted() {
        this.initEcharts('ISScore', 'chart1')
        this.initEcharts('ISScore', 'chart2')
    },
    data() {
        return {
            charts: {},
            myChartStyle: { float: "left", width: "1200px", height: "300px" }, //图表样式

            chartTable: {
                chart1: 'tableData1',
                chart2: 'tableData2',
            },

            tabs: ['ISScore', 'FID', 'sFID', 'precision', 'recall'],
            activeTab1: 0,
            activeTab2: 0,

            activeNames1: ['1'],
            activeNames2: ['1'],
            activeNames3: ['1'],
            tableData1: [{
                classifier: '/',
                steps: '/',
                ISScore: '84.105',
                FID: '98.736',
                sFID: '321.602',
                precision: '0.877',
                recall: '0.53',
            },
            {
                classifier: 'resNet_101',
                steps: '100',
                ISScore: '85.090',
                FID: '100.274',
                sFID: '320.464',
                precision: '0.887',
                recall: '0.526',
            },
            {
                classifier: 'resnet101_dwt_haar',
                steps: '100',
                ISScore: '81.583',
                FID: '98.726',
                sFID: '321.796',
                precision: '0.867',
                recall: '0.533',
            },
            {
                classifier: 'resnet101_dwt_haar',
                steps: '200',
                ISScore: '81.465',
                FID: '98.980',
                sFID: '324.257',
                precision: '0.88',
                recall: '0.529',
            },
            ],
            tableData2: [{
                classifier: '/',
                steps: '/',
                ISScore: '137.495',
                FID: '98.838',
                sFID: '353.516',
                precision: '0.89',
                recall: '0.570',
            },
            {
                classifier: 'resNet_101',
                steps: '100',
                ISScore: '144.259',
                FID: '98.793',
                sFID: '352.254',
                precision: '0.907',
                recall: '0.541',
            },
            {
                classifier: 'resnet101_dwt_haar',
                steps: '100',
                ISScore: '141.339',
                FID: '98.884',
                sFID: '352.226',
                precision: '0.9',
                recall: '0.536',
            },
            {
                classifier: 'resnet101_dwt_db2',
                steps: '100',
                ISScore: '151.513',
                FID: '99.959',
                sFID: '353.512',
                recision: '0.9',
                recall: '0.5348',
            }
            ]
        }
    },
    components: {
        navMenu,
    }
}
</script>

<style>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    margin-top: 40px;
    width: 1200px;
}

.centered-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.centered-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

h1 {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-size: 4em;
}</style>