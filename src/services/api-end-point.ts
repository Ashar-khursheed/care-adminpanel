
export const apiUrl = {
    login:"/auth/login",
    dashboardStats:"/admin/dashboard",
    users:"/admin/users",
    logOut:"/auth/logout",
    verifyUser:(userId: string) => `/admin/users/${userId}/verify`,
}