export type {
  UserRoleDTO,
  UserStatusDTO,
  CourseStatusDTO,
  LessonTypeDTO,
  EnrollmentStatusDTO,
  PaymentStatusDTO,
  VideoStatusDTO,
  IdParamDTO,
  SlugParamDTO,
  PaginationQueryDTO,
} from "../schemas/common.schema";

export type {
  CreateUserDTO,
  UpdateUserDTO,
  UserLoginDTO,
  SendOtpDTO,
  VerifyOtpDTO,
  CreateUserProfileDTO,
  UpdateUserProfileDTO,
  UserFilterQueryDTO,
} from "../schemas/user.schema";

export type {
  CreateCourseDTO,
  UpdateCourseDTO,
  CourseFilterQueryDTO,
  CreateCourseModuleDTO,
  UpdateCourseModuleDTO,
  ReorderModulesDTO,
  CreateLessonDTO,
  UpdateLessonDTO,
  ReorderLessonsDTO,
} from "../schemas/course.schema";

export type {
  CreateVideoDTO,
  UpdateVideoDTO,
  GetVideoOtpDTO,
  CreateMaterialDTO,
  UpdateMaterialDTO,
} from "../schemas/media.schema";

export type {
  CreateEnrollmentDTO,
  UpdateEnrollmentStatusDTO,
  EnrollmentFilterQueryDTO,
  UpdateLessonProgressDTO,
} from "../schemas/enrollment.schema";

export type {
  CreateOrderDTO,
  UpdateOrderStatusDTO,
  VerifyPaymentDTO,
  CreatePaymentRecordDTO,
} from "../schemas/payment.schema";

export type {
  CreateQuestionOptionDTO,
  CreateQuestionDTO,
  UpdateQuestionDTO,
  CreateQuizDTO,
  UpdateQuizDTO,
  SubmitQuizAnswerDTO,
  SubmitQuizAttemptDTO,
  QuizAttemptResultDTO,
} from "../schemas/quiz.schema";

export type {
  IssueCertificateDTO,
  VerifyCertificateDTO,
  CertificateFilterQueryDTO,
} from "../schemas/certificate.schema";

export type {
  CreateGovernmentSchemeDTO,
  UpdateGovernmentSchemeDTO,
  SchemeFilterQueryDTO,
} from "../schemas/scheme.schema";

export type {
  CreateStartupResourceDTO,
  UpdateStartupResourceDTO,
  StartupResourceFilterQueryDTO,
} from "../schemas/startup-resource.schema";

export type {
  CreateMarketPartnerDTO,
  UpdateMarketPartnerDTO,
  CreateMarketLeadDTO,
  UpdateMarketLeadStatusDTO,
  MarketLeadFilterQueryDTO,
} from "../schemas/market.schema";

export type {
  CreateNotificationDTO,
  MarkNotificationAsReadDTO,
  NotificationFilterQueryDTO,
} from "../schemas/notification.schema";
