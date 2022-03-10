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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const { open, onClose } = props;
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [AddressLocation, setAddress] = React.useState("");
  const [zipcode, setZipcode] = React.useState("");
  const [county, setCounty] = React.useState("");
  const [msg, setMSG] = React.useState("");
  const [error, setError] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name:'',  
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
        name:values.name,
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
      name:'',
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
  //   const handleSubmit = () => {
  //     setLoading(true);
  //     if (
  //       mobile !== "" &&
  //       email !== "" &&
  //       AddressLocation !== "" &&
  //       zipcode !== "" &&
  //       county !== ""
  //     ) {
  //       const config = {
  //         method: "post",
  //         url: "/leads",
  //         withCredentials: true,
  //         data: {
  //           email,
  //           mobile,
  //           AddressLocation,
  //           zipcode,
  //           county,
  //         },
  //       };
  //     }
  //     setLoading(false);
  //   };
  //   const ClearAllFeilds = () => {
  //     setError(false);
  //     setMSG("");
  //     setEmail("");
  //     setMobile("");
  //     setAddress("");
  //     setZipcode("");
  //     setCounty("");
  //   };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{`Create New Lead`}</DialogTitle>
      <DialogContent>
        {msg !== "" && (
          <Alert severity={error ? "error" : "success"}>
            <AlertTitle>{error ? "Error" : "Success"}</AlertTitle>
            <strong>{msg}</strong>
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit} method="post">
        <TextField
            error={Boolean(formik.touched.name && formik.errors.name)}
            fullWidth
            helperText={formik.touched.name && formik.errors.name}
            label="Barcode"
            margin="normal"
            name="Barcode *"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.name}
            variant="outlined"
            color="secondary"
          />
          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Product Name "
            margin="normal"
            name="Product Name "
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.email}
            variant="outlined"
            color="secondary"
          />
          <TextField
            error={Boolean(formik.touched.mobile && formik.errors.mobile)}
            fullWidth
            helperText={formik.touched.mobile && formik.errors.mobile}
            label="Product Price"
            margin="normal"
            name="mobile"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.mobile}
            variant="outlined"
            color="secondary"
          />
          <TextField
            error={Boolean(formik.touched.zipcode && formik.errors.zipcode)}
            fullWidth
            helperText={formik.touched.zipcode && formik.errors.zipcode}
            label="Product type"
            margin="normal"
            name="zipcode"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.zipcode}
            variant="outlined"
            color="secondary"
          />
        
       
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
            // disabled={formik.isSubmitting}
            // fullWidth
            // size="large"
            type="submit"
            variant="contained"
          >
            {formik.isSubmitting ? <CircularProgress /> : "Submit"}
          </Button>
    </DialogActions>
        </form>
      </DialogContent>
      {/* <DialogActions>

        {/* <Button
            color="secondary"
            variant="contained"
            disabled={formik.isSubmitting}
            // onClick={handleSubmit}
            type="submit"
            
          >
              {formik.isSubmitting ? <CircularProgress /> : "Submit"}
            
          </Button> 
      </DialogActions> */}
    </Dialog>
  );
}
