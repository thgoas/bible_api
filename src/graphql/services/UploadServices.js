const QueryError = require ( '../../errors/QueryError')
const { finished } = require ( 'stream/promises')
const db = require ( '../../db')
const NoPermissionError = require ( '../../errors/NoPermissionError')

const crypto = require ( 'crypto')
const UserServices = require ( './UserServices')

const path = require('path')

class UploadServices {
  async singleUpload(filter, file) {
    const { createReadStream, filename, mimetype, encoding } = await file
    const { id, email } = filter
    if (
      mimetype !== 'image/png' &&
      mimetype !== 'image/jpg' &&
      mimetype !== 'image/jpeg'
    ) {
      throw new QueryError('Extensões suportadas .png, .jpg')
    }

    const user = await UserServices.user(filter)

    if (!user) throw new NoPermissionError('Acesso Negado!')

    const token = crypto.randomBytes(10).toString('hex')
    const extension = '.' + mimetype.substring(6)

    const nameFile = `${Date.now()}_${token}${extension}`


    const lastUrl = await db('image_url')
      .where({ user_id: user.id })
      .delete()
      .returning('*')
    if (lastUrl.length > 0) {
      require('fs').unlink(
        `${path.join(__dirname,'..','..','..', '/uploads')}/${lastUrl[0].file_name}`,
        function (err) {
          console.log('Unlink Error', err)
        }
      )
    }

    const stream = createReadStream()

    const out = require('fs').createWriteStream(`${path.join(__dirname,'..', '..','..','/uploads')}/${nameFile}`)
    stream.pipe(out)
    await finished(out)

    const url = process.env.APP_BASE_URL + '/' + nameFile

    const urlResponse = await db('image_url')
      .insert({ url, user_id: user.id, file_name: nameFile })
      .returning('*')

    if (!urlResponse) throw new QueryError('Algo deu errado!')
    return user
    // return { filename, mimetype, encoding }
  }
}

module.exports = new UploadServices()
