
export const apiUrl = {
    login:"/auth/login",
    dashboardStats:"/admin/dashboard",
    users:"/admin/users",
    logOut:"/auth/logout",
    jobListing:"/admin/listings",
    jobListingByID:"/admin/listings",
    deleteListing:(userId: string) => `/admin/listings/${userId}`,
    approvedListing:(userId: string) => `/admin/listings/${userId}/approve`,
    rejectedListing:(userId: string) => `/admin/listings/${userId}/reject`,
    suspendedListing:(userId: string) => `/admin/listings/${userId}/suspend`,
    featuredListing:(userId: string) => `/admin/listings/${userId}/feature`,
    verifyUser:(userId: string) => `/admin/users/${userId}/verify`,
}