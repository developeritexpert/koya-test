import { ROOM_TYPES } from "./types";

export const data = {
    rotationHotspots: {
    0: [
        { title: '', subtitle: '', left: '1170px', top: '595px' },
    ],
    18: [
        { title: '', subtitle: '', left: '1170px', top: '570px' },
    ],
    36: [
        { title: '', subtitle: '', left: '1170px', top: '570px' },
    ],
    56: [
        { title: '', subtitle: '', left: '1170px', top: '570px' },
    ],
    },
    rotationPhotoHotspots: {
        0: [
            // { title: 'queens wharf tower', left: '1062px', top: '420px', src: './img/masterplan-features/queens-wharf-tower-tmb.jpg', href: './img/gallery/QWT/v02.jpg' },
        ],
        18: [
            // { title: 'queens wharf tower', left: '1190px', top: '420px', src: './img/masterplan-features/queens-wharf-tower-tmb.jpg', href: './img/gallery/QWT/v02.jpg' },
        ],
        36: [
            // { title: 'queens wharf tower', left: '810px', top: '420px', src: './img/masterplan-features/queens-wharf-tower-tmb.jpg', href: './img/gallery/QWT/v02.jpg' },
        ],
        56: [
            // { title: 'queens wharf tower', left: '750px', top: '420px', src: './img/masterplan-features/queens-wharf-tower-tmb.jpg', href: './img/gallery/QWT/v02.jpg' },},
        ]
    },

levelGroups: {
  '': [ // renamed from '' for clarity
        { level: 'Rooftop', target: 'Roof', roomSizes: [ROOM_TYPES.ANY] },
        { level: 'Level 5', target: 'Level 5', code: '05', roomSizes: [ROOM_TYPES.ANY] },
        { level: 'Level 4', target: 'Level 4', code: '04', roomSizes: [ROOM_TYPES.ANY] },
        { level: 'Level 3', target: 'Level 3', code: '03', roomSizes: [ROOM_TYPES.ANY] },
        { level: 'Level 2', target: 'Level 2', code: '02', roomSizes: [ROOM_TYPES.ANY] },
        { level: 'Level 1', target: 'Level 1', code: '01', roomSizes: [ROOM_TYPES.ANY] },
        { level: 'Basement 1', target: 'Basement 1', roomSizes: [ROOM_TYPES.ANY] },
        { level: 'Basement 2', target: 'Basement 2', roomSizes: [ROOM_TYPES.ANY] },
  ],

        'Type': [{ level: 'Any', target: 'Any' }, { level: ROOM_TYPES.ONE_BEDROOM, target: ROOM_TYPES.ONE_BEDROOM }, { level: '2 Bedroom', target: '2 Bedroom' }, { level: ROOM_TYPES.THREE_BEDROOM, target: ROOM_TYPES.THREE_BEDROOM }],

   },
    rotationOverlays: {
        0: {
            'Level 1': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F00_L1.png', top: 0, left: 0 },
            'Level 2': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F00_L2.png', top: 0, left: 0 },
            'Level 3': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F00_L3.png', top: 0, left: 0 },
            'Level 4': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F00_L4.png', top: 0, left: 0 },
            'Level 5': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F00_L5.png', top: 0, left: 0 },
            'Rooftop': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F00_L5R.png', top: 0, left: 0 },
        },
        18: {
            'Level 1': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F18_L1.png', top: 0, left: 0 },
            'Level 2': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F18_L2.png', top: 0, left: 0 },
            'Level 3': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F18_L3.png', top: 0, left: 0 },
            'Level 4': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F18_L4.png', top: 0, left: 0 },
            'Level 5': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F18_L5.png', top: 0, left: 0 },
            'Rooftop': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F18_L5R.png', top: 0, left: 0 },

        },
        36: {
            'Level 1': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F36_L1.png', top: 0, left: 0 },
            'Level 2': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F36_L2.png', top: 0, left: 0 },
            'Level 3': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F36_L3.png', top: 0, left: 0 },
            'Level 4': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F36_L4.png', top: 0, left: 0 },
            'Level 5': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F36_L5.png', top: 0, left: 0 },
            'Rooftop': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F36_L5R.png', top: 0, left: 0 },

        },
        54: {
            'Level 1': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F54_L1.png', top: 0, left: 0 },
            'Level 2': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F54_L2.png', top: 0, left: 0 },
            'Level 3': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F54_L3.png', top: 0, left: 0 },
            'Level 4': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F54_L4.png', top: 0, left: 0 },
            'Level 5': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F54_L5.png', top: 0, left: 0 },
            'Rooftop': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F54_L5R.png', top: 0, left: 0 },
        },
    },

    levelGroupApartments: {
        'Level 1': [
            { title: "101", type: '01', left: '820px', top: '420px'},
            { title: "102", type: '02', left: '1045px', top: '440px'},
            { title: "103", type: '03', left: '1180px', top: '400px'},
            { title: "104", type: '04', left: '1390px', top: '360px'},
            { title: "105", type: '05', left: '1426px', top: '500px'},
            { title: "106", type: '06', left: '1426px', top: '630px'},
            { title: "107", type: '07', left: '1203px', top: '620px'},
        ],
        'Level 2': [
            { title: "201", type: '08', left: '740px', top: '611px'},
            { title: "202", type: '09', left: '781px', top: '439px'},
            { title: "203", type: '10', left: '985px', top: '450px'},
            { title: "204", type: '11', left: '1168px', top: '414px'},
            { title: "205", type: '12', left: '1368px', top: '370px'},
            { title: "206", type: '13', left: '1379px', top: '516px'},
            { title: "207", type: '14', left: '1390px', top: '671px'},
            { title: "208", type: '15', left: '1147px', top: '649px'},
            { title: "209", type: '16', left: '957px', top: '638px'},

        ],
        'Level 3': [
            { title: "301", type: '08', left: '745px', top: '617px'},
            { title: "302", type: '09', left: '766px', top: '436px'},
            { title: "303", type: '10', left: '991px', top: '446px'},
            { title: "304", type: '11', left: '1166px', top: '413px'},
            { title: "305", type: '12', left: '1368px', top: '365px'},
            { title: "306", type: '13', left: '1382px', top: '520px'},
            { title: "307", type: '14', left: '1379px', top: '670px'},
            { title: "308", type: '15', left: '1148px', top: '639px'},
            { title: "309", type: '16', left: '956px', top: '635px'},
        ],

        'Level 4': [
            { title: "401", type: '08', left: '734px', top: '614px'},
            { title: "402", type: '09', left: '765px', top: '438px'},
            { title: "403", type: '10', left: '990px', top: '441px'},
            { title: "404", type: '11', left: '1175px', top: '406px'},
            { title: "405", type: '12', left: '1372px', top: '367px'},
            { title: "406", type: '13', left: '1382px', top: '517px'},
            { title: "407", type: '14', left: '1387px', top: '671px'},
            { title: "408", type: '15', left: '1155px', top: '636px'},
            { title: "409", type: '16', left: '943px', top: '641px'},

        ],

        'Level 5': [
            { title: "501", type: '17', left: '1098px', top: '438px'},
            { title: "502", type: '12', left: '1371px', top: '368px'},
            { title: "503", type: '13', left: '1385px', top: '520px'},
            { title: "504", type: '18', left: '1386px', top: '672px'},
            { title: "505", type: '15', left: '1151px', top: '638px'},
            { title: "506", type: '16', left: '953px', top: '638px'},

        ],
    },

        apartmentTypes : {}

}
