import { process } from '../env/index.js';

const repo = {
    'vue-webpack-template': {
        url: 'https://github.com/Inatuation/vue2-webpack-template.git',
        downloadUrl: process.env.NODE_ENV === 'development' ? '/Users/linyoujia/Desktop/学习/po-cli-template/vue-webpack' : 'https://github.com:Inatuation/vue2-webpack-template#main',
        description: 'vue2 + webpack'
    }
}

export default repo;