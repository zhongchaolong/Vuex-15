<template>
    <div class="login">
        <h1 ref="wokaixin">后台管理</h1>
        <!-- model用来关联表单数据, rules用来指定校验规则 -->
        <el-form label-position="left" label-width="80px" ref="ruleForm2" 
        :model="formLabelAlign" :rules="rules">
            <!-- 如果要表单校验与重置功能, 必须加上prop属性 -->
            <el-form-item label="账号" prop="user_name">
                <el-input v-model="formLabelAlign.user_name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="formLabelAlign.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">立即创建</el-button>
                <el-button @click='resetForm("ruleForm2")'>重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            // 校验账号, 将来配置到下面的validator配置项
            function unameFn(rule, value, callback) {
                if(value == '') {
                    callback(new Error('账号不能为空'))
                }else {
                    callback();
                }
            }
            // 校验密码, 将来配置到下面的validator配置项
            function upwdFn(rule, value, callback) {
                if(value == '') {
                    callback(new Error('密码不能为空'))
                }else {
                    callback();
                }
            }
            return {
                // 表单提交的数据
                formLabelAlign: {
                    user_name: '',
                    password: ''
                },
                // 表单校验规则
                rules: {
                    user_name: [
                        { required: true, message: '请填写账号', trigger: 'blur' },
                        { min: 3, max: 18, message: '账号在3~18位', trigger: 'blur' },
                        { validator: unameFn, trigger: 'blur' }
                    ],
                    password: [
                        { validator: upwdFn, trigger: 'blur' },
                        // required: true代表这个选项必须要填写，message提示语
                        // { required: true, message: '请填写密码', trigger: 'blur' },
                        // 三元表达式设定最少最大值
                        { pattern: /^\w{3,18}$/, message: '密码在3~18位', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            // 登录
            login() {
                this.$http.post(this.$api.login, this.formLabelAlign).then(res => {
                    if (res.data.status == 0) {
                         // 使用了路由插件后, 就会拥有该对象
                        // this.$alert('登陆成功, 马上跳转到首页');
                        // $router代表路由实例, $route代表url对象,
                        // 我们这里通过$route对象拿取url中的信息, $router对象进行路由跳转等操作
                        let nextPage = this.$route.query.nextPage;
                        // 判断是否有进入过，有的话直接进入，没有的去验证页面
                        this.$router.push({ path: nextPage? nextPage: '/admin' });
                    }else {
                        this.$alert(res.data.message);
                    }
                });
            },
            // 表单提交
            submitForm(formName) {
                this.$refs[formName].validate(result => {
                    // 全部都通过校验才登陆
                    if(result) {
                        this.login();
                    } 
                    else {
                        this.$alert('哥们! 不带这么玩的');
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }
</script>

<style scoped>
    .login {
        width: 400px;
        height: 200px;
        margin: 0 auto;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        padding: 20px;
        border: 1px solid #fff;
        border-radius: 6px;
    }
    h1 {
        position: absolute;
        top: -60px;
        width: 100%;
        text-align: center;
        font-size: 20px;
        color: #fff;
    }
</style>