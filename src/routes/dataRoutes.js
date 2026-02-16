import ViewHome from './home/ViewHome';
import ViewLifestyle from './lifestyle/ViewLifestyle';
import ViewGalleryInteriorFinishes from './interior-finishes/ViewGalleryInteriorFinishes';
import ViewGalleryInteriorImages from './interior-images/ViewGalleryInteriorImages';
import ViewGalleryDesign from './design/ViewGalleryDesign';
import ViewGalleryTeam from './team/ViewGalleryTeam';
import ViewMap from './map/ViewMap';
import ViewResidences from './residences/ViewResidences';
import {interiorFinishes01, interiorFinishes02, interiorFinishes03, design01, design02, design03, galleryRenders01, Team01, InteriorImages01, InteriorImages02, InteriorImages03} from './gallery/data/gallery';
import ViewGalleryRollOver from './gallery/ViewGalleryRollOver';

export const dataRoutes = [
    {
        title: 'Location',
        routes: [
            {
                title: 'Lifestyle',
                path: '/lifestyle',
                component: ViewLifestyle,
            },

            {
                title: 'Map',
                path: '/location-map',
                component: ViewMap
            }
        ]
    },

    {
                title: 'Team',
                path: '/team',
                component: ViewGalleryTeam,
                data: [Team01],
    },

        {
                title: 'Design',
                path: '/design',
                component: ViewGalleryDesign,
                data: [design01, design02, design03],
        },

    {
        title: 'Interiors',
        routes: [
            {
                title: 'Images',
                path: '/interior-images',
                component: ViewGalleryInteriorImages,
                data: [InteriorImages01, InteriorImages02, InteriorImages03],
            },

                        {
                title: 'Finishes',
                path: '/interior-finishes',
                component: ViewGalleryInteriorFinishes,
                data: [interiorFinishes01, interiorFinishes02, interiorFinishes03,],
            },
        ]
    },

    {
        title: 'Residences',
        path: '/residences',
        component: ViewResidences,

    },

    {
        title: 'Gallery',
        path: '/gallery-renders',
        component: ViewGalleryRollOver,
        data: [galleryRenders01,],
    },


    {
        title: 'Home',
        path: '/',
        component: ViewHome
    }
];
