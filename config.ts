import type { ProfileIconProps } from "./src/components/profile-icon";



export const TEAM_LIST: ProfileIconProps[][][] = [
    [
        [
            {
                id: 0,
                name: "Nathan",
                isMentor: false,
                duration: 5,
                role: "Captain/Program Lead",
                note: "Father of this website",
                source: require("website_130/assets/images/Team Photo Nathan.jpg"),
            },
            {
                id: 1,
                name: "Audrey",
                isMentor: false,
                duration: 6,
                role: "Captain/Build Lead",
                note: "",
                source: require("website_130/assets/images/Team Photo Audrey.jpg"),
            },
            {
                id: 3,
                name: "Marc",
                isMentor: false,
                duration: 4,
                role: "CAD Lead",
                note: "",
                source: require("website_130/assets/images/Team Photo Marc.jpg"),
            },
        ],
        [
            {
                id: 0,
                name: "Ella",
                isMentor: false,
                duration: 3,
                role: "Outreach Lead",
                note: "",
                source: require("website_130/assets/images/Team Photo Ella.jpg"),
                
            },
            {
                id: 1,
                name: "Bethany",
                isMentor: false,
                duration: 4,
                role: "Outreach",
                note: "",
                source: require("website_130/assets/images/default-profile-picture.png"),
            },
            {
                id: 3,
                name: "Josiah",
                isMentor: false,
                duration: 4,
                role: "Outreach",
                note: "",
                source: require("website_130/assets/images/Team Photo Josiah.jpg"),
            },
        ],
        [
            {
                id: 0,
                name: "Zain",
                isMentor: false,
                duration: 4,
                role: "CAD",
                note: "",
                source: require("website_130/assets/images/default-profile-picture.png"),
            },
            {
                id: 1,
                name: "Jess",
                isMentor: false,
                duration: 2,
                role: "Outreach",
                note: "",
                source: require("website_130/assets/images/default-profile-picture.png"),
            },
            {
                id: 3,
                name: "Jace",
                isMentor: false,
                duration: 2,
                role: "Outreach",
                note: "",
                source: require("website_130/assets/images/Team Photo Jace.jpg"),
            },
        ],
        [
            {
                id: 0,
                name: "Trey",
                isMentor: false,
                duration: 1,
                role: "Programming",
                note: "",
                source: require("website_130/assets/images/Team Photo Trey.jpg"),
            },
            {
                id: 1,
                name: "Dayne",
                isMentor: false,
                duration: 1,
                role: "Programming",
                note: "",
                source: require("website_130/assets/images/Team Photo Dayne.jpg"),
            },
            {
                id: 2,
                name: "Gabe",
                isMentor: false,
                duration: 1,
                role: "Programming",
                note: "",
                source: require("website_130/assets/images/default-profile-picture.png"),
            },
        ],
    ],
    [
        [
            {
                id: 0,
                name: "Elyse",
                isMentor: true,
                duration: 20,
                role: "Lead Mentor",
                note: "",
                source: require("website_130/assets/images/Team Photo Elyse.jpg"),
            },
            {
                id: 1,
                name: "Mark",
                isMentor: true,
                duration: 15,
                role: "",
                note: "",
                source: require("website_130/assets/images/Team Photo Mark.jpg"),
            },
            {
                id: 3,
                name: "Brittney",
                isMentor: true,
                duration: 15,
                role: "",
                note: "",
                source: require("website_130/assets/images/Team Photo Brittney.jpg"),
            },
        ],
        [
            {
                id: 0,
                name: "Ryan",
                isMentor: true,
                duration: 2,
                role: "",
                note: "",
                source: require("website_130/assets/images/Team Photo Ryan.jpg"),
            },
            {
                id: 1,
                name: "John",
                isMentor: true,
                duration: 1,
                role: "",
                note: "",
                source: require("website_130/assets/images/Team Photo John.jpg"),
            },
            {
                id: 3,
                name: "Elijah",
                isMentor: true,
                duration: 1,
                role: "",
                note: "",
                source: require("website_130/assets/images/Team Photo Elijah.jpg"),
            },
        ],
    ]


];



export const EVENT_DATES = [
    {
        dateString: "2026-08-15",
        eventName: "Tabling at The Bean @ 226",
        image: require("website_130/assets/images/bean226-logo.png"),
        dateDisplay: "8/15/26",
        time: "8AM - 1PM",
        description: "Meet with the Blazing Spirits at the Bean to discuss robotics, our outreach, and anything relating to STEM.",
        signupNeeded: false,
        signupLink: ""
    },
    {
        dateString: "2026-08-29",
        eventName: "Tabling at The Bean @ 226",
        image: require("website_130/assets/images/bean226-logo.png"),
        dateDisplay: "8/29/26",
        time: "8AM - 1PM",
        description: "Meet with the Blazing Spirits at the Bean to discuss robotics, our outreach, and anything relating to STEM.",
        signupNeeded: false,
        signupLink: ""
    },
    {
        dateString: "2026-09-11",
        eventName: "CAD BLITZ",
        image: require("website_130/assets/images/CAD-BLITZ-photo.png"),
        dateDisplay: "9/11/26",
        description: "Quick weekday event meant to give kids easy access to CAD software (Onshape) through interactive activities. Students will leave with a better understanding of CAD.",
        time: "6PM - 7:30PM",
        signupNeeded: true,
        signupLink: "https://forms.gle/uDazfkkvHDSjc9kG8"
    },
    {
        dateString: "2026-09-12",
        eventName: "Bottle & Can Drive + FTC Kickoff",
        image: require("website_130/assets/images/bottle-and-can-photo.png"),
        dateDisplay: "9/12/26",
        time: "9AM - 2PM",
        description: "Bring bottles and cans to the build site to help us fundraise for the FTC Season. This date also marks the first day of the FTC season!",
        signupNeeded: false,
        signupLink: ""
    }
    
]
export const MARKED_DATES = {
            "2026-08-15": { selectedColor: 'blue', selected: true },
            "2026-08-29": { selectedColor: 'blue', selected: true  },
            "2026-09-11": { selectedColor: 'orange', selected: true  },
            "2026-09-12": { selectedColor: 'orange', selected: true },
          }

export const SPONSOR_IMAGE_LIST = [
    require("website_130/assets/images/ace-logo.png"),
    require("website_130/assets/images/haas-logo.png"),
    require("website_130/assets/images/hartford-foundation-logo.png"),
    require("website_130/assets/images/rtx-logo.png"),
    require("website_130/assets/images/sandair-logo.png"),
    require("website_130/assets/images/tjs-burrito-logo.png"),
    require("website_130/assets/images/tsunami-logo.png"),
    require("website_130/assets/images/turnpike-motors-logo.png"),
]