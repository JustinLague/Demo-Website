<template>
<div class="container-fluid">
    <!--
        <b-form-checkbox v-model="preview" name="check-button" switch>
            Preview
        </b-form-checkbox>
    -->
    <div class="row">
        <div class="col-lg-10 content">
            <h2 class="main-title">{{ $t('portfolio.title') }}</h2>
            <div class="section" v-for="section in sections" :key="JSON.stringify(section)">
                <Section :preview=preview
                         :dragging=dragging
                         @draggingstart="isDragging(true)"
                         @draggingend="isDragging(false)" 
                         :section=section 
                         :key="JSON.stringify(section)" 
                         @update-section="updateSection()"></Section>
            </div>
            <button v-if="!preview" class="add-section" @click="addSection()">
                <b-icon class="add-section-icon" id="icon-env" scale="1.1" icon="plus-circle"></b-icon>
                Ajouter une section
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col align-self-end">
            <b-form @submit.prevent="handleSubmit">
               <b-form-group>
                    <div v-if="!sectionTryingToAdd">
                        <b-button type="submit" variant="primary">Sauvegarder</b-button>
                    </div>
                    <div v-else>
                        <b-spinner variant="primary" label="Spinning" class="spinner"></b-spinner>
                    </div>
               </b-form-group>
            </b-form>
        </div>
    </div>
    <!-- Modal -->
    <add-project-toSection></add-project-toSection>
</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Section from "./subComponents/Section"
import AddProjectToSection from './subComponents/AddProjectToSection'

export default {
    components: {
        Section,
        AddProjectToSection
    },
    data() {
        return {
            preview: false,
            dragging: false
        }
    },
    created() {
        this.$nextTick(function () {
            this.initSection();
            this.getProjects();
        })
    },
    computed: {
        ...mapState("dashboard", ["sections", "projects", "sectionTryingToAdd", "serverError"]),
        hasError() {
            return !this.serverError;
        },
        console: () => console,
        window: () => window,
    },
    methods: {
        ...mapActions("dashboard", ["addSection", "getProjects", "initSection"]),
        updateSection() {
            this.$forceUpdate();
        },
        isDragging(isDragging) {
            this.dragging = isDragging;
        }
    },
}
</script>

<style scoped>
.content {
    padding-left: 0px;
}


.project {
    margin-bottom: -10px;
}

.dropzone.dragging {
    border: 1px solid;
}

.sub-section {
    padding-top: 30px;
    padding-bottom: 10px;
}

.add-section {
    margin-top: 20px;
    padding: 0px;
    background-color: white;
    border: none;
    font-weight: 700;
}

.add-section:hover {
    color: #B5111B;
}

.add-section:focus{
    outline: none;
}

.add-section-icon {
    color: rgb(0, 0, 255);
}
</style>
