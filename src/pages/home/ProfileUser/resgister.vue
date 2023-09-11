<template>
    <section>
        <div class="div" style="margin-left: 86px;padding-top: 17px;">
            <a-breadcrumb>
                <a-breadcrumb-item>Home</a-breadcrumb-item>
                <a-breadcrumb-item>resgister </a-breadcrumb-item>
            </a-breadcrumb>
        </div>

        <div class="container-fluid">
            <div class="row d-flex justify-content-center pt-4">
                <a-card title="Đăng kí" :bordered="false" style="width: 500px ;">

                    <div class="col-12 ">
                        <a-input placeholder="UserName" />
                    </div>
                    <div class="col-12 mt-3">
                        <a-input v-model:value="email" placeholder="Email" />
                    </div>
                    <div class="col-12 mt-3">
                        <a-input-password v-model:value="password" placeholder="Nhập lại mật khẩu" />
                    </div>
                    <div class="col-12 mt-3">
                        <a-input-password v-model:value="Repassword" placeholder="Nhập lại mật khẩu" />
                    </div>
                    <div class="col-12 mt-3">
                        <a-button style="width: 100%;">Đăng kí</a-button>
                    </div>

                    <div class="col-12 mt-3">
                        <div class="row">
                            <div class="col-md-5 col-5">
                                <hr>
                            </div>
                            <div class="col-md-2 col-2 d-flex justify-content-center mb-4">
                                <span>Hoặc</span>
                            </div>
                            <div class="col-md-5 col-5">
                                <hr>
                            </div>

                        </div>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6">
                                <a-button style="width: 100%;">
                                    <i class="fa-brands fa-facebook me-2"></i>
                                    <span>Facebook</span></a-button>
                            </div>
                            <div class="col-6">
                                <a-button style="width: 100%;">
                                    <i class="fa-brands fa-google me-2"></i>
                                    <span>Google</span>
                                </a-button>
                            </div>
                        </div>
                    </div>
                  
                </a-card>
            </div>
        </div>

    </section>
</template>

<script>
</script>