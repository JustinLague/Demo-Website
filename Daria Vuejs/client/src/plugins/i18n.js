import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    fr: {
        portfolio: { 
            title: 'Portfolio',
            description: (ctx) => `${ctx.list(0)}`,
        },
        about: { 
            title: 'À propos',
            biographie: 'est native de la Moldavie. Elle vit et travaille présentement à Montréal, complétant ses études en arts visuels et médiatiques avant d’entreprendre des études supérieures en arts thérapie. ',
            biographieName: 'Daria',
            demarcheArtistiqueBold: "Le travail de Daria Elas",
            demarcheArtistique: "se concentre sur la relation des espaces introspectifs et sociétaires. Se tournant initialement vers le figuratif à travers le dessin pour guider sa pratique, Daria entame désormais une réflexion sur des enjeux communs et personnels à travers l'abstraction des couleurs et un jeu pictural de textures par le biais de la peinture et de la toile. S’inspirant des enjeux sociétaires actuels, elle explore  diverses relations à travers les lignes et les formes géométriques pour créer des œuvres figuratives abstraites. Touchant particulièrement des enjeux féministes et environnementaux, elle initie une introspection et un dialogue utilisant sa propre introspection et d’expériences partagées. ",
            demarcheArtistique2: "Les peintures de Daria Elas génèrent des interprétations multiples par leur abstraction. Pour sa part, à travers les lignes et un certain chaos, elle puise dans ses souvenirs en quête d’une réconciliation avec soi, laissant entrevoir  des morceaux de toile brute, révélant la nudité de la toile. Ceux-ci s’opposent aux couleurs primaires utilisées qui dirigent le spectateur dans une ambiguïté d’espace paradoxal ou il peut se projeter à son tour dans un univers ludique. "
        },
        gallery: { 
            title: 'Galerie',
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
        }
      },
    en: {
        portfolio: { 
            title: 'Portfolio',
            description: (ctx) => `${ctx.list(1)}`,
        },
        about: { 
            title: 'About',
            biographie: 'was born in Chișinău (Moldova). She currently lives and works in Montreal, completing her Bachelor of Visual Arts.',
            biographieName: 'Daria',
            demarcheArtistiqueBold: "Daria Elas' work",
            demarcheArtistique: 'focuses on the relationship of introspective and societal spaces through figurative abstraction. She initially emphasized her practice around only figurative art, drawing portraits and studying the human proportions. Daria now begins to reflect on the issues of her community and her own personal views  through the abstraction of color and lines, Using the raw texture of the canvas, she explores various relationships through natural shapes, particularly touched by feminist and environmental issues. ',
            demarcheArtistique2: "Daria Elas' paintings generate a multitude of interpretations through their pictural abstraction. During her own process of creation, she draws on her memories, readings, and research to better understand her surroundings. This personal processus is opposed to rawness of the canvas and the bright colors used which lead the viewers into a paradoxical ambiguity where they can project themselves into their own universe",
        },
        gallery: { 
            title: 'Gallery',
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
            title: 'Enquieries',
            renseignement: 'For any inquiries, please fill out the form below:',
        },
        menu: { 
            artist: 'Visual artist'
        }
    }
};

const i18n = new VueI18n({
    locale: 'fr', // set locale
    messages, // set locale messages
});

export default i18n;