export const validateDetailFields = (fields: {
  name: string;
  outputStandard: string;
  trainingTime: number;
  deliveryType: string;
}): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Kiểm tra các trường bắt buộc
  if (!fields.name) {
    errors.name = "Name is required";
  } else if (fields.name.length <= 3) {
    errors.name = "Name must be longer than 3 characters";
  }
  if (!fields.outputStandard) {
    errors.outputStandard = "Please select a Output standard";
  }
  if (!fields.trainingTime) {
    errors.trainingTime = "Please enter a number for the training time";
  } else if (isNaN(fields.trainingTime)) {
    errors.trainingTime = "Training time must be a number";
  }
  if (!fields.deliveryType) {
    errors.deliveryType = "Please select a Delivery method";
  }

  return errors;
};
