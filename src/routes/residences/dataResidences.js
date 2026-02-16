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
        /*
        'The Eliza Collection': [
            { level: 'Level 46-68', target: '46-68', roomSizes: [ROOM_TYPES.TWO_BEDROOM, ROOM_TYPES.THREE_BEDROOM, ROOM_TYPES.ANY] },
            { level: 'Level 45', target: '45', roomSizes: [ROOM_TYPES.TWO_BEDROOM, ROOM_TYPES.THREE_BEDROOM, ROOM_TYPES.ANY] },
            { level: 'Level 44', target: '44', roomSizes: [ROOM_TYPES.TWO_BEDROOM, ROOM_TYPES.THREE_BEDROOM, ROOM_TYPES.ANY] }
        ],

        'The Melbourne Collection': [
            { level: 'Level 43', target: '43', inactive: false, roomSizes: [ROOM_TYPES.ONE_BEDROOM, ROOM_TYPES.TWO_BEDROOM, ROOM_TYPES.THREE_BEDROOM, ROOM_TYPES.ANY] },
            { level: 'Level 42', target: '42', inactive: false, roomSizes: [ROOM_TYPES.ONE_BEDROOM, ROOM_TYPES.TWO_BEDROOM, ROOM_TYPES.THREE_BEDROOM, ROOM_TYPES.ANY] },
            { level: 'Level 37-41', target: '37-41', inactive: false, roomSizes: [ROOM_TYPES.ONE_BEDROOM, ROOM_TYPES.TWO_BEDROOM, ROOM_TYPES.THREE_BEDROOM, ROOM_TYPES.ANY] },
            { level: 'Level 35-36', target: '35-36', inactive: false, roomSizes: [ROOM_TYPES.ONE_BEDROOM, ROOM_TYPES.TWO_BEDROOM, ROOM_TYPES.THREE_BEDROOM, ROOM_TYPES.ANY] }
        ],
*/
        '': [
    { level: 'Level 5', target: 'Level 5', code: '05', roomSizes: [ROOM_TYPES.ANY] },
    { level: 'Level 4', target: 'Level 4', code: '04', roomSizes: [ROOM_TYPES.ANY] },
    { level: 'Level 3', target: 'Level 3', code: '03', roomSizes: [ROOM_TYPES.ANY] },
    { level: 'Level 2', target: 'Level 2', code: '02', roomSizes: [ROOM_TYPES.ANY] },
    { level: 'Level 1', target: 'Level 1', code: '01', roomSizes: [ROOM_TYPES.ANY] },
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
        },
        18: {
            'Level 1': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F18_L1.png', top: 0, left: 0 },
            'Level 2': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F18_L2.png', top: 0, left: 0 },
            'Level 3': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F18_L3.png', top: 0, left: 0 },
            'Level 4': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F18_L4.png', top: 0, left: 0 },
            'Level 5': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F18_L5.png', top: 0, left: 0 },

        },
        36: {
            'Level 1': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F36_L1.png', top: 0, left: 0 },
            'Level 2': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F36_L2.png', top: 0, left: 0 },
            'Level 3': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F36_L3.png', top: 0, left: 0 },
            'Level 4': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F36_L4.png', top: 0, left: 0 },
            'Level 5': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F36_L5.png', top: 0, left: 0 },

        },
        54: {
            'Level 1': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F54_L1.png', top: 0, left: 0 },
            'Level 2': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F54_L2.png', top: 0, left: 0 },
            'Level 3': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F54_L3.png', top: 0, left: 0 },
            'Level 4': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F54_L4.png', top: 0, left: 0 },
            'Level 5': { src: './img/apartments-3d-floorplans/3D_Floorplans_Highlights/F54_L5.png', top: 0, left: 0 },
        },
    },

    levelGroupApartments: {
        'Level 1': [
            { title: "101", type: '01', left: '1116px', top: '419px'},
            { title: "102", type: '02', left: '945px', top: '501px'},
            { title: "103", type: '03', left: '1179px', top: '595px'},
            { title: "104", type: '04', left: '1398px', top: '596px'},
            { title: "105", type: '05', left: '1405px', top: '458px'},
            { title: "106", type: '06', left: '1405px', top: '478px'},
            { title: "107", type: '07', left: '1405px', top: '498px'},
        ],
        'Level 2': [
            { title: "201", type: '08', left: '1116px', top: '419px'},
            { title: "202", type: '09', left: '945px', top: '501px'},
            { title: "203", type: '10', left: '1179px', top: '595px'},
            { title: "204", type: '11', left: '1398px', top: '596px'},
            { title: "205", type: '12', left: '1405px', top: '458px'},
            { title: "206", type: '13', left: '1405px', top: '478px'},
            { title: "207", type: '14', left: '1405px', top: '498px'},
            { title: "208", type: '15', left: '1405px', top: '528px'},
            { title: "209", type: '16', left: '1405px', top: '558px'},

        ],
        'Level 3': [
            { title: "301", type: '08', left: '1116px', top: '419px'},
            { title: "302", type: '09', left: '945px', top: '501px'},
            { title: "303", type: '10', left: '1179px', top: '595px'},
            { title: "304", type: '11', left: '1398px', top: '596px'},
            { title: "305", type: '12', left: '1405px', top: '458px'},
            { title: "306", type: '13', left: '1405px', top: '478px'},
            { title: "307", type: '14', left: '1405px', top: '498px'},
            { title: "308", type: '15', left: '1405px', top: '528px'},
            { title: "309", type: '16', left: '1405px', top: '558px'},
        ],

        'Level 4': [
            { title: "401", type: '08', left: '1116px', top: '419px'},
            { title: "402", type: '09', left: '945px', top: '501px'},
            { title: "403", type: '10', left: '1179px', top: '595px'},
            { title: "404", type: '11', left: '1398px', top: '596px'},
            { title: "405", type: '12', left: '1405px', top: '458px'},
            { title: "406", type: '13', left: '1405px', top: '478px'},
            { title: "407", type: '14', left: '1405px', top: '498px'},
            { title: "408", type: '15', left: '1405px', top: '528px'},
            { title: "409", type: '16', left: '1405px', top: '558px'},

        ],

        'Level 5': [
            { title: "501", type: '17', left: '1116px', top: '419px'},
            { title: "502", type: '12', left: '945px', top: '501px'},
            { title: "503", type: '13', left: '1179px', top: '595px'},
            { title: "504", type: '18', left: '1398px', top: '596px'},
            { title: "505", type: '15', left: '1405px', top: '458px'},
            { title: "506", type: '16', left: '1405px', top: '478px'},

        ],
    },

        apartmentTypes : {}

}
