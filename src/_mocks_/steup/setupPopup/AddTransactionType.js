import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  Alert,
  AlertTitle,
  DialogContent,
  TextField,
  DialogTitle,
  Slide,
  CircularProgress,
} from "@mui/material";
// import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Stack from '@mui/material/Stack';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddMenu(props) {
  const { open, onClose } = props;
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [AddressLocation, setAddress] = React.useState("");
  const [zipcode, setZipcode] = React.useState("");
  const [county, setCounty] = React.useState("");
  const [msg, setMSG] = React.useState("");
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState(new Date());

  const formik = useFormik({
    initialValues: {
      name: '',
      email: "",
      AddressLocation: "",
      mobile: "",
      zipcode: "",
      county: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(55)
        .required("Email is required"),
      AddressLocation: Yup.string().max(255).required("Address is required"),
      mobile: Yup.string()
        .max(11)
        .min(8)
        .required("Mobile is required")
        .matches(/^(?=.*[0-9])/, "Onlly numbers are allowed"),
      zipcode: Yup.string().max(255).required("Zipcode is required"),
      county: Yup.string().max(255).required("Zipcode is required"),
    }),

    onSubmit: async (values) => {
      console.log("23q343 run ");
      let obj = {
        name: values.name,
        email: values.email,
        AddressLocation: values.AddressLocation,
        mobile: values.mobile,
        zipcode: values.zipcode,
        county: values.county,
      };
      const config = {
        method: "post",
        url: "/leads",
        withCredentials: true,
        data: obj,
      };
      await axios(config)
        .then((res) => {
          if (res.data.message === "Data Create Sucessfully") {
            setMSG("Lead Created Sucessfully");
            setTimeout(() => {
              setValues();
              //   setLoading(false);
              onClose();
            }, 1000);
          } else {
            setError(true);
            setMSG(res.data.message);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const setValues = () => {
    formik.setValues({
      name: '',
      email: "",
      AddressLocation: "",
      mobile: "",
      zipcode: "",
      county: "",
    });
  };
  const handleClose = () => {
    if (loading) return false;
    setValues();
    onClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{`Add Menu`}</DialogTitle>
      <DialogContent>
        {msg !== "" && (
          <Alert severity={error ? "error" : "success"}>
            <AlertTitle>{error ? "Error" : "Success"}</AlertTitle>
            <strong>{msg}</strong>
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit} method="post">
        <Stack spacing={3}>
          <TextField
            error={Boolean(formik.touched.name && formik.errors.name)}
            fullWidth
            helperText={formik.touched.name && formik.errors.name}
            label="Menu Name"
            margin="normal"
            name="Barcode *"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.name}
            variant="outlined"
            color="secondary"
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Start Date "
              value={value}
              margin="normal"
              onChange={(newValue) => {
                setValue(newValue);
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="DateTimePicker"
              value={value}
              margin="normal"
              onChange={(newValue) => {
                setValue(newValue);
              }}
            />
          </LocalizationProvider>
          </Stack>



          <DialogActions>
            <Button
              color="secondary"
              variant="outlined"
              disabled={formik.isSubmitting}
              onClick={handleClose}
            >
              close
            </Button>
            <Button
              color="secondary"
              type="submit"
              variant="contained"
            >
              {formik.isSubmitting ? <CircularProgress /> : "Submit"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
  
    </Dialog>
  );
}
