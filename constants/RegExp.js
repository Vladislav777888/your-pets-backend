const PASSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,16})/;
const PHONE_REGEX = /^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/;
const LOCATION = /^[A-Z]{1}[a-z]{1,20}$/;
const NAME_REGEX = /^[a-zA-Z ]+$/;
const BREED_REGEX = /^[a-zA-Z ]+$/;

module.exports = {
  PASSWD_REGEX,
  PHONE_REGEX,
  LOCATION,
  NAME_REGEX,
  BREED_REGEX,
};
