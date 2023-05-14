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
                <div style="width: 1200px; height: 2000px;">
                    <el-steps direction="vertical" :active="1">
                        <el-step title="step 1">
                            <div slot="description">
                                <el-card style="margin-bottom: 30px;" class="box-card">
                                    <div slot="header">
                                        <span>First, init the model and load the diffusion models and the
                                            classifier weights</span>
                                    </div>
                                    <prism-editor class="my-editor height-300" v-model="stepCode1" :highlight="highlighter"
                                        :line-numbers="lineNumbers" :readonly="readonlyType"></prism-editor>
                                </el-card>
                            </div>
                        </el-step>

                        <el-step title="step 2">
                            <div slot="description">
                                <el-card style="margin-bottom: 30px;" class="box-card">
                                    <div slot="header">
                                        <span>
                                            Second, at each sample we generate a random class from imageNet 1k and a fully
                                            noisy image x, and we will generate a sample of that
                                            class
                                        </span>
                                    </div>
                                    <prism-editor class="my-editor height-300" v-model="stepCode2" :highlight="highlighter"
                                        :line-numbers="lineNumbers" :readonly="readonlyType"></prism-editor>
                                </el-card>
                            </div>
                        </el-step>
                        <el-step title="step 3">
                            <div slot="description">
                                <el-card style="margin-bottom: 30px;" class="box-card">
                                    <div slot="header">
                                        <span>
                                            Third, we will run the denoising iteration for 1000 timesteps.
                                            At each time step of denosing iteration generate a condition mean using our
                                            noisy image x_t and classifier.Then sample
                                            the new image x_t-1 from the condition mean and thbe fixed variance. And use
                                            x_t-1 to repeat this process
                                        </span>
                                    </div>
                                    <prism-editor class="my-editor height-300" v-model="stepCode3" :highlight="highlighter"
                                        :line-numbers="lineNumbers" :readonly="readonlyType"></prism-editor>
                                </el-card>
                            </div>
                        </el-step>
                        <el-step title="step 4">
                            <div slot="description">
                                <el-card style="margin-bottom: 30px;" class="box-card">
                                    <div slot="header">
                                        <span>
                                            Fourth, at each time step of denosing iteration, we need to guide the image
                                            using our classifier.
                                            At the last 100 or 200 timestep of 1000 timesteps, we will apply our classifier.
                                            we put the noisy image into the classifier and get the a 1k tensor logits as the
                                            output
                                        </span>
                                    </div>
                                    <prism-editor class="my-editor height-300" v-model="stepCode4" :highlight="highlighter"
                                        :line-numbers="lineNumbers" :readonly="readonlyType"></prism-editor>
                                </el-card>
                            </div>
                        </el-step>
                        <el-step title="step 5">
                            <div slot="description">
                                <el-card style="margin-bottom: 30px;" class="box-card">
                                    <div slot="header">
                                        <span>
                                            Fifth, we calculate the log of the logits to guarantee the logits of different
                                            classifier work
                                            on the same scale. And we choose the y class which is the class we want to
                                            generate. And calculate
                                            the gradient of the logit of y class with respect to the image x. And simplely
                                            add the gradient to the mean of image x.
                                        </span>
                                    </div>
                                    <prism-editor class="my-editor height-300" v-model="stepCode5" :highlight="highlighter"
                                        :line-numbers="lineNumbers" :readonly="readonlyType"></prism-editor>
                                </el-card>
                            </div>
                        </el-step>
                        <el-step title="evaluations">
                            <div slot="description">
                                <el-card style="margin-bottom: 30px;" class="box-card">
                                    <div slot="header">
                                        <span>
                                            Finally we get a batch of samples and we can evaluate the quality of the
                                            samples.
                                        </span>
                                    </div>
                                    we compare the image batch with the corresponded imageNet 1k labed image dataset and get
                                    the inception score and FID score.
                                    <br />...
                                    <br />Inception Score: 144.25999450683594
                                    <br />FID: 98.79331800515857
                                    <br />sFID: 352.2540115306009
                                    <br />Precision: 0.89
                                    <br />Recall: 0.5701
                                </el-card>
                            </div>
                        </el-step>
                        <el-step title="end step">
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
            stepCode1: '# load the diffusion model\
                        \nmodel, diffusion = create_model_and_diffusion(**args_to_dict(args, model_and_diffusion_defaults().keys()))\
                        \nmodel.load_state_dict(dist_util.load_state_dict(args.model_path, map_location="cpu"))\n\
                        \n# load the pre-trained special noise classifier \
                        \nclassifier = create_classifier(**args_to_dict(args, classifier_defaults().keys()))\
                        \nclassifier.load_state_dict(dist_util.load_state_dict(args.classifier_path, map_location="cpu"))\n\
                        \n# load external classifier \
                        \nexternal_model = init_external_model("resnet101_dwt")',

            stepCode2: '# randn a noise image\
                        \nnoise = th.randn_like(x)\
                        \n# randn a spcial class\
                        \nclasses = th.randint(low=0, high=NUM_CLASSES, size=(args.batch_size,), device=dist_util.dev())\
                        \nmodel_kwargs["y"] = classes',
            stepCode3: '# generate the condition mean and time t, model_kwargs is the classes y mentioned before\
                        \nout["mean"] = self.condition_mean(cond_fn, out, x, t, model_kwargs=model_kwargs)\
                        \n\n# generate new sample using condtion mean and fixed noise\
                        \nsample = out["mean"] + nonzero_mask * th.exp(0.5 * out["log_variance"]) * noise\
                        \n# then continue the p_sample_loop()',
            stepCode4: '# the condition guide fuction, y is the \
                        \ndef cond_fn(x, t, y=None):\
                        \n...\
                        \n# apply_steps can be 100 or 200 or some timesteps you like\
                        \nif t[0] <= apply_steps:\
                        \n\t# change the original image x (size, channels, shape) to adapt the external model\
                        \n\tnew_tensor = pre_process(x_in, \'resnet101_dwt\')\
                        \n\t# use the external model to get the logits\
                        \n\tlogits = external_model(new_tensor)\
                        \nelse:\
                        \n\tlogits = classifier(x_in, t)',
            stepCode5: '# calculate the log of logits \
                        \nlog_probs = F.log_softmax(logits, dim=-1)\
                        \n# choose the y class \
                        \nselected = log_probs[range(len(logits)), y.view(-1)]\\n# choose the y class \
                        \n# calculate the gradient\
                        \nreturn th.autograd.grad(selected.sum(), x_in)[0] * args.classifier_scale\
                        \n# add the gradient to the original mean and get the new mean\
                        \nnew_mean = (p_mean_var["mean"].float() + p_mean_var["variance"] * gradient.float())',
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