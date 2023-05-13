<template>
    <div>
        <navMenu />
        <div class="centered-content">
            <h1>Schemes</h1>
            <div class="centered-content">
                <p class="centered-text">
                </p>
            </div>
            <p class="big_left_title">Scheme I</p>
            <div class="centered-content">
                <p class="centered-text">
                </p>
            </div>
            <p class="big_left_title">Scheme II</p>
            <div class="centered-content">
                <p class="centered-text">
                </p>
                <div style="width: 1200px; height: 800px;">
                    <el-steps direction="vertical" :active="1">
                        <el-step title="step 1">
                            <div slot="description">
                                <el-card class="box-card">
                                    <div slot="header">
                                        <span>First we need to init the model, we load the diffusion models and the classifier weights</span>
                                    </div>
                                    <prism-editor class="my-editor height-300" v-model="stepCode1" :highlight="highlighter"
                                        :line-numbers="lineNumbers" :readonly="readonlyType"></prism-editor>
                                </el-card>
                            </div>
                        </el-step>

                        <el-step title="step 2">
                            <div slot="description">

                            </div>
                        </el-step>

                        <el-step title="step 3">
                            <div slot="description">

                            </div>
                        </el-step>
                    </el-steps>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import navMenu from "../components/NavMenu.vue"

import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
    name: 'SchemesPage',
    data() {
        return {
            active: 0,
            stepCode1: 'model, diffusion = create_model_and_diffusion(**args_to_dict(args, model_and_diffusion_defaults().keys()))\
    \nmodel.load_state_dict(dist_util.load_state_dict(args.model_path, map_location="cpu"))\n\
    \nclassifier = create_classifier(**args_to_dict(args, classifier_defaults().keys()))\
    \nclassifier.load_state_dict(dist_util.load_state_dict(args.classifier_path, map_location="cpu"))\n\
    \nexternal_model = init_external_model("resnet101_dwt")',
            lineNumbers: true, // true 显示行号   false 不显示行号
            readonlyType: true //true不可编辑   false 可编辑
        };
    },
    methods: {
        next() {
            if (this.active++ > 2) this.active = 0;
        },
        highlighter(code) {
            return highlight(code, languages.python); //returns html
        }
    },
    components: {
        navMenu,
        PrismEditor
    }
}
</script>

<style>
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
    font-weight: 900;
    font-size: 5em;
}

.big_left_title {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-size: 3em;
}

.centered-image {
    width: 100%;
    text-align: center;
}

.centered-text {
    text-align: center;
    max-width: 73em;
    margin-bottom: 1em;
}

.left-image,
.right-image {
    position: absolute;
}

.left-image {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}

.right-image {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
}

p {
    font-family: "Open Sans", sans-serif;
    font-size: 1.2em;
    line-height: 1.5em;
}

html,
body {
    margin: 0;
    padding: 0;
}

.el-row {
    margin-bottom: 20px;
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
/* required class */
.my-editor {
 background: #2d2d2d;
 color: #ccc;
 
 font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
 font-size: 14px;
 line-height: 1.5;
 padding: 5px;
}
 
/* optional */
.prism-editor__textarea:focus {
 outline: none;
}
 
</style>