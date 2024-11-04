import styled from "styled-components";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import { Input } from "../components/input";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import Field from "../components/field/Field";
import { useEffect, useState } from "react";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";

const schema = yup.object({
  fullname: yup.string().required(" Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter your valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, " Your password must be at keast 8 charaters or greater")
    .required("Please enter your password"),
});

export default function SignUpPage() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({ mode: "onchange", resolver: yupResolver(schema) });

  const handleSignUp = async (values) => {
    if (!isValid) return;
    console.log("handleSignUp ~ values", values);
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(user.user.uid);
      await updateProfile(auth.currentUser, {
        displayName: values.fullname,
      });

      const colRef = collection(db, "users");
      await addDoc(colRef, {
        fullname: values.fullname,
        email: values.email,
      });

      toast.success("Register successfully");
      console.log("Navigate to home");
      navigate("/"); // Kiểm tra điều hướng
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already in use.");
      } else {
        toast.error("An error occurred during sign up.");
      }
    }
  };

  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  const [togglePassword, setTogglePassword] = useState(false);
  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  });
  useEffect(() => {
    document.title = "Register Page";
  }, []);
  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            id="fullname"
            type="text"
            name="fullname"
            placeholder="enter your fullname"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="text"
            name="email"
            placeholder="enter your email"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type={togglePassword ? "text" : "password"}
            name="password"
            placeholder="enter your password"
            control={control}
          >
            {!togglePassword ? (
              <IconEyeClose
                onClick={() => setTogglePassword(true)}
              ></IconEyeClose>
            ) : (
              <IconEyeOpen
                onClick={() => setTogglePassword(false)}
              ></IconEyeOpen>
            )}
          </Input>
        </Field>
        <div className="have-account">
          You already have an account? <NavLink to={"/sign-in"}>Login</NavLink>{" "}
        </div>
        <Button
          type="submit"
          className="w-full max-w-[300px] mx-auto"
          isLoading={isSubmitting} // isLoading sẽ được truyền vào component Button
          disabled={isSubmitting} // Nút sẽ bị vô hiệu hóa khi đang xử lý submit
        >
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
}
