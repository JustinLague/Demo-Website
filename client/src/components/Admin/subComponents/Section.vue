<template>
<div>
    <div class="row section-row">
        <div class="col-md-12">
            <h5 class="sub-section">
                <clickToEdit class="section-text" :value="$t('portfolio.sectionTitle', section.title)" @input="updateTitle" :edit="edit"></clickToEdit>
            </h5>
            <div class="section-icons">
                <div class="edit-icon-border" @click="edit=true">
                    <b-icon class="icon edit-icon" id="icon-env" scale="1" icon="pencil-fill" @click="edit=true"></b-icon>
                </div>
                <div class="delete-icon-border" @click="deleteSection(section)">
                    <b-icon class="icon delete-icon" id="icon-env" scale="1.1" icon="trash"></b-icon>
                </div>
                <b-button class="b-add-project" variant="outline-primary">
                    <div v-b-modal.modal-add-project-to-section @click="setSectionId()">
                        {{ $t('admin.addProject') }}
                    </div>
                </b-button> 
            </div>
        </div>
    </div>

    <div v-if="section.metaProjects">
        <div class="project" v-for="metaProject in section.metaProjects" :key="metaProject.projectId" >
            <div class="row" :key="metaProject.projectId">
                <div class="col-md-12">
                    <p>  
                        <router-link class="name" :to="{name: 'AdminProject', params: { sectionId: section._id , projectId: metaProject.projectId }}">
                            <p v-html="$t('project.title', getProject(metaProject.projectId).title)"></p>
                        </router-link>
                    </p>
                    <section class="project-icons">
                        <div class="project-delete-icon-arrow-up-border" v-if="metaProject.index != 0" @click="moveProjectUp({index: metaProject.index, sectionId: section._id})">
                            <b-icon class="icon project-arrow-up" id="arrow-up" scale="1.1" icon="arrow-up"></b-icon>
                        </div>   

                        <div class="project-delete-icon-arrow-down-border" v-if="metaProject.index != section.metaProjects.length - 1" @click="moveProjectDown({index: metaProject.index, sectionId: section._id})">
                            <b-icon class="icon project-arrow-down" id="arrow-down" scale="1.1" icon="arrow-down"></b-icon>
                        </div>

                        <div class="project-delete-icon-border" @click="deleteProject(metaProject.projectId, section)">
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
import { mapActions, mapState } from "vuex";
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
    data () {
        return {
            edit: false,
        }
    },
    computed: {
        ...mapState("project", ["projects"]),
        console: () => console,
        window: () => window,
    },
    methods: {
        ...mapActions("dashboard", ["updateSectionTitle", "removeProjectFromSection", "removeSection", "moveProjectUp", "moveProjectDown"]),
        updateTitle(value) {
            this.edit = false;
            this.updateSectionTitle({sectionId: this.section._id, title: value, lang: this.$i18n.locale })
        },
        setSectionId() {
            this.$emit("sectionId", this.section._id);
        },
        getProject(projectId) {
            return this.projects.find(project => project._id === projectId);
        },
        async deleteProject(projectId, section) {
            let payload = {
                projectId,
                section
            };

            const ok = await this.$refs.confirmDialogue.show({
                title: this.$t("admin.deleteProjectSection"),
                project: this.getProject(projectId),
                okButton: this.$t("admin.remove"),
            })

            if (ok) {
                this.removeProjectFromSection(payload);
            } 
        },
        async deleteSection(section) {
            const ok = await this.$refs.confirmDialogue.show({
                title: this.$t("admin.deleteSection"),
                section: section,
                okButton:  this.$t("admin.delete"),
            })

            if (ok) {
                this.removeSection(section);
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

.project-delete-icon-arrow-up-border {
    border: 1px solid black;
    border-radius: 5px;
    padding: 1px 3px 1px 3px;
    margin-left: 4px;
    display: inline;
}

.project-arrow-up {
    display: inline;
    cursor: pointer;
    transition: all .1s ease-in-out;
}

.project-delete-icon-arrow-up-border:hover {
    cursor: pointer;
    background-color: black;
}

.project-delete-icon-arrow-up-border:hover > .icon {
    color: white;
    transform: scale(1.2);
}

.project-delete-icon-arrow-down-border {
    border: 1px solid black;
    border-radius: 5px;
    padding: 1px 3px 1px 3px;
    margin-left: 4px;
    display: inline;
}

.project-arrow-down {
    display: inline;
    cursor: pointer;
    transition: all .1s ease-in-out;
}

.project-delete-icon-arrow-down-border:hover {
    cursor: pointer;
    background-color: black;
}

.project-delete-icon-arrow-down-border:hover > .icon {
    color: white;
    transform: scale(1.2);
}


.icon {
    transition: all .1s ease-in-out;
}

.icon:hover {
    transform: scale(1.3);
}

.name {
    display: inline;
}
</style>