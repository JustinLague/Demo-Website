<template>
    <modal name="modal-add-image" :adaptive="true" width="70%" height="auto" @before-open="clear()">
        <div class="modal-content">
              <b-form-group v-if=isProject>
                <div class="row">
                    <div class="input-group px-2 py-2 bg-white shadow-sm col-lg-6">
                        <input id="upload-thumbnail" type="file" ref="inputThumbnail" @change="onChangeThumbnail" class="form-control border-0">
                        <label id="upload-label" for="upload">{{ image.thumbnailName || "Thumbnail"}}</label>
                        <div class="input-group-append">
                            <label for="upload-thumbnail" class="btn btn-light m-0 px-4"> <b-icon class="mr-2 text-muted" icon="cloud-upload"></b-icon><small class="text-uppercase font-weight-bold text-muted">Choisir une thumbnail</small></label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="image-area col-lg-6 offset-lg-6">
                        <div>
                            <b-icon class="delete" v-if="image.urlThumbnail" icon="x-circle-fill" font-scale="3" @click="onDeleteThumbnail"></b-icon>
                        </div>
                        <img id="imageResult" :src="image.urlThumbnail" alt="" class="img-fluid rounded shadow-sm mx-auto d-block">
                    </div>
                </div>
            </b-form-group>

            <b-form-group>
                <div class="row">
                    <div class="input-group px-2 py-2 bg-white shadow-sm col-lg-6">
                        <input id="upload" type="file" ref="inputImage" @change="onChangeImage" class="form-control border-0">
                        <label id="upload-label" for="upload">{{ image.imageName || "Image originale"}}</label>
                        <div class="input-group-append">
                            <label for="upload" class="btn btn-light m-0 px-4"> <b-icon class="mr-2 text-muted" icon="cloud-upload"></b-icon><small class="text-uppercase font-weight-bold text-muted">Choisir une image</small></label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="image-area col-lg-6 offset-lg-6">
                        <div>
                            <b-icon class="delete" v-if="image.urlImage" icon="x-circle-fill" font-scale="3" @click="onDeleteImage"></b-icon>
                        </div>
                        <img id="imageResult" :src="image.urlImage" alt="" class="img-fluid rounded shadow-sm mx-auto d-block">
                    </div>
                </div>
            </b-form-group>

            <b-form-group v-if=isProject>
                <div class="row">
                    <div class="col-lg-6">
                        <h6 class="subTitle">Français</h6>
                        <b-input placeholder="Titre de l'image" v-model="image.title[0]"></b-input>
                    </div>
                    <div class="col-lg-6">
                        <h6 class="subTitle">Anglais</h6>
                        <b-input placeholder="Titre de l'image" v-model="image.title[1]"></b-input>
                    </div>
                </div>
            </b-form-group>

            <b-form-group v-if=isProject>
                <div class="row">
                    <div class="col-lg-6">
                        <textarea placeholder="Description de l'art" class="form-control" v-model="image.artDescription[0]" rows="3"></textarea>
                    </div>
                    <div class="col-lg-6">
                        <textarea placeholder="Description de l'art" class="form-control" v-model="image.artDescription[1]" rows="3"></textarea>
                    </div>
                </div>
            </b-form-group>

            <b-form-group v-if=isProject>
                <div class="row">
                    <div class="col-lg-6">
                        <textarea placeholder="Description de l'image" class="form-control" v-model="image.description[0]" rows="3"></textarea>
                    </div>
                    <div class="col-lg-6">
                        <textarea placeholder="Description de l'image" class="form-control" v-model="image.description[1]" rows="3"></textarea>
                    </div>
                </div>
            </b-form-group>

            <b-form-group>
                    <b-button @click="addImage" variant="primary">Ajouter une photo</b-button>
                    <b-button class="float-right" @click="cancel" variant="danger">Cancel</b-button>
            </b-form-group>
        </div>
    </modal>
</template>

<script>
export default {
    props: {
        isProject: Boolean
    },
    data() {
        return {
            image: {
                imageName: "",
                dataImage : null,
                urlImage: null,
                thumbnailName: "",
                dataThumbnail : null,
                urlThumbnail: null,
                title: [],
                artDescription: [],
                description: [],
            }
        }
    },
    methods: {
        onChangeImage(e) {
            const file = e.target.files[0];
            this.image.imageName = file.name;
            this.image.dataImage = file;
            this.image.urlImage = URL.createObjectURL(file);
        },
        onChangeThumbnail(e) {
            const file = e.target.files[0];
            this.image.thumbnailName = file.name;
            this.image.dataThumbnail = file;
            this.image.urlThumbnail = URL.createObjectURL(file);
        },
        onDeleteImage() {
            this.clearRef();
            this.image.imageName = "";
            this.image.dataImage = null;
            this.image.urlImage = "";
        },
        onDeleteThumbnail() {
            this.clearRef();
            this.image.dataThumbnail = null;
            this.image.thumbnailName = "";
            this.image.urlThumbnail = "";
        },
        clear() {
            this.image.dataThumbnail = null;
            this.image.imageName = "";
            this.image.dataImage = null;
            this.image.urlImage = "";
            this.image.thumbnailName = "";
            this.image.urlThumbnail = "";
            this.image.title = [];
            this.image.artDescription = [];
            this.image.description = [];
        },
        clearRef() {
            this.$refs.inputImage.value = null;
            this.$refs.inputThumbnail.value = null;
        },
        cancel() {
            this.$modal.hide('modal-add-image');
        },
        addImage() {
            this.$emit('addImage', this.image)
            this.$modal.hide('modal-add-image');
        }
    },
    //delete this.
    computed: {
        console: () => console,
        window: () => window,
    }
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

textarea {
    min-height: 85px;
}

.input-group {
    border: 1px solid rgb(206, 212, 218);
    box-shadow: none !important;
    border-radius: 4px;
}

.delete {
    z-index: 1000;
    position: absolute;
    right: -15px;
    top: -15px;
}

.modal-content {
    padding: 30px;
    height: 100%;
    overflow: auto;
}

.modal-content::-webkit-scrollbar {
  display: none;
}
</style>