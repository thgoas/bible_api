const db = require("../../db")

class DashboardServices {
    async dashboard () {
       const [usersCountTotal] = await db('users').count('id')
       const [usersCountActive] = await db('users').count('id').where({active: true})
       const [usersCountDeleteAccount] = await db('users').count('id').where({delete_account: true})
       const [devotionalCount] = await db('devotional').count('id')
       const [verseOfDayCount] = await db('bible_verse_of_the_day').count('id')

       return {
           usersCountActive: usersCountActive.count,
           usersCountTotal: usersCountTotal.count,
           usersCountDeleteAccount: usersCountDeleteAccount.count,
           devotionalCount: devotionalCount.count,
           verseOfDayCount: verseOfDayCount.count
       }

    }
}

module.exports = new DashboardServices