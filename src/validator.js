import {metadata} from 'aurelia-metadata';
import {ValidationError, metadataKey} from 'aurelia-validation';
import validate from 'validate.js';

export class Validator {
  _validate(object, propertyName = null, rules = null) {
    const errors = [];
    if (!rules) {
      rules = metadata.get(metadataKey, object);
    }
    if (!rules) {
      // no rules defined for propertyName.
      return errors;
    }
    rules = rules.rules;
    let nullPropertyName = propertyName === null;
    for (let i = 0, ii = rules.length; i < ii; i++) {
      const ruleInfo = rules[i];
      propertyName = nullPropertyName ? ruleInfo.key : propertyName;
      if (!nullPropertyName && ruleInfo.key !== propertyName) {
        continue;
      }
      const { name, config } = ruleInfo.rule;
      const validator = { [propertyName]: { [name]: config } };
      const result = validate(object, validator);
      if (result) {
        errors.push(new ValidationError(ruleInfo.rule, result[propertyName][0], object, propertyName));
      }
    }
    return errors;
  }

  validateProperty(object, propertyName, rules = null) {
    return this._validate(object, propertyName, rules);
  }

  validateObject(object, rules = null) {
    return this._validate(object, null, rules);
  }
}
