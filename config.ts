import type { ProfileIconProps } from "./src/components/profile-icon";



export const TEAM_LIST: ProfileIconProps[][][] = [
    [
        [
            {
                id: 0,
                name: "Nathan",
                isMentor: false,
                duration: 5,
                role: "Captain/Lead Programmer",
                note: "Father of this website",
                source: "",
            },
            {
                id: 1,
                name: "Audrey",
                isMentor: false,
                duration: 6,
                role: "Captain/Lead Builder",
                note: "",
                source: "",
            },
            {
                id: 3,
                name: "Marc",
                isMentor: false,
                duration: 3,
                role: "CAD Lead",
                note: "",
                source: "",
            },
        ],
        [
            {
                id: 0,
                name: "Zain",
                isMentor: false,
                duration: 5,
                role: "CAD Lead",
                note: "",
                source: "",
            },
            {
                id: 1,
                name: "Bethany",
                isMentor: false,
                duration: 6,
                role: "Outreach",
                note: "",
                source: "",
            },
            {
                id: 3,
                name: "Josiah",
                isMentor: false,
                duration: 3,
                role: "Outreach",
                note: "",
                source: "",
            },
        ],
    ],
    [
        [
            {
                id: 0,
                name: "Elyse",
                isMentor: true,
                duration: 5,
                role: "Captain/Lead Programmer",
                note: "",
                source: "",
            },
            {
                id: 1,
                name: "Mark",
                isMentor: true,
                duration: 6,
                role: "Captain/Lead Builder",
                note: "",
                source: "",
            },
            {
                id: 3,
                name: "Brittney",
                isMentor: true,
                duration: 3,
                role: "CAD Lead",
                note: "",
                source: "",
            },
        ],
    ]


];



export const EVENT_DATES = [
    {
        dateString: "2026-08-15",
        eventName: "Tabling at The Bean @ 226",
        image: "",
        dateDisplay: "8/15/26",
        time: "8AM - 1PM",
        description: "Meet with the Blazing Spirits at the Bean to discuss robotics, our outreach, and anything relating to STEM.",
        signupNeeded: false
    },
    {
        dateString: "2026-08-29",
        eventName: "Tabling at The Bean @ 226",
        image: "",
        dateDisplay: "8/29/27",
        time: "8AM - 1PM",
        description: "Meet with the Blazing Spirits at the Bean to discuss robotics, our outreach, and anything relating to STEM.",
        signupNeeded: false
    },
    {
        dateString: "2026-09-12",
        eventName: "Bottle & Can Drive + FTC Kickoff",
        image: "",
        dateDisplay: "9/12/26",
        time: "9AM - 2PM",
        description: "Bring bottles and cans to the build site to help us fundraise for the FTC Season. This date also marks the first day of the FTC season!",
        signupNeeded: false
    }
    
]
export const MARKED_DATES = {
            "2026-08-15": { selectedColor: 'blue', selected: true },
            "2026-08-29": { selectedColor: 'blue', selected: true  },
            "2026-09-12": { selectedColor: 'orange', selected: true },
          }

export const SPONSOR_IMAGE_LIST = [
    "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png",
    "https://m.media-amazon.com/images/I/31epF-8N9LL.png",
    "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png",
    "https://m.media-amazon.com/images/I/31epF-8N9LL.png",
    "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png",
    "https://m.media-amazon.com/images/I/31epF-8N9LL.png",
]