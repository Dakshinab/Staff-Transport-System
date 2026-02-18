"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admins = exports.staff = exports.drivers = void 0;
exports.drivers = [
    {
        id: "DRV001",
        name: "John Smith",
        email: "john.smith@transport.com",
        mobile: "+1 (555) 987-6543",
        status: "Active",
        reviewStatus: "Approved",
        rating: 4.8,
        tripCount: 142,
        nic: "198512345678",
        nicPhotos: {
            front: "/placeholder-nic-front.jpg",
            back: "/placeholder-nic-back.jpg"
        },
        license: "DL-4829102",
        licenseExpiry: "2028-10-12",
        licensePhotos: {
            front: "/placeholder-license-front.jpg",
            back: "/placeholder-license-back.jpg"
        },
        vehicle: {
            name: "Bus 101 (Volvo B11R)",
            type: "Bus",
            color: "White/Blue",
            regNo: "WP NA-1234",
            seats: 45,
            photos: {
                front: "/placeholder-bus-front.jpg",
                back: "/placeholder-bus-back.jpg"
            }
        },
        feedbacks: [
            { id: 1, user: "Alice M.", rating: 5, comment: "Very safe driving and punctual.", date: "2023-10-25" },
            { id: 2, user: "Bob D.", rating: 4, comment: "Bus was clean, but a bit cold.", date: "2023-10-20" },
            { id: 3, user: "Charlie", rating: 5, comment: "Excellent service!", date: "2023-10-15" }
        ],
        fieldVerification: {
            email: "Approved",
            mobile: "Approved",
            nic: "Approved",
            nicPhotoFront: "Approved",
            nicPhotoBack: "Approved",
            license: "Approved",
            licensePhotoFront: "Approved",
            licensePhotoBack: "Approved",
            vehicleType: "Approved",
            vehicleColor: "Approved",
            vehicleRegNo: "Approved",
            vehicleName: "Approved",
            vehicleSeats: "Approved",
            vehiclePhotoFront: "Approved",
            vehiclePhotoBack: "Approved"
        }
    },
    {
        id: "DRV002",
        name: "Robert Williams",
        email: "robert.w@transport.com",
        mobile: "+1 (555) 123-4567",
        status: "On Trip",
        reviewStatus: "Approved",
        rating: 4.5,
        tripCount: 89,
        nic: "199045678901",
        nicPhotos: {
            front: "/placeholder-nic-front.jpg",
            back: "/placeholder-nic-back.jpg"
        },
        license: "DL-9921023",
        licenseExpiry: "2029-05-15",
        licensePhotos: {
            front: "/placeholder-license-front.jpg",
            back: "/placeholder-license-back.jpg"
        },
        vehicle: {
            name: "Van 05 (Toyota)",
            type: "Van",
            color: "Silver",
            regNo: "WP CB-5678",
            seats: 12,
            photos: {
                front: "/placeholder-van-front.jpg",
                back: "/placeholder-van-back.jpg"
            }
        },
        feedbacks: [
            { id: 1, user: "Davis K.", rating: 4, comment: "Good drive, but arrived slightly late.", date: "2023-10-22" },
            { id: 2, user: "Eva L.", rating: 5, comment: "Very polite driver.", date: "2023-10-18" }
        ],
        fieldVerification: {
            email: "Approved",
            mobile: "Approved",
            nic: "Approved",
            nicPhotoFront: "Approved",
            nicPhotoBack: "Approved",
            license: "Approved",
            licensePhotoFront: "Approved",
            licensePhotoBack: "Approved",
            vehicleType: "Approved",
            vehicleColor: "Approved",
            vehicleRegNo: "Approved",
            vehicleName: "Approved",
            vehicleSeats: "Approved",
            vehiclePhotoFront: "Approved",
            vehiclePhotoBack: "Approved"
        }
    },
    {
        id: "DRV003",
        name: "James Brown",
        email: "j.brown@transport.com",
        mobile: "+1 (555) 555-0199",
        status: "Inactive",
        reviewStatus: "Approved",
        rating: 4.2,
        tripCount: 45,
        nic: "199278901234",
        nicPhotos: {
            front: "/placeholder-nic-front.jpg",
            back: "/placeholder-nic-back.jpg"
        },
        license: "DL-1200392",
        licenseExpiry: "2027-08-20",
        licensePhotos: {
            front: "/placeholder-license-front.jpg",
            back: "/placeholder-license-back.jpg"
        },
        vehicle: {
            name: "Unassigned",
            type: "N/A",
            color: "N/A",
            regNo: "N/A",
            seats: 0,
            photos: {
                front: "",
                back: ""
            }
        },
        feedbacks: [],
        fieldVerification: {
            email: "Approved",
            mobile: "Approved",
            nic: "Approved",
            nicPhotoFront: "Approved",
            nicPhotoBack: "Approved",
            license: "Approved",
            licensePhotoFront: "Approved",
            licensePhotoBack: "Approved",
            vehicleType: "Approved",
            vehicleColor: "Approved",
            vehicleRegNo: "Approved",
            vehicleName: "Approved",
            vehicleSeats: "Approved",
            vehiclePhotoFront: "Approved",
            vehiclePhotoBack: "Approved"
        }
    },
    {
        id: "DRV004",
        name: "Michael Davis",
        email: "m.davis@transport.com",
        mobile: "+1 (555) 999-8888",
        status: "Active",
        reviewStatus: "Approved",
        rating: 4.9,
        tripCount: 200,
        nic: "198033344455",
        nicPhotos: {
            front: "/placeholder-nic-front.jpg",
            back: "/placeholder-nic-back.jpg"
        },
        license: "DL-5820192",
        licenseExpiry: "2030-01-30",
        licensePhotos: {
            front: "/placeholder-license-front.jpg",
            back: "/placeholder-license-back.jpg"
        },
        vehicle: {
            name: "Bus 104 (Tata)",
            type: "Bus",
            color: "Yellow",
            regNo: "WP ND-9012",
            seats: 40,
            photos: {
                front: "/placeholder-bus-front.jpg",
                back: "/placeholder-bus-back.jpg"
            }
        },
        feedbacks: [
            { id: 1, user: "Frank", rating: 5, comment: "Best driver ever!", date: "2023-10-26" }
        ],
        fieldVerification: {
            email: "Approved",
            mobile: "Approved",
            nic: "Approved",
            nicPhotoFront: "Approved",
            nicPhotoBack: "Approved",
            license: "Approved",
            licensePhotoFront: "Approved",
            licensePhotoBack: "Approved",
            vehicleType: "Approved",
            vehicleColor: "Approved",
            vehicleRegNo: "Approved",
            vehicleName: "Approved",
            vehicleSeats: "Approved",
            vehiclePhotoFront: "Approved",
            vehiclePhotoBack: "Approved"
        }
    },
    // Pending Drivers for Review
    {
        id: "DRV005",
        name: "Sarah Johnson",
        email: "sarah.j@transport.com",
        mobile: "+1 (555) 777-3344",
        status: "Inactive",
        reviewStatus: "Pending",
        rating: 0,
        tripCount: 0,
        nic: "199512345678",
        nicPhotos: {
            front: "/placeholder-nic-front.jpg",
            back: "/placeholder-nic-back.jpg"
        },
        license: "DL-8765432",
        licenseExpiry: "2029-12-15",
        licensePhotos: {
            front: "/placeholder-license-front.jpg",
            back: "/placeholder-license-back.jpg"
        },
        vehicle: {
            name: "Van 08 (Nissan Caravan)",
            type: "Van",
            color: "White",
            regNo: "WP KL-2345",
            seats: 14,
            photos: {
                front: "/placeholder-van-front.jpg",
                back: "/placeholder-van-back.jpg"
            }
        },
        feedbacks: [],
        fieldVerification: {
            email: "Pending",
            mobile: "Pending",
            nic: "Pending",
            nicPhotoFront: "Pending",
            nicPhotoBack: "Pending",
            license: "Pending",
            licensePhotoFront: "Pending",
            licensePhotoBack: "Pending",
            vehicleType: "Pending",
            vehicleColor: "Pending",
            vehicleRegNo: "Pending",
            vehicleName: "Pending",
            vehicleSeats: "Pending",
            vehiclePhotoFront: "Pending",
            vehiclePhotoBack: "Pending"
        }
    },
    {
        id: "DRV006",
        name: "David Martinez",
        email: "david.m@transport.com",
        mobile: "+1 (555) 888-9999",
        status: "Inactive",
        reviewStatus: "Pending",
        rating: 0,
        tripCount: 0,
        nic: "199823456789",
        nicPhotos: {
            front: "/placeholder-nic-front.jpg",
            back: "/placeholder-nic-back.jpg"
        },
        license: "DL-3456789",
        licenseExpiry: "2030-06-20",
        licensePhotos: {
            front: "/placeholder-license-front.jpg",
            back: "/placeholder-license-back.jpg"
        },
        vehicle: {
            name: "Bus 205 (Ashok Leyland)",
            type: "Bus",
            color: "Blue/White",
            regNo: "WP MN-7890",
            seats: 50,
            photos: {
                front: "/placeholder-bus-front.jpg",
                back: "/placeholder-bus-back.jpg"
            }
        },
        feedbacks: [],
        fieldVerification: {
            email: "Pending",
            mobile: "Pending",
            nic: "Pending",
            nicPhotoFront: "Pending",
            nicPhotoBack: "Pending",
            license: "Pending",
            licensePhotoFront: "Pending",
            licensePhotoBack: "Pending",
            vehicleType: "Pending",
            vehicleColor: "Pending",
            vehicleRegNo: "Pending",
            vehicleName: "Pending",
            vehicleSeats: "Pending",
            vehiclePhotoFront: "Pending",
            vehiclePhotoBack: "Pending"
        }
    },
    {
        id: "DRV007",
        name: "Michael Chen",
        email: "m.chen@transport.com",
        mobile: "+1 (555) 777-8899",
        status: "Inactive",
        reviewStatus: "Pending",
        rating: 0,
        tripCount: 0,
        nic: "199512345678",
        nicPhotos: {
            front: "/placeholder-nic-front.jpg",
            back: "/placeholder-nic-back.jpg"
        },
        license: "DL-8877665",
        licenseExpiry: "2027-03-15",
        licensePhotos: {
            front: "/placeholder-license-front.jpg",
            back: "/placeholder-license-back.jpg"
        },
        vehicle: {
            name: "Car 12 (Toyota Prius)",
            type: "Car",
            color: "Black",
            regNo: "WP KL-9988",
            seats: 4,
            photos: {
                front: "/placeholder-car-front.jpg",
                back: "/placeholder-car-back.jpg"
            }
        },
        feedbacks: [],
        fieldVerification: {
            email: "Pending",
            mobile: "Pending",
            nic: "Pending",
            nicPhotoFront: "Pending",
            nicPhotoBack: "Pending",
            license: "Pending",
            licensePhotoFront: "Pending",
            licensePhotoBack: "Pending",
            vehicleType: "Pending",
            vehicleColor: "Pending",
            vehicleRegNo: "Pending",
            vehicleName: "Pending",
            vehicleSeats: "Pending",
            vehiclePhotoFront: "Pending",
            vehiclePhotoBack: "Pending"
        }
    },
    {
        id: "DRV008",
        name: "Emma Wilson",
        email: "emma.w@transport.com",
        mobile: "+1 (555) 333-4455",
        status: "Inactive",
        reviewStatus: "Pending",
        rating: 0,
        tripCount: 0,
        nic: "199823456789",
        nicPhotos: {
            front: "/placeholder-nic-front.jpg",
            back: "/placeholder-nic-back.jpg"
        },
        license: "DL-5544332",
        licenseExpiry: "2029-08-20",
        licensePhotos: {
            front: "/placeholder-license-front.jpg",
            back: "/placeholder-license-back.jpg"
        },
        vehicle: {
            name: "Van 08 (Mercedes Sprinter)",
            type: "Van",
            color: "White",
            regNo: "WP AB-7766",
            seats: 15,
            photos: {
                front: "/placeholder-van-front.jpg",
                back: "/placeholder-van-back.jpg"
            }
        },
        feedbacks: [],
        fieldVerification: {
            email: "Pending",
            mobile: "Pending",
            nic: "Pending",
            nicPhotoFront: "Pending",
            nicPhotoBack: "Pending",
            license: "Pending",
            licensePhotoFront: "Pending",
            licensePhotoBack: "Pending",
            vehicleType: "Pending",
            vehicleColor: "Pending",
            vehicleRegNo: "Pending",
            vehicleName: "Pending",
            vehicleSeats: "Pending",
            vehiclePhotoFront: "Pending",
            vehiclePhotoBack: "Pending"
        }
    }
];
exports.staff = [
    {
        id: "STF001",
        employeeId: "EMP001",
        name: "Sarah Johnson",
        companyName: "Tech Solutions Inc.",
        email: "sarah.johnson@techsolutions.com",
        status: "On a Trip"
    },
    {
        id: "STF002",
        employeeId: "EMP002",
        name: "Michael Chen",
        companyName: "Global Enterprises Ltd.",
        email: "m.chen@globalent.com",
        status: "Inactive"
    },
    {
        id: "STF003",
        employeeId: "EMP003",
        name: "Jessica Davis",
        companyName: "Tech Solutions Inc.",
        email: "j.davis@techsolutions.com",
        status: "On a Trip"
    },
    {
        id: "STF004",
        employeeId: "EMP004",
        name: "David Wilson",
        companyName: "Innovate Corp.",
        email: "david.w@innovatecorp.com",
        status: "Inactive"
    },
    {
        id: "STF005",
        employeeId: "EMP005",
        name: "Emily Brown",
        companyName: "Global Enterprises Ltd.",
        email: "emily.brown@globalent.com",
        status: "On a Trip"
    },
    {
        id: "STF006",
        employeeId: "EMP006",
        name: "Robert Martinez",
        companyName: "Innovate Corp.",
        email: "r.martinez@innovatecorp.com",
        status: "Inactive"
    }
];
exports.admins = [
    {
        id: "ADM001",
        username: "admin_sarah",
        mobile: "+1 (555) 001-2233",
        email: "sarah.admin@transport.com",
        status: "Active"
    },
    {
        id: "ADM002",
        username: "admin_mike",
        mobile: "+1 (555) 002-3344",
        email: "mike.admin@transport.com",
        status: "Active"
    },
    {
        id: "ADM003",
        username: "system_admin",
        mobile: "+1 (555) 003-4455",
        email: "system@transport.com",
        status: "Active"
    }
];
