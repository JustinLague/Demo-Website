<template>
    <b-modal
        id="modal-add-project-to-section" 
        size="lg" 
        :title="this.$t('admin.addProject')"
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
                                <b-form-select-option v-for="project in getVisibleProjects" :key="project._id" :value="project">{{ $t('project.title', project.title) }}</b-form-select-option>
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
              <b-button size="sm" variant="danger" @click="onDeleteProject()">
                {{ $t('admin.deleteSelectedProject') }}
            </b-button>
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

        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>

    </b-modal>
</template>

<script>
import ImageViewer from "../../subComponents/ImageViewer";
import { mapActions, mapGetters } from "vuex";
import ConfirmDialogue from './ConfirmDialogue'

export default {
    components: {
        ImageViewer,
        ConfirmDialogue,
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
        ...mapGetters("project", ["getVisibleProjects"]),
        console: () => console,
        window: () => window,
    },
    methods: {
        ...mapActions("dashboard", ["addProjectToSection", "removeProjectFromSection", "removeProjectFromAllSections"]),
        ...mapActions("project", ["createProject", "deleteProject"]),
        addProject() {
            if (this.selected == null)
                return;

            this.addProjectToSection({ sectionId: this.sectionId, projectId: this.selected._id});
            this.selected = null;
        },  
        onCreateProject() {
            this.createProject({ sectionId: this.sectionId });
        },
        async onDeleteProject() {
            if (this.selected == null)
                return

            const ok = await this.$refs.confirmDialogue.show({
                title: this.$t('admin.deleteSelectedProject'),
                message: this.$t('admin.permentalyDeleteProject'),
                project: this.selected,
                okButton: this.$t("admin.delete"),
            })

            if (ok) {
                await this.removeProjectFromAllSections({ projectId: this.selected._id });
                await this.deleteProject({ projectId: this.selected._id});
                this.clear();
            } 
        },
        clear() {
            this.selected = null;
        }
    }
}
</script>

<style>

</style>