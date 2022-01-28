const UserServices = require( '../../graphql/services/UserServices')
const ProfileServices = require( '../../graphql/services/ProfileServices')
const AuthServices = require( '../../graphql/services/AuthServices')
const BibleServices = require( '../../graphql/services/BibleServices')
const VerseOfTheDayServices = require( '../../graphql/services/VerseOfTheDayServices')
const ForgotPasswordServices = require( '../../graphql/services/ForgotPasswordServices')
const ResetPasswordServices = require( '../../graphql/services/ResetPasswordServices')
const DevotionalServices = require( '../../graphql/services/DevotionalServices')
const ConfirmAccountServices = require( '../../graphql/services/ConfirmAccountServices')
const UploadServices = require( '../../graphql/services/UploadServices')
const DashboardServices = require( '../../graphql/services/DashboardServices')

module.exports = () => ({
  UserServices,
  ProfileServices,
  AuthServices,
  BibleServices,
  VerseOfTheDayServices,
  ForgotPasswordServices,
  ResetPasswordServices,
  DevotionalServices,
  ConfirmAccountServices,
  UploadServices,
  DashboardServices
})
