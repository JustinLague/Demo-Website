<template>
<div>
    <h5 class="sub-section">
        <div class="row">
            <clickToEdit :preview=!preview :value="$t('portfolio.sectionTitle', section.title)" @input="updateTitle" class="section-text"></clickToEdit>
            <b-icon v-if="!preview" @click="deleteSection(section)" class="delete-icon section" id="icon-env" scale="1" icon="x-circle"></b-icon>
        </div>
    </h5>
    <div v-if="section.projects">
        <div :class="['row', dragging ? 'dragging':'']" @drop="onDrop($event, section)" 
                         @dragover.prevent 
                         @dragenter.prevent>
            <div 
                class="col-lg-12 project" 
                 v-for="subSection in section.projects" 
                 :key="subSection.project.id" 
                 draggable="true" 
                 @dragstart="startDrag($event, subSection)">
                    <div :key="subSection.project.id">
                        <p>
                            {{ $t('project.title', subSection.project.title) }}
                            <b-icon v-if="!preview" @click="deleteProject(subSection.project, section)" class="delete-icon" id="icon-env" scale="0.9" icon="x-circle"></b-icon>
                        </p>
                    </div>
            </div>
            <button v-if="!preview" :class="['b-addProject', dragging ? 'dragging':'']">
                <div v-b-modal.modal-add-project-to-section @click="setSectionId()">
                    <b-icon class="plus-icon" id="icon-env" scale="1.1" icon="plus-circle"></b-icon>
                    Ajouter un projet
                </div>
            </button>
            <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions } from "vuex";
import clickToEdit from "./ClickToEdit";
import ConfirmDialogue from './ConfirmDialogue.vue';

export default {
     components: {
        clickToEdit,
        ConfirmDialogue
    },
    props: {
        section: Object,
        dragging: Boolean,
        preview: Boolean,
    },
    computed: {
        console: () => console,
        window: () => window,
    },
    methods: {
        ...mapActions("dashboard", ["updateSection", "removeProject", "removeSection"]),
        updateTitle(value) {
            if (this.$i18n.locale == "fr")
                this.section.title[0] = value;
            else  
                this.section.title[1] = value; 
        },
        setSectionId() {
            this.$emit("sectionId", this.section.id);
        },
        startDrag(evt, subSection){
            this.$emit("draggingstart");
            
            evt.dataTransfer.dropEffect = 'move';
            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('projectID', subSection.project.id);
            evt.dataTransfer.setData('prevSectionID', this.section.id);
        },
        onDrop(evt, section) {
            this.$emit("draggingend");

            const projectID = evt.dataTransfer.getData('projectID');
            const prevSectionID = evt.dataTransfer.getData('prevSectionID');
            const payload = {
                prevSectionID,
                newSectionID: section.id,
                projectID
            };

            this.updateSection(payload);
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
                this.$emit("update-section");
            } 
        }
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

.row.dragging {
    width: 500px;
    background-color: #eeeeee;
}

.b-addProject.dragging {
    background-color: #eeeeee;
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
</style>