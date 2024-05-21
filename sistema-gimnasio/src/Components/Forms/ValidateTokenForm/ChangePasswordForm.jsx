import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../../api";
const tokenSchema = yup.object({
  token: yup.string().required("Por favor introduzca un token"),
});
const ChangePasswordSchema = yup.object({
  password: yup
    .string()
    .required("La contrasena es requerida")
    .min(8, "La contrasena debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ])*$/,
      "La contraseña debe contener al menos una letra minúscula,una mayuscula y un número"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("La confirmación de la contraseña es requerida"),
});

const ChangePasswordForm = () => {
  const [tokenValid, setTokenValid] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(tokenValid ? ChangePasswordSchema : tokenSchema),
  });
  const onSubmit = async (data) => {
    if (!tokenValid) {
      const response = await api.post("/api/User/validateToken", data.token);
      setTokenValid(response.data)
    }

  };
  return (
    <>
      <Form className="form-group" onSubmit={handleSubmit(onSubmit)}>
        {!tokenValid ? (
          <Form.Group className="mb-3" controlId="formGroupToken">
            <Form.Control
              className="input-form"
              onFocus={() => clearErrors("token")}
              {...register("token")}
              type="token"
              placeholder="Contraseña"
            />
            {errors.token && (
              <span className="alert" role="alert">
                {errors.token.message}
              </span>
            )}
          </Form.Group>
        ) : (
          <>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                className="input-form"
                onFocus={() => clearErrors("password")}
                {...register("password")}
                type="password"
                placeholder="Confrimar contraseña"
              />
              {errors.password && (
                <span className="alert" role="alert">
                  {errors.password.message}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
              <Form.Control
                className="input-form"
                onFocus={() => clearErrors("confirmPassword")}
                {...register("confirmPassword")}
                type="password"
                placeholder="********"
              />
              {errors.confirmPassword && (
                <span className="alert" role="alert">
                  {errors.confirmPassword.message}
                </span>
              )}
            </Form.Group>
          </>
        )}
        <Button variant="light" className="button-login" type="submit">
          Continuar
        </Button>
      </Form>
    </>
  );
};

export default ChangePasswordForm;
