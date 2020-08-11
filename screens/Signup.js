import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import ErrorMessage from "../components/ErrorMessage";
import { withFirebaseHOC } from "../config/Firebase";
import { Dropdown } from 'react-native-material-dropdown';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label("Name")
    .required()
    .min(2, "Must have at least 2 characters"),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registration email"),
  phone: Yup.number()
    .label("Phone")
    .required(),
  password: Yup.string()
    .label("Password")
    .required()
    .min(6, "Password should be at least 6 characters "),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm Password must matched Password")
    .required("Confirm Password is required"),
  check: Yup.boolean().oneOf([true], "Please check the agreement")
});

function Signup({ navigation, firebase }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState("ios-eye");
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState("ios-eye");
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true
  );

  function goToLogin() {
    return navigation.navigate("Login");
  }

  function handlePasswordVisibility() {
    if (passwordIcon === "ios-eye") {
      setPasswordIcon("ios-eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (passwordIcon === "ios-eye-off") {
      setPasswordIcon("ios-eye");
      setPasswordVisibility(!passwordVisibility);
    }
  }

  function handleConfirmPasswordVisibility() {
    if (confirmPasswordIcon === "ios-eye") {
      setConfirmPasswordIcon("ios-eye-off");
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (confirmPasswordIcon === "ios-eye-off") {
      setConfirmPasswordIcon("ios-eye");
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  }

  async function handleOnSignup(values, actions) {
    const { name, email, password } = values;

    try {
      const response = await firebase.signupWithEmail(email, password);

      if (response.user.uid) {
        const { uid } = response.user;
        const userData = { email, name, uid };
        await firebase.createNewUser(userData);
        navigation.navigate("App");
      }
    } catch (error) {
      actions.setFieldError("general", error.message);
    } finally {
      actions.setSubmitting(false);
    }
  }
  let professionData = [{
    value: 'Doctor',
  }, {
    value: 'Engineer',
  }, {
    value: 'Teacher',
  }, {
    value: 'Actor'
  }, {
    value: 'Business'
  }];

  return (
    <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
      <ScrollView>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values, actions) => {
            handleOnSignup(values, actions);
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting
          }) => (
              <>
                <FormInput
                  name="name"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  placeholder="Enter your full name"
                  iconName="md-person"
                  iconColor="#2C384A"
                  onBlur={handleBlur("name")}
                />
                <ErrorMessage errorValue={touched.name && errors.name} />
                <FormInput
                  name="email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  placeholder="Enter email"
                  autoCapitalize="none"
                  iconName="ios-mail"
                  iconColor="#2C384A"
                  onBlur={handleBlur("email")}
                />
                <ErrorMessage errorValue={touched.email && errors.email} />
                <FormInput
                  name="phone"
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  placeholder="Enter phone no."
                  autoCapitalize="none"
                  iconName="ios-call"
                  iconColor="#2C384A"
                  onBlur={handleBlur("phone")}
                />
                <ErrorMessage errorValue={touched.phone && errors.phone} />
                <FormInput
                  name="password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  placeholder="Enter password"
                  iconName="ios-lock"
                  iconColor="#2C384A"
                  onBlur={handleBlur("password")}
                  secureTextEntry={passwordVisibility}
                  rightIcon={
                    <TouchableOpacity onPress={handlePasswordVisibility}>
                      <Ionicons name={passwordIcon} size={28} color="grey" />
                    </TouchableOpacity>
                  }
                />
                <ErrorMessage errorValue={touched.password && errors.password} />
                <FormInput
                  name="password"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  placeholder="Confirm password"
                  iconName="ios-lock"
                  iconColor="#2C384A"
                  onBlur={handleBlur("confirmPassword")}
                  secureTextEntry={confirmPasswordVisibility}
                  rightIcon={
                    <TouchableOpacity onPress={handleConfirmPasswordVisibility}>
                      <Ionicons
                        name={confirmPasswordIcon}
                        size={28}
                        color="grey"
                      />
                    </TouchableOpacity>
                  }
                />
                <ErrorMessage
                  errorValue={touched.confirmPassword && errors.confirmPassword}
                />
                <Dropdown
                  label='Select profession'
                  data={professionData}
                  required={true}
                  containerStyle={{ marginLeft: 40, marginRight: 40 }}
                />
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonType="outline"
                    onPress={handleSubmit}
                    title="SIGNUP"
                    buttonColor="#F57C00"
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </View>
                <ErrorMessage errorValue={errors.general} />
              </>
            )}
        </Formik>
        <Button
          title="Have an account? Login"
          onPress={goToLogin}
          titleStyle={{
            color: "#039BE5"
          }}
          type="clear"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 100
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center"
  },
  buttonContainer: {
    margin: 25
  },
  checkBoxContainer: {
    backgroundColor: "#fff",
    borderColor: "#fff"
  }
});

export default withFirebaseHOC(Signup);
