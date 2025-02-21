export const emailRules = [
  {
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: "올바른 이메일 형식이 아닙니다.",
  },
];
 
export const verificationCodeRules = [
  {
    validate: (value: string) => value.length === 6,
    message: "인증번호는 6자리여야 합니다.",
  },
];

export const passwordRules = [
  {
    validate: (value: string) => value.length >= 8,
    message: "비밀번호는 8자 이상이어야 합니다.",
  },
  {
    validate: (value: string) => /[A-Z]/.test(value),
    message: "대문자를 포함해야 합니다.",
  },
  {
    validate: (value: string) => /[0-9]/.test(value),
    message: "숫자를 포함해야 합니다.",
  },
];
export const confirmPasswordRules = (password: string) => [
  {
    validate: (value: string) => value === password,
    message: "비밀번호가 일치하지 않습니다.",
  },
];
