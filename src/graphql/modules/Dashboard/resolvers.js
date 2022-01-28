module.exports = {
    Query: {
        async dashboard(_, __, {dataSources, validateAdmin}) {
            validateAdmin()
            return await dataSources.DashboardServices.dashboard()
        }
    }
}