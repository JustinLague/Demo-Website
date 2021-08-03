<template>
<div>
    <div class="row section-row">
        <div class="col-md-12">
            <h5 class="sub-section">
                <clickToEdit class="section-text" :value="$t('portfolio.sectionTitle', section.title)" @input="updateTitle" ></clickToEdit>
            </h5>
            <div class="section-icons">
                <div class="edit-icon-border">
                    <b-icon class="icon edit-icon" id="icon-env" scale="1" icon="pencil-fill"></b-icon>
                </div>
                <div class="delete-icon-border" @click="deleteSection(section)">
                    <b-icon class="icon delete-icon" id="icon-env" scale="1.1" icon="trash"></b-icon>
                </div>
                <b-button class="b-add-project" variant="outline-primary">
                    <div v-b-modal.modal-add-project-to-section @click="setSectionId()">
                        Ajouter un projet
                    </div>
                </b-button> 
            </div>
        </div>
    </div>

    <div v-if="section.metaProjects">
        <div class="project" v-for="metaProject in section.metaProjects" :key="metaProject.project.id" >
            <div class="row" :key="metaProject.project.id">
                <div class="col-md-12">
                    <p>  
                        <router-link class="name" :to="{name: 'AdminProject', params: { sectionId: section.id , projectId: metaProject.project.id }}">
                            {{ $t('project.title', metaProject.project.title) }}
                        </router-link>
                    </p>
                    <section class="project-icons">
                        <span class="icon up" v-if="metaProject.index != 0" @click="up({index: metaProject.index, sectionId: section.id})"><i class="far fa-arrow-alt-circle-up"></i></span>                   
                        <span class="icon down" v-if="metaProject.index != section.metaProjects.length - 1" @click="down({index: metaProject.index, sectionId: section.id})"><i class="far fa-arrow-alt-circle-down"></i></span>
                        <div class="project-delete-icon-border" @click="deleteProject(metaProject.project, section)">
                            <b-icon class="icon project-delete-icon" id="icon-env" scale="1.1" icon="trash"></b-icon>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>

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

.section {
    margin-top: 2px;
}

.section-row {
    margin-top: 36px;
}

.sub-section {
    padding-top: 30px;
    padding-bottom: 10px;
    display: inline;
}

.section-icons {
    display: inline;
    float: right;
}

.section-text {
    display: inline;
}

.edit-icon-border {
    border: 1px solid rgb(28 103 206);
    border-radius: 6px;
    color: rgb(28 103 206);
    padding: 3px 7px 8px 7px;
    margin-right: 8px;
    display: inline;
}

.edit-icon {
    vertical-align: -0.26em !important;
}

.edit-icon-border:hover {
    cursor: pointer;
    background-color: rgb(28 103 206);
}

.edit-icon-border:hover > .icon{
    cursor: pointer;
    color: white;
}

.delete-icon-border {
    border: 1px solid red;
    border-radius: 5px;
    padding: 3px 7px 8px 7px;
    margin-right: 8px;
    display: inline;
}

.delete-icon-border:hover {
    cursor: pointer;
    background-color: red;
}

.delete-icon-border:hover > .icon {
    color: white;
    transform: scale(1.2);
}

.delete-icon {
    cursor: pointer;    
    color: #B5111B;
    vertical-align: -0.26em !important; 
} 

.b-add-project {
    font-weight: 500;
    padding: 4px 10px;
}

.project {
    margin-top: 8px;
}

.project-icons {
    display: inline;
    float: right;
}

.project-delete-icon-border {
    border: 1px solid red;
    border-radius: 5px;
    padding: 1px 3px 1px 3px;
    margin-left: 4px;
    display: inline;
}

.project-delete-icon-border:hover {
    cursor: pointer;
    background-color: red;
}

.project-delete-icon-border:hover > .icon {
    color: white;
    transform: scale(1.2);
}

.project-delete-icon {
    color: red;
}

p { 
    margin-top: 5px;
    display: inline;
}

.name {
    display: inline;
}

.up {
    display: inline;
    cursor: pointer;
    transition: all .1s ease-in-out;
}

.down {
    margin-left: 4px;
    display: inline;
    cursor: pointer;
    transition: all .1s ease-in-out;
}

.icon {
    transition: all .1s ease-in-out;
}

.icon:hover {
    transform: scale(1.3);
}
</style>