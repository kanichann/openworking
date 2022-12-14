import { ObjectSchema } from 'joi';
import { JoiRequestValidationError } from './error-handlers';

type IJoiDecorator = (target: any, key: string, descriptor: PropertyDescriptor)=>void;

export function joiValidaation(schema: ObjectSchema): IJoiDecorator {
  return (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      const { error } = await Promise.resolve(schema.validate(req.body));
      if (error?.details) {
        throw new JoiRequestValidationError(error?.details[0].message);
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

