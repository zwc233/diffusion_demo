<template>
    <div>
        <navMenu />
        <div class="centered-content">
            <h1>Principles</h1>
            <div class="centered-content">
                <p class="centered-text">
                    Diffusion models are inspired by non-equilibrium thermodynamics.
                    They define a Markov chain of diffusion steps to slowly add random noise to data and then learn to
                    reverse the diffusion process to construct desired data samples from the noise.
                    Unlike VAE or flow models, diffusion models are learned with a fixed procedure and the latent variable
                    has high dimensionality (same as the original data).
                </p>
            </div>
            <img style="margin-left:2%" width="50%" src="../assets/images/DDPM.png" alt="DDPM" />
            <p class="big_left_title">Forward Process</p>
            <div class="centered-content">
                <p class="centered-text">
                    Given a data point sampled from a real data distribution
                    , let us define a forward diffusion process in which we add small amount of Gaussian noise to the sample
                    in
                    steps, producing a sequence of noisy samples
                    . The step sizes are controlled by a variance schedule
                </p>
            </div>
            <img style="margin-left:2%" width="50%" src="../assets/images/fp.png" alt="DDPM" />
            <p class="big_left_title">Backward Process</p>
            <div class="centered-content">
                <p class="centered-text">
                    If we can reverse the above process and sample from
                    , we will be able to recreate the true sample from a Gaussian noise input,
                    . Note that if
                    is small enough,
                    will also be Gaussian. Unfortunately, we cannot easily estimate
                    because it needs to use the entire dataset and therefore we need to learn a model
                    to approximate these conditional probabilities in order to run the reverse diffusion process.
                </p>
            </div>
            <img style="margin-left:2%" width="50%" src="../assets/images/bp.png" alt="DDPM" />
        </div>
    </div>
</template>

<script>
import navMenu from "../components/NavMenu.vue"

export default {
    name: 'principlesPage',
    methods: {
        handleClick() {
            this.$message('你好，这是一个新页面！');
        }
    },
    components: {
        navMenu,
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
}</style>