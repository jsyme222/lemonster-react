import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from "@material-ui/core";
import { Cancel, Send } from "@material-ui/icons";
import { useAtom } from "jotai";

import { contactFormData } from "../../../data/Atoms";

import "../../../css/forms.scss";

function CustomForm({ children, onSubmit, ...rest }) {
  return (
    <form className="form contact" {...rest}>
      {children}
      <ButtonGroup className="form-actions">
        <Button color="primary" endIcon={<Send />} onClick={onSubmit || null}>
          Send
        </Button>
        <Button color="secondary" endIcon={<Cancel />}>
          cancel
        </Button>
      </ButtonGroup>
    </form>
  );
}
export function ContactForm() {
  const [contactDetails, setContactDetails] = useAtom(contactFormData);

  const setDetail = (detail, value) => {
    let newFormData = { ...contactDetails };
    newFormData[detail] = value;
    setContactDetails(newFormData);
  };

  const submitForm = () => {
    let data = contactDetails;
    console.log(data);
  };

  return (
    <CustomForm onSubmit={submitForm}>
      <TextField
        name="name"
        value={contactDetails.name}
        placeholder="Name"
        label="Name"
        onChange={(e) => setDetail("name", e.target.value)}
        required
      />
      <TextField
        name="email"
        value={contactDetails.email}
        placeholder="Email"
        label="Email"
        onChange={(e) => setDetail("email", e.target.value)}
        type="email"
        required
      />
      <TextField
        name="phone"
        value={contactDetails.phone}
        placeholder="Phone"
        label="Phone"
        type="phone"
        onChange={(e) => setDetail("phone", e.target.value)}
      />
      <TextField
        name="company"
        value={contactDetails.company}
        placeholder="Company"
        label="Company"
        onChange={(e) => setDetail("company", e.target.value)}
      />
      <TextField
        name="website"
        value={contactDetails.website}
        placeholder="https://"
        label="Website"
        onChange={(e) => setDetail("website", e.target.value)}
      />

      <FormControl component="fieldset" className="">
        <FormLabel component="legend">Services Requested</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={contactDetails.services.website}
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
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={contactDetails.services.businessApplication}
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
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={contactDetails.services.maintenance}
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
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={contactDetails.services.other}
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
      </FormControl>

      <TextField
        name="questions"
        value={contactDetails.questions}
        label="Additional Questions"
        onChange={(e) => setDetail("questions", e.target.value)}
        multiline
        rows={4}
      />
    </CustomForm>
  );
}
