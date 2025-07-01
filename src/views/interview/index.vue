<template>
  <div class="upload-container">
    <!-- 文件选择控件 -->
    <input
      type="file"
      ref="fileInput"
      @change="handleFileSelect"
      multiple
      accept=".jpg,.png,.pdf" 
    >
    
    <!-- 上传按钮 -->
    <button 
      :disabled="isUploading"
      @click="triggerFileSelect"
    >
      {{ isUploading ? '上传中...' : '选择文件' }}
    </button>

    <!-- 进度条 -->
    <div v-if="progress > 0" class="progress-bar">
      <div 
        class="progress" 
        :style="{ width: progress + '%' }"
      ></div>
      <span>{{ progress }}%</span>
    </div>

    <!-- 上传结果展示 -->
    <div v-if="uploadResult">
      <p v-if="uploadResult.success">上传成功！文件地址：{{ uploadResult.url }}</p>
      <p v-else class="error">上传失败：{{ uploadResult.message }}</p>
    </div>

 
  </div>
     <buttom @click="doload" >xiazai</buttom>
</template>

<script>
import axios from 'axios';
import request from '@/api/request';

export default {
  data() {
    return {
      selectedFiles: [],    // 选中的文件列表
      isUploading: false,   // 上传状态
      progress: 0,          // 上传进度
      uploadResult: null    // 上传结果
    };
  },
  methods: {
    // 触发文件选择
    triggerFileSelect() {
      this.$refs.fileInput.click();
    },

    // 处理文件选择
    handleFileSelect(event) {
      this.selectedFiles = event.target.files;
      if (this.selectedFiles.length > 0) {
        this.uploadFiles();
      }
    },

    // 验证文件
    validateFiles() {
      const MAX_SIZE = 10 * 1024 * 1024; // 10MB
      for (let file of this.selectedFiles) {
        if (file.size > MAX_SIZE) {
          this.uploadResult = {
            success: false,
            message: `文件 ${file.name} 超过大小限制`
          };
          return false;
        }
      }
      return true;
    },

    // 执行上传
    async uploadFiles() {
      if (!this.validateFiles()) return;

      this.isUploading = true;
      this.progress = 0;
      
      try {
        const formData = new FormData();
        
        // 多文件上传需要循环添加
        Array.from(this.selectedFiles).forEach(file => {
          formData.append('file', file); // 字段名根据后端接口调整
          formData.append('directory', 'upload');
        });

        // 发送请求（替换为你的上传接口）
        const response = await request.post('/oss/upload', formData, {
        });

        // 处理响应
        this.uploadResult = {
          url: response.data,
          success: true,
        };

      } catch (error) {
        console.error('上传失败:', error);
        this.uploadResult = {
          success: false,
          message: error.response?.data?.message || '上传服务异常'
        };
      } finally {
        this.isUploading = false;
        this.$refs.fileInput.value = ''; // 清空选择
      }
    },

    doload(){
      request.get( `/oss/download?filePath=upload/${this.uploadResult.url}`)
      .then(response => {
        let url = response.data;
        url = url.replace('http://', 'https://');
        window.open(url);
      })
      .catch(error => {
        console.error('下载失败:', error);
      })
  }
  },
};
</script>

<style scoped>
.upload-container {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #eee;
}

input[type="file"] {
  display: none;
}

button {
  padding: 10px 20px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #a0cfff;
  cursor: not-allowed;
}

.progress-bar {
  margin-top: 10px;
  height: 20px;
  background: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress {
  height: 100%;
  background: #67c23a;
  transition: width 0.3s;
}

.progress-bar span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #333;
}

.error {
  color: #f56c6c;
  margin-top: 10px;
}
</style>