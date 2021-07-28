<template>
<div>
    <h5 class="sub-section">
        <div class="row">
            <clickToEdit :value="$t('portfolio.sectionTitle', section.title)" @input="updateTitle" class="section-text"></clickToEdit>
            <b-icon @click="deleteSection(section)" class="delete-icon section" id="icon-env" scale="1" icon="x-circle"></b-icon>
        </div>
    </h5>

    <div class="row" v-if="section.metaProjects">
        <div class="col-lg-12 project" v-for="metaProject in section.metaProjects" :key="metaProject.project.id" >
            <div :key="metaProject.project.id">
                    <p>  
                        <span class="up" v-if="metaProject.index != 0" @click="up({index: metaProject.index, sectionId: section.id})"><i class="far fa-arrow-alt-circle-up"></i></span>                   
                        <span class="down" v-if="metaProject.index != section.metaProjects.length - 1" @click="down({index: metaProject.index, sectionId: section.id})"><i class="far fa-arrow-alt-circle-down"></i></span>

                        <router-link class="name" :to="{name: 'AdminProject', params: { sectionId: section.id , projectId: metaProject.project.id }}">
                            {{ $t('project.title', metaProject.project.title) }}
                        </router-link>

                        <b-icon @click="deleteProject(metaProject.project, section)" class="delete-icon" id="icon-env" scale="0.9" icon="x-circle"></b-icon>
                    </p>
            </div>
        </div>
    </div>

    <button class="b-addProject">
        <div v-b-modal.modal-add-project-to-section @click="setSectionId()">
            Ajouter un projet
            <b-icon class="plus-icon" id="icon-env" scale="1.1" icon="plus-circle"></b-icon>
        </div>
    </button>

    <!-- modal -->
    <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
</div>
</template>

<script>
import { mapActions } from "vuex";
import clickToEdit from "./ClickToEdit";
import ConfirmDialogue from './ConfirmDialogue.vue';

export default {
     components: {
        clickToEdit,
        ConfirmDialogue,
    },
    props: {
        section: Object,
    },
    computed: {
        console: () => console,
        window: () => window,
    },
    methods: {
        ...mapActions("dashboard", ["updateSectionTitle", "removeProject", "removeSection", "up", "down"]),
        updateTitle(value) {
            this.updateSectionTitle({sectionId: this.section.id, title: value, lang: this.$i18n.locale })
        },
        setSectionId() {
            this.$emit("sectionId", this.section.id);
        },
        async deleteProject(project, section) {
            let payload = {
                project,
                section
            };

            const ok = await this.$refs.confirmDialogue.show({
                title: 'Supprimer un projet',
                message: 'Etes-vous sure que vous voulez supprimer ce projet ?',
                project: project,
                okButton: 'Supprimer',
            })

            if (ok) {
                this.removeProject(payload);
                this.$forceUpdate();
            } 
        },
        async deleteSection(section) {
            const ok = await this.$refs.confirmDialogue.show({
                title: 'Supprimer une section',
                message: 'Etes-vous sure que vous voulez supprimer cette section ?',
                section: section,
                okButton: 'Supprimer',
            })

            if (ok) {
                this.removeSection(section);
                this.$emit("refresh-section");
            } 
        },
    }
}
</script>

<style scoped>
a {
    color: black; 
    text-decoration: none;
}

a:hover {
    color: #B5111B;
    text-decoration: none;
}

.project {
    margin-bottom: -10px;
}


.sub-section {
    padding-left: 15px;
    padding-top: 30px;
    padding-bottom: 10px;
}

.b-addProject {
    margin-top: 10px;
    margin-left: 10px;
    background-color: white;
    color: black;
    font-weight: 500;
    border: none;
}

.b-addProject:focus {
    outline: none;
}

.b-addProject:hover {
    color: #B5111B;
}

.delete-icon {
    cursor: pointer;    
    color: #B5111B;
} 

.section {
    margin-top: 2px;
}

.plus-icon {
    color: rgb(0, 0, 255);
}

.name {
    position: relative;
}

.up {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: -30px;
}

.down {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: -10px;
}
</style>