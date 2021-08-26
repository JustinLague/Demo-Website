<template>
    <b-modal
        id="modal-add-project-to-section" 
        size="lg" 
        title="Ajouter un nouveau projet"
        centered
        modal-ok="Sauvegarder"
        @ok="addProject()"
        @cancel="clear()"
    >
        <div class="container-fluid">
            <div class="row">
                <div class="col-6">
                <div class="row">
                        <div>
                            <b-form-select v-model="selected">
                                <b-form-select-option v-for="project in projects" :key="project._id" :value="project">{{ $t('project.title', project.title) }}</b-form-select-option>
                            </b-form-select>
                        </div>
                </div>
                <div class="row">
                    {{ this.selected != null ?  $t('project.description', this.selected.description) : "description" }}
                </div>
                </div>
                <div class="col-6">
                    <Image-viewer :images=this.selected.images v-if="this.selected"></Image-viewer>
                    <div v-else>
                        images
                    </div>
                </div>
            </div>
        </div>
        <template #modal-footer="{ ok, cancel }">
            <b-button size="sm" variant="success" @click="onCreateProject()">
                {{ $t('admin.createNewProject') }}
            </b-button>
            <b-button size="sm" variant="danger" @click="cancel()">
                {{ $t('admin.cancel') }}
            </b-button>
            <b-button size="sm" variant="primary" @click="ok()">
                {{ $t('admin.add') }}
            </b-button>
        </template>
    </b-modal>
</template>

<script>
import ImageViewer from "../../subComponents/ImageViewer";
import { mapActions } from "vuex";
import { mapState } from "vuex";


export default {
    components: {
        ImageViewer
    },
    props: {
        sectionId: String
    },
    data() {
      return {
        selected: null,
      }
    },
    computed: {
        ...mapState("project", ["projects"]),
        console: () => console,
        window: () => window,
    },
    methods: {
        ...mapActions("dashboard", ["addProjectToSection"]),
        ...mapActions("project", ["createProject"]),
        addProject() {
            if (this.selected == null)
                return;

            this.addProjectToSection({ sectionId: this.sectionId, projectId: this.selected._id});
            this.$forceUpdate();
            this.selected = null;
        },  
        onCreateProject() {
            this.createProject({ sectionId: this.sectionId });
        },
        clear() {
            this.selected = null;
        }
    }
}
</script>

<style>

</style>