const UserServices = require( '../../graphql/services/UserServices')
const ProfileServices = require( '../../graphql/services/ProfileServices')
const AuthServices = require( '../../graphql/services/AuthServices')
const BibleServices = require( '../../graphql/services/BibleServices')
const VerseOfTheDayServices = require( '../../graphql/services/VerseOfTheDayServices')
const ReflectionServices = require( '../../graphql/services/ReflectionServices')
const ForgotPasswordServices = require( '../../graphql/services/ForgotPasswordServices')
const ResetPasswordServices = require( '../../graphql/services/ResetPasswordServices')
const DevotionalServices = require( '../../graphql/services/DevotionalServices')
const ConfirmAccountServices = require( '../../graphql/services/ConfirmAccountServices')
const UploadServices = require( '../../graphql/services/UploadServices')

module.exports = () => ({
  UserServices,
  ProfileServices,
  AuthServices,
  BibleServices,
  VerseOfTheDayServices,
  ReflectionServices,
  ForgotPasswordServices,
  ResetPasswordServices,
  DevotionalServices,
  ConfirmAccountServices,
  UploadServices
})
