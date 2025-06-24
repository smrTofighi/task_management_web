import {
    LuLayoutDashboard,
    LuUsers,
    LuClipboardCheck,
    LuSquarePlus,LuLogOut
} from 'react-icons/lu';

export const SIDE_MENU_DATA = [
    {
        id : "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/admin/dashboard"
    },
    {
        id: "02",
        label: "Manage Tasks",
        icon: LuClipboardCheck,
        path: "/admin/tasks"
    },
    {
        id: '03',
        label : "Create Task",
        icon: LuSquarePlus,
        path: "/admin/create-task"
    },
    {
        id: '04',
        label: "Team Members",
        icon : LuUsers,
        path: "/admin/users"

    },
    {
        id: '05',
        label: "Logout",
        icon: LuLogOut,
        path: 'logout'
    }

];

export const SIDE_MENU_DATA_USER = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/user/dashboard"
    },
    {
        id: "02",
        label: "My Tasks",
        icon: LuClipboardCheck,
        path: "/user/tasks"
    },
    {
        id: '03',
        label : "Logout",
        icon: LuLogOut,
        path: 'logout'
    }
]

export const PRIORITY_DATA = [
    {label: "Low", value: 3},
    {label: "Medium", value: 2},
    {label: "High", value: 1}
]

export const STATUS_DATA = [
    {label: "Pending", value: 0},
    {label: "In Progress", value: 1},
    {label: "Completed", value: 2}
]