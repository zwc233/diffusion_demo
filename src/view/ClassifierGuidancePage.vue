<template>
    <div>
        <navMenu />
        <div class="centered-content">
            <h1 class="centered-title" style="font-family: Roboto, sans-serif;font-weight: 700;font-size: 3em;"> Sample
            </h1>
        </div>
        <el-container>
            <el-header>
            </el-header>
            <el-container>
                <el-aside style="margin-left: 2%;" width="50%">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="scale">
                            <el-radio-group v-model="form.scale">
                                <el-radio label="0">64 * 64</el-radio>
                                <el-radio label="1">128 * 128</el-radio>
                                <el-radio label="2">256 * 256</el-radio>
                                <el-radio label="3">512 * 512</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-row>
                            <el-col :span="12">
                                <el-tooltip class="item" effect="dark" content="nums of sameple you want to generate" placement="top-start">
                                    <el-form-item>
                                        <div slot="label">
                                            samples nums
                                        </div>
                                        <el-input v-model="form.num"></el-input>
                                    </el-form-item>
                                </el-tooltip>
                            </el-col>
                            <el-col :span="12">
                                <el-tooltip class="item" effect="dark" content="the denosing timesteps you want to denoise" placement="top-start">
                                    <el-form-item label="timesteps">
                                        <el-input v-model="form.timesteps"></el-input>
                                    </el-form-item>
                                </el-tooltip>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-tooltip class="item" effect="dark" content="choose the external classifier you want to guide the model" placement="top-start">
                                    <el-form-item label="classifier">
                                        <el-input v-model="form.classifier"></el-input>
                                    </el-form-item>
                                </el-tooltip>
                            </el-col>
                            <el-col :span="12">
                                <el-tooltip class="item" effect="dark" content="the timestep you want to apply external classifier" placement="top-start">
                                    <el-form-item label="apply time">
                                        <el-input v-model="form.applyTime"></el-input>
                                    </el-form-item>
                                </el-tooltip>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-tooltip class="item" effect="dark" content="choose a imageNet 1k class to generate" placement="top-start">
                                    <el-form-item label="target class">
                                        <el-input v-model="form.targetClass"></el-input>
                                    </el-form-item>
                                </el-tooltip>
                            </el-col>
                            <el-col :span="12">
                                <el-tooltip class="item" effect="dark" content="choose the scale of classifier to impact the diffusion model" placement="top-start">
                                    <el-form-item label="classifier scale">
                                        <el-input v-model="form.classifierScale"></el-input>
                                    </el-form-item>
                                </el-tooltip>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-tooltip class="item" effect="dark" content="choose the denosing wavename of dwt classifer model" placement="top-start">
                                    <el-form-item label="wave name">
                                        <el-input v-model="form.waveName"></el-input>
                                    </el-form-item>
                                </el-tooltip>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">Generate</el-button>
                                    <el-button>Cancel</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-aside>
                <el-main>
                    <el-row>
                        <el-col class="centered-content" :span="6">
                            <button @click="leftShift" style="margin-top: 160px;" type="button"
                                class="el-button el-button--primary is-circle">
                                <i class="el-icon-arrow-left"></i>
                            </button>
                        </el-col>
                        <el-col class="centered-content" :span="12">
                            <el-image style="width: 400px;" :src="imageData[curImage] || ''">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                        </el-col>
                        <el-col class="centered-content" :span="6">
                            <button @click="rightShift" style="margin-top: 160px;" type="button"
                                class="el-button el-button--primary is-circle">
                                <i class="el-icon-arrow-right"></i>
                            </button>
                        </el-col>
                    </el-row>
                    <!-- <div class="centered-content" v-for="(item) in imageData" :key="item.id">
                        <img :src="item" />
                    </div> -->
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import navMenu from "../components/NavMenu.vue"
import axios from 'axios'
export default {
    name: 'classifierGuidancePage',
    data() {
        return {
            imageData: [],
            curImage: 0,
            form: {
                scale: '',
                num: 16,
                timesteps: 250,
                classifier: 'resnet101',
                applyTime: 30,
                waveName: '',
                targetClass: 'pizza',
                classifierScale: 5
            }
        }
    },
    methods: {
        handleClick() {
            this.fetchData()
        },
        fetchData() {
            axios.get('http://localhost:3000/sample', {
                params: {
                    scale: this.form.scale,
                    num: this.form.num,
                    timesteps: this.form.timesteps,
                    classifier: this.form.classifier,
                    applyTime: this.form.applyTime,
                    waveName: this.form.waveName,
                    targetClass: this.form.targetClass
                }
            })
                .then(response => {
                    console.log(response.data)
                    for (var index in response.data) {
                        this.imageData.push('data:image/png;base64,' + response.data[index])
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        onSubmit() {
            console.log('submit!')
            this.fetchData()
        },
        leftShift() {
            if (this.imageData.length === 0) {
                return
            }
            this.curImage -= 1
            if (this.curImage < 0) {
                this.curImage = this.imageData.length - 1
            }
        },
        rightShift() {
            if (this.imageData.length === 0) {
                return
            }
            this.curImage += 1
            if (this.curImage > this.imageData.length - 1) {
                this.curImage = 0
            }
        },
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
</style>