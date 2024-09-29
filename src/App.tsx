import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";
import { fromZodError } from "zod-validation-error";

const schema = z.object({
  email: z.string().email("This aint no email"),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

// type FormFields = {
//   email: string;
//   password: string;
// };

function App() {
  //register function takes in the name of the input field and an object containing validation rules
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: { email: "test@gmail.com" },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      throw new Error();
      console.log(data);
    } catch (error) {
      setError("root", { message: "This email is already taken" });
    }
  };

  return (
    <div className="w-1/5 mt-10 ml-10">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")} //registered email variable to the form in FormFields
          className="border border-black"
          type="text"
          placeholder="Email"
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}

        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })} //registered password variable to the form in FormFields
          className="border border-black"
          type="password"
          placeholder="Password"
        />

        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}

        <button
          disabled={isSubmitting}
          className="border bg-zinc-200 hover:bg-zinc-500"
          type="submit"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}

export default App;
