import { useState } from "react";

export const useEmailValidation = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const validateEmails = (emails: string[]) => {
    const invalidEmails = emails.filter(
      (email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );
    setErrors(invalidEmails);
    return invalidEmails.length === 0;
  };

  return { validateEmails, errors };
};
