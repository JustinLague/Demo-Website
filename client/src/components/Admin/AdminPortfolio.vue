<template>
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-10 content">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="main-title " v-html="$t('portfolio.title')"></h2>
                    <b-button class="add-section" @click="addSection()" variant="outline-primary">
                        {{ $t('admin.addSection') }}
                    </b-button>
                </div>
            </div>
            <div class="section" v-for="section in sections" :key="JSON.stringify(section)">
                <Section :section=section 
                         :key="JSON.stringify(section)" 
                         @refresh-section="refreshSection()"
                         @sectionId="setSectionId"
                         v-if=section.visible></Section>
            </div>
        
            <div class="row save-button">
                <div class="col align-self-end">
                    <b-form @submit.prevent="handleSubmit">
                        <b-form-group class="float-right">
                                <div v-if="!saving">
                                    <b-button type="submit" variant="success">{{ $t('admin.save') }}</b-button>
                                </div>
                                <div v-else>
                                    <b-spinner variant="primary" label="Spinning" class="spinner"></b-spinner>
                                </div>
                        </b-form-group>
                    </b-form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <add-project-to-section :sectionId=selectedSectionId></add-project-to-section>
    <confirm-dialogue-simple ref="confirmDialogueSimple"></confirm-dialogue-simple>
</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Section from "./subComponents/Section"
import AddProjectToSection from './subComponents/AddProjectToSection'
import ConfirmDialogueSimple from './subComponents/ConfirmDialogueSimple'

export default {
    components: {
        Section,
        AddProjectToSection,
        ConfirmDialogueSimple
    },
    data() {
        return {
            selectedSectionId: null
        }
    },
    created() {
        this.$nextTick(function () {
            this.initProjects();
            this.initSections();
        })
    },
    computed: {
        ...mapState("dashboard", ["sections", "saving", "serverError"]),
        ...mapState("project", ["projects"]),
        hasError() {
            return !this.serverError;
        },
        console: () => console,
        window: () => window,
    },
    methods: {
        ...mapActions("project", ["initProjects", "saveProject"]),
        ...mapActions("dashboard", ["saveSections", "addSection", "initSections"]),
        setSectionId(sectionId) {
            this.selectedSectionId = sectionId;
        },
        refreshSection() {
            this.$forceUpdate();
        },
        async handleSubmit() {

            /* condition pour verifier si la partie anglais est rempli  if() */
            
            const ok = await this.$refs.confirmDialogueSimple.show({
                title: this.$t('admin.confirmation'),
                message: this.$t('admin.englishSectionCheck'),
                okButton: this.$t('admin.save'),
            })

            if (ok) {
                await Promise.all(this.projects.map(async (project) => {
                    await this.saveProject(project);
                }));

                this.saveSections()
            } 
        }
    },
}
</script>

<style scoped>
.content {
    padding-left: 0px;
}

.main-title {
    display: inline;
}

.project {
    margin-bottom: -10px;
}

.sub-section {
    padding-top: 30px;
    padding-bottom: 10px;
}

.add-section {
    font-weight: 700;
    float: right;
    margin-top: 2px;
}

.add-section:focus{
    outline: none;
}

.add-section-icon {
    color: rgb(0, 0, 255);
   
}

.save-button {
    margin-top: 40px;
}
</style>
