import {metadata} from 'aurelia-metadata';
import {metadataKey} from 'aurelia-validation';
import {ValidationRule} from './validation-rule';

export class ValidationRules {
  rules = [];

  static ensure(prop) {
    const rules = new ValidationRules();
    return rules.ensure(prop);
  }

  on(target) {
    if (target instanceof Function) {
      target = target.prototype;
    }
    metadata.define(metadataKey, this, target);
    return this;
  }

  decorate() {
    throw new Error('not implemented');
  }

  addRule(key, rule, dependsOn) {
    this.rules.push({ key: key, rule: rule, dependsOn: dependsOn });
  }
  ensure(prop) {
    this.currentProperty = prop;
    return this;
  }
  length(configuration, dependsOn?) {
    this.addRule(this.currentProperty, ValidationRule.lengthRule(configuration), dependsOn);
    return this;
  }
  presence(configuration, dependsOn?) {
    this.addRule(this.currentProperty, ValidationRule.presence(configuration), dependsOn);
    return this;
  }
  required(configuration, dependsOn?) {
    this.addRule(this.currentProperty, ValidationRule.presence(configuration), dependsOn);
    return this;
  }
  numericality(configuration, dependsOn?) {
    this.addRule(this.currentProperty, ValidationRule.numericality(configuration), dependsOn);
    return this;
  }
  date(configuration, dependsOn?) {
    this.addRule(this.currentProperty, ValidationRule.date(configuration), dependsOn);
    return this;
  }
  datetime(configuration, dependsOn?) {
    this.addRule(this.currentProperty, ValidationRule.datetime(configuration), dependsOn);
    return this;
  }
  email(configuration, dependsOn?) {
    this.addRule(this.currentProperty, ValidationRule.email(configuration), dependsOn);
    return this;
  }
  equality(configuration, dependsOn?) {
    if (!dependsOn && typeof configuration === "string") {
      dependsOn = [ configuration ];
    } else if (!dependsOn && typeof configuration === "function") {
      dependsOn = [ configuration() ];
    }
    this.addRule(this.currentProperty, ValidationRule.equality(configuration), dependsOn);
    return this;
  }
  format(configuration, dependsOn?) {
    this.addRule(this.currentProperty, ValidationRule.format(configuration), dependsOn);
    return this;
  }
  inclusion(configuration, dependsOn?) {
    this.addRule(this.currentProperty, ValidationRule.inclusion(configuration), dependsOn);
    return this;
  }
  exclusion(configuration, dependsOn?) {
    this.addRule(this.currentProperty, ValidationRule.exclusion(configuration), dependsOn);
    return this;
  }
  url(configuration, dependsOn?) {
    this.addRule(this.currentProperty, ValidationRule.url(configuration), dependsOn);
    return this;
  }
}
