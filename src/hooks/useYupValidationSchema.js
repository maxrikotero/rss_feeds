import { useState, useCallback } from "react";

const useYupValidationSchema = (schema) => {
  const [validationMessages, setValidationMessages] = useState({});
  return {
    handleValidateSchema: useCallback(
      (data) => {
        try {
          schema.validateSync(data, { abortEarly: false });
          setValidationMessages({});
          return {
            isValid: true,
            validationMessages: {},
          };
        } catch (e) {
          if (typeof e?.inner === "object") {
            const messages = e.inner.reduce(
              (acc, error) => ({ ...acc, [error.path]: error.message }),
              {}
            );
            setValidationMessages(messages);
            return { validationMessages: messages, isValid: false };
          }
          return { validationMessages: {}, isValid: false };
        }
      },
      [schema]
    ),
    validationMessages,
    isValidSchema: Object.keys(validationMessages).length < 1,
    handleValidationMessages: () => setValidationMessages({}),
  };
};

export default useYupValidationSchema;
