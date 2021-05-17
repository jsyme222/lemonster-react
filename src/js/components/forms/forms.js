import { useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Icon,
  TextField,
} from "@material-ui/core";
import { Cancel, Send, Warning } from "@material-ui/icons";
import { useAtom } from "jotai";
import ReCAPTCHA from "react-google-recaptcha";

import { contactFormData } from "../../../data/Atoms";
import { handle, validateEmail } from "../../utils/utils";

import "../../../css/forms.scss";

function CustomForm({ children, onSubmit, onCancel, errors, ...rest }) {
  const ref = useRef();

  const submit = (e) => {
    e.preventDefault();
    onSubmit();
    ref.current.execute();
  };

  return (
    <form className={`form`} {...rest}>
      {errors.content && (
        <div className="errors">
          <Icon>
            <Warning />
          </Icon>{" "}
          <p>{errors.content}</p>
        </div>
      )}
      <div className="form-fields">{children}</div>
      <ReCAPTCHA
        ref={ref}
        size="invisible"
        sitekey="6LdRVd0ZAAAAAIrA5qLBtiZ5Kk7IqnKg8g5wpjyn"
      />
      <ButtonGroup className="form-actions">
        <Button color="primary" endIcon={<Send />} onClick={submit}>
          Send
        </Button>
        <Button color="secondary" endIcon={<Cancel />} onClick={onCancel}>
          cancel
        </Button>
      </ButtonGroup>
    </form>
  );
}
export function ContactForm() {
  const [errors, setErrors] = useState({ content: "" });
  const [submitted, setSubmitted] = useState(false);
  const [contactDetails, setContactDetails] = useAtom(contactFormData);

  const setDetail = (detail, value) => {
    let newFormData = { ...contactDetails };
    newFormData[detail] = value;
    setContactDetails(newFormData);
  };

  const submitForm = () => {
    let data = contactDetails;
    let email = () => {
      if (data.email) {
        return validateEmail(data.email);
      } else {
        return false;
      }
    };
    let validEmail = email();
    if (data.name !== "" && validEmail) {
      let body = () => {
        if (data.services) {
          // Set services so api understands them
          data.services_website = data.services.website;
          data.services_business_application =
            data.services.businessApplication;
          data.services_maintenance = data.services.maintenance;
          data.services_other = data.services.other;
        }
        return JSON.stringify(data);
      };
      handle("contact/mail/", {
        method: "POST",
        body: body(),
      }).then((r) =>
        r.error
          ? setErrors({ content: `Error Sending Form: ${r.error}` })
          : setSubmitted(true)
      );
    } else {
      if (!data.name) {
        setErrors({ content: "Name required" });
      }
      if (!data.email || !validEmail) {
        if (!data.email) {
          setErrors({ content: "Email required" });
        } else {
          setErrors({ content: "Email invalid" });
        }
      }
    }
  };

  const onCancel = () => {
    setContactDetails({
      name: "",
      email: "",
      phone: "",
      company: "",
      website: "",
      questions: " ",
      services: {
        website: false,
        businessApplication: false,
        maintenance: false,
        other: false,
      },
    });
  };

  return !submitted ? (
    <CustomForm onSubmit={submitForm} errors={errors} onCancel={onCancel}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            name="name"
            value={contactDetails.name}
            placeholder="Name"
            label="Name"
            onChange={(e) => setDetail("name", e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="email"
            value={contactDetails.email}
            placeholder="Email"
            label="Email"
            onChange={(e) => setDetail("email", e.target.value)}
            type="email"
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            name="phone"
            value={contactDetails.phone}
            placeholder="Phone"
            label="Phone"
            type="phone"
            onChange={(e) => setDetail("phone", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="company"
            value={contactDetails.company}
            placeholder="Company"
            label="Company"
            onChange={(e) => setDetail("company", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="website"
            value={contactDetails.website}
            placeholder="https://"
            label="Website"
            type="url"
            onChange={(e) => setDetail("website", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="questions"
            value={contactDetails.questions}
            label="Additional Questions"
            onChange={(e) => setDetail("questions", e.target.value)}
            multiline
            rows={4}
          />
        </Grid>
      </Grid>

      <FormControl component="fieldset">
        <FormLabel component="legend">Services Requested</FormLabel>

        <Grid container alignItems="center" justify="center">
          <Grid item md={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={contactDetails.services.website || false}
                    name={"website"}
                    onChange={() =>
                      setDetail("services", {
                        ...contactDetails.services,
                        website: !contactDetails.services.website,
                      })
                    }
                  />
                }
                label={"New Website"}
              />
            </FormGroup>
          </Grid>
          <Grid item md={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      contactDetails.services.businessApplication || false
                    }
                    name={"business-application"}
                    onChange={() =>
                      setDetail("services", {
                        ...contactDetails.services,
                        businessApplication:
                          !contactDetails.services.businessApplication,
                      })
                    }
                  />
                }
                label={"Business Application"}
              />
            </FormGroup>
          </Grid>
          <Grid item md={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={contactDetails.services.maintenance || false}
                    name={"maintenance"}
                    onChange={() =>
                      setDetail("services", {
                        ...contactDetails.services,
                        maintenance: !contactDetails.services.maintenance,
                      })
                    }
                  />
                }
                label={"Web Maintenance"}
              />
            </FormGroup>
          </Grid>
          <Grid item md={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={contactDetails.services.other || false}
                    name={"other"}
                    onChange={() =>
                      setDetail("services", {
                        ...contactDetails.services,
                        other: !contactDetails.services.other,
                      })
                    }
                  />
                }
                label={"Something Else Entirely"}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </FormControl>
    </CustomForm>
  ) : (
    <h2>Thank you {contactDetails.name}, we will be in touch soon!</h2>
  );
}
