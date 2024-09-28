import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./App.css";

type FormFields = {
  email: string;
  password: string;
};

function App() {
  //register function takes in the name of the input field and an object containing validation rules
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <div className="w-1/5 mt-10 ml-10">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", {
            required: true,
            validate: (value) => value.includes("@"),
          })} //registered email variable to the form in FormFields
          className="border border-black"
          type="text"
          placeholder="Email"
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <input
          {...register("password", { required: true, minLength: 8 })} //registered password variable to the form in FormFields
          className="border border-black"
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
        <button className="border bg-zinc-200 hover:bg-zinc-500" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
