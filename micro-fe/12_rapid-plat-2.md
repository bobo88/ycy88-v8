# 团队标准工程搭建实践（二）

::: tip 主要事项
【封装业务组件（基于已经二次封装好的基础组件）】
:::

【数据驱动视图】，这个原理是我们封装组件中需要经常想到的点。

## 一、目标

## 1）封装一个「表单」的通用业务组件。

<!-- 基于低代码平台与后端 API 配合生成「菜单」。 -->

## 二、具体步骤（逐步实现的思路）

> 业务组件：src/components/FormComp/index.vue

## 1）从 Element Plus 中复制 form 组件的全部代码

```vue
<!-- src/components/FormComp/index.vue -->
<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker
            placeholder="选择时间"
            v-model="ruleForm.date2"
            style="width: 100%"
          ></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="即时配送" prop="delivery">
      <el-switch v-model="ruleForm.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="活动性质" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">
        立即创建
      </el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
// yb
</style>
```

页面效果如下所示（未封装前）：

![An image](/images/vue/form-1.png)

## 2）改成 setup 语法糖形式

```vue
<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleFormRef"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="活动名称" prop="name">
      <el-input
        v-model="ruleForm.name"
        type="text"
        placeholder="请输入活动名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="活动区域" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker
            placeholder="选择时间"
            v-model="ruleForm.date2"
            style="width: 100%"
          ></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="即时配送" prop="delivery">
      <el-switch v-model="ruleForm.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="活动性质" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item label="周期" prop="daterange">
      <el-date-picker
        v-model="ruleForm.daterange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">立即创建</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
const ruleFormRef = ref(null)

const ruleForm = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})

const rules = reactive({
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    {
      min: 3,
      max: 5,
      message: '长度在 3 到 5 个字符',
      trigger: 'blur'
    }
  ],
  region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
  date1: [
    {
      type: 'date',
      required: true,
      message: '请选择日期',
      trigger: 'change'
    }
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: '请选择时间',
      trigger: 'change'
    }
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: '请至少选择一个活动性质',
      trigger: 'change'
    }
  ],
  resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
  desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
})

// 提交表单
const submitForm = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      alert('submit!')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

// 重置表单
const resetForm = () => {
  ruleFormRef.value.resetFields()
}
</script>

<style lang="scss">
// yb
</style>
```

## 3）将代码中的 el-form-item 进行「抽象提取」

> 思路：将可变化的属性值进行汇总提取。

<!-- src/components/FormComp/index.vue -->

- type：表单元素类型（input、select、checkbox...）
- label：元素显示名称
- prop：对应的字段名称
- v-model：对应的数据值
- placeholder：
  - range-separator："至"
  - start-placeholder："开始日期"
  - end-placeholder："结束日期"
- option 子项
  - label
  - name
  - value
- ...

## 4）以 input/select 为例进行封装

```vue
<!-- src/components/FormComp/index.vue -->
<template>
  <el-form
    :model="customForm.model"
    :rules="customForm.rules"
    ref="ruleFormRef"
    :label-width="customForm.labelWidth"
    class="demo-ruleForm"
  >
    <!-- 遍历表单元素 -->
    <template v-for="(item, index) in customForm.list" :key="index">
      <!-- input / password -->
      <template v-if="item.type === 'input' || item.type === 'password'">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-input
            v-model="customForm.model[item.prop]"
            :type="item.type"
            :placeholder="item.placeholder"
            :clearable="item.clearable ?? true"
          ></el-input>
        </el-form-item>
      </template>
      <!-- select -->
      <template v-else-if="item.type === 'select'">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-select
            v-model="customForm.model[item.prop]"
            :placeholder="item.placeholder"
            :clearable="item.clearable ?? true"
          >
            <el-option
              v-for="(cItem, cIdx) in item.options"
              :key="cIdx"
              :label="cItem.label"
              :value="cItem.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
    </template>

    <!-- 操作按钮 -->
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即创建</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
const ruleFormRef = ref(null)

// 自定义表单元素和个数
const customForm = reactive({
  model: {
    name: '',
    region: ''
  },
  list: [
    {
      type: 'input',
      prop: 'name',
      label: '活动名称',
      placeholder: '请输入活动名称'
      // clearable: true, // 不设置，则默认为true
    },
    {
      type: 'select',
      prop: 'region',
      label: '活动区域',
      placeholder: '请选择活动区域',
      options: [
        {
          label: '区域一',
          value: 'beijing',
          name: 'beijing'
        },
        {
          label: '区域二',
          value: 'shanghai',
          name: 'shanghai'
        }
      ]
    }
  ],
  labelWidth: '100px',
  rules: {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      {
        min: 3,
        max: 5,
        message: '长度在 3 到 5 个字符',
        trigger: 'blur'
      }
    ],
    region: [{ required: true, message: '请选择活动区域', trigger: 'change' }]
  }
})

// 提交表单
const submitForm = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      alert('submit!')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

// 重置表单
const resetForm = () => {
  ruleFormRef.value.resetFields()
}
</script>

<style lang="scss">
// yb
</style>
```

::: tip 提示
通过以上封装示例，我们可以做到不修改「template」里面的内容，只动态调整 customForm 对象里面的 model、list、rules 等属性值，就可以实现表单元素的动态展示，真正做到<span style="color:#f60;">【数据驱动视图】</span>。
:::

表单元素封装代码，如下（当前步骤）：

```vue
<!-- src/components/FormComp/index.vue -->
<template>
  <el-form
    :model="customForm.model"
    :rules="customForm.rules"
    ref="ruleFormRef"
    :label-width="customForm.labelWidth"
    class="demo-ruleForm"
  >
    <!-- 遍历表单元素 -->
    <template v-for="(item, index) in customForm.list" :key="index">
      <!-- input / password / textarea -->
      <template
        v-if="
          item.type === 'input' ||
          item.type === 'password' ||
          item.type === 'textarea'
        "
      >
        <el-form-item :label="item.label" :prop="item.prop">
          <el-input
            v-model="customForm.model[item.prop]"
            :type="item.type"
            :placeholder="item.placeholder"
            :clearable="item.clearable ?? true"
          ></el-input>
        </el-form-item>
      </template>
      <!-- select -->
      <template v-else-if="item.type === 'select'">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-select
            v-model="customForm.model[item.prop]"
            :placeholder="item.placeholder"
            :clearable="item.clearable ?? true"
          >
            <el-option
              v-for="(cItem, cIdx) in item.options"
              :key="cIdx"
              :label="cItem.label"
              :value="cItem.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>

      <!-- date  -->
      <template v-else-if="item.type === 'date'">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-date-picker
            :type="item.type"
            :placeholder="item.placeholder"
            :clearable="item.clearable ?? true"
            v-model="customForm.model[item.prop]"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </template>

      <!-- time  -->
      <template v-else-if="item.type === 'time'">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-time-picker
            :placeholder="item.placeholder"
            :clearable="item.clearable ?? true"
            v-model="customForm.model[item.prop]"
            style="width: 100%"
          ></el-time-picker>
        </el-form-item>
      </template>

      <!-- switch  -->
      <template v-else-if="item.type === 'switch'">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-switch v-model="customForm.model[item.prop]"></el-switch>
        </el-form-item>
      </template>

      <!-- checkbox  -->
      <template v-else-if="item.type === 'checkbox'">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-checkbox-group v-model="customForm.model[item.prop]">
            <el-checkbox
              v-for="(cItem, cIdx) in item.options"
              :key="cIdx"
              :label="cItem.label"
              :name="cItem.name"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </template>

      <!-- radio  -->
      <template v-else-if="item.type === 'radio'">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-radio-group v-model="customForm.model[item.prop]">
            <el-radio
              v-for="(cItem, cIdx) in item.options"
              :key="cIdx"
              :label="cItem.label"
            ></el-radio>
          </el-radio-group>
        </el-form-item>
      </template>

      <!-- daterange  -->
      <template v-else-if="item.type === 'daterange'">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-date-picker
            v-model="customForm.model[item.prop]"
            :type="item.type"
            :range-separator="item['range-separator'] ?? '至'"
            :start-placeholder="item['start-placeholder'] ?? '开始日期'"
            :end-placeholder="item['end-placeholder'] ?? '结束日期'"
          ></el-date-picker>
        </el-form-item>
      </template>

      <!-- TODO  -->
      <template>
        <!-- Other Form item -->
      </template>
    </template>

    <!-- 操作按钮 -->
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即创建</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
const ruleFormRef = ref(null)

// 自定义表单元素和个数
const customForm = reactive({
  model: {
    name: '',
    region: '',
    date: '',
    time: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    daterange: []
  },
  list: [
    {
      type: 'input',
      prop: 'name',
      label: '活动名称',
      placeholder: '请输入活动名称'
      // clearable: true, // 不设置，则默认为true
    },
    {
      type: 'select',
      prop: 'region',
      label: '活动区域',
      placeholder: '请选择活动区域',
      options: [
        {
          label: '区域一',
          value: 'beijing',
          name: 'beijing'
        },
        {
          label: '区域二',
          value: 'shanghai',
          name: 'shanghai'
        }
      ]
    },
    {
      type: 'date',
      prop: 'date',
      label: '活动日期',
      placeholder: '请选择活动日期'
    },
    {
      type: 'time',
      prop: 'time',
      label: '活动时间',
      placeholder: '选择时间'
    },
    {
      type: 'switch',
      prop: 'delivery',
      label: '即时配送'
    },
    {
      type: 'checkbox',
      prop: 'type',
      label: '活动性质',
      options: [
        {
          label: '美食/餐厅线上活动',
          name: 'type'
        },
        {
          label: '地推活动',
          name: 'type'
        },
        {
          label: '线下主题活动',
          name: 'type'
        },
        {
          label: '单纯品牌曝光',
          name: 'type'
        }
      ]
    },
    {
      type: 'radio',
      prop: 'resource',
      label: '特殊资源',
      options: [
        {
          label: '线上品牌商赞助',
          name: 'resource'
        },
        {
          label: '线下场地免费',
          name: 'resource'
        }
      ]
    },
    {
      type: 'textarea',
      prop: 'desc',
      label: '活动形式',
      placeholder: '请输入活动形式'
    },
    {
      type: 'daterange',
      prop: 'daterange',
      label: '周期',
      'range-separator': '～'
    }
  ],
  labelWidth: '100px',
  rules: {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      {
        min: 3,
        max: 5,
        message: '长度在 3 到 5 个字符',
        trigger: 'blur'
      }
    ],
    region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
    date: [
      {
        type: 'date',
        required: true,
        message: '请选择日期',
        trigger: 'change'
      }
    ],
    time: [
      {
        type: 'date',
        required: true,
        message: '请选择时间',
        trigger: 'change'
      }
    ],
    type: [
      {
        type: 'array',
        required: true,
        message: '请至少选择一个活动性质',
        trigger: 'change'
      }
    ],
    resource: [
      { required: true, message: '请选择活动资源', trigger: 'change' }
    ],
    desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
  }
})

// 提交表单
const submitForm = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      alert('submit!')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

// 重置表单
const resetForm = () => {
  ruleFormRef.value.resetFields()
}
</script>

<style lang="scss">
// yb
</style>
```

## 5）将 customForm 暴露给组件调用者

### A、表单元素封装代码【最终版本】

::: warning 提示
注意，此处的「最终版本」只是当前业务下的最终版本，表单组件的封装还可以根据不同的业务需要，进一步优化调整。
:::

```vue
<!-- src/components/FormComp/index.vue -->
<template>
  <el-form
    :model="customForm.model"
    :rules="customForm.rules"
    ref="ruleFormRef"
    :label-width="customForm.labelWidth"
    class="demo-ruleForm"
  >
    <!-- 遍历表单元素 -->
    <template v-for="(item, index) in customForm.list" :key="index">
      <!-- input / password / textarea -->
      <template
        v-if="
          item.type === 'input' ||
          item.type === 'password' ||
          item.type === 'textarea'
        "
      >
        <el-form-item :label="item.label" :prop="item.prop">
          <el-input
            v-model="customForm.model[item.prop]"
            :type="item.type"
            :placeholder="item.placeholder"
            :clearable="item.clearable ?? true"
          ></el-input>
        </el-form-item>
      </template>
      <!-- select -->
      <template v-else-if="item.type === 'select'">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-select
            v-model="customForm.model[item.prop]"
            :placeholder="item.placeholder"
            :clearable="item.clearable ?? true"
          >
            <el-option
              v-for="(cItem, cIdx) in item.options"
              :key="cIdx"
              :label="cItem.label"
              :value="cItem.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>

      <!-- date  -->
      <template v-else-if="item.type === 'date'">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-date-picker
            :type="item.type"
            :placeholder="item.placeholder"
            :clearable="item.clearable ?? true"
            v-model="customForm.model[item.prop]"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </template>

      <!-- time  -->
      <template v-else-if="item.type === 'time'">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-time-picker
            :placeholder="item.placeholder"
            :clearable="item.clearable ?? true"
            v-model="customForm.model[item.prop]"
            style="width: 100%"
          ></el-time-picker>
        </el-form-item>
      </template>

      <!-- switch  -->
      <template v-else-if="item.type === 'switch'">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-switch v-model="customForm.model[item.prop]"></el-switch>
        </el-form-item>
      </template>

      <!-- checkbox  -->
      <template v-else-if="item.type === 'checkbox'">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-checkbox-group v-model="customForm.model[item.prop]">
            <el-checkbox
              v-for="(cItem, cIdx) in item.options"
              :key="cIdx"
              :label="cItem.label"
              :name="cItem.name"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </template>

      <!-- radio  -->
      <template v-else-if="item.type === 'radio'">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-radio-group v-model="customForm.model[item.prop]">
            <el-radio
              v-for="(cItem, cIdx) in item.options"
              :key="cIdx"
              :label="cItem.label"
            ></el-radio>
          </el-radio-group>
        </el-form-item>
      </template>

      <!-- daterange  -->
      <template v-else-if="item.type === 'daterange'">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-date-picker
            v-model="customForm.model[item.prop]"
            :type="item.type"
            :range-separator="item['range-separator'] ?? '至'"
            :start-placeholder="item['start-placeholder'] ?? '开始日期'"
            :end-placeholder="item['end-placeholder'] ?? '结束日期'"
          ></el-date-picker>
        </el-form-item>
      </template>

      <!-- TODO  -->
      <template>
        <!-- Other Form item -->
      </template>
    </template>

    <!-- 操作按钮 -->
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即创建</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
const ruleFormRef = ref(null)

// 使用调用者传递过来的配置和数据
const { customForm } = defineProps({
  customForm: {
    type: Object,
    required: true
  }
})

// 提交表单
const submitForm = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      alert('submit!')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

// 重置表单
const resetForm = () => {
  ruleFormRef.value.resetFields()
}
</script>

<style lang="scss">
// yb
</style>
```

### B、调用封装的表单组件（代码如下）

```vue
<!-- src/views/commonModules/form/index.vue-->
<template>
  <div class="main-content-box">
    <h1>表单页面</h1>

    <!-- 调用封装的表单组件-->
    <form-comp :customForm="customForm" />
  </div>
</template>
<script setup name="ModulesFormIndex">
import FormComp from '@/components/FormComp/index.vue'

// 自定义表单元素和个数
const customForm = reactive({
  model: {
    name: '',
    region: '',
    date: '',
    time: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    daterange: []
  },
  list: [
    {
      type: 'input',
      prop: 'name',
      label: '活动名称',
      placeholder: '请输入活动名称'
      // clearable: true, // 不设置，则默认为true
    },
    {
      type: 'select',
      prop: 'region',
      label: '活动区域',
      placeholder: '请选择活动区域',
      options: [
        {
          label: '区域一',
          value: 'beijing',
          name: 'beijing'
        },
        {
          label: '区域二',
          value: 'shanghai',
          name: 'shanghai'
        }
      ]
    },
    {
      type: 'date',
      prop: 'date',
      label: '活动日期',
      placeholder: '请选择活动日期'
    },
    {
      type: 'time',
      prop: 'time',
      label: '活动时间',
      placeholder: '选择时间'
    },
    {
      type: 'switch',
      prop: 'delivery',
      label: '即时配送'
    },
    {
      type: 'checkbox',
      prop: 'type',
      label: '活动性质',
      options: [
        {
          label: '美食/餐厅线上活动',
          name: 'type'
        },
        {
          label: '地推活动',
          name: 'type'
        },
        {
          label: '线下主题活动',
          name: 'type'
        },
        {
          label: '单纯品牌曝光',
          name: 'type'
        }
      ]
    },
    {
      type: 'radio',
      prop: 'resource',
      label: '特殊资源',
      options: [
        {
          label: '线上品牌商赞助',
          name: 'resource'
        },
        {
          label: '线下场地免费',
          name: 'resource'
        }
      ]
    },
    {
      type: 'textarea',
      prop: 'desc',
      label: '活动形式',
      placeholder: '请输入活动形式'
    },
    {
      type: 'daterange',
      prop: 'daterange',
      label: '周期',
      'range-separator': '～'
    }
  ],
  labelWidth: '100px',
  rules: {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      {
        min: 3,
        max: 5,
        message: '长度在 3 到 5 个字符',
        trigger: 'blur'
      }
    ],
    region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
    date: [
      {
        type: 'date',
        required: true,
        message: '请选择日期',
        trigger: 'change'
      }
    ],
    time: [
      {
        type: 'date',
        required: true,
        message: '请选择时间',
        trigger: 'change'
      }
    ],
    type: [
      {
        type: 'array',
        required: true,
        message: '请至少选择一个活动性质',
        trigger: 'change'
      }
    ],
    resource: [
      { required: true, message: '请选择活动资源', trigger: 'change' }
    ],
    desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
  }
})

onMounted(() => {
  // TODO
})
</script>
<style></style>
```

页面效果如下所示（封装后）：

![An image](/images/vue/form-2.png)

## 三、注意事项

> TODO
