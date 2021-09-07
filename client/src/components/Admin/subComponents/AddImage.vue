<template>
    <b-modal
        id="modal-add-image" 
        size="lg" 
        title="Ajouter une image"
        centered
        @ok="addImage"
        @cancel="clear"
    >
        <div class="container-fluid" >
            <form ref="add-image-form" @submit.stop.prevent="handleSubmit">
                <b-form-group>
                    <div class="row">
                        <div class="col-lg-12 input-group px-2 py-2 bg-white shadow-sm ">
                            <input id="upload" type="file" ref="inputImage" @change="onChangeImage" class="form-control border-0">
                            <label id="upload-label" for="upload">{{ image.imageName || "Image originale"}}</label>
                            <div class="input-group-append">
                                <label for="upload" class="btn btn-light m-0 px-4"> <b-icon class="mr-2 text-muted" icon="cloud-upload"></b-icon><small class="text-uppercase font-weight-bold text-muted">Choisir une image</small></label>
                            </div>
                        </div>
                    </div>
                </b-form-group>
                
                <b-form-group>
                    <div class="row">
                        <div class="image-area col-lg-12">
                            <div>
                                <b-icon class="delete" v-if="image.imageUrl" icon="x-circle-fill" font-scale="2" @click="onDeleteImage"></b-icon>
                            </div>
                            <img id="imageResult" :src="image.imageUrl" alt="" class="img-fluid rounded shadow-sm mx-auto d-block">
                        </div>
                    </div>
                </b-form-group>

                <b-form-group>
                    <div>
                        <p v-if="this.error" class="error">{{ $t('admin.addImageErrorMessage') }}</p>
                    </div>
                </b-form-group>
            </form>
        </div>
        <template #modal-footer="{ ok, cancel }">
            <b-button size="sm" variant="danger" @click="cancel()">
                {{ $t('admin.cancel') }}
            </b-button>
            <b-button size="sm" variant="primary" @click="ok()">
                {{ $t('about.changeImage') }}
            </b-button>
        </template>
    </b-modal>
</template>

<script>
export default {
    data() {
        return {
            image: {
                imageName: "",
                dataImage : null,
                data64Image: null,
                imageUrl: null,
            },
            error: false
        }
    },
    methods: {
        async onChangeImage(e) {
            const file = e.target.files[0];
            this.image.imageName = file.name;
            this.image.dataImage = file;
            this.image.data64Image = await this.toBase64(file);
            this.image.imageUrl = URL.createObjectURL(file);
        },
        onDeleteImage() {
            this.clearRef();
            this.image.imageName = "";
            this.image.dataImage = null;
            this.image.data64Image = null;
            this.image.imageUrl = "";
        },
        clear() {
            this.image.imageName = "";
            this.image.dataImage = null;
            this.image.data64Image = null;
            this.image.imageUrl = "";
            this.error = false;
        },
        clearRef() {
            this.$refs.inputImage.value = null;
        },
        addImage(event) {
            event.preventDefault();

            this.handleSubmit();
        },
        toBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },
        handleSubmit() {
            if (!this.image.dataImage) {
                this.error = true;
                return;
            }

            this.$emit('addImage', this.image);
            this.clear();

            this.$nextTick(() => {
                this.$bvModal.hide('modal-add-image')
            })
        }
    },
}
</script>

<style scoped>
#upload {
    opacity: 0;
}

#upload-thumbnail {
    opacity: 0;
}

#upload-label {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    font-size: 1rem;
    font-weight: 400;
    color: rgb(108,117,125);
}

.image-area {
    position: relative;
}

.input-group {
    border: 1px solid rgb(206, 212, 218);
    box-shadow: none !important;
    border-radius: 4px;
}

.delete {
    z-index: 1000;
    position: absolute;
    right: 1px;
    top: -14px;
}

.modal-content {
    padding: 30px;
    height: 100%;
    overflow: auto;
}

.modal-content::-webkit-scrollbar {
  display: none;
}

.error {
    color: red;
}
</style>