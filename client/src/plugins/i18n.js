import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    fr: {
        portfolio: { 
            title: 'Portfolio',
            sectionTitle: (ctx) => `${ctx.list(0)}`,
            description: (ctx) => `${ctx.list(0)}`,
        },
        about: { 
            title: 'À propos',
            description: (ctx) =>  `${ctx.list(0)}`,
            changeImage: "Changer l'image"
        },
        gallery: { 
            title: 'Galerie',
            more: 'plus de détails',
            imageName: (ctx) => `${ctx.list(0)}`
        },
        resume: { 
            title: 'Résumé',
            education: 'ÉDUCATION',
            exposition: 'EXPOSITIONS DE GROUPE SÉLECTIONNÉES',
            school2019: 'Mineur en psychologie, Université de Montréal, Montréal (QC), Canada',
            school2022: 'Baccalauréat en arts visuels et médiatiques, Université du Québec à Montréal, Montréal (QC), Canada'
        },
        project: { 
            title: (ctx) =>  `${ctx.list(0)}`,
            description: (ctx) =>  `${ctx.list(0)}`,
            artDescription: (ctx) =>  `${ctx.list(0)}`,
        },
        image: { 
            name: (ctx) =>  `${ctx.list(0)}`,
            description: (ctx) =>  `${ctx.list(0)}`,
            artDescription: (ctx) =>  `${ctx.list(0)}`,
        },
        enquiries: {
            title: 'Contact',
            renseignement: 'Pour toute demande de disponibilité ou de renseignements:',
        },
        menu: { 
            artist: 'Artiste visuelle'
        },
        admin: {
            save: "Sauvegarder",
            add: "Ajouter",
            cancel: "Annuler",
            remove: "Enlever",
            delete: "Supprimer",
            deleteSection: "Supprimer une section",
            confirmation: "Confirmation",
            englishSectionCheck: "Il semblerait que vous avez oublier la section anglais !",
            createNewProject: "Créer un nouveau projet",
            addImageErrorMessage: "Vous devez entrez une image.",
            addImagesErrorMessage: "Vous devez entrez une thumbnail et une image.",
            addImage: "Ajouter une image",
            addSection: "Ajouter une section",
            addProject: "Ajouter un projet",
            deleteSelectedProject: "Supprimer le projet",
            permentalyDeleteProject: "Êtes-vous sure de vouloir supprimer permanament le projet ?",
            deleteProjectSection: "Enlever le projet de la section"
        }
    },
    en: {
        portfolio: { 
            title: 'Portfolio',
            sectionTitle: (ctx) => `${ctx.list(1)}`,
            description: (ctx) => `${ctx.list(1)}`,
        },
        about: { 
            title: 'About',
            description: (ctx) =>  `${ctx.list(1)}`,
            changeImage: "Change image"
        },
        gallery: { 
            title: 'Gallery',
            more: 'more details',
            imageName: (ctx) => `${ctx.list(1)}`
        },
        resume: { 
            title: 'Resume',
            education: 'EDUCATION',
            exposition: 'SELECTED GROUP EXHIBITIONS',
            school2019: 'Minor in Psychology, Université de Montréal, Montréal (QC), Canada',
            school2022: 'Bachelor of Visual Arts, Université du Québec à Montréal, Montréal (QC), Canada'
        },
        project: { 
            title: (ctx) =>  `${ctx.list(1)}`,
            description: (ctx) => `${ctx.list(1)}`,
            artDescription: (ctx) => `${ctx.list(1)}`,
        },
        image: { 
            name: (ctx) => `${ctx.list(1)}`,
            description: (ctx) => `${ctx.list(1)}`,
            artDescription: (ctx) => `${ctx.list(1)}`,
        },
        enquiries: {
            title: 'Enquiries',
            renseignement: 'For any enquiries, please fill out the form below:',
        },
        menu: { 
            artist: 'Visual artist'
        },
        admin: {
            save: "Save",
            add: "Add",
            cancel: "Cancel",
            remove: "Remove",
            delete: "Delete",
            deleteSection: "Delete section",
            confirmation: "Confirmation",
            englishSectionCheck: "It seems like you didn't change the english version !",
            createNewProject: "Create new projet",
            addImageErrorMessage: "You must add an image.",
            addImagesErrorMessage: "You must add a thumbnail and an image.",
            addImage: "Add image",
            addSection: "Add section",
            addProject: "Add project",
            deleteSelectedProject: "Delete selected project",
            deleteProjectSection: "Remove this project from this section",
            permentalyDeleteProject: "Are you sure you want to permanently delete this project ?",
        }
    }
};

const i18n = new VueI18n({
    locale: 'fr', // set locale
    messages, // set locale messages
});

export default i18n;