export const VALIDATION_MESSAGES: Record<
  string,
  (error?: any) => string
> = {
  required: () => 'Поле обовʼязкове',
  email: () => 'Невалідний формат email',
  minlength: (e) => `Мінімум ${e.requiredLength} символів`,
  maxlength: (e) => `Максимум ${e.requiredLength} символів`,
  pattern: () => 'Невірний формат'
};
